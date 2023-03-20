import express from "express";
import { handleUserJoinGET, handleUserJoinPOST, handleUserLoginGET, handleUserLoginPOST } from "../controllers/userController.js";
import { handleVideoTrending, handleVideoSearch } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", handleVideoTrending);
globalRouter.route("/join").get(handleUserJoinGET).post(handleUserJoinPOST);
globalRouter.route("/login").get(handleUserLoginGET).post(handleUserLoginPOST);
globalRouter.get("/search", handleVideoSearch);

export default globalRouter;
