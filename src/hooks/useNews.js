import { useState, useEffect } from 'react';
import { strapiService } from '../services/strapi';

export const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleNews();
    setNews(sampleData);
    setLoading(false);
  }, []);

  return { news, loading, error };
};

export const useNewsByCategory = (category) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleNews();
    const filteredData = category === 'all' 
      ? sampleData 
      : sampleData.filter(item => item.category === category);
    
    setNews(filteredData);
    setLoading(false);
  }, [category]);

  return { news, loading, error };
};