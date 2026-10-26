const PrikazBodyModel = require("../models/prikaz-body-model");

class PrikazBodyService {
  async getAllRecords(HeaderId) {
    try {
      console.log("=== GET ALL PRIKAZ BODIES ===");
      console.log("HeaderId:", HeaderId);

      const list = await PrikazBodyModel.findAll({
        where: { HeaderId: HeaderId },
      });
      console.log("Found records:", list.length);

      return list;
    } catch (error) {
      console.error("Error in getAllRecords:", error);
      throw error;
    }
  }

  async createRecord(payload) {
    try {
      console.log("=== CREATE PRIKAZ BODY ===");
      console.log("Payload:", payload);

      const data = await PrikazBodyModel.create(payload);
      console.log("Created record:", data);

      return data;
    } catch (error) {
      console.error("Error in createRecord:", error);
      throw error;
    }
  }

  async updateRecord(payload) {
    try {
      console.log("=== UPDATE PRIKAZ BODY ===");
      console.log("Payload:", payload);

      let record = await PrikazBodyModel.findOne({ where: { id: payload.id } });

      if (!record) {
        throw new Error("Record not found");
      }

      record.HeaderId = payload?.HeaderId || record.HeaderId;
      record.IndividualId = payload?.IndividualId || record.IndividualId;
      record.tabNumber = payload?.tabNumber || record.tabNumber;
      record.departmentOldId =
        payload?.departmentOldId || record.departmentOldId;
      record.departmentNewId =
        payload?.departmentNewId || record.departmentNewId;
      record.postOld = payload?.postOld || record.postOld;
      record.postNew = payload?.postNew || record.postNew;
      record.salary = payload?.salary || record.salary;
      record.transferFrom = payload?.transferFrom || record.transferFrom;
      record.transferTo = payload?.transferTo || record.transferTo;
      record.numberOfContract =
        payload?.numberOfContract || record.numberOfContract;

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
      console.log("=== REMOVE PRIKAZ BODY ===");
      console.log("Record ID:", recordId);

      const record = await PrikazBodyModel.destroy({ where: { id: recordId } });
      console.log("Remove result:", record);

      return record;
    } catch (error) {
      console.error("Error in removeRecord:", error);
      throw error;
    }
  }
}

module.exports = new PrikazBodyService();
