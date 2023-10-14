import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction } from "discord.js";
import SuggestionSetup from '../../../models/questions/setups';
import Suggestions from '../../../models/questions/quest';
import emojis from "../../../../config/emojis.json";

module.exports = {
  id: 'Delete',
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction: any, client: any) {
    const { channel, guild, member, message } = interaction;
    const i = interaction;
    const SuggestionsDB = await Suggestions.findOne({
      GuildID: guild?.id,
      ChannelID: channel?.id,
      MessageID: message?.id,
    });
    if (!SuggestionsDB)
      return i.reply({
        content: [
          `${emojis.error} **Warning:** Couldn't find any data on this suggestion :/`,
          `> **Note:** If you think this is a mistake, please contact the developer!`,
        ].join('\n'),
        ephemeral: true,
      });

    const Buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('Upvote')
        .setLabel('Upvote')
        .setEmoji('⬆️')
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('Downvote')
        .setLabel('Downvote')
        .setEmoji('⬇️')
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('Delete')
        .setLabel('Delete')
        .setDisabled(true)
        .setEmoji('🗑️')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('Accept')
        .setLabel('Accept')
        .setDisabled(true)
        .setEmoji('✅')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('Decline')
        .setLabel('Decline')
        .setDisabled(true)
        .setEmoji('❌')
        .setStyle(ButtonStyle.Success)
    );

    const SuggestionSetupDB = await SuggestionSetup.findOne({
      GuildID: guild?.id,
    });
    if (!SuggestionSetupDB)
      return i.reply({
        content: [
          `${emojis.error} **Warning:** Couldn't find any data on this system :/`,
          `> **Note:** If you think this is a mistake, please contact the developer!`,
        ].join('\n'),
        ephemeral: true,
      });

    if (!member?.roles.cache.find((r: { id: string | undefined; }) => r.id === SuggestionSetupDB.ManagerRole))
      return i.reply({
        content: [
          `${emojis.error} **Warning:** You don't have the permission to do this!`,
          `> **Note:** If you think this is a mistake, please contact the developer!`,
        ].join('\n'),
        ephemeral: true,
      });

    const Embed = EmbedBuilder.from(i.message.embeds[0]);

    Embed.setColor(SuggestionSetupDB.DeclineColor as any);
    if (Embed.data && Array.isArray(Embed.data.fields)) {
      Embed.data.fields[2] = {
        name: `${emojis.menus.quest.positive} Votes positive`,
        value: `\`\`\`${SuggestionsDB.Upvotes.length - 1} Votes\`\`\``,
        inline: true,
      };
    }

    await Suggestions.findOneAndDelete(
      {
        GuildID: guild?.id,
        ChannelID: channel?.id,
        MessageID: message.id,
      },
      { GuildID: guild?.id }
    );

    message.edit({ embeds: [Embed], components: [Buttons] });

    i.reply({
      content: [
        `${emojis.correct} **Success:** You deleted this suggestion! (ID: \`${message.id}\`)`,
        `> **Note:** If you think this is a mistake, please contact the developer!`,
      ].join('\n'),
      ephemeral: true,
    });
  },
};