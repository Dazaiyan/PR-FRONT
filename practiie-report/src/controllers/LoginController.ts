// LoginController.ts
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginController = () => {
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string): Promise<{ error?: string }> => {
        try {
            const response = await loginUser({ email, password });
            if (response && response.token) {
                console.log('Login successful:', response);
                localStorage.setItem('token', response.token); // Almacenar el token en localStorage
                navigate('/home');
            } else {
                // Devolver un objeto con la propiedad "error" si las credenciales son incorrectas
                return { error: 'Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.' };
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Devolver un objeto con la propiedad "error" si hay un error general
            return { error: 'Ha ocurrido un error al iniciar sesión. Por favor, intenta nuevamente más tarde.' };
        }

        // Devolver un objeto vacío si la función no devuelve ningún error
        return {};
    };

    return { handleLogin };
};

export default LoginController;

