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

import { logWithLabel } from './utils/console';
import { Manager } from './structure/client';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '.env') });
export const client = new Manager();
client.start().then(() => {
  logWithLabel('discord', `The bot has been logged in correctly as ${client.user?.tag}!`);
  logWithLabel('discord', `The bot is in ${client.guilds.cache.size} guilds!`);
});

export { Manager };
