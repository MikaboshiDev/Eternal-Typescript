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
    name: '',
    host: '',
    port: 3000,
    password: '',
    secure: false,
  }
];

const pluginSpotify: any = new Spotify({
  clientID: client.config.spotify.clientID,
  clientSecret: client.config.spotify.clientSecret,
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
