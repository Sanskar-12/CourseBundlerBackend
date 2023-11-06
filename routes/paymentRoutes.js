import express from "express"
import { VerifyPayment, buySubscription, cancelSubscription, getRazorPayKey } from "../controllers/paymentController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const router=express.Router()


//create subscription
router.get("/subscribe",isAuthenticated,buySubscription)

//verify payment
router.post("/verifypayment",isAuthenticated,VerifyPayment)

//get Razorpay Key
router.get("/getrazorpayapikey",isAuthenticated,getRazorPayKey)

//cancel subscription
router.delete("/cancelsubscription",isAuthenticated,cancelSubscription)

export default router