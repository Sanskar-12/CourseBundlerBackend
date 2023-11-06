import express from "express";
import {  Login, Register, addtoPlaylist, changePassword, changeProfile, changeProfilePicture, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, logout, profile, removefromPlaylist, resetPassword, updateUserRole } from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated.js";
import singleUpload from "../middlewares/singleUpload.js"

const router = express.Router();

//Register
router.post("/register",singleUpload,Register)

//Login
router.post("/login",Login)

//Logout
router.get("/logout",logout)

//profile
router.get("/me",isAuthenticated,profile)

//changePassword
router.put("/changepassword",isAuthenticated,changePassword)

//Change Profile
router.put("/changeprofile",isAuthenticated,changeProfile)

//Change Profile photo
router.put("/changeprofilepicture",isAuthenticated,singleUpload,changeProfilePicture)

//Forget Password
router.post("/forgetpassword",forgetPassword)

//Reset Password
router.put("/resetpassword/:token",resetPassword)

//Add to Playlist
router.post("/addToPlaylist",isAuthenticated,addtoPlaylist)

//Remove from Playlist
router.post("/removefromPlaylist",isAuthenticated,removefromPlaylist)

//Delete my Profile
router.delete("/me",isAuthenticated,deleteMyProfile)

//Admin Routes

//Get all Users
router.get("/admin/getallusers",isAuthenticated,isAdmin,getAllUsers)

//Update User Role
router.put("/admin/updateuserrole/:id",isAuthenticated,isAdmin,updateUserRole)

//Delete User
router.delete("/admin/deleteuser/:id",isAuthenticated,isAdmin,deleteUser)





export default router;
