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

export const createInternshipReport = async (reportData: any) => {
    try {
        const response = await api.post('/internship/create', reportData);
        return response;
    } catch (error) {
        console.error('Error creating internship report:', error);
        throw error;
    }
};
