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

export class Manager extends Client {
   public commands: Collection<string, Command> = new Collection();
   public categories: Collection<string, string[]> = new Collection();
   //public db: PrismaClient = new PrismaClient();
   constructor() {
      super({
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
   }

   public async load() {
      for (let dir of readdirSync('./src/app/commands/')) {
         this.categories.set(dir, []);
         for (let file of readdirSync('./src/app/commands/' + dir + '/').filter(
            (f) => f.endsWith('.ts')
         )) {
            const module: Command = require('../app/commands/' +
               dir +
               '/' +
               file).default;

            this.commands.set(module.structure.name, module);
            const data = this.categories.get(dir);
            data?.push(module.structure.name);
            this.categories.set(dir, data!);
         }
      }

      for (let dir of readdirSync('./src/app/events/')) {
         for (let file of readdirSync('./src/app/events/' + dir + '/').filter(
            (f) => f.endsWith('.ts')
         )) {
            const module: Event<keyof ClientEvents> = require('../app/events/' +
               dir +
               '/' +
               file).default;

            if (module.once) {
               this.once(module.event, (...args) => module.run(...args));
            } else {
               this.on(module.event, (...args) => module.run(...args));
            }
         }
      }
   }

   public async deploy() {
      try {
         const rest = new REST({ version: '10' }).setToken(process.env.token!);
         const commands = [...this.commands.values()];
         logWithLabel('info', 'Deploying application commands...');
         await rest.put(Routes.applicationCommands(process.env.client_id!), {
            body: commands.map((s) => s.structure),
         });
         logWithLabel('discord', 'Application commands deployed!');
      } catch {
         logWithLabel('error', 'Failed to deploy application commands!');
      }
   }

   public async start() {
      this.load();
      await super.login(process.env.token!);
      await this.deploy();

      const express = new ExpressServer();
      const port = process.env.port_api!;
      express.start(port ? parseInt(port) : 3000);
      db();
   }
}
