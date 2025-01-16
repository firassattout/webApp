import express from "express";
import {
  acceptFile,
  fileRequireAcceptForAdmin,
  fileRequireAcceptForUser,
  rejectFile,
  userSearch,
} from "../controllers/userController.mjs";
import { getTraces, TracesGroup } from "../Services/tracingService.mjs";
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
user.get("/rejectFile/:fileId", checkUser, rejectFile);
user.get("/tracesFile/:fileId", checkUser, getTraces);
user.get("/TracesGroup/:groupId", checkUser, TracesGroup);
