import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Komponen Hero dengan Slideshow (Static)
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80",
      title: "Membangun Generasi Unggul",
      subtitle: "Berprestasi, Berkarakter, dan Berakhlak Mulia",
      description: "Mewujudkan pendidikan berkualitas untuk mencetak generasi penerus bangsa yang kompeten dan berintegritas"
    },
    {
      image: "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=2000&q=80",
      title: "Pendidikan Holistik",
      subtitle: "Mengembangkan Potensi Setiap Anak",
      description: "Pendidikan yang mengintegrasikan aspek kognitif, afektif, dan psikomotorik secara seimbang"
    },
    {
      image: "https://images.unsplash.com/photo-1524178239883-6a6c3e11c0e1?auto=format&fit=crop&w=2000&q=80",
      title: "Inovasi dalam Pembelajaran",
      subtitle: "Menghadapi Tantangan Masa Depan",
      description: "Metode pembelajaran terkini yang mempersiapkan siswa untuk sukses di era digital"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slideshow Background */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container-custom text-center text-white">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {slides[currentSlide].title}
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-3xl font-semibold mb-6 text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {slides[currentSlide].subtitle}
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {slides[currentSlide].description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Jelajahi Sekolah
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Daftar Sekarang
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

// Komponen untuk setiap jenjang pendidikan
const AchievementLevelSection = ({ 
  title, 
  description, 
  achievements, 
  selectedCategory, 
  setSelectedCategory, 
  selectedLevel, 
  setSelectedLevel,
  onAchievementClick 
}) => {
  // Filter achievements berdasarkan category dan level
  const filteredAchievements = achievements.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || item.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  // Warna untuk setiap kategori
  const categoryColors = {
    akademik: 'bg-blue-100 text-blue-800',
    olahraga: 'bg-green-100 text-green-800',
    seni: 'bg-purple-100 text-purple-800',
    teknologi: 'bg-orange-100 text-orange-800',
    lainnya: 'bg-gray-100 text-gray-800'
  };

  // Warna untuk setiap level
  const levelColors = {
    sekolah: 'bg-yellow-100 text-yellow-800',
    kota: 'bg-indigo-100 text-indigo-800',
    provinsi: 'bg-pink-100 text-pink-800',
    nasional: 'bg-red-100 text-red-800',
    internasional: 'bg-teal-100 text-teal-800'
  };

  // Icon untuk setiap kategori
  const categoryIcons = {
    akademik: '📚',
    olahraga: '⚽',
    seni: '🎨',
    teknologi: '💻',
    lainnya: '🏆'
  };

  return (
    <div className="mb-16">
      {/* Header Jenjang */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-blue-900 mb-4">{title}</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        className="flex flex-col lg:flex-row gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Filter Kategori */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Filter Kategori</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Semua Kategori' },
              { key: 'akademik', label: 'Akademik' },
              { key: 'olahraga', label: 'Olahraga' },
              { key: 'seni', label: 'Seni' },
              { key: 'teknologi', label: 'Teknologi' },
              { key: 'lainnya', label: 'Lainnya' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedCategory(item.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === item.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Tingkat */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Filter Tingkat</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Semua Tingkat' },
              { key: 'sekolah', label: 'Sekolah' },
              { key: 'kota', label: 'Kota' },
              { key: 'provinsi', label: 'Provinsi' },
              { key: 'nasional', label: 'Nasional' },
              { key: 'internasional', label: 'Internasional' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedLevel(item.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedLevel === item.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => onAchievementClick(item)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[item.category]}`}>
                    {categoryIcons[item.category]} {item.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                    item.level === 'internasional' ? 'bg-teal-500' :
                    item.level === 'nasional' ? 'bg-red-500' :
                    item.level === 'provinsi' ? 'bg-pink-500' :
                    item.level === 'kota' ? 'bg-indigo-500' :
                    'bg-yellow-500'
                  }`}>
                    {item.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                    {item.year}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                {item.participants && (
                  <p className="text-sm text-gray-500 mb-3">
                    <strong>Peserta:</strong> {item.participants}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[item.level]}`}>
                    {item.level}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                    Selengkapnya
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="text-center py-12 bg-white rounded-2xl shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            {achievements.length === 0 ? 'Belum ada prestasi' : 'Tidak ditemukan'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {achievements.length === 0 
              ? 'Belum ada data prestasi yang tersedia.' 
              : 'Tidak ada prestasi yang sesuai dengan filter yang dipilih.'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Komponen Prestasi Utama yang Terpisah per Jenjang
const AchievementSection = () => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [achievements, setAchievements] = useState([]);
  
  // State filter untuk setiap jenjang
  const [tkFilter, setTkFilter] = useState({ category: 'all', level: 'all' });
  const [sdFilter, setSdFilter] = useState({ category: 'all', level: 'all' });
  const [smpFilter, setSmpFilter] = useState({ category: 'all', level: 'all' });

  // PERBAIKAN: Update URL ke Strapi Cloud
  const STRAPI_CONFIG = {
    URL: 'https://incredible-sparkle-f34960cd1e.strapiapp.com',
    CLOUDINARY_BASE_URL: 'https://res.cloudinary.com'
  };

  // Data fallback untuk development
  const fallbackAchievements = [
    // Prestasi TK
    {
      id: 1,
      title: "Juara 1 Lomba Mewarnai Tingkat Kota",
      description: "Ananda Rara berhasil meraih juara 1 dalam lomba mewarnai tingkat kota yang diikuti oleh 50 peserta dari berbagai TK.",
      image: "https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80",
      category: "seni",
      level: "kota",
      date: "2024-01-15",
      participants: "Ananda Rara",
      year: "2024",
      jenjang: "tk"
    },
    {
      id: 5,
      title: "Peserta Terbaik Lomba Menari",
      description: "Kelompok tari TK meraih predikat peserta terbaik dalam festival seni anak usia dini.",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
      category: "seni",
      level: "kota",
      date: "2024-05-12",
      participants: "Kelompok Tari TK",
      year: "2024",
      jenjang: "tk"
    },
    // Prestasi SD
    {
      id: 2,
      title: "Juara Olimpiade Matematika Nasional",
      description: "Siswa berhasil meraih juara 1 dalam olimpiade matematika nasional yang diikuti oleh 500 peserta dari seluruh Indonesia.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      category: "akademik",
      level: "nasional",
      date: "2024-02-20",
      participants: "Budi Santoso",
      year: "2024",
      jenjang: "sd"
    },
    {
      id: 3,
      title: "Juara 1 Turnamen Futsal Sekolah",
      description: "Tim futsal SD berhasil menjadi juara 1 dalam turnamen futsal antarsekolah.",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80",
      category: "olahraga",
      level: "sekolah",
      date: "2024-03-10",
      participants: "Tim Futsal SD",
      year: "2024",
      jenjang: "sd"
    },
    // Prestasi SMP
    {
      id: 4,
      title: "Juara 3 Lomba Robotik Regional",
      description: "Tim robotik SMP berhasil meraih juara 3 dalam kompetisi robotik regional se-Jawa Barat.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      category: "teknologi",
      level: "provinsi",
      date: "2024-04-05",
      participants: "Tim Robotik SMP",
      year: "2024",
      jenjang: "smp"
    },
    {
      id: 6,
      title: "Juara 1 Lomba Debat Bahasa Indonesia",
      description: "Tim debat SMP menjadi juara 1 dalam lomba debat bahasa Indonesia tingkat provinsi.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
      category: "akademik",
      level: "provinsi",
      date: "2024-06-18",
      participants: "Tim Debat SMP",
      year: "2024",
      jenjang: "smp"
    }
  ];

  // Fungsi untuk mendapatkan URL gambar - DIPERBARUI
  const getImageUrl = (imageData) => {
    if (!imageData) return 'https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80';
    
    let imageUrl = 'https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80';
    
    // Handle Strapi v4 structure
    if (imageData.data?.attributes?.url) {
      const url = imageData.data.attributes.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
    }
    // Alternative Strapi v4 structure
    else if (imageData.attributes?.url) {
      const url = imageData.attributes.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
    }
    // Fallback structure
    else if (imageData.url) {
      const url = imageData.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
    }
    
    // Cleanup: Remove any duplicate base URLs
    if (imageUrl.includes('http://localhost:1337http')) {
      imageUrl = imageUrl.replace('http://localhost:1337', '');
    }
    if (imageUrl.includes('http://localhost:1337https')) {
      imageUrl = imageUrl.replace('http://localhost:1337', '');
    }
    
    return imageUrl;
  };

  // Fetch achievements dari Strapi Cloud - DIPERBARUI
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // PERBAIKAN: Update endpoint URL ke Strapi Cloud
        const response = await fetch(
          `${STRAPI_CONFIG.URL}/api/prestasis?populate=*&sort=date:desc`
        );
        
        const data = await response.json();
        
        // Jika ada masalah, pakai fallback data
        if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
          setAchievements(fallbackAchievements);
          return;
        }
        
        // Proses data Strapi
        try {
          const formattedAchievements = data.data.map((item, index) => {
            const itemData = item.attributes || item;
            
            if (!itemData || !itemData.title) {
              console.warn('Skipping invalid item:', item);
              return null;
            }
            
            const imageUrl = getImageUrl(itemData.image);
            
            let year = '2024';
            try {
              if (itemData.date) {
                year = new Date(itemData.date).getFullYear().toString();
              }
            } catch (e) {
              console.warn('Date error:', e);
            }
            
            return {
              id: item.id,
              title: itemData.title,
              description: itemData.description || 'No description',
              image: imageUrl,
              category: itemData.category || 'lainnya',
              level: itemData.level || 'sekolah',
              date: itemData.date || '2024-01-01',
              participants: itemData.participants || '',
              year: year,
              jenjang: itemData.jenjang || 'sd' // Default ke SD jika tidak ada
            };
          }).filter(Boolean);
          
          setAchievements(formattedAchievements);
          
        } catch (processError) {
          console.error('Error processing data:', processError);
          throw new Error('Gagal memproses data dari Strapi');
        }
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Gagal memuat data prestasi: ${err.message}`);
        setAchievements(fallbackAchievements);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Pisahkan achievements berdasarkan jenjang
  const tkAchievements = achievements.filter(item => item.jenjang === 'tk');
  const sdAchievements = achievements.filter(item => item.jenjang === 'sd');
  const smpAchievements = achievements.filter(item => item.jenjang === 'smp');

  // Hitung statistik total
  const stats = {
    total: achievements.length,
    tk: tkAchievements.length,
    sd: sdAchievements.length,
    smp: smpAchievements.length,
    akademik: achievements.filter(item => item.category === 'akademik').length,
    olahraga: achievements.filter(item => item.category === 'olahraga').length,
    seni: achievements.filter(item => item.category === 'seni').length,
    teknologi: achievements.filter(item => item.category === 'teknologi').length,
    lainnya: achievements.filter(item => item.category === 'lainnya').length,
  };

  if (loading) {
    return (
      <section id="prestasi" className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data prestasi...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="prestasi" className="bg-gray-50 py-16">
      <div className="container-custom">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-blue-900">Prestasi Siswa</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Berbagai prestasi membanggakan yang telah diraih oleh siswa-siswi kami di semua jenjang pendidikan
          </p>
        </motion.div>

        {error && (
          <motion.div 
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center">
              <div className="text-yellow-600 mr-3">⚠️</div>
              <div>
                <p className="text-yellow-800 text-sm">{error}</p>
                <p className="text-yellow-700 text-xs mt-1">Menggunakan data contoh untuk demonstrasi</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#tk" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            TK ({tkAchievements.length})
          </a>
          <a href="#sd" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
            SD ({sdAchievements.length})
          </a>
          <a href="#smp" className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
            SMP ({smpAchievements.length})
          </a>
        </motion.div>

        {/* TK Section */}
        <section id="tk" className="scroll-mt-20">
          <AchievementLevelSection
            title="Prestasi TK"
            description="Prestasi membanggakan dari siswa-siswi Taman Kanak-Kanak"
            achievements={tkAchievements}
            selectedCategory={tkFilter.category}
            setSelectedCategory={(category) => setTkFilter(prev => ({ ...prev, category }))}
            selectedLevel={tkFilter.level}
            setSelectedLevel={(level) => setTkFilter(prev => ({ ...prev, level }))}
            onAchievementClick={setSelected}
          />
        </section>

        {/* SD Section */}
        <section id="sd" className="scroll-mt-20">
          <AchievementLevelSection
            title="Prestasi SD"
            description="Prestasi akademik dan non-akademik siswa Sekolah Dasar"
            achievements={sdAchievements}
            selectedCategory={sdFilter.category}
            setSelectedCategory={(category) => setSdFilter(prev => ({ ...prev, category }))}
            selectedLevel={sdFilter.level}
            setSelectedLevel={(level) => setSdFilter(prev => ({ ...prev, level }))}
            onAchievementClick={setSelected}
          />
        </section>

        {/* SMP Section */}
        <section id="smp" className="scroll-mt-20">
          <AchievementLevelSection
            title="Prestasi SMP"
            description="Prestasi siswa Sekolah Menengah Pertama di berbagai bidang"
            achievements={smpAchievements}
            selectedCategory={smpFilter.category}
            setSelectedCategory={(category) => setSmpFilter(prev => ({ ...prev, category }))}
            selectedLevel={smpFilter.level}
            setSelectedLevel={(level) => setSmpFilter(prev => ({ ...prev, level }))}
            onAchievementClick={setSelected}
          />
        </section>

        {/* Stats Section */}
        {achievements.length > 0 && (
          <motion.section 
            className="bg-white py-12 mt-16 rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container-custom">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Statistik Prestasi
              </h3>
              
              {/* Stats by Jenjang */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold text-center mb-8 text-gray-700">Berdasarkan Jenjang</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {[
                    { key: 'tk', label: 'Taman Kanak-Kanak', color: 'text-blue-600', icon: '🎨' },
                    { key: 'sd', label: 'Sekolah Dasar', color: 'text-green-600', icon: '📚' },
                    { key: 'smp', label: 'Sekolah Menengah Pertama', color: 'text-purple-600', icon: '🔬' },
                  ].map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="text-center p-6 bg-gray-50 rounded-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-4xl mb-2">{stat.icon}</div>
                      <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                        {stats[stat.key]}
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats by Category */}
              <div>
                <h4 className="text-xl font-semibold text-center mb-8 text-gray-700">Berdasarkan Kategori</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                  {[
                    { key: 'akademik', label: 'Akademik', icon: '📚', color: 'text-blue-600' },
                    { key: 'olahraga', label: 'Olahraga', icon: '⚽', color: 'text-green-600' },
                    { key: 'seni', label: 'Seni', icon: '🎨', color: 'text-purple-600' },
                    { key: 'teknologi', label: 'Teknologi', icon: '💻', color: 'text-orange-600' },
                    { key: 'lainnya', label: 'Lainnya', icon: '🏆', color: 'text-gray-600' },
                  ].map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                        {stats[stat.key]}
                      </div>
                      <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Total Stats */}
              <motion.div 
                className="text-center mt-12 pt-8 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.total}+
                </div>
                <div className="text-gray-600 font-medium text-xl">Total Prestasi</div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Modal Detail */}
        {selected && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full mx-auto relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                ×
              </button>
              
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-72 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-2">
                    {selected.jenjang?.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {selected.title}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {selected.description}
              </p>

              {selected.participants && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Peserta:</h4>
                  <p className="text-gray-600">{selected.participants}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  Jenjang {selected.jenjang?.toUpperCase()}
                </span>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  📅 {new Date(selected.date).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

// Komponen utama yang menggabungkan Hero dan Prestasi
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AchievementSection />
    </>
  );
};

export default HomePage;