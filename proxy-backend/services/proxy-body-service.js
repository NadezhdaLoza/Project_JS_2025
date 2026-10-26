const ProxyBodyModel = require("../models/proxy-body-model");

class ProxyBodyService {
  async getAllRecords(proxyHeaderId) {
    const list = await ProxyBodyModel.findAll({
      where: { proxyHeaderId: proxyHeaderId },
    });
    return list;
  }

  async createRecord(payload) {
    const data = await ProxyBodyModel.create(payload);
    return data;
  }

  async updateRecord(payload) {
    console.log("Service: Updating record:", payload);
    let record = await ProxyBodyModel.findOne({ where: { id: payload.id } });

    if (!record) {
      throw new Error("Record not found");
    }

    record.productId = payload?.productId || record.productId;
    record.count = payload?.count || record.count;
    record.unit = payload?.unit || record.unit;
    record.proxyHeaderId = payload?.proxyHeaderId || record.proxyHeaderId;

    const result = await record.save();
    console.log("Service: Update result:", result);
    return result;
  }

  async removeRecord(recordId) {
    console.log("Service: Removing record ID:", recordId);
    const record = await ProxyBodyModel.destroy({
      where: { id: recordId },
    });
    console.log("Service: Remove result:", record);
    return record;
  }
}

module.exports = new ProxyBodyService();
