import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  aliases: ['kick-server'],
  permissions: ['KickMembers'],
  botpermissions: ['KickMembers'],
  category: 'administration',
  examples: ['kick [user] [reason]', 'kick @steve spamming'],
  premium: false,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const user = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]);
    const reason = args.slice(1).join(' ');
    if (!user)
      return message.channel.send({
        content: [
          `${emojis.error} **Please mention a user to kick** or provide his ID`,
          `> **Usage:** \`${prefix} kick <@user> [reason]\``,
        ].join('\n'),
      });

    if (user.id === message.author.id)
      return message.channel.send({
        content: [
          `${emojis.error} **You cannot kick yourself** that not is member of the server`,
          `> **Usage:** \`${prefix} kick <@user> [reason]\``,
        ].join('\n'),
      });

    if (user.id === client.user.id)
      return message.channel.send({
        content: [
          `${emojis.error} **You cannot kick me** is that funny? I am the bot of the server`,
          `> **Usage:** \`${prefix} kick <@user> [reason]\``,
        ].join('\n'),
      });

    if (user.id === message.guild?.ownerId)
      return message.channel.send({
        content: [
          `${emojis.error} **You cannot kick the server owner** is that funny?`,
          `> **Usage:** \`${prefix} kick <@user> [reason]\``,
        ].join('\n'),
      });

    if ((message.guild?.members.me?.roles.highest.position as any) < user.roles.highest.position) {
      return message.channel.send({
        content: [
          `${emojis.error} **I cannot kick this user because he has a higher role than me**`,
          `> **Usage:** \`${prefix} kick <@user> [reason]\``,
        ].join('\n'),
      });
    }

    if ((message.member?.roles.highest.position as any) < user.roles?.highest.position) {
      return message.channel.send({
        content: [
          `${emojis.error} **You cannot kick this user because he has a higher role than you**`,
          `> **Usage:** \`${prefix} kick <@user> [reason]\``,
        ].join('\n'),
      });
    }

    user
      .send({
        embeds: [
          new EmbedBuilder()
            .setTitle('Kick')
            .addFields(
              { name: 'User', value: `${user.user.tag} (\`${user.id}\`)`, inline: true },
              { name: 'Moderator', value: `${message.author.tag} (\`${message.author.id}\`)`, inline: true },
              { name: 'Reason', value: reason ? reason : 'No reason provided', inline: false },
              { name: 'Fetch Day', value: `<t:${Math.floor(Date.now() / 1000)}:D>`, inline: true }
            )
            .setColor('Green'),
        ],
      })
      .catch(() => {});
    user.kick(reason ? reason : 'No reason provided').catch(() => {});

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Kick - Command')
          .addFields(
            { name: 'User', value: `${user.user.tag} (\`${user.id}\`)`, inline: true },
            { name: 'Moderator', value: `${message.author.tag} (\`${message.author.id}\`)`, inline: true },
            { name: 'Reason', value: reason ? reason : 'No reason provided', inline: false },
            { name: 'Fetch Day', value: `<t:${Math.floor(Date.now() / 1000)}:D>`, inline: true }
          )
          .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
          .setColor('Green'),
      ],
    });
  },
};
