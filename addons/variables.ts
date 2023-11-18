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
            `${emojis.error} **${message.author.username}**, you don't have enough money to do this action right now!`,
            `you may not have enough money or your account does not exist in the bank`,
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
              `the day \`${new Date().toLocaleDateString()}\` at \`${new Date().toLocaleTimeString()}\``,
            ].join('\n'),
          });
          break;
        default:
          message.reply(`${emojis.error} Invalid action specified.`);
      }
    } catch (error) {
      logWithLabel('error', `An error occurred while processing the balance of ${userid}`);
      message.reply({
        content: [
          `${emojis.error} **${message.author.username}**, an error occurred while processing your balance!`,
          `please try again later`,
        ].join('\n'),
      });
    }
  };
};
