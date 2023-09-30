import emojis from '../../../../config/emojis.json';
import { EmbedBuilder, Message } from 'discord.js';
import fetch from 'node-fetch';

module.exports = {
  name: 'minecraft',
  category: 'premium',
  premium: true,
  description: 'The command is used to get the skin of a minecraft player',
  cooldown: 10,
  examples: ['search-mc skin Notch, search-mc heads Dream'],
  subcommands: [`minecraft skin <player>`, `minecraft heads <player>`],
  run: async (client: any, message: Message, args: string[], prefix: any) => {
    const subcommand = args[0];
    switch (subcommand) {
      case 'skin':
        {
          const player = args[1];
          if (!player)
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a player to get the skin of the minecraft player!`,
                `Example: \`${prefix}skins <player>\``,
              ].join('\n'),
            });

          const info = `https://api.mojang.com/users/profiles/minecraft/${player}`;
          const skin = `https://mc-heads.net/body/${player}`;

          const uuid = await fetch(info).then((res) => res.json());
          if (!uuid.id)
            return message.channel.send({
              content: [
                `${emojis.error} The player you entered does not exist in the minecraft database!`,
                `Example: \`${prefix}skins <player>\``,
              ].join('\n'),
            });

          const download = `https://crafatar.com/skins/${uuid.id}`;
          const embed = new EmbedBuilder()
            .setFooter({
              text: `Request id: ${uuid.id}`,
              iconURL: message.author.displayAvatarURL({ forceStatic: true }),
            })
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: true }) })
            .setTimestamp(new Date())
            .setColor('Green')
            .setThumbnail(download)
            .setImage(skin);

          message.channel.send({ embeds: [embed] }).catch(() => {
            message.channel.send({
              content: [
                `${emojis.error} An error occurred while getting the skin of the minecraft player!`,
                `Example: \`${prefix}skins <player>\``,
              ].join('\n'),
            });
          });
        }
        break;
      case 'heads': {
        const player = args[1];
        if (!player)
          return message.channel.send({
            content: [
              `${emojis.error} You must enter a player to get the skin of the minecraft player!`,
              `Example: \`${prefix}skins <player>\``,
            ].join('\n'),
          });

        const info = `https://api.mojang.com/users/profiles/minecraft/${player}`;
        const uuid = await fetch(info).then((res) => res.json());
        if (!uuid.id)
          return message.channel.send({
            content: [
              `${emojis.error} The player you entered does not exist in the minecraft database!`,
              `Example: \`${prefix}skins <player>\``,
            ].join('\n'),
          });

        const head = `https://crafatar.com/renders/head/${uuid.id}`;
        const embed = new EmbedBuilder()
          .setFooter({
            text: `Request id: ${uuid.id}`,
            iconURL: message.author.displayAvatarURL({ forceStatic: true }),
          })
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: true }) })
          .setTimestamp(new Date())
          .setColor('Green')
          .setThumbnail(head);

        message.channel.send({ embeds: [embed] }).catch(() => {
          message.channel.send({
            content: [
              `${emojis.error} An error occurred while getting the skin of the minecraft player!`,
              `Example: \`${prefix}skins <player>\``,
            ].join('\n'),
          });
        });
      }
    }
  },
};
