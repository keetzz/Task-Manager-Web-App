// taskmanager-frontend/src/components/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // If user is null (not logged in), redirect to login page
    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;