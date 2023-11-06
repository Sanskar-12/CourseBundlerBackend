import express from "express"
import { contact, getStats, requestaCourse } from "../controllers/otherControllers.js"
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated.js"

const router=express.Router()

//contact form
router.post("/contact",contact)

//Request Form
router.post("/request",requestaCourse)

//Get Dashboard Stats
router.get("/admin/getstats",isAuthenticated,isAdmin,getStats)

export default router