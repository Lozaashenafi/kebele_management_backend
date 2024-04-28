import express, { Router } from "express";
import kebeleController from "./kebele.controller.js";
import { errorHandler } from "../../config/error.js";

const kebeleRoute = express.Router();

//define routers
kebeleRoute.post("/register", errorHandler(kebeleController.register));
kebeleRoute.delete("/delete/:id", errorHandler(kebeleController.delete));
kebeleRoute.put("/update/:id", errorHandler(kebeleController.update));
kebeleRoute.get("/getall", errorHandler(kebeleController.getAll));
export default kebeleRoute;
