// src/controllers/LoginController.ts
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginController = () => {
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await loginUser({ email, password });
            if (response && response.token) {
                console.log('Login successful:', response);
                localStorage.setItem('token', response.token);
                navigate('/home');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again later.');
        }
    };

    return { handleLogin };
};

export default LoginController;
