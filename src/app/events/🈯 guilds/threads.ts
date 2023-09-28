import { fetchBalance, toFixedNumber } from '../../../functions/modules/economy_modules';
import { Event } from '../../../class/builders';
import user from '../../../models/economy/user';

export default new Event('threadCreate', async (thread) => {
  if (thread.joinable && !thread.joined) return await thread.join();
  if (thread.archived) return;
});
