import { Event } from '../../../class/builders';
import { logWithLabel } from '../../../utils/console';
export default new Event('shardError', async (error, id) => {
   logWithLabel(
      'shards',
      [
         `Shards ${id} has errored`,
         `The error is: ${error}`,
         `Day event ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
      ].join('\n')
   );
});
