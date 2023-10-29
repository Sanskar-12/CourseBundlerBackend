import express, { urlencoded } from "express";
import { config } from "dotenv";
import CourseRouter from "./routes/courseRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";

config({ path: "./config/config.env" });
const app = express();

//using middlewares
app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

//Api Section
app.use("/api/v1", CourseRouter);
app.use("/api/v1", UserRouter);

export default app;

app.use(ErrorMiddleware);
