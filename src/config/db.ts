import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_eGh8iLfo6nsW@ep-orange-mountain-a8wteykw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
});
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT  NULL,
        email VARCHAR (150) UNIQUE  NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR  (100) NOT NULL,
        role VARCHAR (100)
        )
        `);
  console.log("connect DB");
};

export default initDB;
