import { logWithLabel } from '../../utils/console';
import model from '../../models/servers/economy';
import guild from '../../models/guild';

async function guild_segurity(guildId: string, userid: string) {
  const data = await guild.findOne({ id: guildId });
  if (data) return;

  const newGuild = new guild({ id: guildId });
  await newGuild.save();
  logWithLabel('discord', `New guild: ${guildId} added to database`);

  const economy = await model.findOne({ userID: userid });
  if (economy) return;

  const newEconomy = new model({ userID: userid });
  await newEconomy.save();

  logWithLabel('discord', `New economy: ${userid} added to database`);
}

export { guild_segurity };
