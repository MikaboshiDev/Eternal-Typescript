import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import shop from '../../../models/economy/shop';
import user from '../../../models/economy/user';
module.exports = {
  name: 'daily',
  description: 'claim your daily reward money',
  aliases: ['claim'],
  category: 'economy',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const daily = 1200;
    const timeout = 86400000;

    const data = await user.findOne({ guildId: message.guild?.id, userId: message.author.id });
    if (!data)
      return message.channel.send({
        content: [
          `${emojis.error} The user \`${message.author.tag}\` is not registered in the database.`,
          `To register, type \`${prefix}register\`.`,
        ].join('\n'),
      });

    if (timeout - ((data?.daily || 0) - Date.now()) > 0) {
      const time = require('ms')(timeout - ((data?.daily || 0) - Date.now()));
      return message.channel.send({
        content: [
          `${emojis.error} You have already claimed your daily reward.`,
          `You can claim it again in \`${time}\`.`,
        ].join('\n'),
      });
    }

    const posibility = Math.floor(Math.random() * 100) + 1;
    const chance = Math.floor(Math.random() * 100) + 1;

    if (posibility < 50) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription(
          [
            `${emojis.error} You lost all your money in your wallet and bank.`,
            `You have lost \`${data.balance}\` in your wallet.`,
            `You have lost \`${data.bank}\` in your bank.`,
          ].join('\n')
        )
        .setTimestamp();
      await user.findOneAndUpdate(
        { guildId: message.guild?.id, userId: message.author.id }, 
        { balance: 0, bank: 0 }
      );
      
      return message.channel.send({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setDescription(
        [
          `${emojis.correct} You have claimed your daily reward.`,
          `You have received \`${daily}\` in your wallet.`,
        ].join('\n')
      )
      .setTimestamp();

    await user.findOneAndUpdate(
      { guildId: message.guild?.id, userId: message.author.id },
      { balance: data.balance + daily, daily: Date.now() }
    );

    return message.channel.send({ embeds: [embed] });
  },
};
