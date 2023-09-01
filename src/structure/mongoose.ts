import { connect } from 'mongoose';
async function dbconnect(): Promise<void> {
     const db_url = <string>process.env.database;
     await connect(db_url);
}

export default dbconnect;