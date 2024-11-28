
import Joi from "joi";
import mongoose from "mongoose";

const UserRolesSchema = new mongoose.Schema({
  name: { type: String, required: true },

});

export const User = mongoose.model("UserRoles", UserRolesSchema);

export function validateUserRoles(obj) {
  return Joi.object({
    name: Joi.string().required(),

  }).validate(obj);
}

