
import Joi from "joi";
import mongoose from "mongoose";

const GroupsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  state: { type: String },
  createdByUserId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },

}, { timestamps: true });

export const Groups = mongoose.model("Groups", GroupsSchema);

export function validateGroups(obj) {
  return Joi.object({
    name: Joi.string().required().messages({
      "any.required": "اسم المجموعة مطلوب",
    }),
    createdByUserId: Joi.string().required().messages({
      "any.required": "معرف المستخدم المنشئ مطلوب",
    }),
    photo: Joi.string().optional(),
    state: Joi.string().optional(),
  }).validate(obj);
}