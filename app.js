import express from "express";
import { config } from "dotenv";
import CourseRouter from "./routes/courseRoutes.js";
import UserRouter from "./routes/userRoutes.js";

config({ path: "./config/config.env" });
const app = express();

//Api Section
app.use("/api/v1", CourseRouter);
app.use("/api/v1", UserRouter);

export default app;
