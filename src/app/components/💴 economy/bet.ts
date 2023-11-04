import { Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { economyData } from '../../../functions/tools/economyFunction';
import model from '../../../models/servers/economy';

module.exports = {
  name: 'bet',
  description: 'Used to place a bet with a specific amount of money',
  aliases: ['apostar'],
  category: 'economy',
  premium: false,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const data = await model.findOne({ userID: message.author.id });
      await economyData(client, message, message.author);
      if (!data) return;

      let amount = parseInt(args[0]);
      if (['todo', 'all-in', 'all'].includes(args[0])) {
        amount = data.money;
      } else {
        if (isNaN(amount) || amount <= 0 || amount % 1 != 0 || data.money == 0)
          return message.reply({
            content: [
              `${emojis.error} Sorry, but you must specify a valid amount to play roulette`,
              `**Error Time:** ${Date.now() - message.createdTimestamp}ms`,
            ].join('\n'),
          });
        if (amount > data.money)
          return message.reply({
            content: [
              `${emojis.error} Oops.. You don't have enough money to bet that amount`,
              `**Error Time:** ${Date.now() - message.createdTimestamp}ms`,
            ].join('\n'),
          });
      }

      let possibilities = ['win', 'lose', 'tie'];
      let result = possibilities[Math.floor(Math.random() * possibilities.length)];
      if (result === 'win') {
        client.balance(message.author.id, amount, 'add', message);
        return message.reply({
          content: [
            `${emojis.correct} Congratulations ${message.author}!`,
            `You have won \`${amount}\` coins by betting.`,
            `Thank you for playing roulette at ${message.guild?.name}.`,
          ].join('\n'),
        });
      } else {
        client.balance(message.author.id, amount, 'remove', message);
        return message.reply({
          content: [
            `${emojis.correct} We're sorry, ${message.author}`,
            `You lost the bet and lost \`${amount}\` from your Wallet.`,
            `Thank you for playing roulette at ${message.guild?.name}.`,
          ].join('\n'),
        });
      }
    } catch (e) {
      message.channel.send({
        content: [
          `${emojis.error} An error has occurred while executing the command, please try again later`,
          `**Error Time:** ${Date.now() - message.createdTimestamp}ms`,
        ].join('\n'),
      });
    }
  },
};
