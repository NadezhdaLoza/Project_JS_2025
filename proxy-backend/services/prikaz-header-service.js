const PrikazHeaderModel = require("../models/prikaz-header-model");

class PrikazHeaderService {
  async getAllRecords() {
    try {
      console.log("=== GET ALL PRIKAZ HEADERS ===");
      const list = await PrikazHeaderModel.findAll();
      console.log("Found records:", list.length);
      return list;
    } catch (error) {
      console.error("Error in getAllRecords:", error);
      throw error;
    }
  }

  async getOneRecord(id) {
    try {
      console.log("=== GET ONE PRIKAZ HEADER ===");
      console.log("Looking for ID:", id);

      const record = await PrikazHeaderModel.findOne({ where: { id } });
      console.log("Found record:", record);

      return record;
    } catch (error) {
      console.error("Error in getOneRecord:", error);
      throw error;
    }
  }

  async createRecord(payload) {
    try {
      console.log("=== CREATE PRIKAZ HEADER ===");
      console.log("Payload:", payload);

      const data = await PrikazHeaderModel.create(payload);
      console.log("Created record:", data);

      return data;
    } catch (error) {
      console.error("Error in createRecord:", error);
      throw error;
    }
  }

  async updateRecord(payload) {
    try {
      console.log("=== UPDATE PRIKAZ HEADER ===");
      console.log("Payload:", payload);

      let record = await PrikazHeaderModel.findOne({
        where: { id: payload.id },
      });

      if (!record) {
        throw new Error("Record not found");
      }

      record.number = payload?.number || record.number;
      record.dateOfCreate = payload?.dateOfCreate || record.dateOfCreate;
      record.organizationId = payload?.organizationId || record.organizationId;

      const result = await record.save();
      console.log("Update result:", result);

      return result;
    } catch (error) {
      console.error("Error in updateRecord:", error);
      throw error;
    }
  }

  async removeRecord(recordId) {
    try {
      console.log("=== REMOVE PRIKAZ HEADER ===");
      console.log("Record ID:", recordId);

      const record = await PrikazHeaderModel.destroy({
        where: { id: recordId },
      });
      console.log("Remove result:", record);

      return record;
    } catch (error) {
      console.error("Error in removeRecord:", error);
      throw error;
    }
  }
}

module.exports = new PrikazHeaderService();
