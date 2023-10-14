import {
  ChatInputCommandInteraction,
  Client,
  ActionRowBuilder,
  TextInputBuilder,
  ModalBuilder,
  TextInputStyle,
} from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'close-ticket',
  async execute(interaction: ChatInputCommandInteraction, client: any) {
    const e = new TextInputBuilder()
      .setCustomId('modal_close')
      .setLabel('Reason for closing this ticket.')
      .setMaxLength(1000)
      .setMinLength(10)
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const f = new ActionRowBuilder().addComponents(e);

    const modal = new ModalBuilder()
      .setCustomId('modal_ticket_cerrar')
      .setTitle('Ticket Closure Reason')
      .addComponents(f as any);

    await interaction.showModal(modal).catch(() => {});
  },
};
