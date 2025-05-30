import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useSelector((state: any) => state.auth);

  // If no user is logged in, don't show the sidebar
  if (!user) {
    return null;
  }

  // Navigation items configuration
  const navItems = [
    { path: '/cargo-ad', icon: '📦', text: 'Cargo Ad' },
    { path: '/vehicle-ad', icon: '🚚', text: 'Vehicle Ad' },
    { path: '/cargo-ad-offer', icon: '📋', text: 'Cargo Ad Offers' },
    { path: '/vehicle-ad-offer', icon: '🔄', text: 'Vehicle Ad Offers' },
    { path: '/user-management', icon: '👥', text: 'User Management' },
  ];

  const sidebarClass = isOpen ? 'sidebar open' : 'sidebar';

  return (
    <div className={sidebarClass}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">🚚</span>
          {isOpen && <span className="sidebar-brand-text">Transport</span>}
        </div>
        <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {isOpen ? '←' : '→'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {isOpen && <span className="nav-text">{item.text}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {isOpen && (
        <div className="sidebar-footer">
          <div className="user-status">
            <div className="status-indicator online"></div>
            <span className="status-text">Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
