import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

// Config untuk Strapi dan Cloudinary - menggunakan import.meta.env untuk Vite
const STRAPI_CONFIG = {
  URL: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337',
  CLOUDINARY_BASE_URL: import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com'
};

const Parenting = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Sample data fallback yang sesuai dengan schema
  const getSampleArticles = () => {
    return [
      {
        id: 1,
        title: "Panduan Pola Asuh Anak di Era Digital",
        excerpt: "Tips dan strategi untuk orang tua dalam menghadapi tantangan parenting di era teknologi modern. Pelajari cara membatasi screen time dan memilih konten yang tepat untuk anak.",
        content: "Konten lengkap artikel tentang pola asuh digital...",
        category: "pola-asuh",
        author: "Dr. Siti Aisyah, M.Psi",
        date: "15 Maret 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80",
        views: 1250,
        tags: ["parenting", "digital", "anak", "teknologi"],
        slug: "panduan-pola-asuh-digital",
        isFeatured: true
      },
      {
        id: 2,
        title: "Membangun Komunikasi Efektif dengan Remaja",
        excerpt: "Teknik komunikasi yang tepat untuk menjaga hubungan harmonis dengan anak remaja. Pelajari cara mendengarkan aktif dan berbicara dengan bahasa yang dipahami remaja.",
        content: "Konten lengkap artikel tentang komunikasi remaja...",
        category: "komunikasi",
        author: "Ahmad Fauzi, S.Psi",
        date: "10 Maret 2024",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
        views: 890,
        tags: ["komunikasi", "remaja", "keluarga", "psikologi"],
        slug: "komunikasi-efektif-remaja",
        isFeatured: false
      },
      {
        id: 3,
        title: "Pentingnya Gizi Seimbang untuk Tumbuh Kembang Anak",
        excerpt: "Panduan praktis menyusun menu makanan bergizi untuk anak usia dini hingga remaja. Ketahui nutrisi penting yang dibutuhkan setiap tahap perkembangan.",
        content: "Konten lengkap artikel tentang gizi anak...",
        category: "kesehatan",
        author: "dr. Rina Marlina",
        date: "8 Maret 2024",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1549056572-75914d6d7e1a?auto=format&fit=crop&w=600&q=80",
        views: 1560,
        tags: ["gizi", "kesehatan", "tumbuh-kembang", "makanan"],
        slug: "gizi-seimbang-anak",
        isFeatured: true
      },
      {
        id: 4,
        title: "Membentuk Karakter Islami Sejak Dini",
        excerpt: "Strategi menanamkan nilai-nilai Islami dan akhlak mulia pada anak sejak usia dini melalui keteladanan dan pembiasaan positif.",
        content: "Konten lengkap artikel tentang karakter Islami...",
        category: "karakter",
        author: "Ust. Abdullah Alawi, M.Pd",
        date: "5 Maret 2024",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
        views: 2100,
        tags: ["karakter", "islami", "akhlak", "pendidikan"],
        slug: "karakter-islami-anak",
        isFeatured: false
      },
      {
        id: 5,
        title: "Teknologi Ramah Anak untuk Pembelajaran",
        excerpt: "Rekomendasi aplikasi dan platform edukasi yang aman dan bermanfaat untuk mendukung proses belajar anak di rumah.",
        content: "Konten lengkap artikel tentang teknologi pendidikan...",
        category: "teknologi",
        author: "Tech Parenting Team",
        date: "3 Maret 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
        views: 1340,
        tags: ["teknologi", "edukasi", "aplikasi", "belajar"],
        slug: "teknologi-ramah-anak",
        isFeatured: false
      },
      {
        id: 6,
        title: "Pendidikan Seksualitas Sesuai Usia Anak",
        excerpt: "Panduan mengajarkan pendidikan seksualitas yang sesuai dengan tahap perkembangan dan nilai-nilai Islam kepada anak.",
        content: "Konten lengkap artikel tentang pendidikan seksualitas...",
        category: "pendidikan",
        author: "Psikolog Dian Kusuma, M.Psi",
        date: "1 Maret 2024",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80",
        views: 1780,
        tags: ["pendidikan", "seksualitas", "perkembangan", "islami"],
        slug: "pendidikan-seksualitas-anak",
        isFeatured: true
      }
    ];
  };

  // Fungsi untuk membersihkan URL gambar dari duplikasi
  const cleanImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
    
    // Remove duplicate localhost:1337
    if (url.includes('http://localhost:1337http')) {
      url = url.replace('http://localhost:1337', '');
    }
    if (url.includes('http://localhost:1337https')) {
      url = url.replace('http://localhost:1337', '');
    }
    
    // Remove duplicate Cloudinary URLs
    if (url.includes('https://res.cloudinary.comhttps://res.cloudinary.com')) {
      url = url.replace('https://res.cloudinary.com', '');
    }
    
    return url;
  };

  // Fetch articles dari Strapi
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          `${STRAPI_CONFIG.URL}/api/parentings?populate=*&sort[0]=date:desc`
        );
        
        const data = await response.json();
        
        // Jika ada masalah, langsung pakai sample data
        if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
          const sampleData = getSampleArticles();
          setArticles(sampleData);
          setFilteredArticles(sampleData);
          setFeaturedArticles(sampleData.filter(article => article.isFeatured).slice(0, 3));
          return;
        }
        
        // Proses data
        try {
          const formattedArticles = data.data.map((item, index) => {
            const articleData = item.attributes || item;
            
            // Basic validation
            if (!articleData || !articleData.title) {
              return null;
            }
            
            // Image handling
            let imageUrl = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
            
            if (articleData.image) {
              const img = articleData.image;
              
              // Method 1: Cloudinary URL from formats
              if (img.data?.attributes?.formats?.medium?.url) {
                const url = img.data.attributes.formats.medium.url;
                imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
              }
              // Method 2: Direct Cloudinary URL
              else if (img.data?.attributes?.url) {
                const url = img.data.attributes.url;
                imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
              }
              // Method 3: Simple URL field
              else if (img.url) {
                const url = img.url;
                imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${img.url}`;
              }
              // Method 4: String URL
              else if (typeof img === 'string') {
                imageUrl = img;
              }
              
              // Cleanup: Remove any duplicate base URLs
              imageUrl = cleanImageUrl(imageUrl);
            }
            
            // Date handling
            let formattedDate = 'Tanggal tidak tersedia';
            try {
              const dateSource = articleData.date || articleData.publishedAt;
              if (dateSource) {
                formattedDate = new Date(dateSource).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
              }
            } catch (e) {
              console.warn('Date formatting error:', e);
            }
            
            return {
              id: item.id || index,
              title: articleData.title,
              excerpt: articleData.excerpt || 'Deskripsi tidak tersedia...',
              content: articleData.content || '',
              category: articleData.category || 'pola-asuh',
              author: articleData.author || 'Admin',
              date: formattedDate,
              readTime: articleData.readTime || '5 min read',
              image: imageUrl,
              views: articleData.views || 0,
              tags: articleData.tags || [],
              slug: articleData.slug || `parenting-${item.id || index}`,
              isFeatured: articleData.isFeatured || false
            };
          }).filter(Boolean);
          
          setArticles(formattedArticles);
          setFilteredArticles(formattedArticles);
          setFeaturedArticles(formattedArticles.filter(article => article.isFeatured).slice(0, 3));
          
        } catch (processError) {
          throw new Error('Gagal memproses data dari Strapi');
        }
        
      } catch (err) {
        setError(`Gagal memuat data artikel: ${err.message}`);
        // Fallback to sample data
        const sampleData = getSampleArticles();
        setArticles(sampleData);
        setFilteredArticles(sampleData);
        setFeaturedArticles(sampleData.filter(article => article.isFeatured).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter artikel berdasarkan kategori dan pencarian
  useEffect(() => {
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

    setFilteredArticles(filtered);
  }, [activeCategory, searchTerm, articles]);

  const categories = [
    { id: 'all', name: 'Semua Artikel', count: articles.length },
    { id: 'pola-asuh', name: 'Pola Asuh', count: articles.filter(a => a.category === 'pola-asuh').length },
    { id: 'teknologi', name: 'Teknologi', count: articles.filter(a => a.category === 'teknologi').length },
    { id: 'komunikasi', name: 'Komunikasi', count: articles.filter(a => a.category === 'komunikasi').length },
    { id: 'kesehatan', name: 'Kesehatan', count: articles.filter(a => a.category === 'kesehatan').length },
    { id: 'karakter', name: 'Karakter', count: articles.filter(a => a.category === 'karakter').length },
    { id: 'pendidikan', name: 'Pendidikan', count: articles.filter(a => a.category === 'pendidikan').length }
  ];

  const popularArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

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
    },
    {
      name: "dr. Rina Marlina",
      specialization: "Ahli Gizi Anak",
      experience: "12+ tahun",
      image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Dewi Sartika, M.Pd",
      specialization: "Pendidikan Karakter",
      experience: "10+ tahun",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Loading state
  if (loading && articles.length === 0) {
    return (
      <div className="pt-20">
        <section className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat artikel parenting...</p>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error && articles.length === 0) {
    return (
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
                        className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                      >
                        <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
                              e.target.className = 'w-full h-full object-cover';
                            }}
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
                            👁️ {article.views || 0}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {article.date}
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
                            
                            <Link
                              to={`/parenting/${article.slug || article.id}`}
                              className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center"
                            >
                              Baca
                              <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
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

            {/* Load More Button */}
            {filteredArticles.length > 0 && (
              <div className="text-center">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
                >
                  Muat Lebih Banyak Artikel
                </motion.button>
              </div>
            )}
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
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl overflow-hidden flex-shrink-0 relative">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-tight">
                            {article.title}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                              </svg>
                              {article.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Newsletter Subscription */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 mb-8 border border-blue-200/50 shadow-lg"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Parenting Newsletter</h3>
                <p className="text-gray-600 text-sm">
                  Dapatkan artikel terbaru seputar parenting langsung di email Anda
                </p>
              </div>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Alamat email Anda"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Berlangganan Sekarang
                </motion.button>
              </div>
            </motion.section>

            {/* Expert Tips */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-gray-800">Tips dari Ahli</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Beri pujian pada usaha, bukan hasil",
                  "Jadilah pendengar yang aktif untuk anak",
                  "Konsisten dalam menerapkan aturan",
                  "Berikan teladan yang baik",
                  "Luangkan waktu berkualitas setiap hari"
                ].map((tip, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-orange-500 mr-3 mt-1 text-lg">💡</span>
                    <p className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Expert Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-800 mb-4">
                Tim Ahli Parenting Kami
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Dibimbing oleh profesional berpengalaman di bidang psikologi anak, pendidikan, dan perkembangan keluarga
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {experts.map((expert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -15,
                    transition: { duration: 0.3 }
                  }}
                  className="group bg-white rounded-3xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  <div className="relative mx-auto mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <img 
                        src={expert.image} 
                        alt={expert.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{expert.name}</h3>
                  <p className="text-blue-600 text-sm font-semibold mb-3">{expert.specialization}</p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl py-2 px-3">
                    <p className="text-gray-600 text-xs font-medium">Pengalaman: {expert.experience}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Butuh Konsultasi Parenting?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
              Tim ahli kami siap membantu Anda dalam menghadapi tantangan parenting dengan pendekatan Islami
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Hubungi Ahli
              </Link>
              <button className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm">
                Buat Janji Konsultasi
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Parenting;