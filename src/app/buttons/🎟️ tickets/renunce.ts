import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import Profile from '../../../models/tickets/perfil';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'unclaim-ticket',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();

    const ticketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
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

    if (!interaction.member.roles.cache.has(ticketSetup.Handlers))
      return interaction.reply({
        content: [
          `\`👤\` Reason: You don't have the support role to claim this ticket, sorry.`,
          `day If you think this is an error, contact the server administrators.`,
        ].join('\n'),
        ephemeral: true,
      });

    const data = await DB.findOne({ ChannelID: channel.id });
    if (!data) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [
            `\`👤\` Reason: There are no previously saved data to continue with the system.`,
            `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
          ].join('\n')
        );
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    if (data.Support !== member.id)
      return interaction.reply({
        content: [
          `\`👤\` Reason: You cannot unassign a ticket that you have not claimed or is unclaimed.`,
          `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
        ].join('\n'),
        ephemeral: true,
      });

    if (!interaction.member.roles.cache.has(ticketSetup.Handlers))
      return interaction.reply({
        content: [
          `\`👤\` Reason: You don't have the support role to unassign this ticket.`,
          `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
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
