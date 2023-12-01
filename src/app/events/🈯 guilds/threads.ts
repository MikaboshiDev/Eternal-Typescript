import { Event } from '../../../structure/builders';

export default new Event('threadCreate', async (thread) => {
  if (thread.joinable && !thread.joined) return await thread.join();
  if (thread.archived) return;
});
