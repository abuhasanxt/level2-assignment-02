import { Request, Response } from "express";
import { userServices } from "./user.service";

// createUser
const createUser = async (req: Request, res: Response) => {

  try {
    const result = await userServices.createUser(req.body);
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
// update user
const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  try {
    const result = await userServices.updateUser(
      name,
      email,
      phone,
      req.params.userId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Users Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.userId as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Users Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
export const userControllers = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
};
