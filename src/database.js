import { config } from 'dotenv';
import { connect as _connect, set } from 'mongoose';

config();

class Database {
  constructor() {
    const dbUser = encodeURIComponent(process.env.DB_USER || '');
    const dbPwd = encodeURIComponent(process.env.DB_PASSWORD || '');
    let dbAuthString = '';

    if (dbUser !== '' && typeof dbUser === 'string') {
      dbAuthString = `${dbUser}:${dbPwd}@`;
    }

    const connect = `mongodb://${dbAuthString}${encodeURIComponent(
      process.env.DB_HOST,
    )}:${encodeURIComponent(process.env.DB_PORT)}/${encodeURIComponent(
      process.env.DB_NAME,
    )}`;

    this.connection = _connect(connect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => {
        console.error(`${new Date().toISOString()} - Database Connection.`);
        console.error(error);
        process.exit(500);
      });

    set('useCreateIndex', true);
  }
}

export default new Database();
