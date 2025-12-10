


import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    const result = await bookingServices.createBooking(
      Number(customer_id),
      Number(vehicle_id),
      rent_start_date,
      rent_end_date
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllBooking = async (req: Request, res: Response) => {
  try {
    
    const userId = req.user!.id;
    const role = req.user!.role;

    const bookings = await bookingServices.getAllBooking(userId, role);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBooking
};
