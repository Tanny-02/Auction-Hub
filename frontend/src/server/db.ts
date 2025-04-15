import { JDBC } from 'jdbc';
import { promisify } from 'util';

const config = {
  url: 'jdbc:mysql://localhost:3306/auction_system',
  drivername: 'com.mysql.jdbc.Driver',
  minpoolsize: 5,
  maxpoolsize: 10,
  properties: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};

const jdbc = new JDBC(config);
const initialize = promisify(jdbc.initialize.bind(jdbc));
const reserve = promisify(jdbc.reserve.bind(jdbc));
const release = promisify(jdbc.release.bind(jdbc));

class Database {
  private static instance: Database;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async init() {
    if (!this.initialized) {
      await initialize();
      this.initialized = true;
    }
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const conn = await reserve();
    try {
      const result = await new Promise<T[]>((resolve, reject) => {
        conn.createStatement((err, statement) => {
          if (err) {
            reject(err);
            return;
          }
          statement.executeQuery(sql, params, (err, results) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(results);
          });
        });
      });
      return result;
    } finally {
      await release(conn);
    }
  }

  public async execute(sql: string, params: any[] = []): Promise<number> {
    const conn = await reserve();
    try {
      const result = await new Promise<number>((resolve, reject) => {
        conn.createStatement((err, statement) => {
          if (err) {
            reject(err);
            return;
          }
          statement.executeUpdate(sql, params, (err, count) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(count);
          });
        });
      });
      return result;
    } finally {
      await release(conn);
    }
  }
}

export const db = Database.getInstance();