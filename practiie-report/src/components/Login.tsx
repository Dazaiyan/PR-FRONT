import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Alert, AlertTitle } from '@mui/material'; // Importa Alert y AlertTitle de MUI
import './Login.css';

interface LoginProps {
    handleLogin: (email: string, password: string) => Promise<{ error?: string, name?: string }>; // Agrega name al tipo de retorno
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
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

        const result = await handleLogin(email, password);
        if (result.error) {
            setAlertSeverity('error');
            setAlertMessage(result.error);
            setShowAlert(true);
        } else if (result.name) { // Almacena el nombre en localStorage
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
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Contraseña</label>
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" feedback={false} />
                        </div>
                        {showAlert && (
                            <Alert severity={alertSeverity} onClose={() => setShowAlert(false)} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                                <AlertTitle>{alertSeverity === 'success' ? 'Success' : 'Error'}</AlertTitle>
                                {alertMessage}
                            </Alert>
                        )}
                        <Button type="submit" label="Iniciar sesión"/>
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

