import express from "express";
import userController from "./user.controller.js";
import { errorHandler } from "../../config/error.js";

const userRoute = express.Router();
//import controller

//define routers
userRoute.post("/register", errorHandler(userController.register));
userRoute.get("/getallmanager", errorHandler(userController.getAllManager));
userRoute.get("/getallsecretary", errorHandler(userController.getAllSecretary));
userRoute.put("/update/:id", errorHandler(userController.update));
userRoute.delete("/delete/:id", errorHandler(userController.delete));
userRoute.put(
  "/change-password/:id",
  errorHandler(userController.changePassword)
);
userRoute.post("/login", errorHandler(userController.login));

export default userRoute;
