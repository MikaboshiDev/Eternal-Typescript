import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';

module.exports = {
  name: 'ban',
  description: 'Ban users from the discord server',
  aliases: ['banish'],
  category: 'administration',
  permissions: ['BanMembers', 'UseApplicationCommands'],
  botpermissions: ['BanMembers', 'UseApplicationCommands'],
  premium: false,
  cooldown: 1000,
  examples: ['ban add @user', 'ban remove @user', 'ban list', 'ban add @user [reason]', 'ban remove @user [reason]'],
  subcommands: ['ban add [user] [reason]', 'ban remove [user]', 'ban list'],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommands = args[0];
    switch (subcommands) {
      case 'add':
        {
          const user = message.mentions.members?.first() || message.guild?.members.cache.get(args[1]);
          if (!user)
            return message.channel.send({
              content: [
                `${emojis.error} You must mention a user to ban them at the server!`,
                `**Example:** \`${prefix}ban add @user\``,
              ].join('\n'),
            });

          const reason = args.slice(2).join(' ');
          if (!reason)
            return message.channel.send({
              content: [
                `${emojis.error} You must specify a reason for the ban is required!`,
                `**Example:** \`${prefix}ban add @user\``,
              ].join('\n'),
            });

          await baneable(user, message, prefix);
          user.ban({ reason: reason }).catch(() => {
            return message.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Add Ban - Error')
                  .setDescription(
                    [
                      `**User:** ${user.user.tag}`,
                      `**Reason:** ${reason}`,
                      `**Moderator:** ${message.author.tag}`,
                      `**Channel:** ${message.channel}`,
                    ].join('\n')
                  )
                  .setColor('Red'),
              ],
            });
          });
        }
        break;
      case 'remove':
        {
          const user = args[1];
          if (!user)
            return message.channel.send({
              content: [
                `${emojis.error} You must specify a user to unban!`,
                `**Example:** \`${prefix}ban remove @user\``,
              ].join('\n'),
            });

          message.guild?.bans.fetch().then((bans) => {
            if (bans.size == 0)
              return message.reply({
                content: [
                  `${emojis.error} The server currently has no banned users. It's a pity`,
                  `**Error:** \`No banned users\``,
                  `**Example:** ${prefix}ban remove [user]`,
                ].join('\n'),
              });
            let User = bans.find((b) => b.user.id == user);
            if (!User)
              return message.reply({
                content: [
                  `${emojis.error} The user is currently not banned on the server you are interacting with`,
                  `**Example:** ${prefix}ban remove [user]`,
                ].join('\n'),
              });
            message.guild?.members.unban(User.user);
          });

          const embed = new EmbedBuilder()
            .setTitle(`${emojis.error} User Unbanned Successfully`)
            .setDescription(`\`${user}\` has been unbanned from the server!`)
            .setFooter({ text: `${message.guild?.name}` })
            .setColor('Green')
            .setTimestamp();

          message.channel.send({ embeds: [embed] });
        }
        break;
      case 'list': {
        message.guild?.bans.fetch().then((bans) => {
          if (bans.size == 0)
            return message.reply({
              content: [
                `${emojis.error} The server currently has no banned users. It's a pity`,
                `**Error:** \`No banned users\``,
                `**Example:** ${prefix}ban list`,
              ].join('\n'),
            });
          let bUser = Array.from(bans)
            .map(
              ([index, ban]) =>
                `\`No. ${index + 1}\` **${ban.user.tag}**\n**Reason:** ${ban.reason ? ban.reason : 'No reason'}`
            )
            .join('\n');

          const embed = new EmbedBuilder()
            .setTitle(`${emojis.error} Banned Users`)
            .setDescription(bUser.slice(0, 2048))
            .setFooter({ text: `${message.guild?.name}` })
            .setColor('Green')
            .setTimestamp();
          message.channel.send({ embeds: [embed] });
        });
        break;
      }
    }
  },
};

function baneable(user: any, message: any, prefix: any) {
  if (user.id === message.guild?.ownerId)
    return message.channel.send({
      content: [
        `${emojis.error} You can't ban the owner of the server !`,
        `**Example:** \`${prefix}ban add @user\``,
      ].join('\n'),
    });

  if ((message.guild?.members.me?.roles.highest.position as any) < user.roles.highest.position)
    return message.channel.send({
      content: [
        `${emojis.error} My highest role is lower than the user's highest role`,
        `**Example:** \`${prefix}ban add @user\``,
      ].join('\n'),
    });

  if ((message.member?.roles.highest.position as any) < user.roles.highest.position)
    return message.channel.send({
      content: [
        `${emojis.error} Your highest role is lower than the user's highest role`,
        `**Example:** \`${prefix}ban add @user\``,
      ].join('\n'),
    });

  if (!user.bannable)
    return message.channel.send({
      content: [
        `${emojis.error} I can't ban ${user.user.tag} because he has a higher role than me`,
        `**Example:** \`${prefix}ban add @user\``,
      ].join('\n'),
    });
}
