import express from "express";
import userController from "./user.controller.js";
import { errorHandler } from "../../config/error.js";
const userRoute = express.Router();
//import controller

//define routers
userRoute.post("/register", errorHandler(userController.register));
userRoute.put("/update/:id", errorHandler(userController.update));
userRoute.delete("/delete/:id", errorHandler(userController.delete));
userRoute.get("/login", errorHandler(userController.login));
userRoute.put(
  "/change-password/:id",
  errorHandler(userController.changePassword)
);

export default userRoute;
