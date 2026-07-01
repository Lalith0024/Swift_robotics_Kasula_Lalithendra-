import React from 'react';

export default function Badge({ category, className = '' }) {
  const catLower = (category || 'other').toLowerCase();
  const validCategories = ['policy', 'markets', 'trade', 'employment', 'other'];
  const badgeClass = validCategories.includes(catLower) ? `badge-${catLower}` : 'badge-other';

  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {category}
    </span>
  );
}
