import { Event } from '../../../class/builders';
import { logWithLabel } from '../../../utils/console';
export default new Event('shardDisconnect', async (id, event) => {
   logWithLabel(
      'shards',
      [
         `Shards ${id} has event shardDisconnect`,
         `Replayed ${event} events while reconnecting`,
      ].join('\n')
   );
});
