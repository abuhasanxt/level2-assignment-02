import { pool } from "../../config/db";
//create user
const createUser = async (
  name: string,
  email: string,
  password: string,
  phone: number
) => {
  const result = await pool.query(
    `INSERT INTO users (name,email,password,phone) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, email, password, phone]
  );
  return result;
};

// get all user
const getAllUser = async () => {
  const result = await pool.query(`
        SELECT * FROM users`);
  return result;
};
export const userServices = {
  createUser,
  getAllUser,
};
