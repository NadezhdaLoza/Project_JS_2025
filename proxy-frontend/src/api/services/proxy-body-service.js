import { instanceAxios } from "../axios-config";

export default class ProxyBodyService {
    static apiUrl = '/api/proxybodies';

    static async getAllRecords(proxyHeaderId) {
        console.log('Fetching from:', `/api/proxybodies/${proxyHeaderId}`);
        try {
            const res = await instanceAxios.get(`/api/proxybodies/${proxyHeaderId}`);
            console.log('Response data:', res.data);
            return res.data;
        } catch (error) {
            console.error('Axios error:', error.response?.data || error.message);
            return [];
        }
    }
        

    static async createRecord(body) {
        const res = await instanceAxios.post(this.apiUrl, body);
        return res.data;
    }

   static async updateRecord(body) {
        console.log('Updating body record:', body);
        const res = await instanceAxios.put(this.apiUrl, body);
        console.log('Update result:', res.data);
        return res.data;
    }

    static async removeRecord(body) {
        console.log('Deleting body record ID:', body);
        const res = await instanceAxios.delete(this.apiUrl + `/${body}`);
        console.log('Delete result:', res.data);
        return res.data;
    }
}