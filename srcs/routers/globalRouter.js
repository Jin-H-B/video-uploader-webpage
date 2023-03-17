import express from "express";
import { handleUserJoin, handleUserLogin } from "../controllers/userController.js";
import { handleVideoTrending, handleVideoSearch } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", handleVideoTrending);
globalRouter.get("/join", handleUserJoin);
globalRouter.get("/login", handleUserLogin);
globalRouter.get("/search", handleVideoSearch);

export default globalRouter;
