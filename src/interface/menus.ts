import { PermissionResolvable } from 'discord.js';
import { Message } from 'discord.js';

interface Menus {
  id: string;
  owner: boolean;
  premium: boolean;
  permissions: PermissionResolvable[];
  botpermissions: PermissionResolvable[];
  execute: (interaction: any, client: any) => void;
}

export { Menus };
