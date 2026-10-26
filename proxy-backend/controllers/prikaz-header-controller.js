const PrikazHeaderService = require('../services/prikaz-header-service');

class PrikazHeaderController {
    async getAllRecords(req, res) {
        try {
            const list = await PrikazHeaderService.getAllRecords();
            return res
                .status(200)
                .json(list);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async getOneRecord(req, res) {
        try {
            console.log('=== GET ONE PRIKAZ HEADER ===');
            const recordId = req.params.id;
            console.log('Record ID:', recordId);
            
            const record = await PrikazHeaderService.getOneRecord(recordId);
            console.log('Found record:', record);
            
            return res.status(200).json(record);
        } catch (e) {
            console.error('Error in getOneRecord:', e);
            return res.status(500).json({ 
                error: 'Internal Server Error',
                message: e.message 
            });
        }
    }

    async createRecord(req, res) {
        try {
            console.log('=== CREATE PRIKAZ HEADER ===');
            console.log('Create data:', req.body);
            
            const record = await PrikazHeaderService.createRecord(req.body);
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
    
    async updateRecord(req, res) {
        try {
            console.log('=== UPDATE PRIKAZ HEADER ===');
            console.log('Update data:', req.body);
            
            const record = await PrikazHeaderService.updateRecord(req.body);
            console.log('Update result:', record);
            
            return res
                .status(200)
                .json(record);
        } catch (e) {
            console.error('Error in updateRecord:', e);
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
            console.log('=== REMOVE PRIKAZ HEADER ===');
            const recordId = req.params.id;
            console.log('Record ID:', recordId);
            
            const record = await PrikazHeaderService.removeRecord(recordId);
            console.log('Remove result:', record);
            
            return res
                .status(200)
                .json(record);
        } catch (e) {
            console.error('Error in removeRecord:', e);
            return res
                .status(500)
                .json({ 
                    error: 'Internal Server Error',
                    message: e.message 
                });
        }
    }

}

module.exports = new PrikazHeaderController()