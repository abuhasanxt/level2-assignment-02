import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router();
// create Booking
router.post("/bookings", auth(), bookingController.createBooking);
// Get All Bookings
router.get("/bookings", auth(), bookingController.getAllBooking);

router.put(
  "/bookings/:bookingId",
  auth("admin", "customer"),
  bookingController.updateBooking
);

export const bookingRoutes = router;
