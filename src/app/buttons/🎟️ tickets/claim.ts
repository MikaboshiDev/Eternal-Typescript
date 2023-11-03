import { EmbedBuilder, channelMention } from 'discord.js';
import Profile from '../../../models/tickets/perfil';
import model from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';
module.exports = {
  id: 'claim-ticket',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();

    const ticketSetup = await model.findOne({ GuildID: guild?.id });
    if (!ticketSetup)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setTitle('Ticket System')
            .setDescription(
              [
                `There is no ticket system set up on the discord server`,
                `Verify that the system is installed on the server`,
              ].join('\n')
            ),
        ],
        ephemeral: true,
      });

    const data = await DB.findOne({ ChannelID: channel.id });
    if (!data)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setTitle('Ticket System')
            .setDescription(
              [
                `The channel where this button is being executed is not a ticket`,
                `Please verify that you are within a ticket`,
              ].join('\n')
            ),
        ],
        ephemeral: true,
      });

    if (data.Support)
      return interaction.reply({
        content: [
          `This ticket has already been claimed by <@${data.Support}>, it's a shame.`,
          `the ticket will be closed in 5 seconds.`,
        ].join('\n'),
        ephemeral: true,
      });

    await DB.findOneAndUpdate(
      { ChannelID: channel.id },
      {
        $set: {
          Support: member.id,
        },
      }
    );

    interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Green')
            .setAuthor({ name: `System Ticket Manager`, iconURL: client.user.avatarURL() })
            .setDescription(
              [
                `The user ${interaction.user} has claimed the ticket ${channelMention(channel.id)}.`,
                `To close the ticket, click on the button below.`,
              ].join('\n')
            ),
        ],
      })
      .then((e: any) => {
        interaction.channel.permissionOverwrites
          .edit(interaction.user.id, {
            SendMessages: true,
            EmbedLinks: true,
            AttachFiles: true,
          })
          .catch(() => {});
      })
      .catch(() => {});

    const support = await Profile.findOne({ soporte: interaction.user.id });
    if (!support) return;

    await Profile.findOneAndUpdate(
      { soporte: interaction.user.id },
      {
        $inc: {
          tickets: +1,
        },
      }
    ).catch(() => {});
  },
};
