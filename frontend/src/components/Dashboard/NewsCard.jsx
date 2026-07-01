import React from 'react';
import Badge from '../shared/Badge';
import { ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsCard({ article }) {
  const pubDate = new Date(article.published_at).toLocaleString();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card" 
      style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', lineHeight: '1.4', flex: 1, paddingRight: '16px' }}>
          {article.title}
        </h3>
        <Badge category={article.category} />
      </div>
      
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
        {article.summary}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid var(--color-border)', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>{article.source}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} /> {pubDate}
          </span>
          <span style={{ color: article.sentiment === 'Positive' ? 'var(--color-success)' : article.sentiment === 'Negative' ? 'var(--color-error)' : 'inherit' }}>
            {article.sentiment}
          </span>
        </div>
        <a href={article.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
          Read Source <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
