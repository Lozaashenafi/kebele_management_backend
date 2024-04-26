import express from "express";
import userController from "./user.controller.js";
import { errorHandler } from "../../config/error.js";
import { isAdmin, userAuth } from "../../middleware/auth.js";

const userRoute = express.Router();
//import controller

//define routers
userRoute.post(
  "/register",
  [userAuth, isAdmin],
  errorHandler(userController.register)
);
userRoute.put(
  "/update/:id",
  [userAuth, isAdmin],
  errorHandler(userController.update)
);
userRoute.delete(
  "/delete/:id",
  [userAuth, isAdmin],
  errorHandler(userController.delete)
);
userRoute.put(
  "/change-password/:id",
  [userAuth],
  errorHandler(userController.changePassword)
);
userRoute.post("/login", errorHandler(userController.login));

export default userRoute;
