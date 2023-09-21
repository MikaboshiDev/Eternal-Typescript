import { postLicence } from './structure/licence';
import { logWithLabel } from './utils/console';
import { Manager } from './structure/client';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '.env') });
const data = postLicence(process.env.licence!);
if (!data) process.exit(1);

/* The code is creating an instance of the `Manager` class and assigning it to the `client` constant.
Then, it calls the `start()` method of the `client` object, which starts the bot and logs it in to
the Discord server. Once the bot is logged in, the `then()` method is used to execute the callback
function, which logs a success message with the bot's username and the number of guilds it is
currently in. */
export const client = new Manager();
client.start().then(() => {
  logWithLabel('discord', `The bot has been logged in correctly as ${client.user?.tag}!`);
  logWithLabel('discord', `The bot is in ${client.guilds.cache.size} guilds!`);
});

export { Manager };
