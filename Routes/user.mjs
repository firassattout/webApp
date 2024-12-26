import express from "express";
import { userSearch } from "../controllers/userController.mjs";
import { getTraces } from "../Services/tracingService.mjs";

export const user = express.Router();

user.post("/userSearch", userSearch);
user.get("/traces", getTraces);
