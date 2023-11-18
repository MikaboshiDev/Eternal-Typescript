/**
 * The function `dbconnect` connects to a MongoDB database using the provided URL.
 */

import { connect } from 'mongoose';
import { config } from '../utils/config';
async function dbconnect(): Promise<void> {
  const db_url = <string>config.general.db;
  await connect(db_url);
}

export default dbconnect;
