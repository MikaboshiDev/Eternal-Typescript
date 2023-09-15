import {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
   Events,
   Options,
   ActivityType,
   ClientEvents,
   REST,
   Routes,
} from 'discord.js';
import { ExpressServer } from '../../server/express';
import { Command, Event } from '../class/builders';
import { PrismaClient } from '@prisma/client';
import { readdirSync } from 'node:fs';
import db from './mongoose';
import { logWithLabel } from '../utils/console';
import { deploy, load } from '../utils/handlers';

export class Manager extends Client {
   public commands: Collection<string, Command> = new Collection();
   public categories: Collection<string, string[]> = new Collection();
   voiceGenerator: Collection<unknown, unknown>;
   //public db: PrismaClient = new PrismaClient();
   constructor() {
      super({
         shards: 'auto',
         failIfNotExists: false,
         allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: false,
         },
         makeCache: Options.cacheWithLimits({
            MessageManager: 200,
         }),
         intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
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

      this.voiceGenerator = new Collection();
      this.categories = new Collection();
      this.commands = new Collection();
   }


   public async start() {
      load();
      await super.login(process.env.token!);
      await deploy();

      const express = new ExpressServer();
      const port = process.env.port_api!;
      express.start(port ? parseInt(port) : 3000);
      db();
   }
}
