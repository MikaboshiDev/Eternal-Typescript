import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import shop from '../../../models/economy/shop';
import user from '../../../models/economy/user';

module.exports = {
  name: 'rob',
  description: 'rob a user to get money',
  aliases: ['rob-user'],
  category: 'economy',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
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
          `${emojis.error} You can't steal a user's money in such a hurry`,
          `You can steal a user's money again in \`${time}\`.`,
        ].join('\n'),
      });
    }

    const victim = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!victim || victim.bot)
      return message.channel.send({
        content: [
          `${emojis.error} You must mention a user to steal their money.`,
          `Example: \`${prefix}rob @user\``,
        ].join('\n'),
      });

    const data_victim = await user.findOne({ guildId: message.guild?.id, userId: victim.id });
    if (!data_victim || data_victim.balance <= 0)
      return message.channel.send({
        content: [
          `${emojis.error} The user \`${victim.tag}\` is not registered in the database.`,
          `or you don't have money to be robbed`,
        ].join('\n'),
      });

    const random_money_robed = Math.floor(Math.random() * data_victim.balance) + 1;
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setDescription(
        [
          `${emojis.correct} You stole \`${random_money_robed}\` from the user \`${victim.tag}\``,
          `You now have \`${data.balance + random_money_robed}\` in your wallet.`,
        ].join('\n')
      )
      .setTimestamp();

    await user.findOneAndUpdate(
      { guildId: message.guild?.id, userId: message.author.id },
      { balance: data.balance + random_money_robed }
    );

    await user.findOneAndUpdate(
      { guildId: message.guild?.id, userId: victim.id },
      { balance: data_victim.balance - random_money_robed }
    );

    return message.channel.send({ embeds: [embed] });
  },
};
