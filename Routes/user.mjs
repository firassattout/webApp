import express from "express";
import {
  acceptFile,
  fileRequireAcceptForAdmin,
  fileRequireAcceptForUser,
  userSearch,
} from "../controllers/userController.mjs";
import { getTraces } from "../Services/tracingService.mjs";
import { checkUser } from "../middleware/checkUser.mjs";

export const user = express.Router();

user.post("/userSearch", userSearch);
user.get(
  "/fileRequireAcceptForAdmin/:groupId",
  checkUser,
  fileRequireAcceptForAdmin
);
user.get(
  "/fileRequireAcceptForUser/:groupId",
  checkUser,
  fileRequireAcceptForUser
);
user.get("/acceptFile/:fileId", checkUser, acceptFile);
user.get("/traces", getTraces);
