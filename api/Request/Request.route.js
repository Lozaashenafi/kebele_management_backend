import express, { Router } from "express";
import RequestController from "./Request.controller.js";
import { errorHandler } from "../../config/error.js";

const RequestRoute = express.Router();
RequestRoute.post("/id", errorHandler(RequestController.idrequest));
RequestRoute.post("/birth", errorHandler(RequestController.birthRequests));

export default RequestRoute;
