import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'renombrar_ticket',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();

    const ticketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
    if (!ticketSetup) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [`\`👤\` Reason: There is no data in the database.`, `\`⭐\` Date: ${new Date().toLocaleDateString()}`].join(
            '\n'
          )
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const data = await DB.findOne({ ChannelID: channel.id });
    if (!data) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [
            `\`👤\` Reason: There are no previously saved data.`,
            `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
          ].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const e = new TextInputBuilder()
      .setCustomId('modal_name')
      .setLabel('Previous ticket name.')
      .setMaxLength(20)
      .setMinLength(2)
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const f = new ActionRowBuilder().addComponents(e);

    const modal = new ModalBuilder()
      .setCustomId('modal_ticket_rename')
      .setTitle('Reason for Closing the Ticket')
      .addComponents(f as any);

    await interaction.showModal(modal).catch(() => {});
  },
};
