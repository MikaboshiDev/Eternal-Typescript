import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import shop from '../../../models/economy/shop';
import user from '../../../models/economy/user';

const slotItems = ['🍒', '🍎', '🍊', '🍇', '🍋', '🍓', '🍉', '🍈', '💣'];

function getRandomSlotItem() {
  return slotItems[Math.floor(Math.random() * slotItems.length)];
}

module.exports = {
  name: 'slots',
  description: 'Play roulette and you can win money quickly',
  aliases: ['slots-game'],
  category: 'economy',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const data = await user.findOne({ guildId: message.guild?.id, userId: message.author.id });
    if (!data)
      return message.channel.send({
        content: [
          `${emojis.error} The user \`${message.author.tag}\` is not registered in the database.`,
          `To register, type \`${prefix}register\`.`,
        ].join('\n'),
      });

    const amount = parseInt(args[0]);
    if (!amount || isNaN(amount) || amount <= 0 || amount > data.balance)
      return message.channel.send({
        content: [
          `${emojis.error} You must enter a valid amount to bet.`,
          `Example: \`${prefix}slots 100\` to bet 100 coins.`,
        ].join('\n'),
      });

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
      await user.findOneAndUpdate({ guildId: message.guild?.id, userId: message.author.id }, { balance: winnings });
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('Green')
            .setDescription(
              [
                `**${message.author.tag}** played the slots and won **${winnings}** coins!`,
                `**${slotsResult.join(' ')}**`,
              ].join('\n')
            )
            .setTimestamp(),
        ],
      });
    } else {
      await user.findOneAndUpdate({ guildId: message.guild?.id, userId: message.author.id }, { balance: -amount });
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription(
              [
                `**${message.author.tag}** played the slots and lost **${amount}** coins!`,
                `**${slotsResult.join(' ')}**`,
              ].join('\n')
            )
            .setTimestamp(),
        ],
      });
    }
  },
};
