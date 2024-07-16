// src/services/NewPasswordService.ts
import axios from 'axios';

export const resetPasswordService = async (token: string, newPassword: string) => {
    try {
        const response = await axios.post('http://localhost:3000/users/reset-password', { token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};
