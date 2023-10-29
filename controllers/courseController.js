import catchAsyncError from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please Fill all Fields", 400))
  }

  // const file=req.file

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "ndkms",
      url: "nks",
    },
  });

  res.status(200).json({
    success: true,
    message: "Course Created Successfully,Now you can add Lectures in them",
  });
});

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const course = await Course.find().select("-lectures");

  res.status(200).json({
    success: true,
    course,
  });
});
