import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Edukasi = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Konfigurasi
  const STRAPI_URL = "https://incredible-sparkle-f34960cd1e.strapiapp.com";
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";

  // Background slides
  const backgroundSlides = [
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
      title: "Portal Edukasi",
      subtitle: "Wawasan & Inspirasi untuk Pendidikan Berkualitas"
    },
    {
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      title: "Artikel Berkualitas",
      subtitle: "Dari Para Ahli Pendidikan"
    },
    {
      image: "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=1200&q=80",
      title: "Pengembangan Profesional",
      subtitle: "Untuk Guru dan Tenaga Pendidikan"
    }
  ];

  // Kategori
  const categories = [
    { 
      id: "all", 
      name: "Semua Artikel", 
      icon: "📚", 
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    { 
      id: "pedagogi", 
      name: "Pedagogi", 
      icon: "👨‍🏫", 
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    { 
      id: "kurikulum", 
      name: "Kurikulum", 
      icon: "📖", 
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    { 
      id: "teknologi", 
      name: "Teknologi Pendidikan", 
      icon: "💻", 
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500"
    },
    { 
      id: "motivasi", 
      name: "Motivasi Belajar", 
      icon: "🌟", 
      color: "from-yellow-500 to-amber-500",
      gradient: "bg-gradient-to-r from-yellow-500 to-amber-500"
    }
  ];

  // Sample data fallback
  const sampleArticles = [
    {
      id: "1",
      title: "Metode Pembelajaran Abad 21 untuk Generasi Z",
      excerpt: "Bagaimana menyesuaikan metode pembelajaran dengan karakteristik generasi digital native dalam era teknologi modern.",
      category: "pedagogi",
      author: "Dr. Ahmad Fauzi, M.Pd",
      date: "2024-03-15",
      readTime: "5 min read",
      views: 1250,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
      slug: "metode-pembelajaran-abad-21"
    },
    {
      id: "2",
      title: "Integrasi Teknologi dalam Pembelajaran Modern",
      excerpt: "Pemanfaatan tools digital dan platform interaktif untuk meningkatkan engagement siswa dalam proses belajar mengajar.",
      category: "teknologi",
      author: "Siti Aminah, M.Kom",
      date: "2024-03-10",
      readTime: "4 min read",
      views: 890,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
      slug: "integrasi-teknologi-pembelajaran"
    },
    {
      id: "3",
      title: "Strategi Pengembangan Kurikulum Merdeka",
      excerpt: "Panduan implementasi kurikulum merdeka belajar untuk menciptakan lingkungan belajar yang lebih fleksibel.",
      category: "kurikulum",
      author: "Prof. Bambang Sutrisno",
      date: "2024-03-08",
      readTime: "6 min read",
      views: 1560,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
      slug: "strategi-kurikulum-merdeka"
    },
    {
      id: "4",
      title: "Membangun Motivasi Belajar Siswa",
      excerpt: "Teknik-teknik efektif untuk meningkatkan motivasi intrinsik siswa dalam proses pembelajaran.",
      category: "motivasi",
      author: "Dra. Maria Wijaya",
      date: "2024-03-05",
      readTime: "3 min read",
      views: 2100,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
      slug: "membangun-motivasi-belajar"
    },
    {
      id: "5",
      title: "Assesmen Autentik dalam Pembelajaran",
      excerpt: "Menerapkan teknik assesmen yang lebih bermakna dan relevan dengan kompetensi yang diharapkan.",
      category: "pedagogi",
      author: "Dr. Rina Hartati, M.Pd",
      date: "2024-03-01",
      readTime: "5 min read",
      views: 980,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      slug: "assesmen-autentik-pembelajaran"
    },
    {
      id: "6",
      title: "Digital Literacy untuk Guru Era Modern",
      excerpt: "Meningkatkan kompetensi literasi digital guru dalam menghadapi tantangan pendidikan di era digital.",
      category: "teknologi",
      author: "Ahmad Digital, S.Kom",
      date: "2024-02-28",
      readTime: "4 min read",
      views: 1340,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      slug: "digital-literacy-guru"
    }
  ];

  // Auto slide background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % backgroundSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundSlides.length]);

  // Format date untuk display
  const formatDateForDisplay = useCallback((dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    try {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  }, []);

  // Format views
  const formatViews = useCallback((views) => {
    if (!views) return '0';
    const viewsNum = typeof views === 'number' ? views : parseInt(views) || 0;
    if (viewsNum >= 1000) {
      return `${(viewsNum / 1000).toFixed(1)}K`;
    }
    return viewsNum.toString();
  }, []);

  // Get image URL from Strapi
  const getImageUrl = useCallback((imageData) => {
    if (!imageData) return FALLBACK_IMAGE;
    
    if (typeof imageData === 'string') {
      return imageData.startsWith('http') ? imageData : `${STRAPI_URL}${imageData}`;
    }
    
    if (imageData.url) return imageData.url;
    if (imageData.data?.url) return imageData.data.url;
    
    return FALLBACK_IMAGE;
  }, [STRAPI_URL, FALLBACK_IMAGE]);

  // Optimize Cloudinary URL
  const optimizeImage = useCallback((url, width = 600) => {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/w_${width},c_fill,f_auto,q_auto:good/`);
  }, []);

  // Handle article click
  const handleArticleClick = useCallback((slug) => {
    navigate(`/edukasi/${slug}`);
  }, [navigate]);

  // Handle image error
  const handleImageError = useCallback((e) => {
    e.target.src = FALLBACK_IMAGE;
  }, [FALLBACK_IMAGE]);

  // Fetch articles from Strapi
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching articles from Strapi...');
        const response = await fetch(`${STRAPI_URL}/api/edukasis?populate=*&sort[0]=createdAt:desc`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data?.data || !Array.isArray(data.data)) {
          throw new Error('Format data tidak valid dari server');
        }

        console.log('✅ Data received:', data.data.length, 'articles');

        const transformedData = data.data.map((item) => {
          const attributes = item.attributes || item;
          
          return {
            id: item.id?.toString() || Math.random().toString(),
            title: attributes.title || attributes.judul || 'Judul Tidak Tersedia',
            excerpt: attributes.excerpt || attributes.deskripsi || 'Deskripsi tidak tersedia...',
            category: (attributes.category || attributes.kategori || 'umum').toLowerCase(),
            author: attributes.author || attributes.penulis || 'Admin',
            date: attributes.date || attributes.tanggal || attributes.publishedAt || attributes.createdAt,
            readTime: attributes.readTime || attributes.waktuBaca || '5 min read',
            views: attributes.views || attributes.dilihat || 0,
            image: getImageUrl(attributes.image),
            slug: attributes.slug || `artikel-${item.id}`
          };
        });

        if (transformedData.length === 0) {
          throw new Error('Tidak ada artikel tersedia di server');
        }
        
        setArticles(transformedData);
        
      } catch (err) {
        console.error('❌ Error fetching articles:', err);
        setError(err.message);
        setArticles(sampleArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [getImageUrl]);

  // Filter articles dengan useMemo untuk optimasi
  const filteredArticles = useMemo(() => {
    return activeCategory === "all" 
      ? articles 
      : articles.filter(article => article.category === activeCategory);
  }, [activeCategory, articles]);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Loading Component
  const LoadingSpinner = () => (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Memuat artikel edukasi...</p>
      </div>
    </div>
  );

  // Error Alert Component
  const ErrorAlert = ({ error }) => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-8 rounded">
      <div className="flex">
        <div className="flex-shrink-0">⚠️</div>
        <div className="ml-3">
          <p className="text-yellow-700 text-sm">
            {error} - Menampilkan data contoh untuk demonstrasi.
          </p>
        </div>
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="text-8xl mb-6">📝</div>
      <h3 className="text-3xl font-bold text-gray-800 mb-4">
        Belum ada artikel
      </h3>
      <p className="text-gray-600 text-lg max-w-md mx-auto">
        Artikel untuk kategori ini sedang dalam proses penulisan oleh tim ahli kami.
      </p>
    </motion.div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundSlides[currentSlide].image})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-indigo-900/60" />
        
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30"
              >
                <span className="text-yellow-400 font-semibold text-lg">📚 Portal Edukasi</span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent"
              >
                {backgroundSlides[currentSlide].title}
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
              >
                {backgroundSlides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8"
              >
                {[
                  { number: articles.length, label: "Total Artikel" },
                  { number: [...new Set(articles.map(a => a.author))].length, label: "Penulis" },
                  { number: categories.length - 1, label: "Kategori" },
                  { number: "5K+", label: "Pembaca" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">{stat.number}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {backgroundSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-yellow-400 scale-125' : 'bg-white/60'
                }`}
                aria-label={`Pergi ke slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Error Alert */}
      {error && <ErrorAlert error={error} />}

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Jelajahi Kategori Artikel
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Pilih kategori yang sesuai dengan minat dan kebutuhan pembelajaran Anda
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    activeCategory === category.id
                      ? `${category.gradient} text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Articles Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer"
                  onClick={() => handleArticleClick(article.slug)}
                >
                  {/* Article Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={optimizeImage(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={handleImageError}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {categories.find(cat => cat.id === article.category)?.name || article.category}
                      </span>
                    </div>

                    {/* View Count */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
                      👁️ {formatViews(article.views)}
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{formatDateForDisplay(article.date)}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                          {article.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{article.author}</span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArticleClick(article.slug);
                        }}
                      >
                        Baca →
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {!loading && !error && filteredArticles.length === 0 && <EmptyState />}

          {/* Load More Button */}
          {filteredArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
              >
                Muat Lebih Banyak Artikel
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-blue-600 text-2xl mx-auto mb-6">
              ✉️
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dapatkan Update Terbaru
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Berlangganan newsletter untuk mendapatkan artikel edukasi terbaru langsung ke email Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="px-6 py-4 rounded-2xl border-0 focus:ring-2 focus:ring-yellow-400 text-gray-800 flex-1 shadow-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition-colors shadow-lg"
              >
                Berlangganan
              </motion.button>
            </div>
            <p className="text-blue-200 mt-4 text-sm">
              Tidak ada spam. Bisa unsubscribe kapan saja.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Edukasi;