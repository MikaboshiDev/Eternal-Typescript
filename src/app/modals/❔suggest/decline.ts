import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import Suggestions from '../../../models/questions/quest';
import SuggestionSetup from '../../../models/questions/setups';

module.exports = {
  id: 'modal_quest_decline',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const i = interaction;

    const value_razon = interaction.fields.getTextInputValue('modal_decline-quest');
    const value_id = interaction.fields.getTextInputValue('modal_decline-quest-id');

    const SuggestionsDB = await Suggestions.findOne({
      GuildID: guild.id,
      ChannelID: channel.id,
      MessageID: value_id,
    });

    if (!SuggestionsDB)
      return i.reply({
        content: [
          `${emojis.error} Couldn't find any data on this message id in this channel:/`,
          `> **Note:** Make sure you provide the correct message id!`,
        ].join('\n'),
        ephemeral: true,
      });

    const SuggestionSetupDB = await SuggestionSetup.findOne({
      GuildID: guild.id,
    });
    if (!SuggestionSetupDB)
      return i.reply({
        content: [
          `${emojis.error} Couldn't find any setup data for this guild yet:/`,
          `> **Note:** Make sure you setup the bot before using this command!`,
        ].join('\n'),
        ephemeral: true,
      });

    if (!member.roles.cache.find((r: any) => r.id === SuggestionSetupDB.ManagerRole))
      return interaction.reply({
        content: [
          `${emojis.error} You don't have the permission to use this command:/`,
          `> **Note:** You need to have the <@&${SuggestionSetupDB.ManagerRole}> role to use this command!`,
        ].join('\n'),
        ephemeral: true,
      });

    const SuggestChannel = guild.channels.cache.get(SuggestionSetupDB.SuggestChannel);
    const SuggestMessage = await SuggestChannel.messages.fetch(SuggestionsDB.MessageID);

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

    const Embed = EmbedBuilder.from(SuggestMessage.embeds[0]);

    if (SuggestionsDB.Declined == true)
      return i.reply({
        content: [
          `${emojis.error} This suggestion is already declined by someone else :/`,
          `> **Note:** You can't decline a suggestion that is already declined!`,
        ].join('\n'),
        ephemeral: true,
      });
    Embed.setColor(SuggestionSetupDB.DeclineColor as any);
    Embed.setFooter({ text: `Declined By ${member.user.tag} at` });
    Embed.setTimestamp();
    if (Embed.data && Array.isArray(Embed.data.fields)) {
      Embed.data.fields[2] = {
        name: `Denied by ${member.user.tag} at`,
        value: `**__${value_razon}__**`,
        inline: false,
      };
    }

    await SuggestMessage.edit({
      content: `<@${SuggestionsDB.MemberID}>`,
      embeds: [Embed],
      components: [Buttons],
    });
    await Suggestions.findOneAndUpdate(
      { GuildID: guild.id, ChannelID: channel.id, MessageID: value_id },
      { Declined: true, Accepted: false }
    );
    interaction.reply({
      content: [
        `${emojis.correct} Successfully declined the suggestion by <@${SuggestionsDB.MemberID}>`,
        `> **Note:** You can't undo this action!`,
      ].join('\n'),
      ephemeral: true,
    });
  },
};
