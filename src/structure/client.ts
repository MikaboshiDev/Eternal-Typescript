import {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
   Events,
   Options,
} from 'discord.js';
import { ExpressServer } from '../../server/express';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import db from './mongoose';
export class Manager extends Client {
   events: Collection<unknown, unknown>;
   commands: Collection<unknown, unknown>;
   constructor() {
      super({
         failIfNotExists: false,
         allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: false,
         },
         intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
         partials: [Partials.GuildMember, Partials.Message],
      });

      this.events = new Collection();
      this.commands = new Collection();
   }

   async start() {
      await super.login(process.env.token!);
      const express = new ExpressServer();
      express.start(3000);
      db();
   }
}
