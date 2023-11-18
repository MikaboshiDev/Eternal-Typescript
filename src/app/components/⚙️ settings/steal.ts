import axios from 'axios';
import { EmbedBuilder, GuildEmoji, Message, MessageReaction, User } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'steal',
  permissions: ['ManageEmojisAndStickers', 'AttachFiles', 'UseExternalEmojis'],
  botpermissions: ['ManageEmojisAndStickers', 'AttachFiles', 'UseExternalEmojis'],
  description: 'Steal emojis by reacting with them.',
  aliases: ['steal-emojis'],
  category: 'settings',
  premium: false,
  cooldown: 50,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: 'Emoji Stealer', iconURL: message.author.displayAvatarURL() })
      .setDescription(
        [
          `${emojis.correct} **To steal emojis, react to this message with any custom emojis** (this requires Discord Nitro).`,
          `**Note:** You can only steal emojis from other servers.`,
        ].join('\n')
      )
      .addFields({
        name: 'Time',
        value: `I will give you 30 seconds to choose, then upload your chosen custom emojis to this guild.`,
      });

    const msg = await message.channel.send({ embeds: [embed] });
    try {
      const collected = await msg.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] });
      const reactions = collected.filter((emoji) => emoji.users.cache.has(message.author.id));
      if (reactions.size < 1)
        return message.channel.send({
          content: [
            `${emojis.error} You're supposed to add custom emojis... Please try again...`,
            `**Note:** You can only steal emojis from other servers.`,
          ].join('\n'),
        });

      for (const [, reaction] of reactions) {
        const emojiUrl = reaction.emoji.url;
        if (!emojiUrl) continue;
        try {
          const response = await axios.get(emojiUrl, { responseType: 'arraybuffer' });
          const emojiBuffer = response.data;
          const emojiName: string = reaction.emoji.name!;
          if (message.guild) {
            await message.guild.emojis.create({ name: emojiName, attachment: emojiBuffer });
            message.channel.send({
              content: [
                `${emojis.correct} The emoji with **name:** \`${emojiName}\` has been added to the server.`,
                `**Link:** [Click Here](https://cdn.discordapp.com/emojis/${reaction.emoji.id}.${
                  reaction.emoji.animated ? 'gif' : 'png'
                })`,
              ].join('\n'),
            });
          } else {
            message.channel.send({
              content: [
                `${emojis.error} Could not upload emoji: ${reaction.emoji.name}`,
                `**Note:** You can only steal emojis from other servers.`,
              ].join('\n'),
            });
            logWithLabel('error', `Could not upload emoji: ${reaction.emoji.name} (${reaction.emoji.id})`);
          }
        } catch (error) {
          message.channel.send({
            content: [
              `${emojis.error} Could not upload emoji: ${reaction.emoji.name}`,
              `**Note:** You can only steal emojis from other servers.`,
            ].join('\n'),
          });
          logWithLabel('error', `Could not upload emoji: ${reaction.emoji.name} (${reaction.emoji.id})`);
          console.error(error);
        }
      }
    } catch (error) {}
  },
};

async function filter(reaction: MessageReaction, user: User): Promise<boolean> {
  if (!reaction.emoji.url) return false;
  if (reaction.partial) {
    const r = await reaction.fetch();
    const emoji: GuildEmoji = r.emoji as GuildEmoji;
    return emoji.guild?.id !== r.message.guild?.id;
  } else {
    const emoji: GuildEmoji = reaction.emoji as GuildEmoji;
    return emoji.guild?.id !== reaction.message.guild?.id;
  }
}

function toDiscordMarkdownLink(url: string, name?: string) {
  return `[${name || url}](${url})`;
}
