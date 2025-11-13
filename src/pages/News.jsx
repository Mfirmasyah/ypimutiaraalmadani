import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../utils/animations';

const News = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [heroRef, heroVisible] = useScrollAnimation(0.3);
  const [newsRef, newsVisible] = useScrollAnimation(0.2);
  const [currentBackground, setCurrentBackground] = useState(0);

  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Konfigurasi Strapi URL
  const STRAPI_URL = "http://localhost:1337";

  // Background images untuk hero section
  const backgroundImages = [
    "https://images.unsplash.com/photo-1588072432836-4b4f66ea8c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ];

  // Auto change background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  };

  // Get image URL dari Strapi v4
  const getImageUrl = (imageData) => {
    console.log('Image data received:', imageData);
    
    if (!imageData?.url) {
      return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
    }
    
    const imageUrl = imageData.url;
    
    // Jika URL sudah lengkap (cloudinary)
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Jika relative URL, tambahkan base URL Strapi
    return `${STRAPI_URL}${imageUrl}`;
  };

  // Sample data fallback
  const getSampleNews = () => {
    return [
      {
        id: 1,
        judul: "Penerimaan Peserta Didik Baru Tahun Ajaran 2024/2025",
        deskripsi: "Pendaftaran PPDB dibuka mulai 1 Januari 2024. Kuota terbatas untuk semua jenjang pendidikan dengan program beasiswa prestasi...",
        konten: "Sekolah Kita membuka pendaftaran peserta didik baru untuk tahun ajaran 2024/2025...",
        kategori: "pengumuman",
        penulis: "Admin Sekolah",
        tanggal: "2024-03-20",
        waktuBaca: "3 min read",
        gambar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        penting: true,
        dilihat: 2456,
        tags: ["ppdb", "pendaftaran", "siswa-baru"],
        slug: "ppdb-2024"
      },
      {
        id: 2,
        judul: "Siswa SMP Meraih Juara 1 Olimpiade Matematika Nasional",
        deskripsi: "M. Rizki Pratama dari kelas 8A berhasil meraih medali emas dalam OMN 2024 dengan skor sempurna...",
        konten: "Prestasi membanggakan kembali ditorehkan oleh siswa SMP Islam Terpadu Sekolah Kita...",
        kategori: "prestasi",
        penulis: "Tim Humas",
        tanggal: "2024-03-18",
        waktuBaca: "4 min read",
        gambar: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        penting: false,
        dilihat: 1876,
        tags: ["prestasi", "olimpiade", "matematika"],
        slug: "juara-olimpiade-matematika"
      },
      {
        id: 3,
        judul: "Workshop Pembelajaran Digital untuk Guru",
        deskripsi: "Dalam rangka meningkatkan kompetensi guru dalam pembelajaran digital, sekolah menyelenggarakan workshop intensif...",
        konten: "Workshop ini diikuti oleh seluruh guru dari berbagai jenjang pendidikan...",
        kategori: "kegiatan",
        penulis: "Tim Pengembangan SDM",
        tanggal: "2024-03-15",
        waktuBaca: "5 min read",
        gambar: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        penting: false,
        dilihat: 1567,
        tags: ["workshop", "guru", "digital"],
        slug: "workshop-pembelajaran-digital"
      }
    ];
  };

  // Fetch data dari Strapi - SUDAH DIPERBAIKI
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Memulai fetch data dari Strapi...');
        
        const endpoint = `${STRAPI_URL}/api/beritas?populate=*`;
        
        console.log(`🔍 Mencoba endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        console.log('📊 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Data mentah dari Strapi:', data);
        
        // Validasi struktur data
        if (!data || !data.data || !Array.isArray(data.data)) {
          console.warn('❌ Format data tidak valid, menggunakan sample data');
          throw new Error('Format data response tidak valid');
        }

        // Debug: Lihat struktur data sebenarnya
        console.log('🔍 Debug struktur data lengkap:');
        console.log('Data structure:', data);
        
        if (data.data.length > 0) {
          const firstItem = data.data[0];
          console.log('Item pertama lengkap:', firstItem);
          console.log('Keys item pertama:', Object.keys(firstItem));
          
          // Cek apakah data langsung ada di item atau di attributes
          if (firstItem.attributes) {
            console.log('✅ Menggunakan struktur dengan attributes');
            console.log('Attributes keys:', Object.keys(firstItem.attributes));
          } else {
            console.log('✅ Menggunakan struktur langsung (tanpa attributes)');
            console.log('Direct keys:', Object.keys(firstItem));
          }
        }

        // Transform data - handle kedua struktur (dengan attributes dan tanpa attributes)
        const transformedData = data.data.map((item, index) => {
          console.log(`🔧 Processing item ${index}:`, item);
          
          // Tentukan apakah menggunakan attributes atau data langsung
          const itemData = item.attributes || item;
          console.log(`📋 Data yang digunakan:`, itemData);
          console.log(`📋 Fields available:`, Object.keys(itemData));
          
          // Mapping field yang fleksibel
          const newsItem = {
            id: item.id || `fallback-${index}`,
            // Cari field judul/title
            judul: itemData.judul || itemData.title || itemData.nama || itemData.name || `Berita ${index + 1}`,
            // Cari field deskripsi/excerpt
            deskripsi: itemData.deskripsi || itemData.excerpt || itemData.description || itemData.summary || 
                      (itemData.konten ? itemData.konten.substring(0, 150) + '...' : '') ||
                      (itemData.content ? itemData.content.substring(0, 150) + '...' : 'Deskripsi tidak tersedia...'),
            // Cari field konten/content
            konten: itemData.konten || itemData.content || itemData.body || itemData.isi || 'Konten tidak tersedia',
            // Cari field kategori/category
            kategori: itemData.kategori || itemData.category || itemData.tipe || itemData.type || 'umum',
            // Cari field penulis/author
            penulis: itemData.penulis || itemData.author || itemData.creator || itemData.createdBy || 'Admin Sekolah',
            // Cari field tanggal/date
            tanggal: formatDate(itemData.tanggal || itemData.date || itemData.publishedAt || itemData.createdAt || itemData.updatedAt),
            // Cari field waktu baca
            waktuBaca: itemData.waktuBaca || itemData.readTime || itemData.readingTime || '3 min read',
            // Cari field gambar/image - handle nested structure
            gambar: getImageUrl(itemData.gambar || itemData.image || itemData.cover || itemData.thumbnail),
            // Cari field penting/important
            penting: itemData.penting || itemData.important || itemData.isImportant || itemData.featured || false,
            // Cari field dilihat/views
            dilihat: itemData.dilihat || itemData.views || itemData.viewCount || itemData.count || Math.floor(Math.random() * 1000),
            // Cari field tags
            tags: itemData.tags || itemData.label || itemData.categories || itemData.keywords || [],
            // Cari field slug
            slug: itemData.slug || itemData.url || itemData.permalink || `berita-${item.id || index}`
          };
          
          console.log(`✅ Item ${index} setelah transformasi:`, newsItem);
          return newsItem;
        });

        console.log('🎉 Semua data setelah transformasi:', transformedData);

        if (transformedData.length === 0) {
          console.warn('⚠️ Tidak ada data berita dari API, menggunakan sample data');
          throw new Error('Tidak ada data berita tersedia');
        }
        
        setNews(transformedData);
        setFilteredNews(transformedData);
        console.log('✅ Data berhasil dimuat:', transformedData.length, 'items');
        
      } catch (error) {
        console.error('❌ Error fetching news:', error);
        setError(error.message);
        const sampleData = getSampleNews();
        console.log('🔄 Menggunakan sample data:', sampleData);
        setNews(sampleData);
        setFilteredNews(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [STRAPI_URL]); // Tambahkan STRAPI_URL sebagai dependency

  // Filter berita berdasarkan kategori
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(item => {
        if (!item.kategori) return false;
        return item.kategori.toLowerCase() === activeCategory.toLowerCase();
      });
      setFilteredNews(filtered);
    }
  }, [activeCategory, news]);

  // Kategori dengan fallback handling
  const categories = [
    { 
      id: 'all', 
      name: 'Semua Berita', 
      count: news.length, 
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      id: 'pengumuman', 
      name: 'Pengumuman', 
      count: news.filter(item => item.kategori && item.kategori.toLowerCase() === 'pengumuman').length, 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      id: 'prestasi', 
      name: 'Prestasi', 
      count: news.filter(item => item.kategori && item.kategori.toLowerCase() === 'prestasi').length, 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      id: 'akademik', 
      name: 'Akademik', 
      count: news.filter(item => item.kategori && item.kategori.toLowerCase() === 'akademik').length, 
      color: 'from-orange-500 to-red-500' 
    },
    { 
      id: 'kegiatan', 
      name: 'Kegiatan', 
      count: news.filter(item => item.kategori && item.kategori.toLowerCase() === 'kegiatan').length, 
      color: 'from-yellow-500 to-amber-500' 
    }
  ];

  const importantNews = news.filter(item => item.penting);
  const trendingNews = [...news]
    .sort((a, b) => (b.dilihat || 0) - (a.dilihat || 0))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat berita terbaru...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Debug Info - DIPERBAIKI: Hapus process.env */}
      {false && (
        <div className="fixed top-20 left-4 bg-gray-800 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
          <div className="font-bold">Debug Info:</div>
          <div>Total News: {news.length}</div>
          <div>Filtered: {filteredNews.length}</div>
          <div>Active Category: {activeCategory}</div>
          {error && <div className="text-red-300">Error: {error}</div>}
        </div>
      )}

      {/* Error Indicator */}
      {error && (
        <div className="fixed top-20 right-4 bg-yellow-100 border border-yellow-400 p-3 rounded-lg text-xs z-50 max-w-xs">
          <div className="font-bold text-yellow-800">⚠️ Menggunakan data sample</div>
          <div className="text-yellow-700 text-xs">{error}</div>
        </div>
      )}

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
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-indigo-800/40" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-40 right-20 w-6 h-6 bg-white/15 rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl"
            >
              Berita & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 drop-shadow-lg">Pengumuman</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-2xl md:text-3xl mb-8 font-light leading-relaxed text-white drop-shadow-lg"
            >
              Informasi terbaru seputar kegiatan, prestasi, dan pengumuman penting dari Sekolah Kita
            </motion.p>
            
            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            >
              {[
                { number: news.length, label: 'Total Berita' },
                { number: importantNews.length, label: 'Pengumuman Penting' },
                { number: '1000+', label: 'Pembaca Harian' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2 drop-shadow-lg">{stat.number}</div>
                  <div className="text-white/90 text-sm drop-shadow-md">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                Jelajahi Berita
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Background Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBackground(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentBackground === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Important Announcements - DIPERBAIKI: TAMBAH TOMBOL BACA */}
      {importantNews.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50 border-y border-orange-200/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl mr-4 text-2xl">⚠️</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Pengumuman Penting</h2>
                    <p className="text-gray-600 text-sm">Informasi terkini yang perlu perhatian khusus</p>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {importantNews.map((newsItem) => (
                  <motion.div
                    key={newsItem.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-orange-600 transition-colors">
                        {newsItem.judul}
                      </h3>
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold ml-3 flex-shrink-0">
                        Penting
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {newsItem.deskripsi}
                    </p>
                    
                    {/* TOMBOL BACA DITAMBAHKAN DI SINI */}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-orange-600 text-xs font-semibold">{newsItem.tanggal}</span>
                      <Link
                        to={`/news/${newsItem.slug || newsItem.id}`}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center"
                      >
                        Baca
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Category Filter */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={staggerContainer}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    variants={fadeInUp}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg border-transparent`
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

            {/* News Grid */}
            <section ref={newsRef} className="mb-16">
              <motion.div
                initial="initial"
                animate={newsVisible ? "animate" : "initial"}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-8"
              >
                {filteredNews.map((newsItem) => (
                  <motion.article
                    key={newsItem.id}
                    variants={fadeInUp}
                    layout
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  >
                    <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                      <img 
                        src={newsItem.gambar} 
                        alt={newsItem.judul}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {newsItem.penting && (
                          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                            🔥 Penting
                          </span>
                        )}
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          {newsItem.kategori ? newsItem.kategori.charAt(0).toUpperCase() + newsItem.kategori.slice(1) : 'Berita'}
                        </span>
                      </div>
                      
                      {/* View Count */}
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {newsItem.dilihat}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {newsItem.tanggal}
                        </span>
                        <span className="mx-3">•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {newsItem.waktuBaca || '3 min read'}
                        </span>
                        <span className="mx-3">•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {newsItem.penulis || 'Admin Sekolah'}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {newsItem.judul}
                      </h2>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {newsItem.deskripsi || 'Berita terbaru dari sekolah...'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {newsItem.tags && Array.isArray(newsItem.tags) && newsItem.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="bg-gray-50 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <Link
                          to={`/news/${newsItem.slug || newsItem.id}`}
                          className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center"
                        >
                          Baca
                          <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {/* Empty State */}
              {filteredNews.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-8xl mb-6">📰</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Tidak ada berita pada kategori ini
                  </h3>
                  <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                    Silakan pilih kategori lain untuk melihat berita yang tersedia
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory('all')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Tampilkan Semua Berita
                  </motion.button>
                </motion.div>
              )}
            </section>

            {/* Load More Button */}
            {filteredNews.length > 0 && filteredNews.length >= 6 && (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
                >
                  Muat Berita Lainnya
                </motion.button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* Quick Links */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-gray-800">Akses Cepat</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "📋", title: "Info PPDB 2024", color: "blue", path: "/spmb/info" },
                  { icon: "🏆", title: "Prestasi Terbaru", color: "green", path: "/achievement" },
                  { icon: "📷", title: "Galeri Kegiatan", color: "purple", path: "/gallery" },
                  { icon: "👨‍👩‍👧‍👦", title: "Artikel Parenting", color: "pink", path: "/parenting" }
                ].map((link, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }}>
                    <Link
                      to={link.path}
                      className="flex items-center p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-all duration-300 group border border-blue-200/50"
                    >
                      <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">{link.icon}</span>
                      <span className="font-semibold">{link.title}</span>
                      <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Trending News */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 mb-8 border border-purple-200/50"
            >
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-gray-800">Trending Now</h3>
              </div>
              <div className="space-y-4">
                {trendingNews.map((newsItem, index) => (
                  <motion.div
                    key={newsItem.id}
                    whileHover={{ x: 5 }}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border border-white/50"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={newsItem.gambar} 
                          alt={newsItem.judul}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-purple-600 transition-colors line-clamp-2 mb-1">
                          {newsItem.judul}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {newsItem.dilihat}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Newsletter */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Newsletter</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Dapatkan update berita terbaru langsung ke email Anda
                </p>
              </div>
              
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Berlangganan
                </motion.button>
              </div>
              
              <p className="text-gray-500 text-xs text-center mt-4">
                Kami menghormati privasi Anda. Tidak ada spam!
              </p>
            </motion.section>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tetap Terhubung dengan Mutiara Al-Madani
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Jangan lewatkan informasi terbaru seputar kegiatan sekolah, prestasi siswa, dan pengumuman penting lainnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300"
              >
                Hubungi Kami
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Download App
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default News;