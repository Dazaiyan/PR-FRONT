import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './Login.css';

interface LoginProps {
    handleLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(email, password);
        navigate('/home');
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
                        <Button type="submit" label="Iniciar sesión" icon="pi pi-check" />
                    </form>
                    <p>No tienes una cuenta? <button className="link-button" onClick={handleRegisterClick}>Regístrate aquí</button></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
