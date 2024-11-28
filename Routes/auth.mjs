import express from "express";

import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/authController.mjs";

export const auth = express.Router();

auth.post("/register", userRegister);

auth.post("/login", userLogin);

auth.post("/logout", userLogout);
