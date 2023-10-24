import { AttachmentBuilder, ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import client from 'aflb';

module.exports = {
  name: 'anime',
  description: 'commands anime fun actions',
  aliases: ['anime-post'],
  category: 'fun',
  premium: false,
  cooldown: 5000,
  examples: ['a!anime baka @user', 'a!anime angry', 'a!anime bite @user', 'a!anime bored', 'a!anime cuddle @user'],
  subcommands: ['all commands are in the form of: `a!anime <subcommand> <@user>`'],
  async execute(message: Message, args: string[], prefix: any) {
    const subcommands = args[0];
    const aflb = new client();

    switch (subcommands) {
      case 'baka':
        {
          const user = message.mentions.users.first() || message.guild?.members.cache.get(args[1])?.user;
          if (!user)
            return message.channel.send({
              content: [
                ` ${emojis.error} You have to mention someone in the command`,
                `**Example**: \`${prefix}baka @user\``,
              ].join('\n'),
            });

          if (user.id === message.author.id)
            return message.channel.send({
              content: [
                ` ${emojis.error} You can't interact with yourself`,
                `**Example**: \`${prefix}baka @user\``,
              ].join('\n'),
            });

          if (user.bot)
            return message.channel.send({
              content: [` ${emojis.error} You can't interact with bots`, `**Example**: \`${prefix}baka @user\``].join(
                '\n'
              ),
            });

          const a = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username} just cursed at  ${user.username}!`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(aflb.sfw.baka() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'angry':
        {
          const a = new EmbedBuilder()
            .setAuthor({ name: 'I am angry...', iconURL: message.author.displayAvatarURL() })
            .setImage(aflb.sfw.angry() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'bite':
        {
          const user = message.mentions.users.first() || message.guild?.members.cache.get(args[1])?.user;
          if (!user)
            return message.channel.send({
              content: [
                ` ${emojis.error} You have to mention someone in the command`,
                `**Example**: \`${prefix}bite @user\``,
              ].join('\n'),
            });

          if (user.id === message.author.id)
            return message.channel.send({
              content: [
                ` ${emojis.error} You can't interact with yourself`,
                `**Example**: \`${prefix}bite @user\``,
              ].join('\n'),
            });

          if (user.bot)
            return message.channel.send({
              content: [` ${emojis.error} You can't interact with bots`, `**Example**: \`${prefix}bite @user\``].join(
                '\n'
              ),
            });

          const a = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username} just bitten ${user.username}!`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(aflb.sfw.bite() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'bored':
        {
          const a = new EmbedBuilder()
            .setAuthor({
              name: "He's very bored right now",
              iconURL: message.author.displayAvatarURL({ forceStatic: true }),
            })
            .setImage(aflb.sfw.bored() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'cuddle':
        {
          const user = message.mentions.users.first() || message.guild?.members.cache.get(args[1])?.user;
          if (!user)
            return message.channel.send({
              content: [
                ` ${emojis.error} You have to mention someone in the command`,
                `**Example**: \`${prefix}cuddle @user\``,
              ].join('\n'),
            });

          if (user.id === message.author.id)
            return message.channel.send({
              content: [
                ` ${emojis.error} You can't interact with yourself`,
                `**Example**: \`${prefix}cuddle @user\``,
              ].join('\n'),
            });

          if (user.bot)
            return message.channel.send({
              content: [` ${emojis.error} You can't interact with bots`, `**Example**: \`${prefix}cuddle @user\``].join(
                '\n'
              ),
            });

          const a = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username} to hugged ${user.username}!`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(aflb.sfw.cuddle() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
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
          const texto = args.join(' ');
          if (texto)
            return message.reply({
              content: [
                ` ${emojis.error} You have to write something in the command`,
                `**Example**: \`${prefix}facts <text>\``,
              ].join('\n'),
            });

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
      case 'fight':
        {
          const user = message.mentions.users.first() || message.guild?.members.cache.get(args[1])?.user;
          if (!user)
            return message.channel.send({
              content: [
                ` ${emojis.error} You have to mention someone in the command`,
                `**Example**: \`${prefix}fight @user\``,
              ].join('\n'),
            });

          if (user.id === message.author.id)
            return message.channel.send({
              content: [
                ` ${emojis.error} You can't interact with yourself`,
                `**Example**: \`${prefix}fight @user\``,
              ].join('\n'),
            });

          if (user.bot)
            return message.channel.send({
              content: [` ${emojis.error} You can't interact with bots`, `**Example**: \`${prefix}fight @user\``].join(
                '\n'
              ),
            });

          const a = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username} is fighting with ${user.username}!`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(aflb.sfw.fight() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'happy':
        {
          const a = new EmbedBuilder()
            .setAuthor({
              name: "I'm very happy right now",
              iconURL: message.author.displayAvatarURL({ forceStatic: true }),
            })
            .setImage(aflb.sfw.happy() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'love':
        {
          const user = message.mentions.users.first() || message.guild?.members.cache.get(args[1])?.user;
          if (!user)
            return message.channel.send({
              content: [
                ` ${emojis.error} You have to mention someone in the command`,
                `**Example**: \`${prefix}love @user\``,
              ].join('\n'),
            });

          if (user.id === message.author.id)
            return message.channel.send({
              content: [
                ` ${emojis.error} You can't interact with yourself`,
                `**Example**: \`${prefix}love @user\``,
              ].join('\n'),
            });

          if (user.bot)
            return message.channel.send({
              content: [` ${emojis.error} You can't interact with bots`, `**Example**: \`${prefix}love @user\``].join(
                '\n'
              ),
            });

          const a = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username} gives his love to ${user.username}!`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(aflb.sfw.love() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
        }
        break;
      case 'kill':
        {
          const user = message.mentions.users.first() || message.guild?.members.cache.get(args[1])?.user;
          if (!user)
            return message.channel.send({
              content: [
                ` ${emojis.error} You have to mention someone in the command`,
                `**Example**: \`${prefix}kill @user\``,
              ].join('\n'),
            });

          if (user.id === message.author.id)
            return message.channel.send({
              content: [
                ` ${emojis.error} You can't interact with yourself`,
                `**Example**: \`${prefix}kill @user\``,
              ].join('\n'),
            });

          if (user.bot)
            return message.channel.send({
              content: [` ${emojis.error} You can't interact with bots`, `**Example**: \`${prefix}kill @user\``].join(
                '\n'
              ),
            });

          const a = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username} just killed ${user.username}!`,
              iconURL: `${message.author.avatarURL({ forceStatic: true })}`,
            })
            .setImage(aflb.sfw.kill() as any);
          message.channel.send({ embeds: [a] }).catch((e) => {
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
