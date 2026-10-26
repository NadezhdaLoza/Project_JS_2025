const ProductModel = require("../models/product-model");

class ProductService {
  async getAllRecords() {
    const list = await ProductModel.findAll();
    return list;
  }

  async createRecord(payload) {
    const data = await ProductModel.create(payload);
    return data;
  }

  async updateRecord(payload) {
    let record = await ProductModel.findOne({ where: { id: payload.id } });
    record.title = payload?.title || record.title;
    return await record.save();
  }

  async removeRecord(recordId) {
    const record = await ProductModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new ProductService();
