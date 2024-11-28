
import Joi from "joi";
import mongoose from "mongoose";

const FilesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  filePath: { type: String, required: true },
  groupId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Groups" },
  reservedBy:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "GroupUser" },
  addedBy:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "GroupUser" },
  acceptedByAdmin: { type: Boolean },

},{ timestamps: true });

export const User = mongoose.model("Files", FilesSchema);

export function validateFiles(obj) {
  return Joi.object({
    name: Joi.string().required(),
    filePath: Joi.string().required(),

  }).validate(obj);
}

