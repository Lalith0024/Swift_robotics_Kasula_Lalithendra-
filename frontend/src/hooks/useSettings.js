import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export default function useSettings() {
  const [topics, setTopics] = useState([]);
  const [sources, setSources] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const [t, s, c] = await Promise.all([
        api.getTopics(),
        api.getSources(),
        api.getCompetitors()
      ]);
      setTopics(t);
      setSources(s);
      setCompetitors(c);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { 
    topics, 
    sources, 
    competitors, 
    loading, 
    refresh: fetchSettings,
    api
  };
}
