import express from "express";
import { handleVideoEditGET, handleVideoEditPOST, handleVideoUploadGET, handleVideoUploadPOST, handleVideoWatch, handleVideoDelete } from "../controllers/videoController.js";
import { protectorMiddleware } from "../middlewares.js";

const videoRouter = express.Router();

videoRouter.route("/upload").all(protectorMiddleware).get(handleVideoUploadGET).post(handleVideoUploadPOST);
videoRouter.get("/:id([0-9a-f]{24})", handleVideoWatch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(handleVideoEditGET).post(handleVideoEditPOST);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(handleVideoDelete);

export default videoRouter;
