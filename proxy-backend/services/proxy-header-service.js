const ProxyHeaderModel = require("../models/proxy-header-model");

class ProxyHeaderService {
  async getAllRecords() {
    const list = await ProxyHeaderModel.findAll();
    return list;
  }
  async getOneRecord(id) {
    const record = await ProxyHeaderModel.findOne({ where: { id } });
    return record;
  }

  async createRecord(payload) {
    const data = await ProxyHeaderModel.create(payload);
    return data;
  }

  async updateRecord(payload) {
    let record = await ProxyHeaderModel.findOne({ where: { id: payload.id } });
    record.number = payload?.number || record.number;
    record.dischargeDate = payload?.dischargeDate || record.dischargeDate;
    record.endDate = payload?.endDate || record.endDate;
    record.individualId = payload?.individualId || record.individualId;
    record.organizationId = payload?.organizationId || record.organizationId;
    return await record.save();
  }

  async removeRecord(recordId) {
    const record = await ProxyHeaderModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new ProxyHeaderService();
