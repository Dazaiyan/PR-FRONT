import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement;
    isAuthenticated: boolean;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated, path }) => {
    return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
