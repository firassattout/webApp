import express from "express";
import { userSearch } from "../controllers/userController.mjs";

export const user = express.Router();

user.post("/userSearch", userSearch);
