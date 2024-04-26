import express from "express";
const appRoute = express.Router();

// import all api route
import userRoute from "../api/user/user.route.js";
import kebeleRoute from "../api/kebele/kebele.route.js";
//use
appRoute.use("/user", userRoute);
appRoute.use("/kebele", kebeleRoute);

export default appRoute;
