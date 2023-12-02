import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';
import { Event } from '../../../structure/builders';
import { logger } from '../../../utils/winston';

export default new Event('warn', async (info) => {
  logWithLabel('debug', `${info}`);
  logger.warn(info);
});
