import { Request, Response, Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();
//create/Registration user with post method
router.post("/auth/signup", userControllers.createUser);
// get all user with get method
router.get("/users", userControllers.getAllUser);
// update user with put method
router.put("/users/:userId", userControllers.updateUser);
//user delete with delete method
router.delete("/users/:userId", userControllers.deleteUser);

export const userRoutes = router;
