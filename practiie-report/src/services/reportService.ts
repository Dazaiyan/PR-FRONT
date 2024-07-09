// services/reportService.ts

import api from './api';

export const createReport = async (reportData: any) => {
    try {
        const response = await api.post('/reports/create', reportData);
        return response.data;
    } catch (error) {
        console.error('Error creating report:', error);
        throw error;
    }
};
