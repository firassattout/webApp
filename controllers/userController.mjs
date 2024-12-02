import asyncHandler from "express-async-handler";

import userService from "../Services/userService.mjs";

export const userSearch = asyncHandler(async (req, res) => {
  const result = await userService.search(req.body);
  res.json(result);
});
