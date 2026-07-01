import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar({ onHelpClick }) {
  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-secondary)',
    marginBottom: '8px',
    fontWeight: '500'
  };
  
  const activeStyle = {
    ...linkStyle,
    backgroundColor: '#E0F2FE', // light tealish/blue
    color: 'var(--color-primary-dark)'
  };

  return (
    <aside style={{ width: '250px', borderRight: '1px solid var(--color-border)', padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--color-primary)' }}></div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>EconWatch</h1>
      </div>
      
      <nav style={{ flex: 1 }}>
        <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : linkStyle}>
          <Home size={20} /> Dashboard
        </NavLink>
        <NavLink to="/settings" style={({ isActive }) => isActive ? activeStyle : linkStyle}>
          <Settings size={20} /> Settings
        </NavLink>
      </nav>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
        <button onClick={onHelpClick} style={{ ...linkStyle, width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
          <HelpCircle size={20} /> Help & Intro
        </button>
      </div>
    </aside>
  );
}
