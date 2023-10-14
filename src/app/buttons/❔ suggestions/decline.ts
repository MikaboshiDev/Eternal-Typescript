import emojis from "../../../../config/emojis.json";
import { EmbedBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
  id: 'Decline',
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction: ChatInputCommandInteraction, client: any) {
    const a = new TextInputBuilder()
      .setCustomId('modal_decline-quest-id')
      .setLabel('Id of the suggest.')
      .setMaxLength(1000)
      .setMinLength(5)
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const e = new TextInputBuilder()
      .setCustomId('modal_decline-quest')
      .setLabel('Reason for decline this suggest.')
      .setMaxLength(1000)
      .setMinLength(10)
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const f = new ActionRowBuilder().addComponents(e);

    const h = new ActionRowBuilder().addComponents(a);

    const modal = new ModalBuilder()
      .setCustomId('modal_quest_decline')
      .setTitle('Suggest Decline Reason')
      .addComponents(f as any)
      .addComponents(h as any);

    await interaction.showModal(modal).catch(() => {});
  },
};