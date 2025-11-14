import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

// Config untuk Strapi Cloud
const STRAPI_CONFIG = {
  URL: 'https://incredible-sparkle-f34960cd1e.strapiapp.com',
  CLOUDINARY_BASE_URL: 'https://res.cloudinary.com'
};

const Parenting = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Data hero slides statis
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Parenting Islami",
      subtitle: "Panduan praktis untuk orang tua dalam mendidik anak dengan nilai-nilai Islam",
      gradient: "from-blue-600/90 to-purple-700/90",
      buttonText: "Explore Articles",
      buttonColor: "bg-gradient-to-r from-blue-500 to-purple-600"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Pola Asuh Positif",
      subtitle: "Membangun karakter anak dengan kasih sayang dan keteladanan",
      gradient: "from-emerald-600/90 to-teal-700/90",
      buttonText: "Learn More",
      buttonColor: "bg-gradient-to-r from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1549056572-75914d6d7e1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Anak Shalih Shalihah",
      subtitle: "Investasi terbaik untuk dunia dan akhirat",
      gradient: "from-orange-600/90 to-red-700/90",
      buttonText: "Get Started",
      buttonColor: "bg-gradient-to-r from-orange-500 to-red-600"
    }
  ];

  // Auto slide untuk hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Sample data fallback dengan useCallback
  const getSampleArticles = useCallback(() => {
    return [
      {
        id: "1",
        title: "Panduan Pola Asuh Anak di Era Digital",
        excerpt: "Tips dan strategi untuk orang tua dalam menghadapi tantangan parenting di era teknologi modern.",
        content: "Konten lengkap artikel tentang pola asuh digital...",
        category: "pola-asuh",
        author: "Dr. Siti Aisyah, M.Psi",
        date: "2024-03-15",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80",
        views: 1250,
        tags: ["parenting", "digital", "anak", "teknologi"],
        slug: "panduan-pola-asuh-digital",
        isFeatured: true
      },
      {
        id: "2",
        title: "Membangun Komunikasi Efektif dengan Remaja",
        excerpt: "Teknik komunikasi yang tepat untuk menjaga hubungan harmonis dengan anak remaja.",
        content: "Konten lengkap artikel tentang komunikasi remaja...",
        category: "komunikasi",
        author: "Ahmad Fauzi, S.Psi",
        date: "2024-03-10",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
        views: 890,
        tags: ["komunikasi", "remaja", "keluarga", "psikologi"],
        slug: "komunikasi-efektif-remaja",
        isFeatured: false
      }
    ];
  }, []);

  // Format date untuk display dengan useCallback
  const formatDateForDisplay = useCallback((dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    try {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  }, []);

  // Format views dengan useCallback
  const formatViews = useCallback((views) => {
    if (!views) return '0';
    const viewsNum = typeof views === 'number' ? views : parseInt(views) || 0;
    if (viewsNum >= 1000) {
      return `${(viewsNum / 1000).toFixed(1)}K`;
    }
    return viewsNum.toString();
  }, []);

  // Fungsi untuk membersihkan URL gambar dengan useCallback
  const cleanImageUrl = useCallback((url) => {
    if (!url) return 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
    
    // Handle relative URLs untuk Strapi Cloud
    if (url.startsWith('/') && !url.includes('incredible-sparkle-f34960cd1e.strapiapp.com')) {
      return `https://incredible-sparkle-f34960cd1e.strapiapp.com${url}`;
    }
    
    // Remove duplicate base URLs
    if (url.includes('http://localhost:1337http')) {
      url = url.replace('http://localhost:1337', '');
    }
    if (url.includes('https://res.cloudinary.comhttps://res.cloudinary.com')) {
      url = url.replace('https://res.cloudinary.com', '');
    }
    
    return url;
  }, []);

  // Handle image error dengan useCallback
  const handleImageError = useCallback((e) => {
    e.target.src = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
    e.target.className = 'w-full h-full object-cover';
  }, []);

  // Handle article click dengan useCallback
  const handleArticleClick = useCallback((slug) => {
    navigate(`/parenting/${slug}`);
  }, [navigate]);

  // Fetch articles dari Strapi Cloud
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching from Strapi Cloud...');
        
        const response = await fetch(
          `${STRAPI_CONFIG.URL}/api/parentings?populate=*&sort[0]=date:desc`
        );
        
        console.log('📊 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Strapi response:', data);
        
        // Fallback ke sample data jika tidak ada data
        if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
          console.log('⚠️ No data from Strapi, using sample data');
          const sampleData = getSampleArticles();
          setArticles(sampleData);
          return;
        }
        
        // Process data dari Strapi
        const formattedArticles = data.data.map((item, index) => {
          const articleData = item.attributes || item;
          
          // Basic validation
          if (!articleData || !articleData.title) {
            return null;
          }
          
          // Image handling untuk Strapi v4
          let imageUrl = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
          
          if (articleData.image) {
            const img = articleData.image;
            console.log('🖼️ Image data:', img);
            
            // Strapi v4 structure
            if (img.data?.attributes?.url) {
              const url = img.data.attributes.url;
              imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
            }
            // Fallback structure
            else if (img.url) {
              const url = img.url;
              imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
            }
            
            // Cleanup URL
            imageUrl = cleanImageUrl(imageUrl);
          }
          
          return {
            id: item.id?.toString() || Math.random().toString(),
            title: articleData.title,
            excerpt: articleData.excerpt || 'Deskripsi tidak tersedia...',
            content: articleData.content || '',
            category: articleData.category || 'pola-asuh',
            author: articleData.author || 'Admin',
            date: articleData.date || articleData.publishedAt,
            readTime: articleData.readTime || '5 min read',
            image: imageUrl,
            views: articleData.views || 0,
            tags: articleData.tags || [],
            slug: articleData.slug || `parenting-${item.id || index}`,
            isFeatured: articleData.isFeatured || false
          };
        }).filter(Boolean);
        
        console.log('✅ Processed articles:', formattedArticles);
        
        setArticles(formattedArticles);
        
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(`Gagal memuat data artikel: ${err.message}`);
        // Fallback to sample data
        const sampleData = getSampleArticles();
        setArticles(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [getSampleArticles, cleanImageUrl]);

  // Filter articles dengan useMemo untuk optimasi
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => article.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.tags && article.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    return filtered;
  }, [activeCategory, searchTerm, articles]);

  // Categories dengan useMemo
  const categories = useMemo(() => [
    { id: 'all', name: 'Semua Artikel', count: articles.length },
    { id: 'pola-asuh', name: 'Pola Asuh', count: articles.filter(a => a.category === 'pola-asuh').length },
    { id: 'teknologi', name: 'Teknologi', count: articles.filter(a => a.category === 'teknologi').length },
    { id: 'komunikasi', name: 'Komunikasi', count: articles.filter(a => a.category === 'komunikasi').length },
    { id: 'kesehatan', name: 'Kesehatan', count: articles.filter(a => a.category === 'kesehatan').length },
    { id: 'karakter', name: 'Karakter', count: articles.filter(a => a.category === 'karakter').length },
    { id: 'pendidikan', name: 'Pendidikan', count: articles.filter(a => a.category === 'pendidikan').length }
  ], [articles]);

  // Popular articles dengan useMemo
  const popularArticles = useMemo(() => 
    [...articles]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3),
    [articles]
  );

  // Featured articles dengan useMemo
  const featuredArticles = useMemo(() => 
    articles.filter(article => article.isFeatured).slice(0, 3),
    [articles]
  );

  // Data experts statis
  const experts = [
    {
      name: "Dr. Siti Aisyah, M.Psi",
      specialization: "Psikolog Anak & Keluarga",
      experience: "15+ tahun",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Ahmad Fauzi, S.Psi",
      specialization: "Spesialis Teknologi & Anak", 
      experience: "8+ tahun",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Loading Component
  const LoadingSpinner = () => (
    <div className="pt-20">
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat artikel parenting...</p>
        </div>
      </section>
    </div>
  );

  // Error Component
  const ErrorState = () => (
    <div className="pt-20">
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    </div>
  );

  if (loading && articles.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && articles.length === 0) {
    return <ErrorState />;
  }

  return (
    <div className="pt-20">
      {/* Modern Hero Section dengan Slider */}
      <section className="relative min-h-[80vh] py-24 bg-cover bg-center bg-no-repeat text-white overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${heroSlides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient}`} />
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl opacity-90 mb-8 font-light leading-relaxed"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                
                {/* CTA Button */}
                <motion.div className="mb-12">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`${heroSlides[currentSlide].buttonColor} text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300`}
                  >
                    {heroSlides[currentSlide].buttonText}
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Cari artikel parenting, tips, atau konsultasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-8 py-5 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-white/50 backdrop-blur-sm bg-white/95 shadow-2xl border border-white/20 transition-all duration-300 group-hover:bg-white"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Slider Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 border-transparent'
                        : 'bg-white/80 text-gray-700 hover:bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                    }`}
                  >
                    {category.name} 
                    <span className={`ml-2 text-sm ${
                      activeCategory === category.id ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      ({category.count})
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Articles Grid */}
            <section className="mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {filteredArticles.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {filteredArticles.map((article, index) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          y: -8,
                          transition: { duration: 0.3 }
                        }}
                        className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
                        onClick={() => handleArticleClick(article.slug)}
                      >
                        <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={handleImageError}
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                              {article.category ? article.category.charAt(0).toUpperCase() + article.category.slice(1) : 'Umum'}
                            </span>
                          </div>
                          
                          {/* View Count */}
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                            👁️ {formatViews(article.views)}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDateForDisplay(article.date)}
                            </span>
                            <span className="mx-3">•</span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {article.readTime}
                            </span>
                          </div>
                          
                          <h2 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h2>
                          
                          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-3 flex items-center justify-center text-white font-bold">
                                {article.author.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <span className="text-sm font-semibold text-gray-800 block">{article.author}</span>
                                <span className="text-xs text-gray-500">Expert</span>
                              </div>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleArticleClick(article.slug);
                              }}
                            >
                              Baca
                              <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </div>

                          {/* Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">
                              {article.tags.map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex}
                                  className="bg-gray-50 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="text-8xl mb-6">🔍</div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      {articles.length === 0 ? 'Belum ada artikel' : 'Artikel tidak ditemukan'}
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                      {articles.length === 0 
                        ? 'Silakan tambahkan artikel parenting di dashboard Strapi' 
                        : 'Coba gunakan kata kunci lain atau pilih kategori yang berbeda'
                      }
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('all');
                      }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      Tampilkan Semua Artikel
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* Popular Articles */}
            <section className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
                </div>
                
                <div className="space-y-6">
                  {popularArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 8 }}
                      className="group bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                      onClick={() => handleArticleClick(article.slug)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl overflow-hidden flex-shrink-0 relative">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={handleImageError}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-tight">
                            {article.title}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>👁️ {formatViews(article.views)} views</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parenting;