import express from "express";
import { handleUserDelete, handleUserProfile, handleUserLogout, handleUserEditGET, handleUserEditPOST } from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout",  protectorMiddleware, handleUserLogout);
userRouter.route("/edit").all(protectorMiddleware).get(handleUserEditGET).post(handleUserEditPOST);
userRouter.get("/delete", handleUserDelete);
userRouter.get("/:id", handleUserProfile);

export default userRouter;
