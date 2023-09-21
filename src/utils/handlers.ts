import { ClientEvents, REST, Routes } from 'discord.js';
import { Command, Event } from '../class/builders';
import { logWithLabel } from './console';
import { readdirSync } from 'node:fs';
import { client } from '../index';
import fs from 'fs';

const pathCommands = './src/app/commands/';
const pathEvents = './src/app/events/';

/**
 * The `load` function loads commands and events from specific directories into the client.
 */
async function load() {
  for (let dir of readdirSync(pathCommands)) {
    client.categories.set(dir, []);
    for (let file of readdirSync(pathCommands + dir + '/').filter((f) => f.endsWith('.ts'))) {
      const module: Command = require('../app/commands/' + dir + '/' + file).default;

      client.commands.set(module.structure.name, module);
      const data = client.categories.get(dir);
      data?.push(module.structure.name);
      client.categories.set(dir, data!);
    }
  }

  for (let dir of readdirSync(pathEvents)) {
    for (let file of readdirSync(pathEvents + dir + '/').filter((f) => f.endsWith('.ts'))) {
      const module: Event<keyof ClientEvents> = require('../app/events/' + dir + '/' + file).default;

      if (module.once) {
        client.once(module.event, (...args) => module.run(...args));
      } else {
        client.on(module.event, (...args) => module.run(...args));
      }
    }
  }
}

/**
 * The function deploys application commands to a Discord bot using the Discord API.
 */
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

/**
 * This TypeScript function loads components and commands into a client object.
 * @param {any} client - The "client" parameter is an object that represents the client or bot that is
 * using this function. It is used to store and manage the commands and aliases for the bot.
 */
async function components(client: any) {
  try {
    let totalCommands = 0;
    const componentsDir = './src/app/components';

    fs.readdirSync(componentsDir).forEach((folder) => {
      const commands = fs.readdirSync(`${componentsDir}/${folder}`).filter((file) => file.endsWith('.ts'));

      for (const file of commands) {
        try {
          const commandModule = require(`../app/components/${folder}/${file}`);
          if (commandModule.name) {
            client.precommands.set(commandModule.name, commandModule);
            totalCommands++;
            if (commandModule.aliases && Array.isArray(commandModule.aliases)) {
              commandModule.aliases.forEach((alias: string) => {
                client.aliases.set(alias, commandModule.name);
              });
            }
          } else {
            console.log(`Comando [/${folder}/${file}] no tiene una propiedad 'name'.`);
          }
        } catch (error) {
          console.error(`Error al cargar el comando [/${folder}/${file}]: ${error}`);
        }
      }
    });

    console.log(`Cargados ${totalCommands} comandos.`);
  } catch (error) {
    console.error(`Error al cargar comandos: ${error}`);
  }
}

export { load, deploy, components };
