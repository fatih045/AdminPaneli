import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useSelector((state: any) => state.auth);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // If no user is logged in, don't show the sidebar
  if (!user) {
    return null;
  }

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/cargo-ad" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">📦</span>
              {!isCollapsed && <span className="nav-text">Cargo Advertisements</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/vehicle-ad" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">🚚</span>
              {!isCollapsed && <span className="nav-text">Vehicle Advertisements</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cargo-ad-offer" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">📋</span>
              {!isCollapsed && <span className="nav-text">Cargo Ad Offers</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/vehicle-ad-offer" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">🔄</span>
              {!isCollapsed && <span className="nav-text">Vehicle Ad Offers</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-management" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="nav-icon">👥</span>
              {!isCollapsed && <span className="nav-text">User Management</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
