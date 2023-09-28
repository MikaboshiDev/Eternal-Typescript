import { EmbedBuilder, Message } from 'discord.js';
import fs from 'fs';
import emojis from '../../../../config/emojis.json';
import { logWithLabel } from '../../../utils/console';
import model_guild from '../../../models/guild';

module.exports = {
  name: 'manager',
  description: 'control commands for basic functions of the discord bot such as name, avatar among others',
  aliases: ['control', 'controles', 'controle'],
  category: 'owner',
  premium: false,
  cooldown: 5000,
  owner: true,
  examples: [`controls [subcommands] [parameters]`, `controls [command] [parameters], [command] [parameters]`],
  subcommands: [`controls name <new name>`, `controls avatar <image url>`, `controls prefix <new prefix>`],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommands = args[0];
    switch (subcommands) {
      case 'name':
        {
          try {
            const name = args.slice(1).join(' ');

            if (!name)
              return message.channel.send({
                content: [
                  `${emojis.error} The correct usage is: \`${prefix}controls name <new name>\`!`,
                  `Example: \`${prefix}controls name ${client.user.username}\``,
                ].join('\n'),
              });

            if (name.length > 32)
              return message.channel.send({
                content: [
                  `${emojis.error} The name cannot be longer than 32 characters long!`,
                  `Example: \`${prefix}controls name ${client.user.username}\``,
                ].join('\n'),
              });

            client.user
              .setUsername(name)
              .then((user: any) => {
                return message.channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setColor('Random')
                      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                      .setDescription(
                        [
                          `${emojis.correct} Successfully changed the name to \`${user.username}\`!`,
                          `Example: \`${prefix}controls name ${client.user.username}\``,
                        ].join('\n')
                      ),
                  ],
                });
              })
              .catch((e: any) => {
                return message.channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setColor('Random')
                      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                      .setDescription(
                        [
                          `${emojis.error} An error occurred while changing the name to \`${name}\`!`,
                          `Example: \`${prefix}controls name ${client.user.username}\``,
                        ].join('\n')
                      ),
                  ],
                });
              });
          } catch (e) {
            logWithLabel('error', `The error is in guild ${message.guild?.name}`);
            console.error(e);
          }
        }
        break;
      case 'avatar':
        {
          try {
            var url;
            if (message.attachments.size > 0) {
              if (message.attachments.every(attachIsImage)) {
                const response = await fetch(url!);
                const buffer = await response.arrayBuffer();

                const bufferView = new Uint8Array(buffer);
                fs.writeFile(`./image.jpg`, bufferView, () => console.log('finished downloading!'));
                client.user
                  .setAvatar(`./image.jpg`)
                  .then((user: any) => {
                    return message.channel.send({
                      embeds: [
                        new EmbedBuilder()
                          .setColor('Random')
                          .setDescription(
                            [
                              `${emojis.correct} Successfully changed the avatar to \`${user.username}\`!`,
                              `Example: \`${prefix}controls avatar <image url>\``,
                            ].join('\n')
                          )
                          .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }),
                      ],
                    });
                  })
                  .catch((e: any) => {
                    return message.channel.send({
                      embeds: [
                        new EmbedBuilder()
                          .setColor('Random')
                          .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                          .setDescription(
                            [
                              `${emojis.error} An error occurred while changing the avatar to \`${url!}\`!`,
                              `Example: \`${prefix}controls avatar <image url>\``,
                            ].join('\n')
                          ),
                      ],
                    });
                  });
              } else {
                return message.channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} The image must be a png or jpg/jpeg file!`,
                          `Example: \`${prefix}controls avatar <image url>\``,
                        ].join('\n')
                      )
                      .setColor('Random')
                      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }),
                  ],
                });
              }
            } else if (message.content && textIsImage(message.content)) {
              url = args.join(' ');
              const response = await fetch(url);
              const buffer = await response.arrayBuffer();

              fs.writeFile(`./image.jpg`, Buffer.from(buffer), () => console.log('finished downloading!'));
              client.user
                .setAvatar(`./image.jpg`)
                .then((user: any) => {
                  try {
                    fs.unlinkSync('./image.jpg');
                  } catch {}
                  return message.channel.send({
                    embeds: [
                      new EmbedBuilder()
                        .setDescription(
                          [
                            `${emojis.correct} Successfully changed the avatar to \`${user.username}\`!`,
                            `Example: \`${prefix}controls avatar <image url>\``,
                          ].join('\n')
                        )
                        .setColor('Random')
                        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }),
                    ],
                  });
                })
                .catch((e: any) => {
                  return message.channel.send({
                    embeds: [
                      new EmbedBuilder()
                        .setColor('Random')
                        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setDescription(
                          [
                            `${emojis.error} An error occurred while changing the avatar to \`${url!}\`!`,
                            `Example: \`${prefix}controls avatar <image url>\``,
                          ].join('\n')
                        ),
                    ],
                  });
                });
            } else {
              return message.channel.send({
                embeds: [
                  new EmbedBuilder()
                    .setDescription(
                      [
                        `${emojis.error} The image must be a png or jpg/jpeg file or a link!`,
                        `Example: \`${prefix}controls avatar <image url>\``,
                      ].join('\n')
                    )
                    .setColor('Random')
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }),
                ],
              });
            }

            function attachIsImage(msgAttach: any) {
              url = msgAttach.url;

              return (
                url.indexOf('png', url.length - 'png'.length /*or 3*/) !== -1 ||
                url.indexOf('jpeg', url.length - 'jpeg'.length /*or 3*/) !== -1 ||
                url.indexOf('jpg', url.length - 'jpg'.length /*or 3*/) !== -1
              );
            }
            function textIsImage(url: any) {
              return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
            }
          } catch (e) {
            logWithLabel('error', `The error is in guild ${message.guild?.name}`);
            console.error(e);
          }
        }
        break;
      case 'prefix':
        {
          const data = await model_guild.findOne({ id: message.guild?.id });
          const oldPrefix = data?.prefix;
          const value = args[1];
          if (!prefix)
            return message.channel.send({
              content: [
                `${emojis.error} Please add a prefix for message commands`,
                `Example: \`${oldPrefix}setprefix !\``,
              ].join('\n'),
            });

          if (prefix.length > 5)
            return message.channel.send({
              content: [
                `${emojis.error} The prefix must be less than 5 characters`,
                `Example: \`${oldPrefix}setprefix !\``,
              ].join('\n'),
            });

          await model_guild.findOneAndUpdate({ id: message.guild?.id }, { prefix: value });
          message.channel.send({
            content: [
              `${emojis.correct} The prefix has been changed to \`${data?.prefix}\``,
              `Example: \`${data?.prefix}help\``,
            ].join('\n'),
          });
        }
        break;
    }
  },
};
