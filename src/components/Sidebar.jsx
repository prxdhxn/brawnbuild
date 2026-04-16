import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Activity, ActivitySquare, Scale, Utensils, Hexagon } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Workout AI', path: '/ai-assistant', icon: <MessageSquare size={20} /> },
    { name: 'Anatomy Viewer', path: '/anatomy', icon: <Activity size={20} /> },
    { name: 'Injury Help', path: '/injury-help', icon: <ActivitySquare size={20} /> },
    { name: 'BMI Tracker', path: '/bmi-tracker', icon: <Scale size={20} /> },
    { name: 'Meal Plans', path: '/meal-planner', icon: <Utensils size={20} /> }
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-brand">
        <Hexagon className="brand-logo text-neon-blue" size={32} />
        <h2 className="brand-name">Brawn<span className="text-neon-blue">Build</span></h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">JD</div>
          <div className="user-info">
            <span className="username">John Doe</span>
            <span className="level">Level 12 Titan</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
