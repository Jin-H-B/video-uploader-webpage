import express from "express";
import { handleUserDelete } from "../controllers/userController.js";
import { handleVideoEditGET, handleVideoEditPOST, handleVideoUploadGET, handleVideoUploadPOST, handleVideoWatch } from "../controllers/videoController.js";

const videoRouter = express.Router();

videoRouter.route("/upload").get(handleVideoUploadGET).post(handleVideoUploadPOST);
videoRouter.get("/:id", handleVideoWatch);
videoRouter.route("/:id/edit").get(handleVideoEditGET).post(handleVideoEditPOST);
videoRouter.get("/:id/delete", handleUserDelete);

export default videoRouter;
