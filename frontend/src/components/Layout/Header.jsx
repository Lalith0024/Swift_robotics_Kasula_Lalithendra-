import React from 'react';

export default function Header({ title }) {
  return (
    <header style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</h2>
    </header>
  );
}
