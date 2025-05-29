import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slice/authSlice';

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  const onLogout = () => {
    dispatch(logout() as any);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          {isMobile && user && (
            <button className="mobile-menu-btn" onClick={toggleSidebar} aria-label="Toggle Menu">
              ☰
            </button>
          )}
          <div className="logo">
            <h1>Transport Admin</h1>
          </div>
        </div>
        <div className="user-info">
          {user ? (
            <div className="user-controls">
              <div className="user-greeting">
                <span className="user-name">{user.username}</span>
                <span className="user-role">Administrator</span>
              </div>
              <button className="logout-btn" onClick={onLogout}>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
