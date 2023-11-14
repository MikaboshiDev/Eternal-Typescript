/**
 * The function `dbconnect` connects to a MongoDB database using the provided URL.
 */

import { connect } from 'mongoose';
async function dbconnect(): Promise<void> {
  const db_url = <string>process.env.DB;
  await connect(db_url);
}

export default dbconnect;
