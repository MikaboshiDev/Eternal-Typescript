import { PermissionResolvable } from 'discord.js';
import { Manager } from "./src/structure/client";
import { JwtPayload } from 'jsonwebtoken';
import { Message } from 'discord.js';
import { Request } from 'express';

export interface Buttons {
  id: string;
  owner: boolean;
  ticketMod: boolean;
  premium: boolean;
  permissions: PermissionResolvable[];
  botpermissions: PermissionResolvable[];
  execute: (interaction: any, client: any) => void;
}

export interface Menus {
  id: string;
  ticketMod: boolean;
  owner: boolean;
  premium: boolean;
  permissions: PermissionResolvable[];
  botpermissions: PermissionResolvable[];
  execute: (interaction: any, client: any) => void;
}

export interface Modals {
  id: string;
  owner: boolean;
  ticketMod: boolean;
  premium: boolean;
  permissions: PermissionResolvable[];
  botpermissions: PermissionResolvable[];
  execute: (interaction: any, client: any) => void;
}

export interface GameOptions {
  emojis: any;
  foods: any;
  othersMessage: any;
  stopButton: any;
  snake: any;
  message: import('discord.js').Message;
  slash_command?: boolean;
  embed?: {
    title?: string;
    color?: string;
    overTitle?: string;
  };
}

export interface GameRocks {
  opponent: any;
  embed: any;
  buttons: any;
  emojis: any;
  askMessage: any;
  cancelMessage: any;
  timeEndMessage: any;
  othersMessage: any;
  chooseMessage: any;
  noChangeMessage: any;
  gameEndMessage: any;
  winMessage: any;
  drawMessage: any;
  message: any;
}

export interface Command {
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
  execute: (client: any, message: Message, args: string[], prefix: any) => void;
}

export interface Giveaway {
  messageId: string;
  channelId: string;
  guildId: string;
  startAt: number;
  endAt: number;
  ended: boolean;
  winnerCount: number;
  prize: string;
  messages: {
    giveaway: string;
    giveawayEnded: string;
    inviteToParticipate: string;
    drawing: string;
    dropMessage: string;
    winMessage: string;
  };
  durationAfterPause: number;
  infiniteDurationText: string;
  isDrop: boolean;
  allowedMentions: {
    parse: string[] | undefined;
    users: string[] | undefined;
    roles: string[] | undefined;
  };
  embedFooter: string | undefined;
  noWinner: string;
  winners: string;
  endedAt: string;
  hostedBy: string;
  thumbnail: string;
  winnerIds: string[] | undefined;
  reaction: string | undefined;
  botsCanWin: boolean;
  embedColor: string | undefined;
  embedColorEnd: string | undefined;
  exemptPermissions: any[] | undefined;
  exemptMembers: string;
  bonusEntries: string;
  extraData: any;
  lastChance: {
    enabled: boolean;
    content: string;
    threshold: number;
    embedColor: string | undefined;
  };
  pauseOptions: {
    isPaused: boolean;
    content: string;
    unpauseAfter: number;
    embedColor: string | undefined;
  };
}

export interface Node {
  name: string;
  host: string;
  port: number;
  password: string;
  secure: boolean;
}

export interface PoruEvent {
  name: string;
  run: (client: Manager, eventOne?: any, eventTwo?: any) => void;
}

export interface Auth {
  email: string;
  password: string;
}

export interface User extends Auth {
  name: string;
}

export interface Storage {
  fileName: string;
  path: string;
  idUser: string;
}

export interface RequestExt extends Request {
  user?: JwtPayload | { id: string };
}

export interface IUser extends Document {
  username: string;
  user_id: number;
  email: string;
  products: Array<string>;
  warnings: number;
  banned: boolean;
  data_guild: Array<{
    username: string;
    user_id: number;
    sanctions: Array<string>;
    commands: Array<string>;
  }>;
}

export interface IProduct extends Document {
  name: string;
  id: number;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  date: Date;
}