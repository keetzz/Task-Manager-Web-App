// taskmanager-frontend/src/pages/RegisterPage.js

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(username, email, password);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1>New User Registration</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ margin: '10px 0 5px' }}>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ padding: '10px', border: '1px solid #ddd' }}/>

                <label style={{ margin: '10px 0 5px' }}>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', border: '1px solid #ddd' }}/>

                <label style={{ margin: '10px 0 5px' }}>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px', border: '1px solid #ddd' }}/>
                
                <button type="submit" style={{ padding: '10px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white' }}>Sign Up</button>
            </form>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterPage;