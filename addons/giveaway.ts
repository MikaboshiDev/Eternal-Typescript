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

import { GiveawaysManager, Giveaway } from 'discord-giveaways';
import giveawayModel from '../src/models/systems/giveaways';

module.exports = (client: any) => {
  const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    async getAllGiveaways() {
      const giveaways = await giveawayModel.find().lean().exec();
      return giveaways as unknown as Giveaway<any>[]; 
    }

    async saveGiveaway(messageId: any, giveawayData: any) {
      await giveawayModel.create(giveawayData);
      return true;
    }

    async editGiveaway(messageId: any, giveawayData: any) {
      await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
      return true;
    }

    async deleteGiveaway(messageId: any) {
      await giveawayModel.deleteOne({ messageId }).exec();
      return true;
    }
  };

  const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
      botsCanWin: false,
      embedColor: '#FF0000',
      embedColorEnd: '#000000',
      reaction: '🎉',
    },
  });

  client.giveawaysManager = manager;
};
