import { useState, useEffect } from 'react';
import { strapiService } from '../services/strapi';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleArticles();
    setArticles(sampleData);
    setLoading(false);
  }, []);

  return { articles, loading, error };
};

export const useArticlesByCategory = (category) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleArticles();
    const filteredData = category === 'all' 
      ? sampleData 
      : sampleData.filter(item => item.category === category);
    
    setArticles(filteredData);
    setLoading(false);
  }, [category]);

  return { articles, loading, error };
};