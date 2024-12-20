import { createFolder } from "../config/createFileForGroup.mjs";
import { uploadFile } from "../config/uploadFiles.mjs";
import { Files, validateFiles } from "../models/Files.mjs";
import { Groups } from "../models/Groups.mjs";
import { GroupUser } from "../models/GroupUser.mjs";

const create = async (req) => {
  let folder;
  const { error } = validateFiles(req?.body);
  if (error) throw new Error(error.details[0].message);
  const group = await Groups.findById(req.body.groupId);
  if (group.filesFolder)
    folder = await createFolder(req.body.name, group.filesFolder);

  if (folder) {
    if (req?.files[0]) {
      const { id } = await uploadFile(req?.files[0], folder, 0);
      if (id) {
        req.body.filePath = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
      }
    }

    const file = new Files({
      name: req.body.name,
      status: "open",
      filePath: req.body.filePath,
      groupId: req.body.groupId,
      addedBy: req.body.IdFromToken,
      filesFolder: folder,
    });
    const result = await file.save();

    return { result, message: "added successfully  " };
  }
};

const show = async (data) => {
  const files = await Files.find({
    groupId: data?.groupId,
  });
  return files;
};
export default { create, show };
