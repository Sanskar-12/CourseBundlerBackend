import { User } from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Not Logged In", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});

export const isAdmin=(req,res,next)=>{
  if(req?.user?.role!=="admin")
  {
    return next(new ErrorHandler("User is not allowed to access this resource",400))
  }

  next()
}


export const isSubscriber=(req,res,next)=>{
  if(req?.user?.subscription?.status!=="active" && req?.user?.role!=="admin")
  {
    return next(new ErrorHandler("Only Subscribers can access this resource",400))
  }

  next()
}