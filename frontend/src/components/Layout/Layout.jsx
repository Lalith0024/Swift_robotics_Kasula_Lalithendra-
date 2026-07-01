import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLocation } from 'react-router-dom';

export default function Layout({ children, onHelpClick }) {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/settings': return 'Settings';
      default: return 'EconWatch';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Sidebar onHelpClick={onHelpClick} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header title={getTitle()} />
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
