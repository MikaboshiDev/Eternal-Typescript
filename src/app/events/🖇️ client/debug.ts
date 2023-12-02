import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';
import { Event } from '../../../structure/builders';

export default new Event(
  'debug',
  async (info) => {
    logWithLabel('debug', `${info}`);
  },
  true
);
