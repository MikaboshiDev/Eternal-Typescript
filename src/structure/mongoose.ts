import { connect } from 'mongoose';

/**
 * The function `dbconnect` connects to a database using the URL provided in the `database` environment
 * variable.
 */
async function dbconnect(): Promise<void> {
  const db_url = <string>process.env.database;
  await connect(db_url);
}

export default dbconnect;
