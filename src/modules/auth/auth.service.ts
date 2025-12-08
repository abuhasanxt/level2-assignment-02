import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const signInUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email]
  );

  const matchPassword = await bcrypt.compare(password, result.rows[0].password);

  if (!matchPassword) {
    throw new Error("Invalid password");
    
  }
  return result;
};

export const authServices = {
  signInUser,
};
