import { Event } from '../../../class/builders';
import { logWithLabel } from '../../../utils/console';
export default new Event('ready', async () => {
   logWithLabel("success", "Bot is ready! the bot is ready to use")
});
