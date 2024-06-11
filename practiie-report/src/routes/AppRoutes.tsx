import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Asegúrate de importar Route desde 'react-router-dom'
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import Home from '../components/Home';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<LoginView />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;


