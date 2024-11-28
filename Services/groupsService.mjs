
import { Groups, validateGroups } from "../models/Groups.mjs";

const create = async (data) => {

  const { error } = validateGroups(data);
  if (error) throw new Error(error.details[0].message);


  const groups = new Groups(data);
  const result = await groups.save();


  return { result, message: "added successfully  " };
};


export default { create };
