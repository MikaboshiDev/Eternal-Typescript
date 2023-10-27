import { Client, GatewayIntentBits, Partials, Collection, Options, Events } from 'discord.js';
import { addons, buttons, components, deploy, load, menus, modals } from '../utils/handlers';
import { ExpressServer } from '../../server/express';
import '../functions/modules/economy_modules';
import { Command } from '../class/builders';
import paypal from 'paypal-rest-sdk';
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
}
