import express from "express";
import { handleUserEdit, handleUserDelete, handleUserProfile, handleUserLogout } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/logout", handleUserLogout);
userRouter.get("/:id", handleUserProfile);
userRouter.get("/edit", handleUserEdit);
userRouter.get("/delete", handleUserDelete);

export default userRouter;
