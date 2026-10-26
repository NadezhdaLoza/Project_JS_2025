const DepartmentModel = require("../models/department-model");

class DepartmentService {
  async getAllRecords() {
    const list = await DepartmentModel.findAll();
    return list;
  }

  async createRecord(payload) {
    const data = await DepartmentModel.create(payload);
    return data;
  }

  async updateRecord(payload) {
    let record = await DepartmentModel.findOne({ where: { id: payload.id } });
    record.name = payload?.name || record.name;
    record.classOfWorkingConditions =
      payload?.classOfWorkingConditions || record.classOfWorkingConditions;
    record.startTimeOfWorkingDay =
      payload?.startTimeOfWorkingDay || record.startTimeOfWorkingDay;
    record.endTimeOfWorkingDay =
      payload?.endTimeOfWorkingDay || record.endTimeOfWorkingDay;
    return await record.save();
  }

  async removeRecord(recordId) {
    const record = await DepartmentModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new DepartmentService();
