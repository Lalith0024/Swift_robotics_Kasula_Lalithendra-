import React, { useState } from 'react';
import useNews from '../../hooks/useNews';
import NewsCard from './NewsCard';
import IndicatorStrip from './IndicatorStrip';
import FilterBar from './FilterBar';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';
import { Newspaper } from 'lucide-react';

export default function NewsFeed() {
  const { articles, indicators, loading, error, refresh } = useNews();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fetching, setFetching] = useState(false);

  const fetchNow = async () => {
    setFetching(true);
    try {
      await fetch('http://localhost:8000/api/fetch-now', { method: 'POST' });
      await refresh();
    } catch (e) {
      console.error('Fetch failed', e);
    } finally {
      setFetching(false);
    }
  };

  const categories = Array.from(new Set(articles.map(a => a.category))).filter(Boolean);
  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  if (loading && articles.length === 0) {
    return <LoadingSpinner size={32} style={{ marginTop: '100px' }} />;
  }

  if (error) {
    return <div style={{ color: 'var(--color-error)' }}>Error loading news: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Economic Indicators (US)</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={fetchNow} disabled={fetching} className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
            {fetching ? '⏳ Fetching...' : '⚡ Fetch Now'}
          </button>
          <button onClick={refresh} className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>Refresh</button>
        </div>
      </div>
      
      <IndicatorStrip indicators={indicators} />
      
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Latest Updates</h2>
      
      {articles.length > 0 && (
        <FilterBar 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      )}

      {filteredArticles.length === 0 ? (
        <EmptyState 
          title="No news found"
          description="We are currently monitoring your topics. Fresh updates will appear here soon (usually within 15 minutes)."
          icon={Newspaper}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredArticles.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
