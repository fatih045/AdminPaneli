import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../slice/authSlice';
import type { RootState, AppDispatch } from '../store/store';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isSuccess && user) {
      navigate('/cargo-ad');
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, user, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="login-page" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div className="login-container" style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            color: '#333', 
            fontSize: '28px', 
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>Admin Panel</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>Please sign in to continue</p>
        </div>

        {isError && (
          <div style={{ 
            backgroundColor: '#ffebee', 
            color: '#d32f2f', 
            padding: '12px', 
            borderRadius: '6px', 
            marginBottom: '20px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ marginRight: '8px' }}>⚠️</span>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="username" 
              style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500',
                color: '#333'
              }}
            >
              Username
            </label>
            <div style={{ 
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: '12px', 
                color: '#999',
                fontSize: '16px'
              }}>
                👤
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="password" 
              style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500',
                color: '#333'
              }}
            >
              Password
            </label>
            <div style={{ 
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: '12px', 
                color: '#999',
                fontSize: '16px'
              }}>
                🔒
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '25px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ 
                  marginRight: '8px',
                  width: 'auto'
                }}
              />
              <label 
                htmlFor="rememberMe" 
                style={{ 
                  fontSize: '14px',
                  color: '#666',
                  cursor: 'pointer'
                }}
              >
                Remember me
              </label>
            </div>
            <a 
              href="#" 
              style={{ 
                fontSize: '14px',
                color: '#667eea',
                textDecoration: 'none'
              }}
            >

            </a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isLoading ? 0.7 : 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)'
            }}
          >
            {isLoading ? (
              <span>Logging in...</span>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
