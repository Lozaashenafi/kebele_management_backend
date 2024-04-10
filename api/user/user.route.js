import express from "express";
import userController from "./user.controller.js";
import { errorHandler } from "../../config/error.js";
const userRoute = express.Router();
//import controller

//define routers
userRoute.post("/register/:id", errorHandler(userController.register));

export default userRoute;
