import { upload } from "../config/uploadImage.mjs";
import { Groups, validateGroups } from "../models/Groups.mjs";
import { GroupUser } from "../models/GroupUser.mjs";

const create = async (req) => {
  if (req?.files[0]) {
    const { id } = await upload(req?.files[0]);
    if (id) {
      req.body.photo = `https://drive.google.com/thumbnail?id=${id}&sz=s300`;
    }
  }
  const { error } = validateGroups(req?.body);
  if (error) throw new Error(error.details[0].message);
  const groups = new Groups(req?.body);
  const result = await groups.save();
  new GroupUser({
    groupId: result?.id,
    userId: req?.body?.IdFromToken,
    role: "admin",
  }).save();

  return { result, message: "added successfully  " };
};

const show = async (data) => {
  const groupUser = await GroupUser.find({
    userId: data?.IdFromToken,
  }).populate("groupId");
  return groupUser;
};

const addUser = async (data) => {
  if (!data.userId || !data.groupId) {
    throw new Error("data not found");
  }

  const admin = await GroupUser.findOne({
    userId: data?.IdFromToken,
    groupId: data.groupId,
  });
  if (admin.role !== "admin") {
    throw new Error("you haven't access for this group");
  }
  const added = await GroupUser.findOne({
    userId: data?.userId,
    groupId: data?.groupId,
  });
  if (added) {
    return { message: "This user is already added." };
  }
  const result = await new GroupUser({
    userId: data?.userId,
    groupId: data?.groupId,
  }).save();

  if (!result) {
    throw new Error("group or user not found");
  }
  return { message: "added successfully  " };
};
export default { create, show, addUser };
