import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import Suggestions from '../../../models/questions/quest';
import SuggestionSetup from '../../../models/questions/setups';

module.exports = {
  id: 'Downvote',
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction: any, client: any) {
    const SuggestionsDB = await Suggestions.findOne({
      GuildID: interaction.guild.id,
      ChannelID: interaction.channel.id,
      MessageID: interaction.message.id,
    });
    if (!SuggestionsDB)
      return interaction.reply({
        content: [
          `${emojis.error} **Warning:** Couldn't find any data on this suggestion:/`,
          `> **Note:** If you think this is a mistake, please contact the developer`,
        ].join('\n'),
        ephemeral: true,
      });

    const SuggestionSetupDB = await SuggestionSetup.findOne({
      GuildID: interaction.guild.id,
    });
    if (!SuggestionSetupDB)
      return interaction.reply({
        content: [
          `${emojis.error} **Warning:** Couldn't find any data on this system:/`,
          `> **Note:** If you think this is a mistake, please contact the developer`,
        ].join('\n'),
        ephemeral: true,
      });

    const Embed = EmbedBuilder.from(interaction.message.embeds[0]);

    if (SuggestionsDB.Upvotes.includes(interaction.user.id))
      return interaction.reply({
        content: [
          `${emojis.error} **Warning:** You already voted on this suggestion!`,
          `> **Note:** If you think this is a mistake, please contact the developer`,
        ].join('\n'),
        ephemeral: true,
      });

    if (SuggestionsDB.Downvotes.includes(interaction.user.id)) {
      await Suggestions.findOneAndUpdate(
        {
          GuildID: interaction.guild.id,
          ChannelID: interaction.channel.id,
          MessageID: interaction.message.id,
        },
        { $pull: { Downvotes: interaction.user.id } }
      );

      if (Embed.data && Array.isArray(Embed.data.fields)) {
        Embed.data.fields[1] = {
          name: `${emojis.menus.quest.negative} Votes negatives`,
          value: `\`\`\`${SuggestionsDB.Downvotes.length - 1} Votes\`\`\``,
          inline: true,
        };
      }

      interaction.message.edit({ embeds: [Embed] });

      return interaction.reply({
        content: [
          `${emojis.correct} **Success:** You removed your vote on this suggestion!`,
          `> **Note:** If you think this is a mistake, please contact the developer`,
        ].join('\n'),
        ephemeral: true,
      });
    }
    await Suggestions.findOneAndUpdate(
      {
        GuildID: interaction.guild.id,
        ChannelID: interaction.channel.id,
        MessageID: interaction.message.id,
      },
      { $push: { Downvotes: interaction.user.id } }
    ).then(() => {
      if (Embed.data && Array.isArray(Embed.data.fields)) {
        Embed.data.fields[1] = {
          name: `${emojis.menus.quest.negative} Votes negatives`,
          value: `\`\`\`${SuggestionsDB.Downvotes.length + 1} Votes\`\`\``,
          inline: true,
        };
      }
      interaction.message.edit({ embeds: [Embed] });
      return interaction.reply({
        content: [
          `${emojis.correct} **Success:** You voted on this suggestion with a downvote!`,
          `> **Note:** If you think this is a mistake, please contact the developer`,
        ].join('\n'),
        ephemeral: true,
      });
    });
  },
};
