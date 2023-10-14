import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import Profile from '../../../models/tickets/perfil';
import emojis from '../../../../config/emojis.json';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'modal_ticket_rename',
  async execute(interaction: any, client: any) {
    const value_name = interaction.fields.getTextInputValue('modal_name');
    const channel = interaction.channel;

    await channel.setName(value_name);
    interaction.reply({
      content: [
        `The channel name has been changed to \`${value_name}\`. Thank you for interacting with us.`,
        `The interaction took ${Date.now() - interaction.createdTimestamp}ms.`,
      ].join('\n'),
    });
  },
};
