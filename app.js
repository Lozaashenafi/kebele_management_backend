import express, { urlencoded } from "express";
import cors from "cors";
//import costants
import { PORT, BASE_URL } from "./config/secrate.js";
const app = express();

// middleware include
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config cors

app.use(cors({ origin: true, credentials: true }));
//import api router
import appRoute from "./route/index.js";
app.use("/api", appRoute);

//testing route
app.get("/", (req, res, next) => {
  return res.send("<h1>Working ... </h1>");
});

//listen server
app.listen(PORT, (erro) => {
  if (erro) throw erro;
  else console.log(BASE_URL);
});
