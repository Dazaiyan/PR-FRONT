import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Alert, AlertTitle } from '@mui/material';
import Loader from '../utils/Loader'; 
import './Recover.css';

interface RecoverProps {
    recoverPassword: (email: string) => Promise<{ error?: string }>;
}

const Recover: React.FC<RecoverProps> = ({ recoverPassword }) => {
    const [email, setEmail] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setAlertSeverity('error');
            setAlertMessage('Por favor, ingrese un correo electrónico válido.');
            setShowAlert(true);
            return;
        }

        setLoading(true); // Muestra el loader
        const result = await recoverPassword(email);
        setLoading(false); // Oculta el loader

        if (result.error) {
            setAlertMessage(result.error);
            setAlertSeverity('error');
            setShowAlert(true);
        } else {
            setAlertSeverity('success');
            setAlertMessage('Correo de restablecimiento enviado correctamente.');
            setShowAlert(true);
        }
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="login-container1">
            <div className="login-content1">
                <button className="close-button" onClick={goToLogin}>X</button>
                <div className="login-derecha">
                    <div className="text-font">
                        <h2>Recuperar Contraseña</h2>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="p-field">
                            <label htmlFor="email">Correo</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su correo electrónico" />
                        </div>
                        {showAlert && (
                            <Alert severity={alertSeverity} onClose={() => setShowAlert(false)} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                                <AlertTitle>{alertSeverity === 'success' ? 'Éxito' : 'Error'}</AlertTitle>
                                {alertMessage}
                            </Alert>
                        )}
                        <Button type="submit" disabled={loading}>
                            <div className="button-content">
                                {loading ? <Loader /> : "Enviar correo"}
                            </div>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Recover;
