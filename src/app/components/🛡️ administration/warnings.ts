import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/users';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'warnings',
  description: 'Apply sanctions to discord server users',
  aliases: ['warns'],
  category: 'administration',
  premium: false,
  permissions: ['BanMembers', 'UseApplicationCommands'],
  botpermissions: ['BanMembers', 'UseApplicationCommands'],
  cooldown: 20,
  examples: [
    'warnings list [user]',
    'warnings add @Drago [reason]',
    'warnings remove @Drago [warn_id]',
    'warnings all [user]',
  ],
  subcommands: [
    'warnings list <user>',
    'warnings add <user> <reason>',
    'warnings remove <user> <warn_id>',
    'warnings all <user>',
  ],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const subcommands = args[0];
      switch (subcommands) {
        case 'list':
          {
            const user =
              message.guild?.members.cache.get(args[1]) ||
              message.mentions.members?.filter((m) => m.guild.id == message.guild?.id).first() ||
              message.member;
            let data = await model.findOne({ userid: user?.id });
            if (data?.warnings.length == 0)
              return message.reply({
                content: [
                  `${emojis.correct} **\`${user?.user.tag}\` has no warnings on the server!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });

            let warnings = data?.warnings
              .map((warn: any, i: any) => {
                return `**${i}** - **Reason:** \`\`\`yml\n${warn.reason}\`\`\` **Moderator:** <@${warn.author}>`;
              })
              .join('\n\n');

            message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`${emojis.correct} Warnings List`)
                  .setDescription(warnings as any)
                  .setColor('Green')
                  .setTimestamp(),
              ],
            });
          }
          break;
        case 'add':
          {
            let user =
              message.guild?.members.cache.get(args[1]) ||
              message.mentions.members?.filter((m) => m.guild.id == message.guild?.id).first();
            if (!user)
              return message.reply({
                content: [
                  `${emojis.error} **The specified user was not found!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });
            let reason = args.slice(2).join(' ');
            if (!reason) reason = `No reason specified!`;
            if (user.id == message.guild?.ownerId)
              return message.reply({
                content: [
                  `${emojis.error} **You cannot warn the Server OWNER!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });
            if ((message.guild?.members.me?.roles.highest.position as any) > user.roles.highest.position) {
              if ((message.member?.roles.highest.position as any) > user.roles.highest.position) {
                user
                  .send({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle(`You have been warned in __${message.guild?.name}__`)
                        .setDescription(`**Reason:** \n\`\`\`yml\n${reason}\`\`\``)
                        .setColor('Green')
                        .setTimestamp(),
                    ],
                  })
                  .catch(() => {
                    message.reply({
                      content: [
                        `${emojis.error} **The user has disabled their DMs!**`,
                        `**Use: **\`${prefix}warnings add <user> <reason>\``,
                      ].join('\n'),
                    });
                  });

                message.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`${emojis.correct} User Warned`)
                      .setDescription(`**Successfully warned \`${user.user.tag}\` *(\`${user.id}\`)* on the server!**`)
                      .addFields({ name: `Reason`, value: `\n\`\`\`yml\n${reason}\`\`\`` })
                      .setColor('Green')
                      .setTimestamp(),
                  ],
                });
                let warn_object = {
                  date: Date.now(),
                  author: message.author.id,
                  reason: reason,
                };

                const data = await model.findOne({ userid: user.id });
                if (!data) {
                  let newData = new model({
                    userid: user.id,
                    warnings: [warn_object],
                  });
                  newData.save();
                }

                await model.findOneAndUpdate(
                  { userid: user.id },
                  {
                    $push: {
                      warnings: warn_object,
                    },
                  }
                );
              } else {
                return message.reply({
                  content: [
                    `${emojis.error} **Your role is below the user you want to warn!**`,
                    `**Use: **\`${prefix}warnings add <user> <reason>\``,
                  ].join('\n'),
                });
              }
            } else {
              return message.reply({
                content: [
                  `${emojis.error} **My role is below the user you want to warn!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });
            }
          }
          break;
        case 'remove':
          {
            let user =
              message.guild?.members.cache.get(args[1]) ||
              message.mentions.members?.filter((m) => m.guild.id == message.guild?.id).first();
            if (!user)
              return message.reply({
                content: [
                  `${emojis.error} **The specified user was not found!**`,
                  `**Use: **\`${prefix}warnings remove <user> <warn_id>\``,
                ].join('\n'),
              });
            let warn_id = args[2];
            let data = await model.findOne({ userid: user.id });
            if (data?.warnings.length === 0)
              return message.reply({
                content: [
                  `${emojis.error} **The specified user has no warnings!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });
            if (!warn_id)
              return message.reply({
                content: [
                  `${emojis.error} **You must specify the ID of the warning you want to remove!**`,
                  `**Use: **\`${prefix}warnings remove <user> <warn_id>\``,
                ].join('\n'),
              });
            if (isNaN(Number(warn_id)) || Number(warn_id) < 0)
              return message.reply({
                content: [
                  `${emojis.error} **The specified ID is not valid!**`,
                  `**Use: **\`${prefix}warnings remove <user> <warn_id>\``,
                ].join('\n'),
              });
            if (data?.warnings[Number(warn_id)] == undefined)
              return message.reply({
                content: [
                  `${emojis.error} **The specified ID is not valid!**`,
                  `**Use: **\`${prefix}warnings remove <user> <warn_id>\``,
                ].join('\n'),
              });

            if (user.id == message.guild?.ownerId)
              return message.reply({
                content: [
                  `${emojis.error} **You cannot warn the Server OWNER!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });
            if ((message.guild?.members.me?.roles.highest.position as any) > user.roles.highest.position) {
              if ((message.member?.roles.highest.position as any) > user.roles.highest.position) {
                message.channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`${emojis.correct} Warn Removed`)
                      .setDescription(`**Successfully removed warn with ID \`${warn_id}\` from \`${user.user.tag}\`!**`)
                      .setColor(client.color)
                      .setTimestamp(),
                  ],
                });
                data.warnings.splice(Number(warn_id), 1);
                data.save();
              } else {
                return message.reply({
                  content: [
                    `${emojis.error} **Your role is below the user you want to warn!**`,
                    `**Use: **\`${prefix}warnings add <user> <reason>\``,
                  ].join('\n'),
                });
              }
            } else {
              return message.reply({
                content: [
                  `${emojis.error} **My role is below the user you want to warn!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });
            }
          }
          break;
        case 'all':
          {
            const user = message.mentions.members?.first() || message.guild?.members.cache.get(args[1]);
            if (!user)
              return message.channel.send({
                content: [
                  `${emojis.error} **The specified user was not found!**`,
                  `**Use: **\`${prefix}warnings all <user>\``,
                ].join('\n'),
              });
            let data = await model.findOne({ userid: user.id });
            if (data?.warnings.length === 0)
              return message.reply({
                content: [
                  `${emojis.error} **The specified user has no warnings!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });

            if ((message.guild?.members.me?.roles.highest.position as any) > user.roles.highest.position) {
              if ((message.member?.roles.highest.position as any) > user.roles.highest.position) {
                await model.findOneAndDelete({
                  userid: user.id,
                });

                message.channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`${emojis.correct} All Warns Removed`)
                      .setDescription(`**Successfully removed all warns from \`${user.user.tag}\`!**`)
                      .setColor(client.color)
                      .setTimestamp(),
                  ],
                });
              } else {
                return message.reply({
                  content: [
                    `${emojis.error} **Your role is below the user you want to warn!**`,
                    `**Use: **\`${prefix}warnings add <user> <reason>\``,
                  ].join('\n'),
                });
              }
            } else {
              return message.reply({
                content: [
                  `${emojis.error} **My role is below the user you want to warn!**`,
                  `**Use: **\`${prefix}warnings add <user> <reason>\``,
                ].join('\n'),
              });
            }
          }
          break;
      }
    } catch (err) {
      logWithLabel('error', `The following error occurred while executing the 'warnings' command: ${err}`);
      message.channel.send({
        content: [
          `${emojis.error} An error occurred while executing the command, please try again later`,
          `**Error Message:** \`${err}\``,
        ].join('\n'),
      });
    }
  },
};
