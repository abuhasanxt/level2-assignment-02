import { Router } from "express";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/vehicles", vehicleController.createVehicle);

export const vehicleRoutes = router;
