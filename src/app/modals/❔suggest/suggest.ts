import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import SuggestionSetup from '../../../models/questions/setups';
import Suggestions from '../../../models/questions/quest';
import emojis from '../../../../config/emojis.json';

module.exports = {
  id: 'suggestModal',
  async execute(interaction: any, client: any) {
    const { guild, member } = interaction;

    const SuggestionSetupDB = await SuggestionSetup.findOne({
      GuildID: interaction.guild.id,
    });
    if (!SuggestionSetupDB)
      return interaction.reply({
        content: [
          `${emojis.error} **Error:** This server doesn't have a suggestion setup yet!`,
          `> **Fix:** Please contact a server administrator to setup the suggestion system!`,
        ].join('\n'),
        ephemeral: true,
      });

    const input = interaction.fields.getTextInputValue('suggest_Modal');

    await guild.channels.cache
      .get(SuggestionSetupDB.SuggestChannel)
      .send({
        embeds: [
          new EmbedBuilder()
            .setColor(SuggestionSetupDB.embedColor as any)
            .setThumbnail(member.user.displayAvatarURL({ forceStatic: true }))
            .setTimestamp()
            .setFooter({ text: `Send suggestions via the command` })
            .setAuthor({
              name: `Suggest by ${member.user.tag}`,
              iconURL: member.user.displayAvatarURL({ forceStatic: true }),
            })
            .setDescription(`> ${input}`)
            .addFields(
              {
                name: `${emojis.menus.quest.positive} Votes positive`,
                value: `\`\`\`0 Votes\`\`\``,
                inline: true,
              },
              {
                name: `${emojis.menus.quest.negative} Votes negatives`,
                value: `\`\`\`0 Votes\`\`\``,
                inline: true,
              }
            ),
        ],
        components: [
          new ActionRowBuilder().addComponents([
            new ButtonBuilder().setCustomId('Upvote').setLabel('Upvote').setEmoji('⬆️').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('Downvote')
              .setLabel('Downvote')
              .setEmoji('⬇️')
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('Delete').setLabel('Delete').setEmoji('🗑️').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('Accept').setLabel('Accept').setEmoji('✅').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('Decline').setLabel('Decline').setEmoji('❌').setStyle(ButtonStyle.Success),
          ]),
        ],
      })
      .then(async (Message: any) => {
        await interaction.reply({
          content: [
            `${emojis.correct} **Success:** Your suggestion has been sent to the suggestion channel!`,
            `> **Suggestion:** ${input}`,
          ].join('\n'),
          ephemeral: true,
        });

        await Suggestions.create({
          GuildID: guild.id,
          ChannelID: SuggestionSetupDB.SuggestChannel,
          MessageID: Message.id,
          MemberID: member.id,
          MemberTag: member.user.tag,
          Suggestion: input,
          Accepted: false,
          Declined: false,
          Upvotes: [],
          Downvotes: [],
        }).catch((err) => console.log(err));
      });
  },
};
