const DepartmentService = require('../services/department-service');

class DepartmentController {
    async getAllRecords(req, res) {
        try {
            const list = await DepartmentService.getAllRecords();
            return res
                .status(200)
                .json(list);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }
    async createRecord(req, res) {
        try {
            const record = await DepartmentService.createRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }
    async updateRecord(req, res) {
        try {
            const record = await DepartmentService.updateRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }
    async removeRecord(req, res) {
        try {
            const recordId = req.params.id;
            const record = await DepartmentService.removeRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

}

module.exports = new DepartmentController()
