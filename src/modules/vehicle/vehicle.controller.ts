import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const result = await vehicleServices.createVehicle(req.body);
    // console.log("🚀 ~ result:", result.rows[0])
    res.status(201).json({
      success: true,
      message: "Vehicle Inserted Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleController={
    createVehicle
}