import { createFolder } from "../config/createFileForGroup.mjs";
import { uploadFile } from "../config/uploadFiles.mjs";
import {
  endFileTransaction,
  startTransaction,
} from "../middleware/transactionHandlers.mjs";
import { Backups, validateBackups } from "../models/Backups.mjs";
import { Files, validateFiles } from "../models/Files.mjs";
import { Groups } from "../models/Groups.mjs";
import FileRepository from "../repositories/FileRepository.mjs";
import { withTransaction } from "../middleware/transactionMiddleware.mjs";
import { diffLines } from "diff";
const create = await withTransaction(
  startTransaction,
  endFileTransaction
)(async (req, context) => {
  let folder;
  let filePath;
  const { error } = validateFiles(req?.body);
  if (error) throw new Error(error.details[0].message);

  const group = await Groups.findById(req.body.groupId);
  if (group.filesFolder)
    folder = await createFolder(req.body.name, group.filesFolder);
  context.folder = folder;
  if (folder) {
    if (req?.files[0]) {
      const { id } = await uploadFile(req?.files[0], folder, 0);
      if (id) {
        filePath = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
      } else return { message: "error" };
    }
    if (filePath) {
      const file = await FileRepository.createFile({
        name: req.body.name,
        status: "open",
        groupId: req.body.groupId,
        addedBy: req.body.IdFromToken,
        filesFolder: folder,
      });

      const Backup = await new Backups({
        filePath: filePath,
        fileId: file.id,
      }).save();

      return { file, Backup, message: "added successfully" };
    } else return { message: "error" };
  }
});
const update = async (req) => {
  const { error } = validateBackups(req?.body);
  if (error) throw new Error(error.details[0].message);
  let filePath;
  const file = await FileRepository.findById(req.body.fileId);
  if (file.filesFolder) {
    const backups = await Backups.find({ fileId: file.id });
    if (req?.files[0]) {
      const { id } = await uploadFile(
        req?.files[0],
        file.filesFolder,
        backups.length + 1
      );
      if (id) {
        filePath = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
      } else return { message: "error" };
    }
    if (filePath) {
      const Backup = await new Backups({
        filePath: filePath,
        fileId: file.id,
      }).save();

      return { Backup, message: "added successfully" };
    } else return { message: "error" };
  }
};
const differences = async (req) => {
  const file = await FileRepository.findById(req.body.id);
  if (!file) return { message: "error" };

  const backups = await Backups.find({ fileId: file.id }).sort({
    createdAt: -1,
  });

  const fileUrl1 = backups[0].filePath;
  const fileUrl2 = backups[1].filePath;

  if (!fileUrl1 || !fileUrl2) {
    return res.status(400).json({ error: "Both file URLs are required." });
  }

  try {
    const [file1Response, file2Response] = await Promise.all([
      fetch(fileUrl1),
      fetch(fileUrl2),
    ]);

    const [text1, text2] = await Promise.all([
      file1Response.text(),
      file2Response.text(),
    ]);

    const differences = diffLines(text1, text2);

    const comparisonResult = differences.map((part) => {
      if (part.added) {
        return { type: "added", value: part.value };
      } else if (part.removed) {
        return { type: "removed", value: part.value };
      } else {
        return { type: "unchanged", value: part.value };
      }
    });

    return { differences: comparisonResult };
  } catch (error) {
    console.error("Error comparing files:", error);
    return { error: "An error occurred while comparing files." };
  }
};

const show = async (data) => {
  const files = await Files.find({
    groupId: data?.groupId,
  })
    .populate("addedBy", "name")
    .lean();

  for (const f of files) {
    const backups = await Backups.findOne({ fileId: f._id }).sort({
      createdAt: -1,
    });
    f.filePath = backups.filePath;
  }

  return files;
};

export default { create, show, update, differences };
