// src/components/NewPassword.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Alert, AlertTitle } from '@mui/material';
import Loader from '../utils/Loader'; 
import './NewPassword.css';

interface NewPasswordProps {
    resetPassword: (token: string, newPassword: string) => Promise<{ error?: string }>;
}

const NewPassword: React.FC<NewPasswordProps> = ({ resetPassword }) => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const token = new URLSearchParams(location.search).get('token');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setAlertSeverity('error');
            setAlertMessage('Token no válido o no encontrado.');
            setShowAlert(true);
            return;
        }

        if (newPassword.length < 6) {
            setAlertSeverity('error');
            setAlertMessage('La nueva contraseña debe tener al menos 6 caracteres.');
            setShowAlert(true);
            return;
        }

        if (newPassword !== confirmPassword) {
            setAlertSeverity('error');
            setAlertMessage('Las contraseñas no coinciden.');
            setShowAlert(true);
            return;
        }

        setLoading(true); // Muestra el loader
        const result = await resetPassword(token, newPassword);
        console.log(token);
        setLoading(false); // Oculta el loader

        if (result.error) {
            setAlertMessage(result.error);
            setAlertSeverity('error');
            setShowAlert(true);
        } else {
            setAlertSeverity('success');
            setAlertMessage('Contraseña actualizada correctamente.');
            setShowAlert(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };

    return (
        <div className="new-password-container">
            <div className="new-password-content">
                <div className="text-font">
                    <h2>Restablecer Contraseña</h2>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="p-field">
                        <label htmlFor="newPassword">Nueva Contraseña</label>
                        <InputText id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Ingrese su nueva contraseña" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <InputText id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme su nueva contraseña" />
                    </div>
                    {showAlert && (
                        <Alert severity={alertSeverity} onClose={() => setShowAlert(false)} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                            <AlertTitle>{alertSeverity === 'success' ? 'Éxito' : 'Error'}</AlertTitle>
                            {alertMessage}
                        </Alert>
                    )}
                    <Button type="submit" disabled={loading}>
                        <div className="button-content">
                            {loading ? <Loader /> : "Restablecer Contraseña"}
                        </div>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
