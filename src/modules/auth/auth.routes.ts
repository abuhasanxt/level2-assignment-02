import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/auth/signin",authController.signInUser)

export const authRoutes = router;
