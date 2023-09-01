import {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
   Events,
   Options,
} from 'discord.js';
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
      await super.login(token);
   }
}
