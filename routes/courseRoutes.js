import express from "express"
import { addCourseLectures, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js"
import singleUpload from "../middlewares/singleUpload.js"
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated.js"

const router=express.Router()

//create Course - only admin
router.post("/create/course",isAuthenticated,isAdmin,singleUpload,createCourse)

//get All Courses
router.get("/courses",getAllCourses)

//get Course Lectures
router.get("/getcourselectures/:id",isAuthenticated,getCourseLectures)

//add Lectures to Course
router.post("/addcourselectures/:id",isAuthenticated,isAdmin,singleUpload,addCourseLectures)

//Delete Course
router.delete("/deletecourse/:id",isAuthenticated,isAdmin,deleteCourse)

//delete lectures
router.delete("/deletelectures",isAuthenticated,isAdmin,deleteLecture)


export default router