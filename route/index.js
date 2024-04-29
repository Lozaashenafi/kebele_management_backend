import express from "express";
const appRoute = express.Router();

// import all api route
import userRoute from "../api/user/user.route.js";
import kebeleRoute from "../api/kebele/kebele.route.js";
import RequestRoute from "../api/Request/Request.route.js";
import residentRoute from "../api/resident/resident.route.js";
import newsRoute from "../api/news/news.route.js";
//use
appRoute.use("/news", newsRoute);
appRoute.use("/user", userRoute);
appRoute.use("/kebele", kebeleRoute);
appRoute.use("/request", RequestRoute);
appRoute.use("/resident", residentRoute);

export default appRoute;
