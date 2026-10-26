const OrganizationService = require('../services/organization-service');

class OrganizationController {
    async getAllRecords(req, res) {
        try {
            const list = await OrganizationService.getAllRecords();
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
            const record = await OrganizationService.createRecord(req.body);
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
            const record = await OrganizationService.updateRecord(req.body);
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
            const record = await OrganizationService.removeRecord(recordId);
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

module.exports = new OrganizationController()
