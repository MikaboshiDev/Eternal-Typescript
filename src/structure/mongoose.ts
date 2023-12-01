import { connect, connections } from 'mongoose';
import { config } from '../utils/config';
async function dbconnect(): Promise<void> {
  const db_url = <string>config.general.db;
  await connect(db_url);

  connections.forEach((connection) => {
    connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
  });
}

export default dbconnect;
