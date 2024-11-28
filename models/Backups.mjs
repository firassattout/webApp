
import Joi from "joi";
import mongoose from "mongoose";

const BackupsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  filePath: { type: String, required: true },
  fileId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Files" },
  dateOfBackup: { type: Date, required: true },
},{ timestamps: true });

export const User = mongoose.model("Backups", BackupsSchema);

export function validateBackups(obj) {
  return Joi.object({
    name: Joi.string().required(),

  }).validate(obj);
}

