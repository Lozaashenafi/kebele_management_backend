import express, { Router } from "express";
import RequestController from "./Request.controller.js";
import { errorHandler } from "../../config/error.js";

const RequestRoute = express.Router();
RequestRoute.post("/id", errorHandler(RequestController.idrequest));
RequestRoute.get("/getid", errorHandler(RequestController.getidrequest));
RequestRoute.post("/birth", errorHandler(RequestController.birthrequests));
RequestRoute.get("/getbirth", errorHandler(RequestController.getbirthRequests));
RequestRoute.put("/approve/:id", errorHandler(RequestController.approve));

export default RequestRoute;
