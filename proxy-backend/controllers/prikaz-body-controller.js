const PrikazBodyModel = require('../models/prikaz-body-model');
const PrikazBodyService = require('../services/prikaz-body-service');

class PrikazBodyController {
    async getAllRecords(req, res) {
        try {
            console.log('=== GET PRIKAZ BODIES ===');
            console.log('Params:', req.params);
            console.log('HeaderId:', req.params.HeaderId);
            
            const HeaderId = req.params.HeaderId;

            const list = await PrikazBodyModel.findAll({ 
                where: { HeaderId: HeaderId } 
            });
            
            console.log('Raw DB result:', JSON.stringify(list, null, 2));
            console.log('Number of records:', list.length);
            
            if (list.length > 0) {
                console.log('First record structure:', {
                    id: list[0].id,
                    HeaderId: list[0].HeaderId,
                    IndividualId: list[0].IndividualId,
                    tabNumber: list[0].tabNumber,
                    departmentOldId: list[0].departmentOldId,
                    departmentNewId: list[0].departmentNewId,
                    postOld: list[0].postOld,
                    postNew: list[0].postNew,
                    salary: list[0].salary,
                    transferFrom: list[0].transferFrom,
                    transferTo: list[0].transferTo,
                    numberOfContract: list[0].numberOfContract
                });
            }
            
            return res.status(200).json(list);
            
        } catch (e) {
            console.error('Error in getAllRecords:', e);
            console.error('Error stack:', e.stack);
            return res.status(500).json({ error: e.message });
        }
    }

    async createRecord(req, res) {
        try {
            console.log('=== CREATE PRIKAZ BODY ===');
            console.log('Create data:', req.body);
            
            const record = await PrikazBodyService.createRecord(req.body);
            console.log('Create result:', record);
            
            return res
                .status(200)
                .json(record);
        } catch (e) {
            console.error('Error in createRecord:', e);
            return res
                .status(500)
                .json({ 
                    error: 'Internal Server Error',
                    message: e.message 
                });
        }
    }
    
    async removeRecord(req, res) {
        try {
            console.log('=== DELETE PRIKAZ BODY ===');
            const recordId = req.params.id;
            console.log('Deleting record ID:', recordId);
            
            const record = await PrikazBodyService.removeRecord(recordId);
            console.log('Delete result:', record);
            
            return res.status(200).json(record);
        } catch (e) {
            console.error('Error in removeRecord:', e);
            console.error('Error stack:', e.stack);
            return res.status(500).json({ 
                error: 'Internal Server Error',
                message: e.message 
            });
        }
    }
    
    async updateRecord(req, res) {
        try {
            console.log('=== UPDATE PRIKAZ BODY ===');
            console.log('Update data:', req.body);
            
            const record = await PrikazBodyService.updateRecord(req.body);
            console.log('Update result:', record);
            
            return res.status(200).json(record);
        } catch (e) {
            console.error('Error in updateRecord:', e);
            console.error('Error stack:', e.stack);
            return res.status(500).json({ 
                error: 'Internal Server Error',
                message: e.message 
            });
        }
    }

}

module.exports = new PrikazBodyController()