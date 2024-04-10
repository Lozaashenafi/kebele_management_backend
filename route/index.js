import express from "express";
const appRoute = express.Router();

// import all api route
import userRoute from "../api/user/user.route.js";
//use
appRoute.use("/user", userRoute);

export default appRoute;
