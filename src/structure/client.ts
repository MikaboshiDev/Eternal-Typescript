import { addons, buttons, components, deploy, load, menus, modals } from '../utils/handlers';
import { Client, Collection, GatewayIntentBits, Options, Partials } from 'discord.js';
import { ExpressServer } from '../../server/express';
import { logWithLabel } from '../utils/console';
import model from '../models/servers/economy';
import emojis from '../../config/emojis.json';
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
  balance: (userid: any, count: any, action: any, message: any) => Promise<any>;
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

    this.balance = async (userid, count, action, message) => {
      try {
        const data = await model.findOne({ userID: userid });
        if (!data || data.money < 0) {
          return message.reply({
            content: [
              `${emojis.error} **${message.author.username}**, you don't have enough money to do this action right now!`,
              `you may not have enough money or your account does not exist in the bank`,
            ].join('\n'),
          });
        }

        switch (action) {
          case 'add':
            await model.findOneAndUpdate({ userID: userid }, { $inc: { money: count } }, { new: true });
            break;
          case 'remove':
            await model.findOneAndUpdate({ userID: userid }, { $inc: { money: -count } }, { new: true });
            break;
          case 'delete':
            await model.findOneAndDelete({ userID: userid });
            message.reply({
              content: [
                `${emojis.correct} **${message.author.username}**, your account has been deleted successfully from the bank!`,
                `the day \`${new Date().toLocaleDateString()}\` at \`${new Date().toLocaleTimeString()}\``,
              ].join('\n'),
            });
            break;
          default:
            message.reply(`${emojis.error} Invalid action specified.`);
        }
      } catch (error) {
        logWithLabel("error", `An error occurred while processing the balance of ${userid}`)
        message.reply({
          content: [
            `${emojis.error} **${message.author.username}**, an error occurred while processing your balance!`,
            `please try again later`,
          ].join("\n")
        });
      }
    };
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
