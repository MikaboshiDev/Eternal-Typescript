import {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
   Events,
   Options,
} from 'discord.js';
import { ExpressServer } from '../../server/express';
export class Manager extends Client {
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
   }

   async start(token: string) {
      const express = new ExpressServer();
      await super.login(token);
      express.start(3000);
   }
}
