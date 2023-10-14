import { PermissionResolvable } from 'discord.js';
import { Message } from 'discord.js';

interface Modals {
  id: string;
  owner: boolean;
  ticketMod: boolean;
  premium: boolean;
  permissions: PermissionResolvable[];
  botpermissions: PermissionResolvable[];
  execute: (interaction: any, client: any) => void;
}

export { Modals };
