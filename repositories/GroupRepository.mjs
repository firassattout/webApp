import { Groups } from "../models/Groups.mjs";

export default new (class GroupRepository {
  async findById(fileId) {
    return await Groups.findById(fileId);
  }

  async findByGroup(groupId) {
    return await Groups.find({ group: groupId });
  }

  async createGroups(data) {
    const group = new Groups(data);
    return await group.save();
  }
})();
