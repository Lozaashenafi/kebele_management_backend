import express, { Router } from "express";
import kebeleController from "./kebele.controller.js";
import { errorHandler } from "../../config/error.js";

const kebeleRoute = express.Router();

//define routers
kebeleRoute.post("/register", errorHandler(kebeleController.register));

export default kebeleRoute;
