
import asyncHandler from "express-async-handler";
import groupsService from "../Services/groupsService.mjs";

export const createGroups = asyncHandler(async (req, res) => {
  const result = await groupsService.create(req.body);
  res.json(result);
});

