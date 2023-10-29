import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

export const Register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please Fill all Fields", 400));
  }

  // const file=req.file

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  //using cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "jsnd",
      url: "bsjdnjn",
    },
  });

  sendToken(res, user, "User created Successfully", 200);
});

export const Login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Fill all Fields", 400));
  }

  // const file=req.file

  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Incorrect Email and Password", 400));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Email and Password", 400));
  }

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out",
    });
});
