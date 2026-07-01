export const API_URL = '/api';

export const api = {
  // News & Indicators
  getNews: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/news${query ? `?${query}` : ''}`);
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
    const res = await fetch(`${API_URL}/topics`);
    if (!res.ok) throw new Error('Failed to fetch topics');
    return res.json();
  },
  createTopic: async (name) => {
    const res = await fetch(`${API_URL}/topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error('Failed to create topic');
    return res.json();
  },
  deleteTopic: async (id) => {
    const res = await fetch(`${API_URL}/topics/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete topic');
    return res.json();
  },

  // Sources
  getSources: async () => {
    const res = await fetch(`${API_URL}/sources`);
    if (!res.ok) throw new Error('Failed to fetch sources');
    return res.json();
  },
  createSource: async (name, source_type) => {
    const res = await fetch(`${API_URL}/sources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, source_type })
    });
    if (!res.ok) throw new Error('Failed to create source');
    return res.json();
  },
  deleteSource: async (id) => {
    const res = await fetch(`${API_URL}/sources/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete source');
    return res.json();
  },

  // Competitors
  getCompetitors: async () => {
    const res = await fetch(`${API_URL}/competitors`);
    if (!res.ok) throw new Error('Failed to fetch competitors');
    return res.json();
  },
  createCompetitor: async (name) => {
    const res = await fetch(`${API_URL}/competitors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error('Failed to create competitor');
    return res.json();
  },
  deleteCompetitor: async (id) => {
    const res = await fetch(`${API_URL}/competitors/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete competitor');
    return res.json();
  }
};
