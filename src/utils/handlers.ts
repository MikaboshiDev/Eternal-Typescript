import {
   ClientEvents,
   REST,
   Routes,
} from 'discord.js';
import { Command, Event } from '../class/builders';
import { logWithLabel } from './console';
import { readdirSync } from 'node:fs';
import { client } from '../index';

const pathCommands = './src/app/commands/';
const pathEvents = './src/app/events/';

async function load() {
   for (let dir of readdirSync(pathCommands)) {
      client.categories.set(dir, []);
      for (let file of readdirSync(pathCommands + dir + '/').filter((f) =>
         f.endsWith('.ts')
      )) {
         const module: Command = require('../app/commands/' +
            dir +
            '/' +
            file).default;

         client.commands.set(module.structure.name, module);
         const data = client.categories.get(dir);
         data?.push(module.structure.name);
         client.categories.set(dir, data!);
      }
   }

   for (let dir of readdirSync(pathEvents)) {
      for (let file of readdirSync(pathEvents + dir + '/').filter((f) =>
         f.endsWith('.ts')
      )) {
         const module: Event<keyof ClientEvents> = require('../app/events/' +
            dir +
            '/' +
            file).default;

         if (module.once) {
            client.once(module.event, (...args) => module.run(...args));
         } else {
            client.on(module.event, (...args) => module.run(...args));
         }
      }
   }
}

async function deploy() {
   try {
      const rest = new REST({ version: '10' }).setToken(process.env.token!);
      const commands = [...client.commands.values()];
      logWithLabel('info', 'Deploying application commands...');
      await rest.put(Routes.applicationCommands(process.env.client_id!), {
         body: commands.map((s) => s.structure),
      });
      logWithLabel('discord', 'Application commands deployed!');
   } catch {
      logWithLabel('error', 'Failed to deploy application commands!');
   }
}

export { load, deploy }
