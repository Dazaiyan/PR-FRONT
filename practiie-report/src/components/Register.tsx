import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { registerUser } from '../services/authService';
import './Register.css';

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const user = { name, lastname, email, password };
            const response = await registerUser(user);
            console.log('User registered successfully:', response);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
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
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Contraseña</label>
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" feedback={false} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="confirmPassword">Confirmar contraseña</label>
                            <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" feedback={false} />
                        </div>
                        <Button type="submit" label="Regístrate" icon="pi pi-check" />
                    </form>
                </div>
                <div className="register-right">
                    <img src="/logo.png" alt="PractiieReport Logo" className="register-logo" />
                </div>
            </div>
        </div>
    );
};

export default Register;

