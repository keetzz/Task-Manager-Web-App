import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:8000/api/auth/'; 

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

   
    const [authToken, setAuthToken] = useState(() => 
        localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
    );

    const [user, setUser] = useState(() => 
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    );
    const [loading, setLoading] = useState(true);

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(API_URL + 'login/', { 
                username, 
                password 
            });

            if (response.status === 200) {
                const tokens = response.data;
                // Note: user_id field must be returned by your Django login endpoint
                const userData = { user_id: tokens.user_id, username: username }; 

                setAuthToken(tokens);
                setUser(userData);
                
                localStorage.setItem('authToken', JSON.stringify(tokens));
                localStorage.setItem('user', JSON.stringify(userData));

                navigate('/tasks'); 
            }
        } catch (error) {
            alert('Invalid credentials or server error.');
            console.error('Login error:', error);
        }
    };

   
    const logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

  
    const registerUser = async (username, email, password) => {
        try {
            const response = await axios.post(API_URL + 'register/', {
                username,
                email,
                password
            });
            
            if (response.status === 201) {
                alert('Registration successful! Please log in.');
                navigate('/login'); 
            }
        } catch (error) {
            console.error('Registration error:', error.response.data);
            alert('Registration failed. Username or email may already be in use.');
        }
    };

    const contextData = {
        user,
        authToken,
        loginUser,
        logoutUser,
        registerUser,
    };

    useEffect(() => {
        setLoading(false); 
    }, [authToken]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children} 
        </AuthContext.Provider>
    );
};

export default AuthContext;