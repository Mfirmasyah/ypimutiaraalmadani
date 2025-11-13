import { useState, useEffect } from 'react';
import { strapiService } from '../services/strapi';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleAchievements();
    setAchievements(sampleData);
    setLoading(false);
  }, []);

  return { achievements, loading, error };
};