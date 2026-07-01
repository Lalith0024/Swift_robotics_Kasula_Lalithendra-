import React from 'react';

export default function IndicatorStrip({ indicators }) {
  if (!indicators || Object.keys(indicators).length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
      {Object.entries(indicators).map(([key, value]) => (
        <div key={key} className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px' }}>{key}</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}
