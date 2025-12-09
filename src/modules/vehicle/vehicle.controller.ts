import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";
//create vehicle
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
// get all vehicle
const getAllVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicle();
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get single vehicle 
const getSingleVehicle=async(req:Request,res:Response)=>{
  try {
    const result = await vehicleServices.getSingleVehicle(req.params.vehicleId as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "vehicle Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicle fetch successfully",
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
}

//update vehicle
const updatedVehicle=async(req:Request,res:Response)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=req.body
     try {
    const result = await vehicleServices.updatedVehicle(
     vehicle_name,type,registration_number,daily_rent_price,availability_status,req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "vehicle Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicle updated successfully",
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
}
export const vehicleController = {
  createVehicle,
  getAllVehicle,
  getSingleVehicle,
  updatedVehicle
};
