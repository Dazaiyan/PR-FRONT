import { requestPasswordReset } from '../services/RecoverService';
import { useNavigate } from 'react-router-dom';

const RecoverController = () => {
    const navigate = useNavigate();

    const recoverPassword = async (email: string): Promise<{ error?: string }> => {
        try {
            const response = await requestPasswordReset(email);
            if (response && response.message === 'Password reset email sent') {
                console.log('Password reset email sent:', response);
                navigate('/login'); // Redirige a una página que indica que el correo ha sido enviado
            } else {
                // Devolver un objeto con la propiedad "error" si no se pudo enviar el correo
                return { error: 'No se pudo enviar el correo de restablecimiento. Por favor, intenta nuevamente.' };
            }
        } catch (error) {
            console.error('Password reset request failed:', error);
            // Devolver un objeto con la propiedad "error" si hay un error general
            return { error: 'Ha ocurrido un error al solicitar el restablecimiento de contraseña. Por favor, intenta nuevamente más tarde.' };
        }

        // Devolver un objeto vacío si la función no devuelve ningún error
        return {};
    };

    return { recoverPassword };
};

export default RecoverController;
