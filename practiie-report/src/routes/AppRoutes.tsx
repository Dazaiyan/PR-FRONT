import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import Home from '../components/Home';
import CreateReportLab from '../components/CreateReport';
import CreateResearchReportForm from '../components/CreateResearchReportForm';
import CreateEssayReportForm from '../components/CreateEssayReportForm';
import CreateInternshipReportForm from '../components/CreateInternshipReportForm';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create-report-lab" element={<CreateReportLab />} />
                <Route path="/create-report-research" element={<CreateResearchReportForm />} />
                <Route path="/create-report-essay" element={<CreateEssayReportForm />} />
                <Route path="/create-report-internship" element={<CreateInternshipReportForm />} />
                <Route path="/" element={<LoginView />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
