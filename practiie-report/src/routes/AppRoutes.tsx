import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import Home from '../components/Home';
import CreateReportView from '../views/CreateReportView';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create-report" element={<CreateReportView />} />
                <Route path="/" element={<LoginView />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;





