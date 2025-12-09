import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
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

  await pool.query(`
          CREATE TABLE IF NOT EXISTS vehicles(
          id SERIAL PRIMARY KEY,
          vehicle_name VARCHAR (200) NOT NULL,
          type VARCHAR(100) NOT NULL,
          registration_number VARCHAR(200) UNIQUE NOT NULL,
          daily_rent_price INT,
          availability_status VARCHAR(200) NOT NULL
          )
          `);
  console.log("connect DB");
};

export default initDB;
