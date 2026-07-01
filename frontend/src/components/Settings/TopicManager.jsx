import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function TopicManager({ topics, onCreate, onDelete }) {
  const [newTopic, setNewTopic] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    await onCreate(newTopic);
    setNewTopic('');
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '8px' }}>Topics</h3>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
        Keywords or phrases to monitor across sources.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input 
          type="text" 
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="e.g. India inflation"
          style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)' }}
        />
        <button type="submit" className="btn btn-primary" disabled={!newTopic.trim()}>
          <Plus size={16} /> Add Topic
        </button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {topics.map(topic => (
          <div key={topic.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-background)', padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)', fontSize: '0.875rem' }}>
            <span>{topic.name}</span>
            <button onClick={() => onDelete(topic.id)} style={{ color: 'var(--color-text-secondary)', display: 'flex', padding: '2px' }} className="hover:text-red-500">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
