
import { Users, validateLoginUser, validateRegisterUser } from "../models/Users.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (data) => {
  const { error } = validateRegisterUser(data);
  if (error) throw new Error(error.details[0].message);

  let user = await Users.findOne({ email: data.email });
  if (user) throw new Error("this email already exist");

  const salt = await bcrypt.genSalt(5);
  data.password = await bcrypt.hash(data.password, salt);

  user = new Users({
    name: data.name,
    email: data.email,
    password: data.password,
  });
  const result = await user.save();
  const access_token = jwt.sign({ id: user.id }, process.env.SECRET);
  const { password, ...other } = result._doc;

  return { ...other, access_token, message: "added successfully  " };
};

const login = async (data) => {
  const { error } = validateLoginUser(data);
  if (error) throw new Error(error.details[0].message);

  const user = await Users.findOne({ email: data.email });
  if (!user) throw new Error("Username or password is incorrect.");

  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) throw new Error("Username or password is incorrect.");

  const access_token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET);
  const { password, ...other } = user._doc;

  return { ...other, access_token };
};

export default { register, login };
