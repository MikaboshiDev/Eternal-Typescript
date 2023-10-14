import { ChatInputCommandInteraction, EmbedBuilder, channelMention } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import Profile from '../../../models/tickets/perfil';
import DB from '../../../models/tickets/system';
module.exports = {
  id: 'claim-ticket',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();

    const ticketSetup = await TicketSetupData.findOne({ GuildID: interaction.guild.id });
    if (!ticketSetup) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [
            `\`👤\` Reason: There is no data in the database to proceed with the system.`,
            `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
          ].join('\n')
        );
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    const data = await DB.findOne({ ChannelID: channel.id });
    if (!data) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [
            `\`👤\` Reason: There are no previously saved data to proceed with the system.`,
            `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
          ].join('\n')
        );
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    if (data.Support)
      return interaction.reply({
        content: [
          `\`👤\` Reason: This ticket has already been claimed by <@${data.Support}>, it's a shame.`,
          `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
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
