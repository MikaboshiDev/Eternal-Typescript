import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  Options,
  Events,
  ChannelType,
  EmbedBuilder,
} from 'discord.js';
import { logWithLabel } from '../src/utils/console';
import akaneko from 'akaneko';

const client = new Client({
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

client.on(Events.MessageCreate, async (message) => {
  const channel = message.channel;
  if (channel.type !== ChannelType.GuildText) return;
  if (!channel.nsfw) return logWithLabel('error', `The channel is not nsfw privacy`);

  const embed = new EmbedBuilder().setTitle('Nsfw - Command').setImage((await akaneko.nsfw.foxgirl()) as any);

  message.channel.send({ embeds: [embed] }).catch((error) => {
    logWithLabel('error', `The message nsfw is not invalid`);
  });
});

client.login('token').then((e) => {
  logWithLabel('discord', `login bot config akaneko commands`);
});
