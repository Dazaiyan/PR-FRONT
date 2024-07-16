// src/controllers/NewPasswordController.tsx
import { resetPasswordService } from '../services/NewPasswordService';
import { useNavigate } from 'react-router-dom';

const NewPasswordController = () => {
    const navigate = useNavigate();

    const resetPassword = async (token: string, newPassword: string): Promise<{ error?: string }> => {
        try {
            const response = await resetPasswordService(token, newPassword);
            if (response && response.message === 'Password updated successfully') {
                console.log('Password updated successfully:', response);
                navigate('/login'); // Redirige a la página de inicio de sesión
            } else {
                return { error: 'No se pudo actualizar la contraseña. Por favor, intenta nuevamente.' };
            }
        } catch (error) {
            console.error('Password reset request failed:', error);
            return { error: 'Ha ocurrido un error al actualizar la contraseña. Por favor, intenta nuevamente más tarde.' };
        }

        return {};
    };

    return { resetPassword };
};

export default NewPasswordController;
