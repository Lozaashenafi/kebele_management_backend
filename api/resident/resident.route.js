import express, { Router } from "express";
import residentController from "./resident.controller.js";
import { errorHandler } from "../../config/error.js";

const residentRoute = express.Router();
residentRoute.post("/register", errorHandler(residentController.register));
residentRoute.get("/getall", errorHandler(residentController.getAll));

export default residentRoute;
