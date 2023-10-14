import {
  ActionRowBuilder,
  EmbedBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import SuggestionSetup from '../../../models/questions/setups';
import Suggestions from '../../../models/questions/quest';
import { logWithLabel } from '../../../utils/console';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';

export default new Command(
  new SlashCommandBuilder()
    .setDMPermission(false)
    .setName('question')
    .setDescription('Give a idea for a server'),
  async (client, interaction) => {
    const { guild } = interaction;
    const i = interaction;
    const SuggestionSetupDB = await SuggestionSetup.findOne({
      GuildID: guild?.id,
    });
    if (!SuggestionSetupDB)
      return i.reply({
        content: [
          `${emojis.error} This server doesn't have a suggestion system setup yet!`,
          `> Use \`/suggest-setup\` to set it up!`,
        ].join('\n'),
        ephemeral: true,
      });

    const InputField = new TextInputBuilder()
      .setCustomId('suggest_Modal')
      .setLabel('Please provide as much details as possible')
      .setPlaceholder('Suggestion System!')
      .setMaxLength(300)
      .setMinLength(1)
      .setStyle(TextInputStyle.Paragraph);

    const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(InputField);

    const modal = new ModalBuilder()
      .setCustomId('suggestModal')
      .setTitle('Suggest System')
      .addComponents(TestModalTextModalInputRow as any);

    await interaction.showModal(modal);
  }
);
