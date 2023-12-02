import { Event } from '../../../structure/builders';
import { logWithLabel } from '../../../utils/console';
import { logger } from '../../../utils/winston';
export default new Event('error', async (info) => {
  logWithLabel('error', `${info.name}: ${info.message}`);
  logger.error(`${info.name}: ${info.message}`);
});
