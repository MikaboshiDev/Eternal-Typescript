import { PermissionResolvable } from 'discord.js';
import { Message } from 'discord.js';

interface Command {
  name: string;
  aliases?: string[];
  description: string;
  permissions: PermissionResolvable[];
  botpermissions: PermissionResolvable[];
  owner?: boolean;
  nsfw?: boolean;
  cooldown?: number;
  premium?: boolean;
  category: string;
  subcommands?: string[];
  usage?: string;
  examples?: string[];
  execute: (client: any, message: Message, args: string[]) => void;
}

export { Command };
