import {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
   Events,
   Options,
   ActivityType,
} from 'discord.js';
import { ExpressServer } from '../../server/express';
import { readdir, stat } from 'node:fs/promises';
import { logWithLabel } from '../utils/console';
import { join } from 'node:path';
import db from './mongoose';
export class Manager extends Client {
   constructor() {
      super({
         failIfNotExists: false,
         allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: false,
         },
         makeCache: Options.cacheWithLimits({
            MessageManager: 200,
            //? overwrite custom config client
         }),
         intents: [
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMessageReactions,
         ],
         partials: [
            Partials.GuildMember,
            Partials.Message,
            Partials.User,
            Partials.Channel,
            Partials.GuildScheduledEvent,
            Partials.ThreadMember,
         ],
         presence: {
            status: 'idle',
            activities: [
               {
                  name: 'Imperfect Creation in the World',
                  type: ActivityType.Competing,
               },
            ],
            afk: false,
         },
      });
   }

   async start() {
      await super.login(process.env.token!);
      const express = new ExpressServer();
      express.start(3000);
      db();
   }
}
