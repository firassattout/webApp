import express from "express";

import { checkUser } from "../middleware/checkUser.mjs";
import multer from "multer";
import { createFile, showFiles } from "../controllers/fileController.mjs";
const upload = multer();
export const fileRoutes = express.Router();

fileRoutes.post("/createFile", upload.any(), checkUser, createFile);
fileRoutes.get("/showFiles", checkUser, showFiles);
