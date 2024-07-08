import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import Home from '../components/Home';
import CreateReportLab from '../components/CreateLabReportFrom';
import CreateResearchReportForm from '../components/CreateResearchReportForm';
import CreateEssayReportForm from '../components/CreateEssayReportForm';
import CreateInternshipReportForm from '../components/CreateInternshipReportForm';
import HomeView from '../views/HomeView';
import SettingsView from '../components/Settings';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/home" element={<HomeView />} />
                <Route path="/create-report-lab" element={<CreateReportLab />} />
                <Route path="/create-report-research" element={<CreateResearchReportForm />} />
                <Route path="/create-report-essay" element={<CreateEssayReportForm />} />
                <Route path="/create-report-internship" element={<CreateInternshipReportForm />} />
                <Route path="/settings" element={<SettingsView />} />
                <Route path="/" element={<LoginView />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;