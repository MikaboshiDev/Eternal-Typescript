import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import Profile from '../../../models/tickets/perfil';
import emojis from '../../../../config/emojis.json';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'registro-soporte',
  async execute(interaction: any, client: any) {
    const a = interaction.fields.getTextInputValue(`redes`);
    const b = interaction.fields.getTextInputValue(`biografia`);
    const c = interaction.fields.getTextInputValue(`horario`);

    const data = await Profile.findOne({ soporte: interaction.user.id });
    if (data)
      return interaction.reply({
        content: [
          `Sorry, but you already have a support profile created in the Discord server.`,
          `If you want to modify it, use \`/perfil\`.`,
        ].join('\n'),
        ephemeral: true,
      });

    await Profile.create({
      soporte: interaction.user.id,
      biografia: b,
      redes: a,
      horario: c,
    });

    interaction.reply({
      content: [
        `Perfect, your support profile has been successfully created. Thank you for starting to work with us.`,
        `If you want to modify it, use \`/registro\` again in one of the support channels.`,
      ].join('\n'),
      ephemeral: true,
    });
  },
};
