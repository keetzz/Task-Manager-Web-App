import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
      <AuthProvider> 
        <div className="App">
          <Routes>
            {}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {}
            <Route 
              path="/tasks" 
              element={
                <PrivateRoute>
                  <TasksPage />
                </PrivateRoute>
              } 
            />
            {}
            <Route path="/" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
            
            {}
            <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '50px'}}>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
