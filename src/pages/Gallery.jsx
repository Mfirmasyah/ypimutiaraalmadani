import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from '../utils/animations';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STRAPI_BASE_URL = 'http://localhost:1337'; 
  const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";

  const backgroundImages = [
    '/assets/background2.jpg',
    '/assets/aktivitas1.png',
    '/assets/drumband1.png',
    '/assets/pramuka5.png',
    '/assets/yasinan_pagi.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const getImageUrl = (imageData) => {
    if (!imageData) return FALLBACK_IMAGE_URL;
    if (imageData.url) return imageData.url;
    
    if (imageData.formats) {
      if (imageData.formats.large?.url) return imageData.formats.large.url;
      if (imageData.formats.medium?.url) return imageData.formats.medium.url;
      if (imageData.formats.small?.url) return imageData.formats.small.url;
      if (imageData.formats.thumbnail?.url) return imageData.formats.thumbnail.url;
    }

    if (imageData.data) {
      if (imageData.data.url) return imageData.data.url;
      if (Array.isArray(imageData.data) && imageData.data[0]?.url) return imageData.data[0].url;
    }

    return FALLBACK_IMAGE_URL;
  };

  const getOptimizedImageUrl = (url) => {
    if (!url || typeof url !== 'string') return FALLBACK_IMAGE_URL;
    return url;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  };

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${STRAPI_BASE_URL}/api/galleries?populate=*`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        if (!data?.data || !Array.isArray(data.data)) {
          throw new Error('Invalid data format from API');
        }

        const transformedData = data.data.map((item, index) => {
          const itemData = item.attributes || item;
          const imageUrl = getImageUrl(itemData.image);
          
          return {
            id: item.id || index,
            judul: itemData.title || 'Judul Tidak Tersedia',
            deskripsi: itemData.description || 'Deskripsi tidak tersedia...',
            kategori: itemData.category || 'umum',
            tanggal: formatDate(itemData.date || itemData.createdAt),
            gambar: imageUrl,
            dilihat: itemData.views || 0,
            suka: itemData.likes || 0
          };
        });
        
        if (transformedData.length === 0) throw new Error('No gallery data available');
        setGalleryItems(transformedData);
        
      } catch (error) {
        setError(error.message);
        // Fallback data
        const sampleData = [
          { 
            id: 1, 
            judul: "Tablig Jumat", 
            kategori: "keagamaan", 
            gambar: "https://res.cloudinary.com/djg7valvf/image/upload/v1761893878/Whats_App_Image_2025_10_23_at_08_07_06_86fcec10b1.jpg", 
            tanggal: "15 Oktober 2025", 
            deskripsi: "Tabligh Jumat yang diadakan setiap hari Jumat", 
            dilihat: 245, 
            suka: 89 
          }
        ];
        setGalleryItems(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const categories = [
    { id: 'all', name: 'Semua', count: galleryItems.length, color: 'from-purple-500 to-pink-500' },
    { id: 'akademik', name: 'Akademik', count: galleryItems.filter(item => item.kategori === 'akademik').length, color: 'from-blue-500 to-cyan-500' },
    { id: 'ekstrakurikuler', name: 'Ekstrakurikuler', count: galleryItems.filter(item => item.kategori === 'ekstrakurikuler').length, color: 'from-green-500 to-emerald-500' },
    { id: 'keagamaan', name: 'Keagamaan', count: galleryItems.filter(item => item.kategori === 'keagamaan').length, color: 'from-orange-500 to-red-500' },
    { id: 'olahraga', name: 'Olahraga', count: galleryItems.filter(item => item.kategori === 'olahraga').length, color: 'from-yellow-500 to-amber-500' },
    { id: 'seni', name: 'Seni & Budaya', count: galleryItems.filter(item => item.kategori === 'seni').length, color: 'from-indigo-500 to-purple-500' },
    { id: 'umum', name: 'Umum', count: galleryItems.filter(item => item.kategori === 'umum').length, color: 'from-gray-500 to-slate-500' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.kategori === activeFilter);

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE_URL;
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat galeri kegiatan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] py-24 text-white overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBackground}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${backgroundImages[currentBackground]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-indigo-800/80" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp} 
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">Kegiatan</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp} 
              className="text-2xl md:text-3xl opacity-90 mb-8 font-light"
            >
              Dokumentasi momen berharga dan aktivitas siswa
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                  activeFilter === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="h-64 relative bg-gray-200">
                  <img 
                    src={getOptimizedImageUrl(item.gambar)}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    crossOrigin="anonymous" // Tambahkan ini
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.kategori}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {item.judul}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.deskripsi}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{item.tanggal}</span>
                    <span>👁️ {item.dilihat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Tidak ada foto pada kategori ini
              </h3>
              <button
                onClick={() => setActiveFilter('all')}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600"
              >
                Tampilkan Semua Foto
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="relative">
                <img 
                  src={getOptimizedImageUrl(selectedImage.gambar)}
                  alt={selectedImage.judul}
                  className="w-full h-96 object-cover"
                  crossOrigin="anonymous" // Tambahkan ini juga
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.judul}</h2>
                <p className="text-gray-600 mb-4">{selectedImage.deskripsi}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{selectedImage.kategori} • {selectedImage.tanggal}</span>
                  <span>👁️ {selectedImage.dilihat} ❤️ {selectedImage.suka}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;