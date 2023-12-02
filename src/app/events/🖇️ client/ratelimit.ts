import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';
import { Event } from '../../../structure/builders';
import { logger } from '../../../utils/winston';

export default new Event('invalidated', async () => {
  logWithLabel('error', `${emojis.error} The bot is invalidated.`);
  logger.warn('The bot is invalidated.');
});
