import { Event } from '../../../class/builders';
import { logWithLabel } from '../../../utils/console';
export default new Event('error', async (info) => {
    logWithLabel("error", `${info.name}: ${info.message}`);
});