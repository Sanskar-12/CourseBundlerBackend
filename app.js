import express, { urlencoded } from "express";
import { config } from "dotenv";
import CourseRouter from "./routes/courseRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import OtherRouter from "./routes/otherRoutes.js";
import PaymentRouter from "./routes/paymentRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors"

config({ path: "./config/config.env" });
const app = express();

//using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser())
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:"Content-Type"
}))

//Api Section
app.use("/api/v1", CourseRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", PaymentRouter);
app.use("/api/v1", OtherRouter);

export default app;

app.use(ErrorMiddleware);
