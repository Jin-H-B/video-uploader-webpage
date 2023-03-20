import express from "express";
import { handleUserDelete, handleUserProfile, handleUserLogout, handleUserEditGET, handleUserEditPOST, handleChangePwdGET, handleChangePwdPOST } from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware, avatarUploadMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout",  protectorMiddleware, handleUserLogout);
userRouter.route("/edit").all(protectorMiddleware).get(handleUserEditGET).post(avatarUploadMiddleware.single("avatar"), handleUserEditPOST);
userRouter.route("/change-password").all(protectorMiddleware).get(handleChangePwdGET).post(handleChangePwdPOST);
userRouter.get("/delete", handleUserDelete);
userRouter.get("/:id", handleUserProfile);

export default userRouter;
