import { Event } from '../../../class/builders';
import { logWithLabel } from '../../../utils/console';
export default new Event('shardResume', async (id, replayedEvents) => {
  logWithLabel('shards', [`Shards ${id} has resumed`, `Replayed ${replayedEvents} events while reconnecting`].join('\n'));
});
