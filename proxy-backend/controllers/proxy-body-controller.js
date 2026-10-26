const ProxyBodyModel = require('../models/proxy-body-model');
const ProxyBodyService = require('../services/proxy-body-service');

class ProxyBodyController {
    async getAllRecords(req, res) {
        try {
            console.log('=== GET PROXY BODIES ===');
            console.log('Params:', req.params);
            console.log('proxyHeaderId:', req.params.proxyHeaderId);
            
            const proxyHeaderId = req.params.proxyHeaderId;

            const list = await ProxyBodyModel.findAll({ 
                where: { proxyHeaderId: proxyHeaderId } 
            });
            
            console.log('Raw DB result:', JSON.stringify(list, null, 2));
            console.log('Number of records:', list.length);
            
            if (list.length > 0) {
                console.log('First record structure:', {
                    id: list[0].id,
                    productId: list[0].productId,
                    count: list[0].count,
                    unit: list[0].unit,
                    proxyHeaderId: list[0].proxyHeaderId
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
            const record = await ProxyBodyService.createRecord(req.body);
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
            console.log('=== DELETE PROXY BODY ===');
            const recordId = req.params.id;
            console.log('Deleting record ID:', recordId);
            
            const record = await ProxyBodyService.removeRecord(recordId);
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
            console.log('=== UPDATE PROXY BODY ===');
            console.log('Update data:', req.body);
            
            const record = await ProxyBodyService.updateRecord(req.body);
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

module.exports = new ProxyBodyController()




