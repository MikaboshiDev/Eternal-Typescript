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

async function ensureConsole() {
      console.log('\x1b[36m_____  _                       _   \x1b[31m_');
      console.log('\x1b[36m|  __ \\(_)                     | | \x1b[31m(_)');
      console.log('\x1b[36m| |  | |_ ___  ___ ___  _ __ __| |  \x1b[33m_ ___');
      console.log("\x1b[36m| |  | | / __|/ __/ _ \\| '__/ _` | \x1b[33m| / __|");
      console.log('\x1b[36m| |__| | \\__ \\ (_| (_) | | | (_| |\x1b[37m_\x1b[32m| \\__ \\');
      console.log('\x1b[36m|_____/|_|___/\\___\\___/|_|  \\__,_\x1b[37m(_) \x1b[32m|___/');
      console.log('                                  \x1b[34m_/ |');
      console.log('                                 \x1b[35m|__/');
      console.log('\x1b[0m');
}

export { ensureGuildExists, ensureEconomyExists, ensureConsole };
