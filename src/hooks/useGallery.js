import { useState, useEffect } from 'react';
import { strapiService } from '../services/strapi';

export const useGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false); // Set false karena menggunakan sample data
  const [error, setError] = useState(null);

  useEffect(() => {
    // Langsung gunakan sample data tanpa fetch
    const sampleData = strapiService.getSampleGallery();
    setGallery(sampleData);
    setLoading(false);
  }, []);

  return { gallery, loading, error };
};

export const useGalleryByCategory = (category) => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sampleData = strapiService.getSampleGallery();
    const filteredData = category === 'all' 
      ? sampleData 
      : sampleData.filter(item => item.category === category);
    
    setGallery(filteredData);
    setLoading(false);
  }, [category]);

  return { gallery, loading, error };
};