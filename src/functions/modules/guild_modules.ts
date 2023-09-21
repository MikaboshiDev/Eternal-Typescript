import guild from '../../models/guild';
import { logWithLabel } from '../../utils/console';

/**
 * The function `guild_segurity` checks if a guild exists in the database and adds it if it doesn't.
 * @param {string} guildId - The `guildId` parameter is a string that represents the unique identifier
 * of a guild in a Discord server.
 * @returns If the `data` variable is truthy (not null or undefined), then nothing is returned. If the
 * `data` variable is falsy (null or undefined), then the `newGuild` object is returned after it is
 * saved to the database.
 */
async function guild_segurity(guildId: string) {
  const data = await guild.findOne({ id: guildId });
  if (data) return;

  const newGuild = new guild({ id: guildId });
  await newGuild.save();
  logWithLabel('discord', `New guild: ${guildId} added to database`);
}

export { guild_segurity };
