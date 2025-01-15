import { Tracing } from "../models/Tracing.mjs";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export const logEvent = async (action, userId, details) => {
  try {
    await Tracing.create({
      action,
      user: userId,
      details,
    });
  } catch (error) {
    console.error("Error logging event:", error.message);
  }
};

export const getTraces = async (req, res) => {
  const traces = await Tracing.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(traces);
};

export const exportTracesAsText = async (traces, outputPath) => {
  const filePath = path.resolve(outputPath, "traces.txt");

  let content = "Tracing Report\n\n";
  traces.forEach((trace, index) => {
    content += `Event ${index + 1}:\n`;
    content += `Action: ${trace.action}\t`;
    content += `User: ${trace.user.name} (${trace.user.email})\t`;
    content += `Details: ${JSON.stringify(trace.details, null, 2)}\n`;
    content += `Timestamp: ${trace.createdAt}\n\n`;
  });

  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
};

export const exportTracesAsPDF = async (traces, outputPath) => {
  const filePath = path.resolve(outputPath, "traces.pdf");
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(16).text("Tracing Report", { underline: true, align: "center" });
  doc.moveDown();

  traces.forEach((trace, index) => {
    doc.fontSize(10).text(`Event ${index + 1}:`, { bold: true });
    doc.text(
      `Action: ${trace.action}     User: ${trace.user.name} (${
        trace.user.email
      })   Details: ${JSON.stringify(trace.details, null, 2)}`
    );

    doc.text(`Timestamp: ${trace.createdAt}`);
    doc.moveDown();
  });

  doc.end();
  return filePath;
};
