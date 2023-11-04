import { Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'threads',
  description: "Manage your server's active threads",
  aliases: ['thread'],
  examples: ['threads archive #thread-1', 'threads join', 'threads lock #thread-1'],
  permissions: ['ManageChannels'],
  botpermissions: ['ManageChannels'],
  category: 'administration',
  premium: false,
  subcommands: ['threads archive [channel]', 'threads join [channel]', 'threads lock [channel]'],
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const subcomandos = args[0];
      switch (subcomandos) {
        case 'archive':
          {
            let channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[1]);
            if (!channel || !channel.isThread())
              return message.reply({
                content: [
                  `${emojis.error} The mentioned value is not a thread in the Discord server`,
                  `Example: \`!archivethread #thread-1\``,
                ].join('\n'),
              });
            await channel.setArchived(true);
            message.reply({
              content: [
                `${emojis.correct} The thread has been successfully archived in the Discord server automatically`,
                `**•** Thread: \`${channel.name}\``,
                `**•** Date: \`${new Date().toLocaleString()}\``,
              ].join('\n'),
            });
          }
          break;
        case 'join':
          {
            let channels = message.guild?.channels.cache.filter((ch) => ch.isThread() && !ch.archived && !ch.joined);
            if (!channels || channels.size == 0)
              return message.reply({
                content: `${emojis.correct} The server doesn't have any threads to join at the moment`,
              });
            for (const channel of channels) await channel.join();
            message.reply({
              content: `${emojis.correct} Joined a total of \`${
                channels.size
              }\` threads in the server in a time of: \`${(Date.now() - message.createdTimestamp) / 1000} seconds\``,
            });
          }
          break;
        case 'lock': {
          let channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[1]);
          if (!channel || !channel.isThread())
            return message.reply({
              content: `${emojis.correct} Unfortunately, the selected value is not a thread to join at the moment`,
            });
          await channel.setLocked(true);
          message.reply({
            content: `${emojis.correct} I have successfully locked the thread ${channel} in a time of: \`${
              (Date.now() - message.createdTimestamp) / 1000
            } seconds\``,
          });
        }
      }
    } catch (err) {
      logWithLabel('error', `The following error occured: ${err}`);
      message.channel.send({
        content: [`${emojis.error} An error has occured while executing this command!`, `> **Error:** \`${err}\``].join(
          '\n'
        ),
      });
    }
  },
};
