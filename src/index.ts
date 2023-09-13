import { logWithLabel } from './utils/console';
import { Manager } from './structure/client';
import { config } from 'dotenv';
import '../server/websocket';
import { join } from 'path';
import { postLicence } from './structure/licence';

config({ path: join(__dirname, '..', '.env') });

const data = postLicence(process.env.licence!);
if (!data) process.exit(1);

export const client = new Manager();
client.start().then(() => {
   logWithLabel(
      'discord',
      `The bot has been logged in correctly as ${client.user?.tag}!`
   );
   logWithLabel('discord', `The bot is in ${client.guilds.cache.size} guilds!`);
});

export { Manager };
