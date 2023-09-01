import { Manager } from "./structure/client";
import { join } from "path";
import fs from 'fs';

import { config } from 'dotenv';
config({ path: join(__dirname, '..', '.env')});

const client = new Manager();
client.start(process.env.token!);