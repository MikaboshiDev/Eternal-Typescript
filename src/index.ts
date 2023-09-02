import { logWithLabel } from './utils/console';
import { Manager } from './structure/client';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '.env') });
export const client = new Manager();
client.start().then(() => {
   logWithLabel('discord', `The bot has been logged in correctly as ${client.user?.tag}!`);
});
