import guild from '../../models/guild';
import { logWithLabel } from '../../utils/console';
async function guild_segurity(guildId: string) {
  const data = await guild.findOne({ id: guildId });
  if (data) return;

  const newGuild = new guild({ id: guildId });
  await newGuild.save();
  logWithLabel('discord', `New guild: ${guildId} added to database`);
}

export { guild_segurity };
