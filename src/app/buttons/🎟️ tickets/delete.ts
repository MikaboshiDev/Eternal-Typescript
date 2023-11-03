import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

module.exports = {
  id: 'delete-ticket',
  async execute(interaction: ChatInputCommandInteraction, client: any) {
    const e = new TextInputBuilder()
      .setCustomId('modal_delete')
      .setLabel('Reason for deleting this ticket.')
      .setMaxLength(1000)
      .setMinLength(10)
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const f = new ActionRowBuilder().addComponents(e);

    const modal = new ModalBuilder()
      .setCustomId('modal_ticket_delete')
      .setTitle('Ticket Closure Reason')
      .addComponents(f as any);

    await interaction.showModal(modal).catch(() => {});
  },
};
