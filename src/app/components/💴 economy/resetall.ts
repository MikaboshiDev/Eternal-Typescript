import { Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/economy';

module.exports = {
  name: 'resetall',
  description: 'Reset all economy data from database',
  aliases: ['reset-all'],
  category: 'economy',
  premium: false,
  owner: true,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const data = await model.find();
      if (!data)
        return message.channel.send({
          content: [
            `${emojis.error} Hi ${message.author} the data of the server is not found in the database`,
            `plase contact the developer of the bot to fix this error!`,
          ].join('\n'),
        });

      const data_delete = await model.deleteMany();
      if (!data_delete) return;

      message.channel.send({
        content: [
          `${emojis.correct} Hi ${message.author} the data of the server has been reseted!`,
          `count of data delete \`${data_delete.deletedCount}\` archives`,
        ].join('\n'),
      });
    } catch (e) {
      message.channel.send({
        content: [
          `${emojis.error} Hi ${message.author} an error has occurred in the database of the bot`,
          `this error has been reported to the developer of the bot!`,
        ].join('\n'),
      });
    }
  },
};
