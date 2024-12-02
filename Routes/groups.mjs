import express from "express";
import {
  addUser,
  createGroups,
  showGroups,
} from "../controllers/groupsController.mjs";
import { checkUser } from "../middleware/checkUser.mjs";

export const groups = express.Router();

groups.post("/createGroup", checkUser, createGroups);
groups.get("/showGroups", checkUser, showGroups);
groups.post("/addUser", checkUser, addUser);
