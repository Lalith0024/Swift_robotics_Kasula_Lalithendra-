import React from 'react';

export default function FilterBar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
      <button 
        className={`btn ${selectedCategory === 'All' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => onSelectCategory('All')}
      >
        All
      </button>
      {categories.map(cat => (
        <button 
          key={cat}
          className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
