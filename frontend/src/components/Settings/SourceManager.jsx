import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function SourceManager({ sources, onCreate, onDelete }) {
  const [newSource, setNewSource] = useState('');
  const [sourceType, setSourceType] = useState('newsapi');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newSource.trim()) return;
    await onCreate(newSource, sourceType);
    setNewSource('');
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Sources</h3>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
        Configure external APIs and news sources.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input 
          type="text" 
          value={newSource}
          onChange={(e) => setNewSource(e.target.value)}
          placeholder="Source Name"
          style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)' }}
        />
        <select 
          value={sourceType} 
          onChange={(e) => setSourceType(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)', backgroundColor: 'white' }}
        >
          <option value="newsapi">NewsAPI</option>
          <option value="gnews">GNews</option>
          <option value="zenserp">Zenserp API</option>
          <option value="fred">FRED</option>
        </select>
        <button type="submit" className="btn btn-primary" disabled={!newSource.trim()}>
          <Plus size={16} /> Add
        </button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {sources.map(source => (
          <div key={source.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-background)', padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)', fontSize: '0.875rem' }}>
            <span>{source.name} <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>({source.source_type})</span></span>
            <button onClick={() => onDelete(source.id)} style={{ color: 'var(--color-text-secondary)', display: 'flex', padding: '2px' }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
