import EconomyModel from '../../models/servers/economy';
import { logWithLabel } from '../../utils/console';
import GuildModel from '../../models/guild';

async function ensureGuildExists(guildId: string) {
  try {
    if (guildId) {
      const existingGuild = await GuildModel.findOne({ id: guildId });
      if (!existingGuild) {
        const newGuild = new GuildModel({ id: guildId });
        await newGuild.save();
        logWithLabel('info', `New guild: ${guildId} added to the database`);
      }
    }
  } catch (error) {
    logWithLabel('error', `Error ensuring guild exists: ${error}`);
  }
}

async function ensureEconomyExists(userId: string) {
  try {
    if (userId) {
      const existingEconomy = await EconomyModel.findOne({ userID: userId });
      if (!existingEconomy) {
        const newEconomy = new EconomyModel({ userID: userId });
        await newEconomy.save();
        logWithLabel('info', `New economy: ${userId} added to the database`);
      }
    }
  } catch (error) {
    logWithLabel('error', `Error ensuring economy exists: ${error}`);
  }
}

export { ensureGuildExists, ensureEconomyExists };
