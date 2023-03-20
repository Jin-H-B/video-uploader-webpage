import express from "express";
import { handleUserJoinGET, handleUserJoinPOST, handleUserLogin } from "../controllers/userController.js";
import { handleVideoTrending, handleVideoSearch } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", handleVideoTrending);
globalRouter.route("/join").get(handleUserJoinGET).post(handleUserJoinPOST);
globalRouter.get("/login", handleUserLogin);
globalRouter.get("/search", handleVideoSearch);

export default globalRouter;
