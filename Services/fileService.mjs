import { createFolder } from "../config/createFileForGroup.mjs";
import { uploadFile } from "../config/uploadFiles.mjs";
import {
  endFileTransaction,
  endTransaction,
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
      } else throw new Error("Error");
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
    } else throw new Error("Error");
  }
});
const update = async (req) => {
  const { error } = validateBackups(req?.body);
  if (error) throw new Error(error.details[0].message);
  let filePath;
  const file = await FileRepository.findById(req.body.fileId);

  if (
    file.filesFolder &&
    file.status === "close" &&
    file.reservedBy?.toString() === req.body.IdFromToken
  ) {
    const backups = await Backups.find({ fileId: file.id });
    if (req?.files[0]) {
      const { id } = await uploadFile(
        req?.files[0],
        file.filesFolder,
        backups.length + 1
      );

      if (id) {
        filePath = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
      } else throw new Error("Error");
    }
    if (filePath) {
      const Backup = await new Backups({
        filePath: filePath,
        fileId: file.id,
      }).save();

      await Files.findByIdAndUpdate(file._id, {
        $set: { status: "open", reservedBy: null },
      });

      return { Backup, message: "added successfully" };
    } else throw new Error("Error");
  } else throw new Error("Error");
};

const differences = async (req, res) => {
  const file = await FileRepository.findById(req.body.id);
  if (!file) throw new Error("Error");

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

    const differences = diffLines(text2, text1);

    let modifiedFileContent = "";
    differences.forEach((part) => {
      if (part.added) {
        modifiedFileContent += `${part.value}`;
      } else if (part.removed) {
        modifiedFileContent += `${part.value} -> `;
      } else {
        modifiedFileContent += part.value;
      }
    });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="comparison_result.txt"'
    );
    res.setHeader("Content-Type", "text/plain");
    res.send(modifiedFileContent);
  } catch (error) {
    return { error: "An error occurred while comparing files." };
  }
};

const show = async (data) => {
  const files = await Files.find({
    groupId: data?.params?.groupId,
  })
    .populate("addedBy", "name")
    .lean();

  for (const f of files) {
    const backups = await Backups.findOne({ fileId: f._id }).sort({
      createdAt: -1,
    });
    f.filePath = backups.filePath;
    f.isYouReserved =
      f.reservedBy?.toString() === data.body.IdFromToken || false;
  }
  return files;
};

const checkIn = await withTransaction(
  startTransaction,
  endTransaction
)(async (data, res, context) => {
  if (!data.body.filesId) {
    throw new Error("Error");
  }

  for (const file of data.body.filesId) {
    const result = await Files.findByIdAndUpdate(file, {
      $set: { status: "close", reservedBy: data.body.IdFromToken },
    }).session(context.session);

    if (!result || result.status === "close") {
      throw new Error("File update failed or already closed");
    }
  }
  return { message: "reserved successfully" };
});

const checkOut = async (data) => {
  if (!data.body.fileId) {
    throw new Error("Error");
  }
  const file = await FileRepository.findById(data.body.fileId);

  if (file.reservedBy?.toString() === data.body.IdFromToken) {
    const result = await Files.findByIdAndUpdate(data.body.fileId, {
      $set: { status: "open", reservedBy: null },
    });

    if (!result || result.status === "open") {
      throw new Error("File update failed or already open");
    }
    return { message: "opened successfully" };
  } else throw new Error("you don't have access");
};

const showBackups = async (data) => {
  if (!data.body.fileId) {
    throw new Error("Error");
  }
  const backups = await Backups.find({ fileId: data.body.fileId }).sort({
    createdAt: -1,
  });

  if (!backups) {
    throw new Error("File update failed or already open");
  }
  return backups;
};

export default {
  create,
  show,
  update,
  differences,
  checkIn,
  checkOut,
  showBackups,
};
