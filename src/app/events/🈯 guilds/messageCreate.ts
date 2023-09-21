import { guild_segurity } from '../../../functions/modules/guild_modules';
import { Event } from '../../../class/builders';
import guild from '../../../models/guild';
import { Message } from 'discord.js';
import { client } from '../../..';

interface Command {
  name: string;
  aliases?: string[];
  execute: (client: any, message: Message, args: string[]) => void;
}

export default new Event('messageCreate', async (message) => {
  if (message.author.bot || !message.guild || !message.channel) return;
  const guildId = message.guild.id;

  await guild_segurity(guildId);
  const data = await guild.findOne({ id: guildId });

  const prefix = data?.prefix;
  if (!message.content.startsWith(prefix ?? '!')) return;
  const args = message.content.slice(prefix?.length).trim().split(/ +/g);

  const cmd = args.shift()?.toLowerCase();
  const command = client.precommands.get(cmd ?? '') || client.precommands.find((c: any) => c.aliases?.includes(cmd ?? ''));

  if (!command) return;
  (command as Command).execute(client, message, args);
});
