import React from 'react';

const INDICATOR_META = {
  GDP: { label: 'US GDP', description: 'Gross Domestic Product (current USD)' },
  Inflation: { label: 'Inflation', description: 'Consumer Price Index, annual %' },
  Unemployment: { label: 'Unemployment', description: '% of total labor force' },
};

export default function IndicatorStrip({ indicators }) {
  if (!indicators || Object.keys(indicators).length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
      {Object.entries(indicators).map(([key, data]) => {
        const meta = INDICATOR_META[key] || { label: key, description: '' };
        const value = typeof data === 'object' ? data.value : data;
        const year = typeof data === 'object' ? data.year : '';
        const isNA = value === 'N/A';

        return (
          <div
            key={key}
            className="card"
            style={{
              flex: '1 1 160px',
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 24px',
              borderLeft: '3px solid var(--color-primary)',
            }}
          >
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              {meta.label}
            </span>
            <span style={{
              fontSize: '1.6rem',
              fontWeight: 'bold',
              color: isNA ? 'var(--color-text-secondary)' : 'var(--color-primary-dark)',
              letterSpacing: '-0.02em'
            }}>
              {value}
            </span>
            {year && (
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', marginTop: '4px' }}>
                {year} · World Bank
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
