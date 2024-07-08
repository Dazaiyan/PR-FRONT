import api from './api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface User {
    email: string;
    password: string;
}

export const registerUser = async (user: User) => {
    try {
        const response = await api.post('/users/create', user);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (user: User) => {
    try {
        const response = await api.post('/users/login', user);
        return response.data; // Assuming the token is in response.data
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const createReportPDF = async (htmlElementId: string) => {
    const input = document.getElementById(htmlElementId);
    if (!input) {
        throw new Error(`Element with id ${htmlElementId} not found`);
    }

    const canvas = await html2canvas(input as HTMLElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('report.pdf');
};
