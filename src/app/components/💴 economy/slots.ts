import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { economyData } from '../../../functions/tools/economyFunction';
import model from '../../../models/servers/economy';

const slotItems = ['🍒', '🍎', '🍊', '🍇', '🍋', '🍓', '🍉', '🍈', '💣'];

function getRandomSlotItem() {
  return slotItems[Math.floor(Math.random() * slotItems.length)];
}
module.exports = {
  name: 'slots',
  description: 'Play roulette and you will be able to win different prizes',
  aliases: ['slot'],
  category: 'economy',
  premium: false,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const data = await model.findOne({ userID: message.author.id });
      await economyData(client, message, message.author);
      if (!data) return;

      if (message.author.bot) {
        return message.reply({
          content: [
            `${emojis.error} You cannot play slots with bots is not allowed!`,
            `**Error Time:** ${Date.now() - message.createdTimestamp}ms`,
          ].join('\n'),
        });
      }

      let amount = parseInt(args[0]);

      if (!amount || isNaN(amount) || amount <= 0) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.color)
              .setFooter({
                text: `Server Economy Systems`,
                iconURL: message.author.displayAvatarURL({ forceStatic: true }),
              })
              .setTitle(`${emojis.error} Please specify a valid amount to bet!`)
              .setDescription(`Usage: \`${prefix}slots <amount>\`\n\nExample: \`${prefix}slots 100\``),
          ],
        });
      }

      if (amount > data.money) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.color)
              .setFooter({
                text: `Server Economy Systems`,
                iconURL: message.author.displayAvatarURL({ forceStatic: true }),
              })
              .setTitle(
                `${emojis.error} You cannot bet more money than you have in your **${emojis.wallet} Pocket (\`${data.money} 💸\`)**`
              ),
          ],
        });
      }

      const slotsResult = [getRandomSlotItem(), getRandomSlotItem(), getRandomSlotItem()];
      let win = false;
      let multiplier = 1;

      if (slotsResult[0] === slotsResult[1] && slotsResult[1] === slotsResult[2]) {
        multiplier = 9;
        win = true;
      } else if (
        slotsResult[0] === slotsResult[1] ||
        slotsResult[0] === slotsResult[2] ||
        slotsResult[1] === slotsResult[2]
      ) {
        multiplier = 2;
        win = true;
      }

      const winnings = amount * multiplier;

      if (win) {
        client.balance(message.author.id, winnings, 'add', message);
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`You won \`${winnings} 💸\``)
              .setDescription(
                `${slotsResult.join(' | ')}\n\n${emojis.wallet} You now have \`${
                  data.money + winnings
                } 💸\` in your wallet`
              )
              .setColor(client.color)
              .setThumbnail(message.author.displayAvatarURL({ forceStatic: true })),
          ],
        });
      } else {
        client.balance(message.author.id, amount, 'remove', message);
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`You lost \`${amount} 💸\``)
              .setDescription(
                `${slotsResult.join(' | ')}\n\n${emojis.wallet} You now have \`${
                  data.money - amount
                } 💸\` in your wallet`
              )
              .setColor(client.color)
              .setThumbnail(message.author.displayAvatarURL({ forceStatic: true })),
          ],
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
