import { Groups } from "../models/Groups.mjs";

export default new (class GroupRepository {
  async findById(fileId) {
    return await Files.findById(fileId);
  }

  async findByGroup(groupId) {
    return await File.find({ group: groupId });
  }

  async createGroups(data) {
    const group = new Groups(data);
    return await group.save();
  }
})();
