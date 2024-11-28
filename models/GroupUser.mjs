
import Joi from "joi";
import mongoose from "mongoose";

const GroupUserSchema = new mongoose.Schema({
  groupId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Groups" },
  userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
  roleId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserRoles" },

},{ timestamps: true });

export const User = mongoose.model("GroupUser", GroupUserSchema);

export function validateGroupUser(obj) {
  return Joi.object({
    groupId: Joi.required(),
    userId: Joi.required(),
    roleId: Joi.required(),

  }).validate(obj);
}

