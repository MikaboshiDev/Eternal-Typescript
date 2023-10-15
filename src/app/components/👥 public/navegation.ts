import { AttachmentBuilder, ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';

module.exports = {
  name: 'navegation',
  description: 'Execute image management commands or other possible configurations',
  aliases: ['browser', 'navegator'],
  examples: [
    "navegation [subcommand] [parameters]",
    "navegation [options] [choice] [value]",
    "navegation [value]"
  ],
  category: 'public',
  premium: false,
  subcommands: [
    "navegation search <search term>",
    "navegation screenshot <domain>",
    "navegation phcomment <@user | user ID> <text>",
    "navegation tweet <@user | user ID> <text>",
  ],
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'search':
        {
          const searchTerm = args.slice(1).join(' ');
          if (!searchTerm)
            return message.reply({
              content: [
                `${emojis.error} **${message.author.username}**, You must enter a search term`,
                `**Example:** \`${prefix}youtube search <search term>\``,
              ].join('\n'),
            });

          const site = `https://www.youtube.com/results?search_query=${args.slice(1).join(' ')}`;
          try {
            const msg = await message.channel.send({
              content: [
                `${emojis.network} **${message.author.username}**, Searching. This may take several minutes`,
                `**Search Term:** \`${searchTerm}\``,
              ].join('\n'),
            });

            const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
            if (!body) {
              return message.channel.send({
                content: [
                  `${emojis.error} **${message.author.username}**, An unexpected error occurred in the search`,
                  `**Search Term:** \`${searchTerm}\``,
                ].join('\n'),
              });
            }
            let attachment = new AttachmentBuilder(body as any, { name: 'yt-search.png' });
            return message.channel.send({
              embeds: [new EmbedBuilder().setColor('Random').setImage('attachment://yt-search.png')],
              files: [attachment],
            });
          } catch (err: any) {
            if (err?.status === 404)
              return message.channel.send({
                content: [
                  `${emojis.error} **${message.author.username}**, No results found`,
                  `**Search Term:** \`${searchTerm}\``,
                ].join('\n'),
              });
            message.reply({
              content: [
                `${emojis.error} **${message.author.username}**, An unexpected error occurred in the search (error code 404)`,
                `**Search Term:** \`${searchTerm}\``,
              ].join('\n'),
            });
          }
        }
        break;
      case 'screenshot':
        {
          const domain = args.slice(1).join(' ');
          const forbiddenDomains = [
            'xnxx.com',
            'pornhub.com',
            'xnxx',
            'pornhub',
            'sexmex',
            'brazzers',
            'xvideos',
            'xvideo',
            'xvideo.com',
            'xvideos.com',
            'xhamster',
            'xhamster.com',
            'xhamst',
          ];
          if (forbiddenDomains.some((word) => message.content.includes(word)))
            return message.reply({
              content: [
                `${emojis.error} **${message.author.username}**, You cannot search this domain in the browser for security reasons`,
                `**Search Term:** \`${domain}\``,
              ].join('\n'),
            });

          if (!args.length)
            return message.reply({
              content: [
                `${emojis.error} You must provide a domain to search in the server`,
                `**Usage Example:** \`${prefix}yt screenshot discord.com\``,
              ].join('\n'),
            });
          const site = `https://www.${args.slice(1).join(' ')}`;
          try {
            const msg = await message.channel.send({
              content: [
                `${emojis.network} **${message.author.username}**, Searching. This may take several minutes`,
                `**Search Term:** \`${domain}\``,
              ].join('\n'),
            });

            const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
            let attachment = new AttachmentBuilder(body as any, { name: 'screenshot.png' });
            return message.channel.send({
              embeds: [new EmbedBuilder().setColor('Random').setImage('attachment://screenshot.png')],
              files: [attachment],
            });
          } catch (err: any) {
            if (err.status === 404)
              return message.channel.send({
                content: [
                  `${emojis.error} **${message.author.username}**, No results found`,
                  `**Search Term:** \`${domain}\``,
                ].join('\n'),
              });

            message.reply({
              content: [
                `${emojis.error} **${message.author.username}**, An unexpected error occurred in the search (error code 404)`,
                `**Search Term:** \`${domain}\``,
              ].join('\n'),
            });
          }
        }
        break;
      case 'phcomment':
        {
          const user = message.mentions.users.first();
          if (!user)
            return message.channel.send({
              content: [
                `${emojis.error} **${message.author.username}**, You must mention a user or provide their ID`,
                `**Usage Example:** \`${prefix}yt phcomment @${message.author.username} Hello World\``,
              ].join('\n'),
            });

          const text = args.slice(2).join(' ');
          if (!text)
            return message.channel.send({
              content: [
                `${emojis.error} **${message.author.username}**, You must provide text for the comment`,
                `**Usage Example:** \`${prefix}yt phcomment @${message.author.username} Hello World\``,
              ].join('\n'),
            });

          try {
            let res = await fetch(
              `https://nekobot.xyz/api/imagegen?type=phcomment&username=${user.username}&image=${user.displayAvatarURL({
                extension: 'png',
                size: 512,
              })}&text=${text}`
            );
            let json = await res.json();
            let attachment = new AttachmentBuilder(json.message, { name: 'phcomment.png' });

            message.channel.send({
              embeds: [new EmbedBuilder().setColor('Random').setImage('attachment://phcomment.png')],
              files: [attachment],
            });
          } catch (e) {
            console.log(e);
            message.reply({
              content: [
                `${emojis.error} **${message.author.username}**, An unexpected error occurred in the search (error code 404)`,
                `**Search Term:** \`${text}\``,
              ].join('\n'),
            });
          }
        }
        break;
      case 'tweet':
        {
          let user = message.mentions.users.first() || client.users.cache.get(args[1]);
          if (!user)
            return message.channel.send({
              content: [
                `${emojis.error} **${message.author.username}**, You must mention a user or provide their ID`,
                `**Usage Example:** \`${prefix}yt phcomment @${message.author.username} Hello World\``,
              ].join('\n'),
            });

          let text = args.slice(2).join(' ');
          if (!text)
            return message.channel.send({
              content: [
                `${emojis.error} **${message.author.username}**, You must provide text for the tweet`,
                `**Usage Example:** \`${prefix}yt phcomment @${message.author.username} Hello World\``,
              ].join('\n'),
            });

          try {
            let res = await fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user.username}&text=${text}`);
            let json = await res.json();
            let attachment = new AttachmentBuilder(json.message, { name: 'tweet.png' });

            await message.channel.send({
              embeds: [new EmbedBuilder().setColor('Random').setImage('attachment://tweet.png')],
              files: [attachment],
            });
          } catch (e) {
            message.reply({
              content: [
                `${emojis.error} **${message.author.username}**, An unexpected error occurred in the search (error code 404)`,
                `**Search Term:** \`${text}\``,
              ].join('\n'),
            });
          }
        }
        break;
    }
  },
};
