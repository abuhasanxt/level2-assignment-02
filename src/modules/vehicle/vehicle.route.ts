import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = Router();
//create vehicle with post method
router.post("/vehicles", auth("admin"), vehicleController.createVehicle);

// get all vehicle with get method
router.get("/vehicles", vehicleController.getAllVehicle);

//get single vehicle with get method
router.get("/vehicles/:vehicleId", vehicleController.getSingleVehicle);

// update vehicle with put method
router.put(
  "/vehicles/:vehicleId",
  auth("admin"),
  vehicleController.updatedVehicle
);
// delete vehicle with delete method
router.delete("/vehicles/:vehicleId", vehicleController.deleteVehicle);

export const vehicleRoutes = router;
