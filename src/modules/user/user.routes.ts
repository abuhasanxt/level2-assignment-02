import { Request, Response, Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();
//create user with post method
router.post("/auth/signup", userControllers.createUser);

export const userRoutes = router;
