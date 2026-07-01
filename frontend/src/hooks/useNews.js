import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import usePolling from './usePolling';

export default function useNews(topic = '', since = null) {
  const [articles, setArticles] = useState([]);
  const [indicators, setIndicators] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsAndIndicators = useCallback(async () => {
    try {
      const [newsData, indicatorsData] = await Promise.all([
        api.getNews({ topic, since }),
        api.getIndicators()
      ]);
      setArticles(newsData);
      setIndicators(indicatorsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [topic, since]);

  useEffect(() => {
    fetchNewsAndIndicators();
  }, [fetchNewsAndIndicators]);

  // Poll every 60 seconds
  usePolling(fetchNewsAndIndicators, 60000);

  return { articles, indicators, loading, error, refresh: fetchNewsAndIndicators };
}
