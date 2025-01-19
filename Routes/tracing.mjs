import express from "express";
import { getTraces } from "../Services/tracingService.mjs";
import { checkUser } from "../middleware/checkUser.mjs";
import {
  TracesExportTracesAsCSVController,
  TracesExportTracesAsPdfController,
  TracesExportTracesAsTextController,
  TracesGroupController,
} from "../controllers/tracingController.mjs";

export const tracing = express.Router();

tracing.get("/tracesFile/:fileId", checkUser, getTraces);
tracing.get("/TracesGroup/:groupId", checkUser, TracesGroupController);

tracing.post("/export/text", checkUser, TracesExportTracesAsTextController);

tracing.post("/export/pdf", checkUser, TracesExportTracesAsPdfController);
tracing.post("/export/csv", checkUser, TracesExportTracesAsCSVController);

export default tracing;
