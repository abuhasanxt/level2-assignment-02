import express, { Request, Response } from "express";

import { userRoutes } from "./modules/user/user.routes";
import initDB from "./config/db";

const app = express();
const port = 5000;
app.use(express.json());

initDB();
// user CRUD 
app.use("/api/v1", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Assignment-02");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
