import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import Home from '../components/Home';
import { useLoaderContext } from '../components/LoaderContext'; // Corrige la importación
import Loader from '../components/Loader'; // Importa el componente Loader

const AppRoutes: React.FC = () => {
    const { loading } = useLoaderContext();

    return (
        <Router>
            {loading && <Loader />}
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



