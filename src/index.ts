import { Manager } from "./structure/client";
import { join } from "path";

import { config } from 'dotenv';
import { logWithLabel } from "./utils/console";
config({ path: join(__dirname, '..', '.env')});

const client = new Manager();
client.start(process.env.token!).then(() => {
    logWithLabel("info", `The bot user ${client.user?.username} is ready!`)
}).catch(console.error);
export default client;