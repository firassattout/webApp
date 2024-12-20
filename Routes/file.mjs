import express from "express";

import { checkUser } from "../middleware/checkUser.mjs";
import multer from "multer";
import { createFile, showFiles } from "../controllers/FileController.mjs";
const upload = multer();
export const file = express.Router();

file.post("/createFile", upload.any(), checkUser, createFile);
file.get("/showFiles", checkUser, showFiles);
