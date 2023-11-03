import catchAsyncError from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary";

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please Fill all Fields", 400));
  }

  const file = req.file;

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
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

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return next(new ErrorHandler("Course Not Found", 400));
  }

  course.views = course.views + 1;

  const lectures = course.lectures;

  await course.save();

  res.status(200).json({
    success: true,
    lectures,
  });
});

export const addCourseLectures = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const course = await Course.findById(id);

  if (!course) {
    return next(new ErrorHandler("Course Not Found", 400));
  }

  const file = req.file;

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lectures Added to Course",
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return next(new ErrorHandler("Course Not Found", 400));
  }

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];

    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id,{
      resource_type:"video"
    });
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});

export const deleteLecture=catchAsyncError(async(req,res,next)=>{
  const {courseId,lectureId}=req.query

  const course=await Course.findById(courseId)
  if (!course) {
    return next(new ErrorHandler("Course Not Found", 400));
  }

  const lecture=course.lectures.find((item)=>(item._id.toString()===lectureId.toString()))

  await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
    resource_type:"video"
  })

  course.lectures=course.lectures.filter((item)=>(
    item._id.toString()!==lectureId.toString()
  ))

  course.numOfVideos = course.lectures.length;

  await course.save()

  res.status(200).json({
    success:true,
    message:"Lecture Deleted Successfully"
  })


})