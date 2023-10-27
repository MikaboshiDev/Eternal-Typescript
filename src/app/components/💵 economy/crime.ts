import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import shop from '../../../models/economy/shop';
import user from '../../../models/economy/user';

module.exports = {
  name: 'crime',
  description: 'execute crimes to get money from stupid people',
  aliases: ['crime-bal'],
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
          `${emojis.error} You can't execute crimes too often or you'll be caught by the law.`,
          `You can execute crimes again in \`${time}\`.`,
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
            `${emojis.error} you tried to execute a crime in the state world bank.`,
            `but you were caught you will have to pay commissions and debts to the government`,
          ].join('\n')
        )
        .setTimestamp();
      await user.findOneAndUpdate(
        { guildId: message.guild?.id, userId: message.author.id },
        { balance: -daily * 2, bank: -daily * 2 }
      );

      return message.channel.send({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setDescription(
        [
          `${emojis.correct} you executed a crime in the state world bank.`,
          `you stole \`${daily}\` from the bank.`,
        ].join('\n')
      )
      .setTimestamp();

    await user.findOneAndUpdate(
      { guildId: message.guild?.id, userId: message.author.id },
      { balance: daily, bank: daily }
    );

    return message.channel.send({ embeds: [embed] });
  },
};
