import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function CompetitorManager({ competitors, onCreate, onDelete }) {
  const [newCompetitor, setNewCompetitor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCompetitor.trim()) return;
    await onCreate(newCompetitor);
    setNewCompetitor('');
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Competitors</h3>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
        Track specific competitors alongside your topics.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input 
          type="text" 
          value={newCompetitor}
          onChange={(e) => setNewCompetitor(e.target.value)}
          placeholder="e.g. Acme Corp"
          style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)' }}
        />
        <button type="submit" className="btn btn-primary" disabled={!newCompetitor.trim()}>
          <Plus size={16} /> Add Competitor
        </button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {competitors.map(competitor => (
          <div key={competitor.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-background)', padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)', fontSize: '0.875rem' }}>
            <span>{competitor.name}</span>
            <button onClick={() => onDelete(competitor.id)} style={{ color: 'var(--color-text-secondary)', display: 'flex', padding: '2px' }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
