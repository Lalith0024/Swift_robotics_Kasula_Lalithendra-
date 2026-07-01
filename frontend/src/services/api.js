// In local dev this falls back to localhost.
// On Vercel, set VITE_API_URL=https://your-render-app.onrender.com/api
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = {
  // News & Indicators
  getNews: async (params = {}) => {
    // Filter out null/undefined/empty values to avoid 422 validation errors
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== null && v !== undefined && v !== '')
    );
    const query = new URLSearchParams(cleanParams).toString();
    const res = await fetch(`${API_URL}/news/${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch news');
    return res.json();
  },
  getIndicators: async () => {
    const res = await fetch(`${API_URL}/news/indicators`);
    if (!res.ok) throw new Error('Failed to fetch indicators');
    return res.json();
  },

  // Topics
  getTopics: async () => {
    const res = await fetch(`${API_URL}/topics/`);
    if (!res.ok) throw new Error('Failed to fetch topics');
    return res.json();
  },
  createTopic: async (name) => {
    const res = await fetch(`${API_URL}/topics/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error('Failed to create topic');
    return res.json();
  },
  deleteTopic: async (id) => {
    const res = await fetch(`${API_URL}/topics/${id}/`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete topic');
    return res.json();
  },

  // Sources
  getSources: async () => {
    const res = await fetch(`${API_URL}/sources/`);
    if (!res.ok) throw new Error('Failed to fetch sources');
    return res.json();
  },
  createSource: async (name, source_type) => {
    const res = await fetch(`${API_URL}/sources/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, source_type })
    });
    if (!res.ok) throw new Error('Failed to create source');
    return res.json();
  },
  deleteSource: async (id) => {
    const res = await fetch(`${API_URL}/sources/${id}/`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete source');
    return res.json();
  },

  // Competitors
  getCompetitors: async () => {
    const res = await fetch(`${API_URL}/competitors/`);
    if (!res.ok) throw new Error('Failed to fetch competitors');
    return res.json();
  },
  createCompetitor: async (name) => {
    const res = await fetch(`${API_URL}/competitors/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error('Failed to create competitor');
    return res.json();
  },
  deleteCompetitor: async (id) => {
    const res = await fetch(`${API_URL}/competitors/${id}/`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete competitor');
    return res.json();
  }
};
