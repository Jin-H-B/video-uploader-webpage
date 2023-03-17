import express from "express";
import { handleUserDelete } from "../controllers/userController.js";
import { handleVideoEdit, handleVideoUpload, handleVideoWatch } from "../controllers/videoController.js";

const videoRouter = express.Router();

videoRouter.get("/upload", handleVideoUpload);
videoRouter.get("/:id", handleVideoWatch);
videoRouter.get("/:id/edit", handleVideoEdit);
videoRouter.get("/:id/delete", handleUserDelete);

export default videoRouter;
