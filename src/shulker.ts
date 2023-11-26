import { Plugin, Poru, PoruOptions } from 'poru';
import { logWithLabel } from './utils/console';
import { Manager } from './structure/client';
import { Spotify } from 'poru-spotify';
import { config } from 'dotenv';
import { join } from 'path';
import { Node } from '../global';

config({ path: join(__dirname, '..', '.env') });
export const client = new Manager();
client.start().then(() => {
  logWithLabel('discord', `The bot has been logged in correctly as ${client.user?.tag}!`);
  logWithLabel('discord', `The bot is in ${client.guilds.cache.size} guilds!`);
});

const nodes: Node[] = [
  {
    name: 'Froxy - Server 1',
    host: '31.220.78.45',
    port: 7001,
    password: 'froxymusic',
    secure: false,
  },
  {
    name: 'Froxy - Server 2',
    host: 'the-net.loves-genshin.lol',
    port: 2333,
    password: 'luxurydev.eu',
    secure: false,
  },
];

const pluginSpotify: any = new Spotify({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const poruOptions: PoruOptions = {
  reconnectTries: 60,
  resumeTimeout: 10000,
  library: 'discord.js',
  defaultPlatform: 'ytmsearch',
  plugins: [pluginSpotify],
  send(guildId: any, payload: any) {
    const guild = client.guilds.cache.get(guildId);
    if (guild) guild.shard.send(payload);
  },
};

client.poru = new Poru(client, nodes, poruOptions);
export { Manager };
