import express from "express";
import { handleVideoEditGET, handleVideoEditPOST, handleVideoUploadGET, handleVideoUploadPOST, handleVideoWatch, handleVideoDelete } from "../controllers/videoController.js";

const videoRouter = express.Router();

videoRouter.route("/upload").get(handleVideoUploadGET).post(handleVideoUploadPOST);
videoRouter.get("/:id([0-9a-f]{24})", handleVideoWatch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(handleVideoEditGET).post(handleVideoEditPOST);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(handleVideoDelete);

export default videoRouter;
