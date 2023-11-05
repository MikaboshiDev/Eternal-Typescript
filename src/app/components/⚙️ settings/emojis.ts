import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';

import moment from 'moment';
module.exports = {
  name: 'emoji',
  description: 'information emoji in the server discord',
  cooldown: 20,
  aliases: ['emojis', 'emojiinfo', 'emoji-info', 'emoji-control'],
  permissions: ['ManageEmojisAndStickers', 'AttachFiles', 'UseExternalEmojis'],
  botpermissions: ['ManageEmojisAndStickers', 'AttachFiles', 'UseExternalEmojis'],
  premium: false,
  examples: [`emoji [subcommand] [properties] [emoji]`, `emoji [command] [emoji]`],
  category: 'settings',
  subcommands: [`emoji add <emoji>`, `emoji info <emoji>`, `emoji jumbo <emoji>`],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'add':
        {
          const emoji = args.slice(1).join(' ');
          const regex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi;

          if (!emoji || !emoji.match(regex))
            return message.channel.send({
              content: [
                `${emojis.error} Unable to add the emoji to the server. Please make sure the emoji is valid.`,
                `**Example:** \`${prefix}addemoji :emoji:\``,
              ].join('\n'),
            });

          const emojiMatch = emoji.match(regex);
          const emojiid = emojiMatch && emojiMatch[0].split(':')[2].replace('>', '');
          const emojiname = (emojiMatch && emojiMatch[0].split(':')[1]) || 'invalid';

          const link = `https://cdn.discordapp.com/emojis/${emojiid}.${emoji.startsWith('<a:') ? 'gif' : 'png'}`;
          if (message.guild?.emojis.cache.find((e) => e.name === emojiname))
            return message.channel.send({
              content: [
                `${emojis.error} Unable to add the emoji to the server. Please make sure the emoji is valid.`,
                `**Possible Errors:**`,
                `**1.** The emoji is already in the server.`,
                `**2.** The emoji is a default Discord emoji.`,
              ].join('\n'),
            });

          message.guild?.emojis.create({ attachment: link, name: emojiname }).then((e) => {
            message.channel
              .send({
                embeds: [
                  new EmbedBuilder()
                    .setAuthor({ name: 'Emoji Added', iconURL: message.author.displayAvatarURL() })
                    .setDescription(
                      [
                        `${emojis.correct} The emoji with **id:** \`${emojiid}\` and **name:** \`${emojiname}\` has been added to the server.`,
                        `**Link:** [Click Here](https://cdn.discordapp.com/emojis/${e.id}.${
                          e.animated ? 'gif' : 'png'
                        })`,
                      ].join('\n')
                    )
                    .setColor('Green')
                    .setThumbnail(`https://cdn.discordapp.com/emojis/${e.id}.${e.animated ? 'gif' : 'png'}`)
                    .setFooter({ text: 'Emoji Added', iconURL: message.author.displayAvatarURL() }),
                ],
              })
              .catch((err) => {
                message.channel.send({
                  content: [
                    `${emojis.error} Unable to add the emoji to the server. Please make sure the emoji is valid.`,
                    `**Example:** \`${prefix}addemoji :emoji:\``,
                  ].join('\n'),
                });
              });
          });
        }
        break;
      case 'info':
        {
          const emoji = args[1].trim();
          const regex = /<a?:\w+:\d+>/g;
          if (!emoji || !regex.test(emoji))
            return message.channel.send({
              content: [
                `${emojis.error} Unable to find information for the emoji. Please make sure the emoji is valid.`,
                `**Example:** \`${prefix}emoji info :emoji:\``,
              ].join('\n'),
            });

          const emojiMatch = emoji.match(regex);
          const emojiid = emojiMatch && emojiMatch[0].split(':')[2].replace('>', '');
          const emojiname = (emojiMatch && emojiMatch[0].split(':')[1]) || 'invalid';

          const emojiurl = `https://cdn.discordapp.com/emojis/${emojiid}.png`;

          const embed = new EmbedBuilder()
            .addFields(
              {
                name: 'Emoji Type',
                value: emoji.startsWith('<a:') ? '> Animated' : '> Static',
                inline: true,
              },
              {
                name: 'Emoji for Guild',
                value: message.guild?.emojis.cache.has(emojiid as any)
                  ? `> ${emojis.correct} Yes`
                  : `> ${emojis.error} No`,
                inline: true,
              },
              {
                name: 'Emoji Created at',
                value:
                  '> ' +
                  '__**' +
                  moment(Number(emojiid) / 4194304 + 1420070400000).format('dddd, MMMM Do YYYY, h:mm:ss a') +
                  '**__',
              },
              { name: 'Name', value: `> \`${emojiname ?? ''}\``, inline: true },
              { name: 'ID', value: `> \`${emojiid ?? ''}\``, inline: true },
              {
                name: 'Animated',
                value: emoji?.startsWith('<a:') ? `> ${emojis.correct} Yes` : `> ${emojis.error} No`,
                inline: true,
              },
              { name: 'Emoji Image Link', value: `> [Click Here for Image](${emojiurl ?? ''})` },
              { name: 'Identifier', value: `> \`${emoji ?? ''}\`` },
              {
                name: 'Is Managed',
                value: message.guild?.emojis.cache.has(emojiid as any)
                  ? message.guild?.emojis.cache.get(emojiid as any)?.managed ?? false
                    ? `> ${emojis.correct} Yes`
                    : `> ${emojis.error} No`
                  : `> ${emojis.error} No`,
                inline: true,
              },
              {
                name: 'Has Required Colon',
                value: emoji.startsWith('<a:') ? `> ${emojis.correct} Yes` : `> ${emojis.error} No`,
                inline: true,
              }
            )
            .setImage(`${emojiurl}`)
            .setFooter({
              text: `Requested by ${message.author.username} | ${message.author.id} | ${moment().format('hh:mm:ss')}`,
              iconURL: message.author.displayAvatarURL(),
            });

          message.channel.send({ embeds: [embed] });
        }
        break;
      case 'jumbo':
        {
          const emoji = args[1].trim();
          const regex = /<a?:\w+:\d+>/g;
          if (!emoji || !regex.test(emoji))
            return message.channel.send({
              content: [
                `${emojis.error} Unable to find information for the emoji. Please make sure the emoji is valid.`,
                `**Example:** \`${prefix}emoji jumbo :emoji:\``,
              ].join('\n'),
            });

          const emojiMatch = emoji.match(regex);
          const emojiid = emojiMatch && emojiMatch[0].split(':')[2].replace('>', '');
          const emojiname = (emojiMatch && emojiMatch[0].split(':')[1]) || 'invalid';

          const emojiurl = `https://cdn.discordapp.com/emojis/${emojiid}.png`;

          const embed = new EmbedBuilder()
            .setTitle(`Emoji: ${emojiname}`)
            .setImage(`${emojiurl}`)
            .setFooter({
              text: `Requested by ${message.author.username} | ${message.author.id} | ${moment().format('hh:mm:ss')}`,
              iconURL: message.author.displayAvatarURL(),
            });

          message.channel.send({ embeds: [embed] });
        }
        break;
    }
  },
};
