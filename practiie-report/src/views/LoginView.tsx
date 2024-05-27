import React from 'react';
import Login from '../components/Login';
import LoginController from '../controllers/LoginController';

const LoginView: React.FC = () => {
    return <Login handleLogin={LoginController.handleLogin} />;
};

export default LoginView;
