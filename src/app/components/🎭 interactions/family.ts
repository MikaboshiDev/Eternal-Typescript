import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import Schema from '../../../models/interactions/family';

module.exports = {
  name: 'family',
  description: 'Commands where you can interpret a family, get married, divorce and more functions',
  aliases: ['family-cmd'],
  category: 'interactions',
  premium: false,
  cooldown: 1000,
  examples: ['family [subcommand] [name]', 'family adopt [name]'],
  subcommands: [
    'family adopt [target]',
    'family divorce [target]',
    'family status [target]',
    'family propose [target]',
  ],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'adopt':
        {
          const target = message.mentions.members?.first() || message.guild?.members.cache.get(args[1]);
          if (!target || target.id === message.author.id)
            return message.channel.send({
              content: [`${emojis.error} You must mention a member to adopt them`, `> \`${prefix}adopt [user]\``].join(
                '\n'
              ),
            });

          if (target.user.bot)
            return message.channel.send({ content: `${emojis.error} You cannot adopt a bot :pensive:` });
          const familyMember = await Schema.findOne({
            Guild: message.guild?.id,
            User: target.id,
            Parent: message.author.id,
          });
          const familyMember2 = await Schema.findOne({
            Guild: message.guild?.id,
            User: message.author.id,
            Parent: target.id,
          });
          const familyMember3 = await Schema.findOne({
            Guild: message.guild?.id,
            User: message.author.id,
            Partner: target.id,
          });

          if (familyMember || familyMember2 || familyMember3)
            return message.reply({
              content: [
                `${emojis.error} You are already a family member of <@${target.id}>!`,
                `> \`${prefix}divorce\``,
              ].join('\n'),
            });

          const checkAdopt = await Schema.findOne({ Guild: message.guild?.id, Children: target.user.username });
          if (checkAdopt)
            return message.channel.send({
              content: [
                `${emojis.error} ${target.user.username} is already adopted by another family!`,
                `> \`${prefix}divorce\``,
              ].join('\n'),
            });

          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('adopt_yes').setEmoji('✅').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('adopt_deny').setEmoji('❌').setStyle(ButtonStyle.Danger)
          );

          message.channel.send({
            content: [
              `${message.author} has ${target} asked to adopt him! \n${target} click on one of the buttons`,
              `> \`${prefix}adopt [user]\``,
            ].join('\n'),
          });

          const filter = (i: { user: { id: string } }) => i.user.id === target.id;

          message.channel
            .awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 })
            .then(async (i) => {
              if (i.customId == 'adopt_yes') {
                const data = await Schema.findOne({ Guild: message.guild?.id, User: message.author.id });
                if (data) {
                  data.Children.push(target.user.username);
                  data.save();
                } else {
                  new Schema({
                    Guild: message.guild?.id,
                    User: message.author.id,
                    Children: target.user.username,
                  }).save();
                }

                const data2 = await Schema.findOne({ Guild: message.guild?.id, User: target.id });
                if (data2) {
                  data2.Parent.push(message.author.username);
                  data2.save();
                } else {
                  new Schema({
                    Guild: message.guild?.id,
                    User: target.id,
                    Parent: message.author.username,
                  }).save();
                }

                message.channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`👪・Adoption - Approved`)
                      .setDescription(`${message.author} is now the proud parent of ${target}! 🎉`)
                      .setColor('Green')
                      .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                      }),
                  ],
                });
              }

              if (i.customId == 'adopt_deny') {
                message.channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`👪・Adoption - Denied`)
                      .setDescription(`${target} don't want to be adopted by ${message.author}`)
                      .setColor('Green')
                      .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                      }),
                  ],
                });
              }
            })
            .catch(() => {
              message.channel.send({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`👪・Adoption - Denied`)
                    .setDescription(`${target} has not answered anything! The adoption is canceled`)
                    .setColor('Green')
                    .setFooter({
                      text: message.author.tag,
                      iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                    }),
                ],
              });
            });
        }
        break;
      case 'divorse':
        {
          const target = message.mentions.members?.first() || message.guild?.members.cache.get(args[1]);
          if (!target)
            return message.channel.send({
              content: [
                `${emojis.error} You must mention a member to divorse with them`,
                `> \`${prefix}propose <@user>\``,
              ].join('\n'),
            });

          if (target.user.bot)
            return message.channel.send({
              content: [
                `${emojis.error} You cannot divorse with a bot :pensive:`,
                `> \`${prefix}propose <@user>\``,
              ].join('\n'),
            });

          if (target.id === message.author.id)
            return message.channel.send({
              content: [
                `${emojis.error} You cannot divorse with yourself :pensive:`,
                `> \`${prefix}propose <@user>\``,
              ].join('\n'),
            });

          if (target.user.id === client.user.id)
            return message.channel.send({
              content: [
                `${emojis.error} I'm sorry, but I'm already married to <@${client.config.ownerID}> :pensive:`,
                `> \`${prefix}propose <@user>\``,
              ].join('\n'),
            });

          const data = await Schema.findOne({
            Guild: message.guild?.id,
            User: message.author.id,
            Partner: target.id,
          });
          if (data) {
            const data2 = await Schema.findOne({ Guild: message.guild?.id, User: target.id });
            if (data2) {
              data2.Partner = '';
              data2.save();
            }

            data.Partner = '';
            data.save();

            message.channel.send({
              embeds: [
                new EmbedBuilder().setTitle('👰・Divorced').setDescription(`You have divorced with <@${target.id}>`),
              ],
            });
          } else {
            message.reply({
              content: [
                `${emojis.error} You are not married with <@${target.id}>`,
                `> \`${prefix}marry <@user>\``,
              ].join('\n'),
            });
          }
        }
        break;
      case 'status':
        {
          const target =
            message.mentions.members?.first() || message.guild?.members.cache.get(args[1]) || message.member;
          const data = await Schema.findOne({ Guild: message.guild?.id, User: target?.id });

          message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle('👪・Family')
                .setDescription(
                  data?.Partner ? `You are married with <@${data?.Partner}>` : `You are not married with anyone`
                )
                .addFields(
                  { name: '👰・Partner', value: data?.Partner ? `<@${data?.Partner}>` : 'None' },
                  {
                    name: '👪・Children',
                    value: data?.Children.length ? data?.Children.map((x: any) => `<@${x}>`).join(', ') : 'None',
                  },
                  {
                    name: '👨‍👩‍👧‍👦・Parent',
                    value: data?.Parent.length ? data?.Parent.map((x: any) => `<@${x}>`).join(', ') : 'None',
                  }
                )
                .setColor('Purple')
                .setFooter({
                  text: message.author.tag,
                  iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                }),
            ],
          });
        }
        break;
      case 'propose':
        {
          const target = message.mentions.members?.first() || message.guild?.members.cache.get(args[1]);
          if (!target)
            return message.channel.send({
              content: [
                `${emojis.error} You must mention a member to propose to them`,
                `> \`${prefix}propose [user]\``,
              ].join('\n'),
            });

          if (target.user.bot)
            return message.channel.send({
              content: [`${emojis.error} You cannot propose to a bot :pensive:`, `> \`${prefix}propose [user]\``].join(
                '\n'
              ),
            });

          if (target.id === message.author.id)
            return message.channel.send({
              content: [
                `${emojis.error} You cannot propose to yourself :pensive:`,
                `> \`${prefix}propose [user]\``,
              ].join('\n'),
            });

          if (target.user.id === client.user.id)
            return message.channel.send({
              content: [
                `${emojis.error} I'm sorry, but I'm already married to <@${client.config.ownerID}> :pensive:`,
                `> \`${prefix}propose [user]\``,
              ].join('\n'),
            });

          const data = await Schema.findOne({ Guild: message.guild?.id, User: message.author.id });
          if (data) {
            message.channel.send({
              content: [
                `${emojis.error} You are already married to <@${data.Partner}>!`,
                `> \`${prefix}divorce\``,
              ].join('\n'),
            });
          } else {
            const data = await Schema.findOne({ Guild: message.guild?.id, Partner: target.id });
            if (data) {
              message.channel.send({
                content: [
                  `${emojis.error} <@${target.id}> is already married to <@${data.Partner}>!`,
                  `> \`${prefix}divorce\``,
                ].join('\n'),
              });
            } else {
              const data = await Schema.findOne({
                Guild: message.guild?.id,
                User: target.id,
                Parent: message.author.id,
              });
              if (data) {
                message.channel.send({
                  content: [`${emojis.error} You cannot marry a family member!`, `> \`${prefix}divorce\``].join('\n'),
                });
              } else {
                const data = await Schema.findOne({
                  Guild: message.guild?.id,
                  User: message.author.id,
                  Parent: target.id,
                });
                if (data) {
                  message.channel.send({
                    content: [`${emojis.error} You cannot marry a family member!`, `> \`${prefix}divorce\``].join('\n'),
                  });
                } else {
                  const data = await Schema.findOne({ Guild: message.guild?.id, User: message.author?.id });
                  if (data) {
                    if (data.Children.includes(target.id)) {
                      message.channel.send({
                        content: [`${emojis.error} You cannot marry a family member!`, `> \`${prefix}divorce\``].join(
                          '\n'
                        ),
                      });
                    } else {
                      propose();
                    }
                  } else {
                    propose();
                  }
                }
              }
            }
          }

          function propose() {
            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId('propose_accept').setEmoji('✅').setStyle(ButtonStyle.Success),

              new ButtonBuilder().setCustomId('propose_deny').setEmoji('❌').setStyle(ButtonStyle.Danger)
            );

            message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`👰・Marriage proposal`)
                  .setDescription(
                    `${message.author} has asked ${target} to propose him! \n${target} click on one of the buttons`
                  )
                  .setColor('Random')
                  .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                  })
                  .setTimestamp(),
              ],
              components: [row as any],
            });

            const filter = (i: { user: { id: string | undefined } }) => i.user.id === target?.id;

            message.channel
              .awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 })
              .then(async (i) => {
                if (i.customId == 'propose_accept') {
                  Schema.findOne(
                    { Guild: message.guild?.id, User: message.author.id },
                    async (err: any, data: { Partner: string; save: () => void }) => {
                      if (data) {
                        data.Partner = target ? target.id : '';
                        data.save();
                      } else {
                        new Schema({
                          Guild: message.guild?.id,
                          User: message.author.id,
                          Partner: target ? target.id : '',
                        }).save();
                      }
                    }
                  );

                  Schema.findOne(
                    { Guild: message.guild?.id, User: target ? target.id : ' ' },
                    async (err: any, data: { Partner: string; save: () => void }) => {
                      if (data) {
                        data.Partner = message.author.id;
                        data.save();
                      } else {
                        new Schema({
                          Guild: message.guild?.id,
                          User: target ? target.id : '',
                          Partner: message.author.id,
                        }).save();
                      }
                    }
                  );

                  message.channel.send({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle(`👰・Marriage proposal - Approved`)
                        .setDescription(`${message.author} and ${target} are now married! 👰🎉`)
                        .setColor('Random')
                        .setFooter({
                          text: message.author.tag,
                          iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                        })
                        .setTimestamp(),
                    ],
                  });
                }

                if (i.customId == 'propose_deny') {
                  message.channel.send({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle(`👰・Marriage proposal - Denied`)
                        .setDescription(`${target} loves someone else and chose not to marry ${message.author}`)
                        .setColor('Random')
                        .setFooter({
                          text: message.author.tag,
                          iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                        })
                        .setTimestamp(),
                    ],
                  });
                }
              })
              .catch(() => {
                message.channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`👰・Marriage proposal - Denied`)
                      .setDescription(`${target} has not answered anything! The wedding is canceled`)
                      .setColor('Random')
                      .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                      })
                      .setTimestamp(),
                  ],
                });
              });
          }
        }
        break;
    }
  },
};
