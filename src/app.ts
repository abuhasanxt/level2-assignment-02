import express, { Request, Response } from "express";

import { userRoutes } from "./modules/user/user.routes";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.route";
import { bookingRoutes } from "./modules/bookings/booking.route";

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle Rental System");
});
// user CRUD
app.use("/api/v1", userRoutes);
// user auth
app.use("/api/v1", authRoutes);
//vehicle CRUD
app.use("/api/v1", vehicleRoutes);

// bookings CRUD
app.use("/api/v1", bookingRoutes);

//wrong route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not found",
    path: req.path,
  });
});

export default app;
