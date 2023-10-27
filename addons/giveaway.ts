import { GiveawaysManager, Giveaway } from 'discord-giveaways'; 
import giveawayModel from '../src/models/systems/giveaways';

module.exports = (client: any) => {
  /*const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
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

  client.giveawaysManager = manager;*/
};
