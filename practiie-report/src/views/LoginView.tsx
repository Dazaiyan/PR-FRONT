import React from 'react';
import Login from '../components/Login';
import LoginController from '../controllers/LoginController';

const LoginView: React.FC = () => {
    const { handleLogin } = LoginController(); // Extraemos handleLogin del LoginController

    return <Login handleLogin={handleLogin} />;
};

export default LoginView;

