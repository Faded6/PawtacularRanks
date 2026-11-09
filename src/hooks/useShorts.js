import { useState, useEffect, useCallback } from 'react';
import { SHORTS_DATA } from '../data/videos';

export function useShorts() {
  const [shorts, setShorts] = useState(SHORTS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [error, setError] = useState(null);

  const fetchLiveShorts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/shorts');
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && Array.isArray(data.shorts) && data.shorts.length > 0) {
        setShorts(data.shorts);
        setIsLiveSynced(true);
        setLastSyncTime(new Date());
      } else {
        throw new Error(data.error || 'No shorts returned');
      }
    } catch (err) {
      console.warn('Live YouTube sync failed, using cached video catalog:', err);
      setError(err.message);
      // Keeps using the existing catalog fallback smoothly
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveShorts();

    // Optionally auto-poll YouTube feed every 2 minutes while page is active
    const interval = setInterval(() => {
      fetchLiveShorts();
    }, 120000);

    return () => clearInterval(interval);
  }, [fetchLiveShorts]);

  return {
    shorts,
    isLoading,
    isLiveSynced,
    lastSyncTime,
    error,
    refresh: fetchLiveShorts
  };
}

