import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { registerUser } from '../services/authService';
import Alert from '../utils/alerts';
import './Register.css';
import { AlertTitle } from '@mui/material';


const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password: string) => {
        const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        return re.test(password);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!name || !lastname || !email || !password || !confirmPassword) {
            setAlertSeverity('error');
            setAlertMessage('Todos los campos son obligatorios.');
            setShowAlert(true);
            return;
        }
    
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = password === confirmPassword;
    
        setEmailError(isEmailValid ? '' : 'Ingrese un correo electrónico válido.');
        setPasswordError(isPasswordValid ? '' : 'Debe contener mínimo 8 caracteres, 1 mayúscula y 1 carácter especial.');
        setConfirmPasswordError(isConfirmPasswordValid ? '' : '¡Las contraseñas no coinciden!');
    
        if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            setAlertSeverity('error');
            setAlertMessage('Por favor, revise los datos ingresados.');
            setShowAlert(true);
            return;
        }
    
        try {
            const user = { name, lastname, email, password };
            const response = await registerUser(user);
            console.log('User registered successfully:', response);
            setAlertSeverity('success');
            setAlertMessage('Usuario registrado correctamente');
            setShowAlert(true);
            navigate('/login');
        } catch (error: any) {
            console.error('Registration failed:', error);
            setAlertSeverity('error');
            setAlertMessage('Error al registrar usuario');
            setShowAlert(true);
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <div className="register-left">
                    <h2>Regístrate</h2>
                    <form onSubmit={handleRegister}>
                        <div className="p-field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname">Apellido</label>
                            <InputText id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Enter your lastname" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="email">Dirección de correo</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={emailError ? 'error-input' : ''} placeholder="Enter your email" />
                            {emailError && <div className="error-message">{emailError}</div>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Contraseña</label>
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={passwordError ? 'error-input' : ''} placeholder="Enter your password" feedback={false} />
                            {passwordError && <div className="error-message">{passwordError}</div>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="confirmPassword">Confirmar contraseña</label>
                            <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={confirmPasswordError ? 'error-input' : ''} placeholder="Confirm password" feedback={false} />
                            {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                        </div>
                        <Button type="submit" label="Regístrate" />
                    </form>
                </div>
                <div className="register-right">
                    <img src="/logo.png" alt="PractiieReport Logo" className="register-logo" />
                </div>
            </div>
            {showAlert && (
            <Alert severity={alertSeverity} onClose={() => setShowAlert(false)} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <AlertTitle>{alertSeverity === 'success' ? 'Registro exitoso' : 'Error de registro'}</AlertTitle>
                {alertMessage}
            </Alert>
                
            )}
            
        </div>
    );
};

export default Register;