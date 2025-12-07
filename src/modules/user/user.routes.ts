import { Request, Response, Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();
//create/Registration user with post method
router.post("/auth/signup", userControllers.createUser);
// get all user with get method
router.get("/users", userControllers.getAllUser);
router.put("/users/:userId",)

export const userRoutes = router;
