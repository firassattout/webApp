import asyncHandler from "express-async-handler";
import fileService from "../Services/fileService.mjs";

export const createFile = asyncHandler(async (req, res) => {
  const result = await fileService.create(req);
  res.json(result);
});

export const showFiles = asyncHandler(async (req, res) => {
  const result = await fileService.show(req.body);
  res.json(result);
});
