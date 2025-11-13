import { useState, useEffect } from 'react';
import { strapiService } from '../services/strapi';

export const useParenting = () => {
  const [parenting, setParenting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleParenting();
    setParenting(sampleData);
    setLoading(false);
  }, []);

  return { parenting, loading, error };
};

export const useParentingByCategory = (category) => {
  const [parenting, setParenting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleParenting();
    const filteredData = category === 'all' 
      ? sampleData 
      : sampleData.filter(item => item.category === category);
    
    setParenting(filteredData);
    setLoading(false);
  }, [category]);

  return { parenting, loading, error };
};

export const useFeaturedParenting = () => {
  const [parenting, setParenting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleParenting();
    const featuredData = sampleData.filter(item => item.isFeatured).slice(0, 3);
    setParenting(featuredData);
    setLoading(false);
  }, []);

  return { parenting, loading, error };
};