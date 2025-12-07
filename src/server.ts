import express, { Request, Response } from "express";

import { userRoutes } from "./modules/user/user.routes";
import initDB from "./config/db";

const app = express();
const port = 5000;
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle Rental System");
});
// user CRUD
app.use("/api/v1", userRoutes);

//wrong route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
