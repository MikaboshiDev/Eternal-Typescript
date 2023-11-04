import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

import { logWithLabel } from '../../../utils/console';

module.exports = {
  id: 'ticket-system',
  async execute(interaction: ChatInputCommandInteraction, client: any) {
    try {
      const a = new TextInputBuilder()
        .setCustomId('modal_razon')
        .setLabel('Reason why you opened the ticket.')
        .setMaxLength(1000)
        .setMinLength(10)
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const b = new TextInputBuilder()
        .setCustomId('modal_category')
        .setLabel('Category this ticket falls into.')
        .setMinLength(3)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const e = new TextInputBuilder()
        .setCustomId('modal_archive')
        .setLabel('photos and links if necessary.' /*  */)
        .setMinLength(3)
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const c = new ActionRowBuilder().addComponents(a);
      const d = new ActionRowBuilder().addComponents(b);
      const f = new ActionRowBuilder().addComponents(e);

      const modal = new ModalBuilder()
        .setCustomId('modal_ticket_cores')
        .setTitle('Ticket Reason')
        .addComponents(c as any)
        .addComponents(d as any)
        .addComponents(f as any);

      await interaction.showModal(modal).catch(() => {});
    } catch (err) {
      logWithLabel('error', `Error executing command: ${err}`);
      console.error(err);
    }
  },
};
