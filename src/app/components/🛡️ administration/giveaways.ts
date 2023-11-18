import { ChannelType, EmbedBuilder, Message, TextChannel } from 'discord.js';
import ms from 'ms';
import emojis from '../../../../config/json/emojis.json';

module.exports = {
  name: 'giveaways',
  description: 'Commands for giveaways within the discord server',
  aliases: ['giveaway'],
  category: 'administration',
  permissions: ['Administrator'],
  subcommands: [
    'giveaway start [duration] [winners] [prize]',
    'giveaway actions [end, reroll, pause, unpause, delete] [message_id]',
  ],
  examples: [
    'giveaway start 1h 1 Nitro',
    'giveaway actions end <message_id>',
    'giveaway actions reroll <message_id>',
    'giveaway actions pause <message_id>',
    'giveaway actions unpause <message_id>',
    'giveaway actions delete <message_id>',
  ],
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const errorEmbed = new EmbedBuilder().setColor('Red');
    const successEmbed = new EmbedBuilder().setColor('#38ca08');
    const subcommand = args[0];
    switch (subcommand) {
      case 'start':
        {
          const duration = args[1];
          if (!duration || isNaN(ms(duration)))
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a valid duration for the giveaway!`,
                `Example: \`${prefix}giveaway start 1h 1 Nitro\``,
              ].join('\n'),
            });

          const winners = args[2];
          if (!winners || isNaN(winners as any))
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a valid number of winners for the giveaway!`,
                `Example: \`${prefix}giveaway start 1h 1 Nitro\``,
              ].join('\n'),
            });

          const prize = args.slice(3).join(' ');
          if (!prize)
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a valid prize for the giveaway!`,
                `Example: \`${prefix}giveaway start 1h 1 Nitro\``,
              ].join('\n'),
            });

          const channel = message.mentions.channels.first() || message.channel;
          if (channel.type !== ChannelType.GuildText)
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a valid channel for the giveaway!`,
                `Example: \`${prefix}giveaway start 1h 1 Nitro\``,
              ].join('\n'),
            });

          (channel as TextChannel)?.send('@everyone').then((msg) => msg.delete());
          client.giveawaysManager
            .start(channel, {
              duration: ms(duration ?? ''),
              winners,
              prize,
            })
            .then(async () => {
              successEmbed.setDescription(`Giveaway started in ${channel}`);
              return message.channel.send({
                embeds: [successEmbed],
              });
            })
            .catch((err: any) => {
              errorEmbed.setDescription(`Error \n\`${err}\``);
              return message.channel.send({
                embeds: [errorEmbed],
              });
            });
        }
        break;
      case 'actions':
        {
          const choice = args[1];
          if (!choice || !['end', 'reroll', 'pause', 'unpause', 'delete'].includes(choice))
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a valid action for the giveaway!`,
                `Example: \`${prefix}giveaway actions end <message_id>\``,
              ].join('\n'),
            });

          const messageid = args[2];
          if (!messageid)
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a valid message ID for the giveaway!`,
                `Example: \`${prefix}giveaway actions end <message_id>\``,
              ].join('\n'),
            });

          const giveaway = client.giveawaysManager.giveaways.find(
            (g: any) => g.guildId === message.guildId && g.messageId === messageid
          );

          if (!giveaway) {
            errorEmbed.setDescription(`${emojis.error} The giveaway with message ID ${messageid} could not be found.`);
            return message.channel.send({ embeds: [errorEmbed] });
          }
          switch (choice) {
            case 'end':
              {
                client.giveawaysManager
                  .end(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway ended.');
                    return message.channel.send({
                      embeds: [successEmbed],
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return message.channel.send({
                      embeds: [errorEmbed],
                    });
                  });
              }
              break;
            case 'pause':
              {
                client.giveawaysManager
                  .pause(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway paused.');
                    return message.channel.send({
                      embeds: [successEmbed],
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return message.channel.send({
                      embeds: [errorEmbed],
                    });
                  });
              }
              break;
            case 'resume':
              {
                client.giveawaysManager
                  .unpause(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway resumed.');
                    return message.channel.send({
                      embeds: [successEmbed],
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return message.channel.send({
                      embeds: [errorEmbed],
                    });
                  });
              }
              break;
            case 'reroll':
              {
                client.giveawaysManager
                  .reroll(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway rerolled.');
                    return message.channel.send({
                      embeds: [successEmbed],
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return message.channel.send({
                      embeds: [errorEmbed],
                    });
                  });
              }
              break;
            case 'delete':
              {
                client.giveawaysManager
                  .delete(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway deleted.');
                    return message.channel.send({
                      embeds: [successEmbed],
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return message.channel.send({
                      embeds: [errorEmbed],
                    });
                  });
              }
              break;
          }
        }
        break;
    }
  },
};
