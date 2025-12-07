import { Request, Response } from "express";
import { userServices } from "./user.service";

// createUser
const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;
  const result = await userServices.createUser(name, email, password, phone);
  try {
    res.status(201).json({
      success: true,
      message: "User registered successfully !",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

// get all user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
export const userControllers = {
  createUser,
  getAllUser,
};
