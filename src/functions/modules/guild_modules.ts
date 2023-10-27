import { logWithLabel } from '../../utils/console';
import user from '../../models/economy/user';
import guild from '../../models/guild';

async function guild_segurity(guildId: string, userid: string) {
  const data = await guild.findOne({ id: guildId });
  if (data) return;

  const newGuild = new guild({ id: guildId });
  await newGuild.save();
  logWithLabel('discord', `New guild: ${guildId} added to database`);

  const data_user = await user.findOne({ guildId: guildId, userId: userid });
  if (data_user) return;

  const newUser = new user({ 
    guildId: guildId, 
    userId: userid,
    balance: 1000
  });
  await newUser.save();
  logWithLabel("discord", `New data user: ${userid} added to database`)
}

export { guild_segurity };
