import { Users } from "../models/Users.mjs";

const search = async (data) => {
  const users = await Users.find({
    email: data?.email,
  });
  return users;
};

export default { search };
