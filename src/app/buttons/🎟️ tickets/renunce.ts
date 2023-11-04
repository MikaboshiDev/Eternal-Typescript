import { EmbedBuilder } from 'discord.js';
import Profile from '../../../models/tickets/perfil';
import model from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  ticketMod: true,
  id: 'unclaim-ticket',
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

    if (data.Support !== member.id)
      return interaction.reply({
        content: [
          `You cannot unassign a ticket that you have not claimed or is unclaimed.`,
          `is a shame, the ticket will be closed in 5 seconds.`,
        ].join('\n'),
        ephemeral: true,
      });

    if (!interaction.member.roles.cache.has(ticketSetup.Handlers))
      return interaction.reply({
        content: [
          `\`👤\` Reason: You don't have the support role to unassign this ticket.`,
          `thanks for your attention, the ticket will be closed in 5 seconds.`,
        ].join('\n'),
        ephemeral: true,
      });

    interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: `Tickets System Manager`, iconURL: client.user.avatarURL() })
            .setColor('Green')
            .setDescription(
              [
                `The user moderator ${interaction.user} has unassigned the ticket from the user ${data.Support} successfully.`,
                `If you want to claim it again, you can do it by clicking on the button below.`,
              ].join('\n')
            ),
        ],
      })
      .then(() => {
        interaction.channel.permissionOverwrites
          .edit(ticketSetup.Handlers, {
            SendMessages: false,
            EmbedLinks: false,
            AttachFiles: false,
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
          tickets: -1,
        },
      }
    ).catch(() => {});
  },
};
