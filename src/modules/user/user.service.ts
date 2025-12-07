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
//update user
const updateUser = async (
  name: string,
  email: string,
  phone: number,
  id: string
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING *`,
    [name, email, phone, id]
  );
  return result;
};
export const userServices = {
  createUser,
  getAllUser,
  updateUser
};
