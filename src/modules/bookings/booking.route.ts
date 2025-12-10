import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/bookings",auth(),bookingController.createBooking)
export const bookingRoutes = router;
