import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';


const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(username, password);
    };

     return (
        <div className="card p-4 bg-dark text-white rounded-3 shadow-lg" style={{ maxWidth: '450px' }}>
            
            {}
            <h1 className="card-title text-center text-white fw-light mb-4">User Login</h1>
            
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                
                {}
                <div className="form-group mb-2">
                    <label className="form-label text-light mb-1">Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required className="form-control bg-secondary text-white rounded-pill border-0"
                    />
                </div>

                {}
                <div className="form-group mb-3">
                    <label className="form-label text-light mb-1">Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="form-control bg-secondary text-white rounded-pill border-0"
                    />
                </div>
                
                {}
                 <button 
                    type="submit" 
                    className="btn w-100 rounded-pill fw-bold mt-2"
                    style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50', color: 'white' }} 
                >
                    Log In
                </button>
            </form>
            
            {}
            <p className="mt-4 text-center">
                Don't have an account? <Link to="/register" className="text-info text-decoration-none">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;