/*
# Discord Server: https://discord.gg/pgDje8S3Ed
# Github: https://github.com/MikaboshiDev
# Docs: https://docs.night-support.xyz/
# Dashboard: http://www.night-support.xyz/

# Created by: MikaboshiDev
# Version: 0.0.2
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/

import { addons, buttons, components, deploy, load, menus, modals } from '../utils/handlers';
import { Client, Collection, GatewayIntentBits, Options, Partials } from 'discord.js';
import { ExpressServer } from '../../server/express';
import { logWithLabel } from '../utils/console';
import model from '../models/servers/economy';
import emojis from '../../config/emojis.json';
import { Command } from '../class/builders';
import paypal from 'paypal-rest-sdk';
import winston from 'winston';
import db from './mongoose';

export class Manager extends Client {
  public categories: Collection<string, string[]> = new Collection();
  public commands: Collection<string, Command> = new Collection();
  voiceGenerator: Collection<unknown, unknown>;
  precommands: Collection<unknown, unknown>;
  aliases: Collection<unknown, unknown>;
  buttons: Collection<unknown, unknown>;
  modals: Collection<unknown, unknown>;
  menus: Collection<unknown, unknown>;
  paypal: typeof paypal;
  giveawaysManager: any;
  poru: any;
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
    });
    paypal.configure({
      mode: process.env.paypal_mode!,
      client_id: process.env.paypal_client_id!,
      client_secret: process.env.paypal_client_secret!,
    });
    this.setMaxListeners(0);

    this.voiceGenerator = new Collection();
    this.precommands = new Collection();
    this.categories = new Collection();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.paypal = paypal;

    this.buttons = new Collection();
    this.modals = new Collection();
    this.menus = new Collection();
  }

  public async start() {
    load();
    await super.login(process.env.token!);
    await components(this);
    await addons(this);
    await deploy();

    await buttons(this);
    await modals(this);
    await menus(this);

    const express = new ExpressServer();
    const port = process.env.port_api!;
    express.start(port ? parseInt(port) : 3000);
    db();
  }

  public async log() {
    console.log('\x1b[36m_____  _                       _   \x1b[31m_');
    console.log('\x1b[36m|  __ \\(_)                     | | \x1b[31m(_)');
    console.log('\x1b[36m| |  | |_ ___  ___ ___  _ __ __| |  \x1b[33m_ ___');
    console.log("\x1b[36m| |  | | / __|/ __/ _ \\| '__/ _` | \x1b[33m| / __|");
    console.log('\x1b[36m| |__| | \\__ \\ (_| (_) | | | (_| |\x1b[37m_\x1b[32m| \\__ \\');
    console.log('\x1b[36m|_____/|_|___/\\___\\___/|_|  \\__,_\x1b[37m(_) \x1b[32m|___/');
    console.log('                                  \x1b[34m_/ |');
    console.log('                                 \x1b[35m|__/');
    console.log('\x1b[0m');
  }
}
