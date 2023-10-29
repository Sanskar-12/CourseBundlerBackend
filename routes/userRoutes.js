import express from "express";
import {  Login, Register, logout } from "../controllers/userController.js";

const router = express.Router();

//Register
router.post("/register",Register)

//Login
router.post("/login",Login)

//Logout
router.get("/logout",logout)

export default router;
