import { checkLicense } from './structure/licence';
import { logWithLabel } from './utils/console';
import { Manager } from './structure/client';
import { config } from './utils/config';
import _package from '../package.json';

const licence = config.general.licence;
const version = _package.version;
const product = _package.name;

async function authLicence() {
  const authLicence = await checkLicense(licence, product, version);
  if (!authLicence) {
    logWithLabel('licence', 'The licence is invalid, the bot will not start.');
    logWithLabel('licence', 'Please check your licence and try again.');
    process.exit(1);
  }
}
export const client = new Manager();
authLicence();
client.start().then(() => {
  logWithLabel('licence', 'The licence is valid, the bot will start now.');
  logWithLabel('discord', `The bot has been logged in correctly as ${client.user?.tag}!`);
  logWithLabel('discord', `The bot is in ${client.guilds.cache.size} guilds!`);
});

export { Manager };
