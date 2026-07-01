import React from 'react';
import { Search } from 'lucide-react';

export default function EmptyState({ title, description, icon: Icon = Search }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Icon size={48} color="var(--color-border)" />
      </div>
      <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '8px', fontSize: '1.1rem' }}>{title}</h3>
      <p style={{ maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>{description}</p>
    </div>
  );
}
