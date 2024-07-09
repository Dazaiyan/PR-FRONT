import api from './api';


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


