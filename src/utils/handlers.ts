import { ClientEvents, REST, Routes } from 'discord.js';
import fs from 'fs';
import { readdirSync } from 'node:fs';
import { Command, Event } from '../class/builders';
import { loadFiles } from '../functions/tools/globArchives';
import { client } from '../shulker';
import { logWithLabel } from './console';
import { config } from './config';

const pathCommands = './src/app/commands/';
const pathEvents = './src/app/events/';

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

      for (const file of readdirSync('./src/structure/poruEvent/').filter((f) => f.endsWith('.ts'))) {
        const poruEvent = require(`../structure/poruEvent/${file}`).event;
        client.poru.on(poruEvent.name, poruEvent.run.bind(null, client));
      }
}

async function deploy() {
  try {
    const rest = new REST({ version: '10' }).setToken(config.general.token!);
    const commands = [...client.commands.values()];
    logWithLabel('info', 'Deploying application commands...');
    await rest.put(Routes.applicationCommands(config.dashboard.client_id), {
      body: commands.map((s) => s.structure),
    });
    logWithLabel('discord', 'Application commands deployed!');
  } catch {
    logWithLabel('error', 'Failed to deploy application commands!');
  }
}

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

async function addons(client: any) {
  const addons = fs.readdirSync('./addons').filter((file) => file.endsWith('.ts'));
  let addonCount = 0;
  for (const file of addons) {
    if (!file.endsWith('.ts')) return;
    require(`../../addons/${file}`)(client);
    addonCount++;
    logWithLabel('addons', `Loaded addon the file rute is: ${file} a total of ${addonCount} addons`);
  }
}

async function buttons(client: any) {
  const Files = await loadFiles('src/app/buttons');
  try {
    Files.forEach((file) => {
      const button = require(file);
      if (!button.id) return;
      client.buttons.set(button.id, button);
    });
  } catch (e) {
    logWithLabel('error', `Error loading buttons: ${e}`);
    console.error(e);
  }
}

async function modals(client: any) {
  const Files = await loadFiles('src/app/modals');
  try {
    Files.forEach((file) => {
      const modal = require(file);
      if (!modal.id) return;
      client.modals.set(modal.id, modal);
    });
  } catch (e) {
    logWithLabel('error', `Error loading modals: ${e}`);
    console.error(e);
  }
}

async function menus(client: any) {
  const Files = await loadFiles('src/app/menus');
  try {
    Files.forEach((file) => {
      const menu = require(file);
      if (!menu.id) return;
      client.menus.set(menu.id, menu);
    });
  } catch (e) {
    logWithLabel('error', `Error loading menus: ${e}`);
    console.error(e);
  }
}

export { addons, buttons, components, deploy, load, menus, modals };
