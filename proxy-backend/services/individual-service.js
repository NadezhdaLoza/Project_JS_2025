const IndividualModel = require("../models/individual-model");

class IndividualService {
  async getAllRecords() {
    const list = await IndividualModel.findAll();
    return list;
  }

  async createRecord(payload) {
    const data = await IndividualModel.create(payload);
    return data;
  }

  async updateRecord(payload) {
    let record = await IndividualModel.findOne({ where: { id: payload.id } });
    record.lastName = payload?.lastName || record.lastName;
    record.firstName = payload?.firstName || record.firstName;
    record.patronymic = payload?.patronymic || record.patronymic;
    record.series = payload?.series || record.series;
    record.number = payload?.number || record.number;
    return await record.save();
  }

  async removeRecord(recordId) {
    const record = await IndividualModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new IndividualService();
