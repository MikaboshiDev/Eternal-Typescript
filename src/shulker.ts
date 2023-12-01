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

export { Manager };
