import { Event } from '../../../class/builders';
import { logWithLabel } from '../../../utils/console';
export default new Event('debug', async (info) => {
    logWithLabel("debug", info)
});