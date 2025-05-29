import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slice/authSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented later
  };

  // Function to bypass login (for development purposes)
  const bypassLogin = () => {
    // Create a mock user object
    const mockUser = {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      token: 'mock-token'
    };

    // Store the mock user in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Update Redux state with the mock user
    dispatch(setUser(mockUser));
    
    // Redirect to the main page
    navigate('/cargo-ad');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          
          {/* Bypass login button */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              type="button" 
              onClick={bypassLogin} 
              style={{
                background: '#27ae60',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              Bypass Login (Development Only)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
