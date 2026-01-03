import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "You are not allowed",
        });
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token missing",
        });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      const user = await pool.query(
        `
      SELECT * FROM users WHERE  email=$1
      `,
        [decoded.email]
      );

      if (user.rows.length === 0) {
        throw new Error("User not found");
      }
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(401).json({
          error: "unauthorized",
        });
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        details: error,
      });
    }
  };
};

export default auth;
