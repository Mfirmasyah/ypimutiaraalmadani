import { useState, useEffect } from 'react';
import { strapiService } from '../services/strapi';

export const usePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSamplePrograms();
    setPrograms(sampleData);
    setLoading(false);
  }, []);

  return { programs, loading, error };
};

export const useTimeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleTimeline();
    setTimeline(sampleData);
    setLoading(false);
  }, []);

  return { timeline, loading, error };
};