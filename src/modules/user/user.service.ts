import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
//create user
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hasPassword = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users (name,email,password,phone,role) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, hasPassword, phone, role]
  );
  delete result.rows[0].password;
  return result;
};

// get all user
const getAllUser = async () => {
  const result = await pool.query(`
        SELECT id,name,email,phone,role FROM users`);

  return result;
};

// get single user
const getSingleUser = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email =$1`, [ email]);
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

// delete user
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id =$1`, [id]);
  return result;
};
export const userServices = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
