
import asyncHandler from "express-async-handler";
import authService from "../Services/authService.mjs";

export const userRegister = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.json(result);
});

export const userLogin = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.json(result);
});

export const userLogout = asyncHandler(async (req, res) => {
  res.json({ message: "logged out" });
});
