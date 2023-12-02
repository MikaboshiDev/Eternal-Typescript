import { Message } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { economyData } from '../../../utils/functions';

import model from '../../../models/servers/economy';

module.exports = {
  name: 'deposit',
  description: 'Make deposits to other users from your card',
  aliases: ['deposito'],
  category: 'economy',
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const data = await model.findOne({ userID: message.author.id });
    await economyData(client, message, message.author);
    if (!data) return;

    let cantidad = parseInt(args[0]);
    if (['todo', 'all-in', 'all'].includes(args[0])) {
      cantidad = data.money;
    } else {
      if (isNaN(cantidad) || cantidad <= 0 || cantidad % 1 != 0 || cantidad == 0 || data.money == 0)
        return message.reply({
          content: [
            `${emojis.error} Hi ${message.author.username}, I'm sorry but you haven't specified a valid amount to deposit`,
            `**Example:** ${prefix}deposit 100`,
          ].join('\n'),
        });

      if (cantidad > data.money)
        return message.reply({
          content: [
            `${emojis.error} Hi ${message.author.username}, I'm sorry but you don't have that much money to deposit`,
            `**Example:** ${prefix}deposit 100`,
          ].join('\n'),
        });
    }
    await model.findOneAndUpdate(
      { userID: message.author.id },
      {
        $inc: {
          money: -cantidad,
          bank: cantidad,
        },
      }
    );
    return message.reply({
      content: [
        `${emojis.correct} Hi ${message.author.username}, you have deposited \`${cantidad} coins\` in your bank!`,
        `Thank you for trusting us!`,
      ].join('\n'),
    });
  },
};
