import { Router } from "express";
import newsController from "./news.controller.js";
import { errorHandler } from "../../config/error.js";
// import { adminAuth, userAuth } from "../../middleware/";
import { upload } from "../../config/multer.js";

const newsRoute = Router();

newsRoute.post(
  "/post",
  upload.fields([{ name: "attachments", maxCount: 5 }]),
  errorHandler(newsController.createnew)
);
newsRoute.get("/", errorHandler(newsController.getNews));

newsRoute.put("/:id", errorHandler(newsController.updateNews));
newsRoute.get("/:id", errorHandler(newsController.getsingleNews));
newsRoute.delete("/:id", errorHandler(newsController.deleteNews));
export default newsRoute;
