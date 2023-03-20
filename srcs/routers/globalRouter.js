import express from "express";
import { handleUserJoinGET, handleUserJoinPOST, handleUserLoginGET, handleUserLoginPOST } from "../controllers/userController.js";
import { handleVideoTrending, handleVideoSearch } from "../controllers/videoController.js";
import { publicOnlyMiddleware } from "../middlewares.js";

const globalRouter = express.Router();

globalRouter.get("/", handleVideoTrending);
globalRouter.route("/join").all(publicOnlyMiddleware).get(handleUserJoinGET).post(handleUserJoinPOST);
globalRouter.route("/login").all(publicOnlyMiddleware).get(handleUserLoginGET).post(handleUserLoginPOST);
globalRouter.get("/search", handleVideoSearch);

export default globalRouter;
