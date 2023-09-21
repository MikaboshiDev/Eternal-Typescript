import { Event } from '../../../class/builders';
import { logWithLabel } from '../../../utils/console';
export default new Event('shardReconnecting', async (id) => {
  logWithLabel(
    'shards',
    [`Shards ${id} has reconnected`, `Day event ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`].join('\n')
  );
});
