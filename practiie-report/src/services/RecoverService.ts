import axios from 'axios';

export const requestPasswordReset = async (email: string) => {
    try {
        const response = await axios.post('http://localhost:3000/users/update-password', { email });
        return response.data;
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
};
