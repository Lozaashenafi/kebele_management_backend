import express, { Router } from "express";
import kebeleController from "./kebele.controller.js";
import { errorHandler } from "../../config/error.js";
import { isAdmin, userAuth } from "../../middleware/auth.js";

const kebeleRoute = express.Router();

//define routers
kebeleRoute.post(
  "/register",
  [userAuth, isAdmin],
  errorHandler(kebeleController.register)
);
kebeleRoute.delete(
  "/delete/:id",
  [userAuth, isAdmin],
  errorHandler(kebeleController.delete)
);
kebeleRoute.put(
  "/update/:id",
  [userAuth, isAdmin],
  errorHandler(kebeleController.update)
);
kebeleRoute.get("/getall", errorHandler(kebeleController.getAll));
export default kebeleRoute;
