import { Files } from "../models/Files.mjs";
import { GroupUser } from "../models/GroupUser.mjs";
import { Users } from "../models/Users.mjs";

const search = async (data) => {
  const users = await Users.find({
    email: data?.email,
  });
  return users;
};

const fileRequireAcceptForAdmin = async (req) => {
  const groupUser = await GroupUser.findOne({
    userId: req.body?.IdFromToken,
    groupId: req?.params?.groupId,
  });
  if (!groupUser) {
    throw new Error(" not found");
  }
  if (groupUser?.role !== "admin") {
    throw new Error("you not admin");
  }
  const files = await Files.find({
    groupId: req?.params?.groupId,
    acceptedByAdmin: false,
  }).populate("addedBy", "name");
  return files;
};
const fileRequireAcceptForUser = async (req) => {
  const files = await Files.find({
    groupId: req?.params?.groupId,
    addedBy: req?.body?.IdFromToken,
    acceptedByAdmin: false,
  }).populate("addedBy", "name");
  return files;
};

const acceptFile = async (req) => {
  if (!req?.params?.fileId) {
    throw new Error("id not found");
  }
  const file = await Files.findById(req.params?.fileId);
  const groupUser = await GroupUser.findOne({
    userId: req.body?.IdFromToken,
    groupId: file.groupId,
  });

  if (groupUser.role !== "admin") {
    throw new Error("you are not admin");
  }
  await Files.findByIdAndUpdate(req.params?.fileId, {
    $set: { acceptedByAdmin: true },
  });

  return { message: "accepted successfully" };
};

const rejectFile = async (req) => {
  if (!req?.params?.fileId) {
    throw new Error("id not found");
  }
  const file = await Files.findById(req.params?.fileId);
  const groupUser = await GroupUser.findOne({
    userId: req.body?.IdFromToken,
    groupId: file.groupId,
  });

  if (groupUser.role !== "admin") {
    throw new Error("you are not admin");
  }
  const files = await Files.findByIdAndDelete(data.params.fileId);
  if (files) await deleteFile2(files.filesFolder);

  return { message: "rejected successfully" };
};

export default {
  search,
  fileRequireAcceptForAdmin,
  fileRequireAcceptForUser,
  acceptFile,
  rejectFile,
};
