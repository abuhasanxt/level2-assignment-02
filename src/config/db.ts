import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString:`${config.connection_str}`,
});
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT  NULL,
        email VARCHAR (150) UNIQUE  NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR  (100) NOT NULL,
        role VARCHAR (100) NOT NULL
        )
        `);
  console.log("connect DB");
};

export default initDB;
