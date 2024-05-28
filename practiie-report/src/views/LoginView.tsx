// src/views/LoginView.tsx
import React from 'react';
import LoginController from '../controllers/LoginController';
import Login from '../components/Login';

const LoginView: React.FC = () => {
    const { handleLogin } = LoginController(); // Extraemos handleLogin del LoginController

    return <Login handleLogin={handleLogin} />;
};

export default LoginView;
