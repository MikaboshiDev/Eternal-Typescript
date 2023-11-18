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
import { ensureConsole } from '../functions/modules/servers';
import { ExpressServer } from '../../server/express';
import { DiscordTogether } from 'discord-together';
import { Command } from '../class/builders';
import paypal from 'paypal-rest-sdk';
import db from './mongoose';
import YAML from 'yaml';
import { readFileSync } from 'fs';

export class Manager extends Client {
  public categories: Collection<string, string[]> = new Collection();
  public commands: Collection<string, Command> = new Collection();
  discordTogether: DiscordTogether<{ [x: string]: string }>;
  voiceGenerator: Collection<unknown, unknown>;
  precommands: Collection<unknown, unknown>;
  cooldown: Collection<unknown, unknown>;
  aliases: Collection<unknown, unknown>;
  buttons: Collection<unknown, unknown>;
  modals: Collection<unknown, unknown>;
  menus: Collection<unknown, unknown>;
  paypal: typeof paypal;
  giveawaysManager: any;
  config: any;
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
    this.config = YAML.parse(readFileSync('./config/config.yml', 'utf8'));
    paypal.configure({
      mode: this.config.paypal.mode,
      client_id: this.config.paypal.client_id,
      client_secret: this.config.paypal.client_secret,
    });
    this.discordTogether = new DiscordTogether(this);
    this.voiceGenerator = new Collection();
    this.precommands = new Collection();
    this.categories = new Collection();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.paypal = paypal;

    this.cooldown = new Collection();
    this.buttons = new Collection();
    this.modals = new Collection();
    this.menus = new Collection();
    this.setMaxListeners(0);
  }

  public async start() {
    load();
    ensureConsole();
    await super.login(this.config.general.token);
    await components(this);
    await addons(this);
    await deploy();

    await buttons(this);
    await modals(this);
    await menus(this);

    const express = new ExpressServer();
    const port = this.config.api_client.port;
    express.start(port ? parseInt(port) : 3000);
    db();
  }
}
