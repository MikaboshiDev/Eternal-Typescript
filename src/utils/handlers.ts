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
            logWithLabel('error', `The command [/${folder}/${file}] does not have a name.`);
          }
        } catch (error) {
          logWithLabel('error', `This error occurred while loading the command [/${folder}/${file}]: ${error}`);
        }
      }
    });

    logWithLabel('info', `loaded ${totalCommands} commands and ${client.categories.size} categories.`);
  } catch (error) {
    logWithLabel('error', `The following error occurred while loading commands: ${error}`);
  }
}

/**
 * The function `addons` loads TypeScript addons from a specified directory and logs the number of
 * successfully loaded addons.
 * @param {any} client - The `client` parameter is an object that represents the client or bot that
 * will be using the addons. It is passed to each addon so that they can interact with the client and
 * perform actions such as sending messages, joining servers, etc.
 * @returns nothing.
 */
async function addons(client: any) {
        try {
            const addonsDir = "./addons";
            let addonCounter = 0;

            if (!fs.existsSync(addonsDir)) {
                logWithLabel("error", `The addon directory does not exist in ${addonsDir}`)
                return;
            }

            const files = await fs.promises.readdir(addonsDir);

            for (const file of files) {
                if (!file.endsWith(".ts")) continue;

                try {
                    require(`../../addons/${file}`)(client);
                    addonCounter++;
                } catch (e) {
                    logWithLabel("error", `Error loading addon ${file} in ${addonsDir}: ${e}`);
                    logWithLabel("error", `Occurred on ${new Date().toISOString()}`);
                }
            }

            logWithLabel("success", `Successfully loaded ${addonCounter} addons.`);
        } catch (e) {
            logWithLabel("error", `Error loading addons: ${e}`);
        }
}

export { load, deploy, components, addons };
