import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { economyData } from '../../../functions/tools/economyFunction';
import model from '../../../models/servers/economy';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'coinflip',
  description: 'Take a chance in a coin flip',
  aliases: ['cf'],
  category: 'economy',
  premium: false,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const data = await model.findOne({ userID: message.author.id });
      await economyData(client, message, message.author);
      if (!data) return;

      var user = message.author;
      if (user.bot)
        return message.reply({
          content: [
            `${emojis.error} A bot cannot interact with me in server economy commands.`,
            `**Usage Example:** \`${prefix}coinflip heads 100\``,
          ].join('\n'),
        });
      var flip = args[0] ? args[0].toLowerCase() : false;
      var amount = ['todo', 'all-in', 'all'].includes(args[1]) ? data.money : args[1] ? parseInt(args[1]) : false;

      if (!flip || !['heads', 'tails'].includes(flip))
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.color)
              .setFooter({
                text: `Server Economy Systems`,
                iconURL: message.author.displayAvatarURL({ forceStatic: true }),
              })
              .setTitle(`Specify the \`flip - result\`, it should be either \`heads\` or \`tails\``)
              .setDescription(
                `Usage: \`${prefix}coinflip <roll-result> <Gamble-Amount>\`\n\nExample: \`${prefix}coinflip heads 100\``
              ),
          ],
        });
      if (!amount)
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.color)
              .setFooter({
                text: `Server Economy Systems`,
                iconURL: message.author.displayAvatarURL({ forceStatic: true }),
              })
              .setTitle(`Specify an amount of \`Money 💸\`** for the game!`)
              .setDescription(
                `Usage: \`${prefix}coinflip <roll-result> <Gamble-Amount>\`\n\nExample: \`${prefix}coinflip heads 100\``
              ),
          ],
        });
      if (amount <= 0)
        return message.reply({
          content: [
            `${emojis.error} You cannot bet 0 or less money in the Coinflip game.`,
            `Please use the command again with a valid amount to work with.`,
          ].join('\n'),
        });
      if (data.money < amount)
        return message.reply({
          content: [
            `${emojis.error} You cannot bet more money than you have stored: \`${emojis.wallet}\` Wallet: \`${data.money}\` Coins 💸`,
            `Use the \`${prefix}balance\` command to view your money in the server economy.`,
          ].join('\n'),
        });
      var validNumbers = ['heads', 'tails'];
      var result = validNumbers[Math.floor(Math.random() * validNumbers.length)];
      let win = false;
      if (flip == result) win = true;
      if (win) {
        amount *= 1.5;
        client.balance(message.author.id, amount, 'add', message);
        message.reply({
          content: [
            `${emojis.correct} Congratulations ${message.author}`,
            `You have successfully won the Coinflip game!\n`,
            `\`${emojis.wallet}\` Wallet: \`${data.money}\``,
            `\`${emojis.money}\` Result: ${amount}`,
          ].join('\n'),
        });
      } else {
        client.balance(message.author.id, amount, 'remove', message);
        message.reply({
          content: [
            `${emojis.error} I'm sorry ${message.author}`,
            `You have lost the Coinflip game!\n`,
            `\`${emojis.wallet}\` Wallet: \`${data.money}\``,
            `\`${emojis.money}\` Result: ${amount}`,
          ].join('\n'),
        });
      }
    } catch (e) {
      logWithLabel('error', `Error in coinflip command: ${e}`);
      message.channel.send({
        content: [
          `${emojis.error} An error has occurred while executing the command, please try again later`,
          `**Error Time:** ${Date.now() - message.createdTimestamp}ms`,
        ].join('\n'),
      });
    }
  },
};
