import express from "express"
import { createCourse, getAllCourses } from "../controllers/courseController.js"

const router=express.Router()

//create Course - only admin
router.post("/create/course",createCourse)

//get All Courses
router.get("/courses",getAllCourses)

export default router