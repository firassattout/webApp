import { Files } from "../models/Files.mjs";

export default new (class FileRepository {
  async findById(fileId) {
    return await Files.findById(fileId);
  }

  async findByGroup(groupId) {
    return await File.find({ group: groupId });
  }

  async createFile(data) {
    const file = new Files(data);
    return await file.save();
  }
  async findByIdAndUpdate(id, data) {
    return await Files.findByIdAndUpdate(id, data);
  }
})();
