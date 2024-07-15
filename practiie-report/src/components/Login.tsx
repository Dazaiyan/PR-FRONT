import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Alert, AlertTitle } from '@mui/material';
import Loader from '../utils/Loader'; // Importa el componente Loader
import './Login.css';

interface LoginProps {
    handleLogin: (email: string, password: string) => Promise<{ error?: string, name?: string }>;
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
        const result = await handleLogin(email, password);
        setLoading(false); // Oculta el loader

        if (result.error) {
            setAlertSeverity('error');
            setAlertMessage(result.error);
            setShowAlert(true);
        } else if (result.name) {
            localStorage.setItem('userName', result.name);
            navigate('/home');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img src="/logo.png" alt="PractiieReport Logo" className="login-logo" />
                </div>
                <div className="login-right">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={onSubmit}>
                        <div className="p-field">
                            <label htmlFor="email">Correo</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su correo" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Contraseña</label>
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese su contraseña" feedback={false} />
                        </div>
                        {showAlert && (
                            <Alert severity={alertSeverity} onClose={() => setShowAlert(false)} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                                <AlertTitle>{alertSeverity === 'success' ? 'Success' : 'Error'}</AlertTitle>
                                {alertMessage}
                            </Alert>
                        )}
                        <Button type="submit" disabled={loading}>
                            <div className="button-content">
                                {loading ? <Loader /> : "Iniciar sesión"}
                            </div>
                        </Button>
                    </form>
                    <div className="login-footer">
                        <p>No tienes una cuenta?</p>
                        <button className="link-button" onClick={handleRegisterClick}>Regístrate aquí</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
