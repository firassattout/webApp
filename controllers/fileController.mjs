import asyncHandler from "express-async-handler";
import fileService from "../Services/fileService.mjs";

export const createFile = asyncHandler(async (req, res) => {
  const result = await fileService.create(req);
  res.json(result);
});

export const updateFile = asyncHandler(async (req, res) => {
  const result = await fileService.update(req);
  res.json(result);
});
export const differencesFile = asyncHandler(async (req, res) => {
  const result = await fileService.differences(req, res);
  res.json(result);
});

export const showFiles = asyncHandler(async (req, res) => {
  const result = await fileService.show(req.params);
  res.json(result);
});
