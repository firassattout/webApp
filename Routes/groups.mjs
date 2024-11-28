import express from "express";
import { createGroups } from "../controllers/groupsController.mjs";



export const groups = express.Router();

groups.post("/createGroup", createGroups);

