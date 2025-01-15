import express from "express";
import {
  exportTracesAsPDF,
  exportTracesAsText,
} from "../Services/tracingService.mjs";
import { Tracing } from "../models/Tracing.mjs";

export const tracing = express.Router();

tracing.get("/export/text", async (req, res) => {
  const traces = await Tracing.find()
    .populate("user", "name email")
    .sort({ timestamp: -1 });
  const filePath = await exportTracesAsText(traces, "./exports");
  res.download(filePath);
});

tracing.get("/export/pdf", async (req, res) => {
  const traces = await Tracing.find()
    .populate("user", "name email")
    .sort({ timestamp: -1 });
  const filePath = await exportTracesAsPDF(traces, "./exports");
  res.download(filePath);
});

export default tracing;
