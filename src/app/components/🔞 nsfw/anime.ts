import { AttachmentBuilder, ChannelType, EmbedBuilder, Message } from 'discord.js';
import { animeApi } from '../../../functions/tools/function_request';
import emojis from '../../../../config/emojis.json';

module.exports = {
  name: 'anime',
  description: 'Execute fun and entertainment commands',
  aliases: ['anime-fun', 'fun'],
  category: 'nsfw',
  premium: false,
  examples: [
    `anime alert [text]`,
    `anime biden [text]`,
    `anime cringe`,
    `anime facts [text]`,
    `anime handhold [user]`,
  ],
  subcommands: [
    "anime alert [text]",
    "anime biden [text]",
    "anime cringe",
    "anime facts [text]",
    "anime handhold [user]",
  ],
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommands = args[0];
    switch (subcommands) {
      case 'alert':
        {
          const texto = args.slice(1).join(' ');
          if (!texto)
            return message.channel.send(
              [
                `${emojis.error} You must enter a text to generate the image`,
                `Example: \`${prefix}anime alert Hello World\``,
              ].join('\n')
            );

          const attachment = new AttachmentBuilder(`https://api.popcat.xyz/alert?text=${encodeURIComponent(texto)}`, {
            name: 'image.png',
          });

          message.channel.send({ files: [attachment] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'biden':
        {
          const texto = args.slice(1).join(' ');
          if (!texto)
            return message.reply(
              [
                `${emojis.error} You must enter a text to generate the image`,
                `Example: \`${prefix}anime biden Hello World\``,
              ].join('\n')
            );

          const attachment = new AttachmentBuilder(`https://api.popcat.xyz/biden?text=${encodeURIComponent(texto)}`, {
            name: 'image.png',
          });

          message.channel.send({ files: [attachment] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'cringe':
        {
          const data = await animeApi('cringe');
          const prettyCringe = new EmbedBuilder()
            .setColor('Grey')
            .setAuthor({
              name: `${message.author.username} thinks that's pretty embarrassing.`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(data)
            .setTimestamp();
          message.reply({ embeds: [prettyCringe] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'facts':
        {
          const texto = args.slice(1).join(' ');
          if (texto)
            return message.reply(
              [
                `${emojis.error} You must enter a text to generate the image`,
                `Example: \`${prefix}anime facts Hello World\``,
              ].join('\n')
            );

          const attachment = new AttachmentBuilder(`https://api.popcat.xyz/facts?text=${encodeURIComponent(texto)}`, {
            name: 'image.png',
          });

          message.channel.send({ files: [attachment] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'handhold':
        {
          const data = await animeApi('handhold');
          const user = message.mentions.users.first();
          if (!user)
            return message.channel.send(
              [
                `${emojis.error} You must mention a user to interact with.`,
                `Example: \`${prefix}anime handhold @user\``,
              ].join('\n')
            );

          if (user.id === message.author.id)
            return message.channel.send(
              [`${emojis.error} You can't interact with yourself.`, `Example: \`${prefix}anime handhold @user\``].join(
                '\n'
              )
            );

          if (user.id === client.user.id)
            return message.channel.send(
              [
                `${emojis.error} You can't interact with me that's too sad.`,
                `Example: \`${prefix}anime handhold @user\``,
              ].join('\n')
            );

          if (user.bot)
            return message.channel.send(
              [`${emojis.error} You can't interact with bots.`, `Example: \`${prefix}anime handhold @user\``].join('\n')
            );

          const lonerhld = new EmbedBuilder()
            .setColor('Grey')
            .setAuthor({
              name: `${message.author.username} is holding hands with ${client.user.username}!`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(data)
            .setTimestamp();

          if (user.id === message.author.id)
            return message.reply({ embeds: [lonerhld] }).catch((e) => {
              message.reply({
                content: [
                  ` ${emojis.error} An error occurred while executing the command, try again later`,
                  `plase report this error to the support server.`,
                ].join('\n'),
              });
            });

          const handholdEmbed = new EmbedBuilder()
            .setColor('Grey')
            .setAuthor({
              name: `${message.author.username} is holding hands with ${user.username}!`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(data)
            .setTimestamp();
          message.reply({ embeds: [handholdEmbed] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
    }
  },
};
