import { ActionRowBuilder, ChatInputCommandInteraction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
module.exports = {
 id: 'captcha',
 async execute(interaction: ChatInputCommandInteraction, client: any) {
            const modal = new ModalBuilder().setCustomId('captcha-model').setTitle('Verification System.');
            const textInput = new TextInputBuilder()
              .setCustomId('captcha-txt')
              .setLabel('Solve the Created Captcha')
              .setStyle(TextInputStyle.Short)
              .setMinLength(6)
              .setMaxLength(6)
              .setRequired(true)
              .setPlaceholder('Enter the Captcha Code to Complete');
            const actionRow = new ActionRowBuilder().addComponents(textInput);
            modal.addComponents(actionRow as any);
            await interaction.showModal(modal);
 }
}