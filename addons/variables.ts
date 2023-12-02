/*
# Discord Server: https://discord.gg/pgDje8S3Ed
# Github: https://github.com/MikaboshiDev
# Docs: https://docs.night-support.xyz/
# Dashboard: http://www.night-support.xyz/

# Created by: MikaboshiDev
# Version: 0.0.2
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/

import emojis from '../config/json/emojis.json';
import model from '../src/models/servers/economy';
import { logWithLabel } from '../src/utils/console';

module.exports = (_client: any) => {
  _client.balance = async (userid: any, count: number, action: any, message: any) => {
    try {
      const data = await model.findOne({ userID: userid });
      if (!data || data.money < 0) {
        return message.reply({
          content: [
            `${emojis.error} **${message.author.username}**, you don't have enough money to perform this action right now!`,
            `You may not have enough money or your account does not exist in the bank.`,
          ].join('\n'),
        });
      }

      switch (action) {
        case 'add':
          await model.findOneAndUpdate({ userID: userid }, { $inc: { money: count } }, { new: true });
          break;
        case 'remove':
          await model.findOneAndUpdate({ userID: userid }, { $inc: { money: -count } }, { new: true });
          break;
        case 'delete':
          await model.findOneAndDelete({ userID: userid });
          message.reply({
            content: [
              `${emojis.correct} **${message.author.username}**, your account has been deleted successfully from the bank!`,
              `The day \`${new Date().toLocaleDateString()}\` at \`${new Date().toLocaleTimeString()}\``,
            ].join('\n'),
          });
          break;
        default:
          message.reply({
            content: [
              `${emojis.error} **${message.author.username}**, an error occurred while processing your balance!`,
              `Please try again later.`,
            ].join('\n'),
          });
      }
    } catch (error) {
      logWithLabel('error', `An error occurred while processing the balance of ${userid}: ${error}`);
      message.reply({
        content: [
          `${emojis.error} **${message.author.username}**, an error occurred while processing your balance!`,
          `Please try again later.`,
        ].join('\n'),
      });
    }
  };
};
