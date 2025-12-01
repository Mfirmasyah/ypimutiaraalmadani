import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const TK = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.3);
  const [visionRef, visionVisible] = useScrollAnimation(0.2);
  const [programRef, programVisible] = useScrollAnimation(0.2);
  const [activitiesRef, activitiesVisible] = useScrollAnimation(0.2);
  const [conceptRef, conceptVisible] = useScrollAnimation(0.1);
  const [sertifikatRef, sertifikatVisible] = useScrollAnimation(0.2);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State untuk prestasi TK
  const [tkAchievements, setTkAchievements] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const [achievementError, setAchievementError] = useState(null);

  // Multiple background images untuk TK
  const backgroundImages = [
    '/assets/background2.jpg',
    '/assets/yasinan_pagi.png',
    '/assets/pramuka5.png',
    '/assets/drumband1.png',
    '/assets/aktivitas1.png'
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Konfigurasi Strapi
  const STRAPI_CONFIG = {
    URL: 'https://incredible-sparkle-f34960cd1e.strapiapp.com',
  };

  // Fungsi untuk mendapatkan URL gambar
  const getImageUrl = (imageData) => {
    if (!imageData) return 'https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80';
    
    let imageUrl = 'https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80';
    
    if (imageData.data?.attributes?.url) {
      const url = imageData.data.attributes.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
    }
    else if (imageData.attributes?.url) {
      const url = imageData.attributes.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
    }
    else if (imageData.url) {
      const url = imageData.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
    }
    
    return imageUrl;
  };

  // Fetch prestasi TK dari Strapi
  useEffect(() => {
    const fetchTKAchievements = async () => {
      try {
        setLoadingAchievements(true);
        setAchievementError(null);
        
        const response = await fetch(
          `${STRAPI_CONFIG.URL}/api/prestasis?filters[jenjang][$eq]=tk&populate=*&sort=date:desc`
        );
        
        const data = await response.json();
        
        // Jika ada masalah, pakai fallback data
        if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
          // Data fallback untuk TK
          const fallbackData = [
            {
              id: 1,
              title: "Juara 1 Lomba Mewarnai Tingkat Kota",
              description: "Ananda Rara berhasil meraih juara 1 dalam lomba mewarnai tingkat kota yang diikuti oleh 50 peserta dari berbagai TK.",
              category: "seni",
              level: "kota",
              participants: "Ananda Rara",
              year: "2024",
              date: "2024-01-15"
            },
            {
              id: 2,
              title: "Peserta Terbaik Lomba Menari",
              description: "Kelompok tari TK meraih predikat peserta terbaik dalam festival seni anak usia dini.",
              category: "seni",
              level: "kota",
              participants: "Kelompok Tari TK",
              year: "2024",
              date: "2024-05-12"
            },
            {
              id: 3,
              title: "Juara 2 Lomba Hafalan Doa Harian",
              description: "Siswa TK berhasil menghafal 15 doa harian dengan lancar dan meraih juara 2.",
              category: "akademik",
              level: "kota",
              participants: "Muhammad Fahri",
              year: "2024",
              date: "2024-03-20"
            }
          ];
          
          setTkAchievements(fallbackData);
          return;
        }

        // Proses data Strapi
        const formattedAchievements = data.data.map((item) => {
          const itemData = item.attributes || item;
          
          if (!itemData || !itemData.title) {
            console.warn('Skipping invalid item:', item);
            return null;
          }
          
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
            image: getImageUrl(itemData.image),
            category: itemData.category || 'lainnya',
            level: itemData.level || 'sekolah',
            date: itemData.date || '2024-01-01',
            participants: itemData.participants || '',
            year: year,
            jenjang: itemData.jenjang || 'tk'
          };
        }).filter(Boolean);
        
        setTkAchievements(formattedAchievements);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setAchievementError(`Gagal memuat data prestasi: ${err.message}`);
        
        // Tetap tampilkan data fallback
        const fallbackData = [
          {
            id: 1,
            title: "Juara 1 Lomba Mewarnai Tingkat Kota",
            description: "Ananda Rara berhasil meraih juara 1 dalam lomba mewarnai tingkat kota yang diikuti oleh 50 peserta dari berbagai TK.",
            category: "seni",
            level: "kota",
            participants: "Ananda Rara",
            year: "2024",
            date: "2024-01-15"
          },
          {
            id: 2,
            title: "Peserta Terbaik Lomba Menari",
            description: "Kelompok tari TK meraih predikat peserta terbaik dalam festival seni anak usia dini.",
            category: "seni",
            level: "kota",
            participants: "Kelompok Tari TK",
            year: "2024",
            date: "2024-05-12"
          }
        ];
        
        setTkAchievements(fallbackData);
      } finally {
        setLoadingAchievements(false);
      }
    };

    fetchTKAchievements();
  }, []);

  // Fungsi untuk render badge berdasarkan kategori
  const getCategoryBadge = (category) => {
    const colors = {
      akademik: 'bg-blue-100 text-blue-800',
      olahraga: 'bg-green-100 text-green-800',
      seni: 'bg-purple-100 text-purple-800',
      teknologi: 'bg-orange-100 text-orange-800',
      lainnya: 'bg-gray-100 text-gray-800'
    };
    
    const icons = {
      akademik: '📚',
      olahraga: '⚽',
      seni: '🎨',
      teknologi: '💻',
      lainnya: '🏆'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[category] || colors.lainnya}`}>
        {icons[category] || icons.lainnya} {category}
      </span>
    );
  };

  // Fungsi untuk render badge berdasarkan level
  const getLevelBadge = (level) => {
    const colors = {
      sekolah: 'bg-yellow-100 text-yellow-800',
      kota: 'bg-indigo-100 text-indigo-800',
      provinsi: 'bg-pink-100 text-pink-800',
      nasional: 'bg-red-100 text-red-800',
      internasional: 'bg-teal-100 text-teal-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[level] || colors.sekolah}`}>
        {level}
      </span>
    );
  };

  // Fungsi untuk render badge juara
  const getAchievementBadge = (title) => {
    if (title.includes("Juara 1")) {
      return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-200">JUARA UTAMA</span>;
    } else if (title.includes("Juara 2")) {
      return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">JUARA II</span>;
    } else if (title.includes("Juara 3")) {
      return <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">JUARA III</span>;
    } else {
      return <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold border border-orange-200">PENGHARGAAN</span>;
    }
  };

  return (
    <div className="pt-20">
      {/* Enhanced Hero Section dengan Background Slider */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      >
        {/* Background Slider */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{ backgroundImage: `url(${backgroundImages[currentSlide]})` }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/60 to-purple-600/50"></div>
        
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-8 h-8 bg-yellow-300 rounded-full opacity-60"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 right-32 w-12 h-12 bg-pink-400 rounded-full opacity-50"
            animate={{
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-yellow-300 w-8' 
                  : 'bg-white/60 hover:bg-white/90'
              }`}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 z-10 text-center">
          <motion.div
            initial="initial"
            animate={heroVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            {/* Welcome Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-8"
            >
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-8 py-3 inline-block">
                <span className="text-yellow-300 font-semibold text-lg">Selamat Datang di</span>
              </div>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent leading-tight"
            >
              TK MUTIARA
              <br />
              AL-MADANI
            </motion.h1>

            {/* Decorative Line */}
            <motion.div
              variants={fadeInUp}
              className="w-32 h-2 bg-gradient-to-r from-yellow-300 to-pink-300 mx-auto mb-8 rounded-full"
            />
            
            {/* Main Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 max-w-4xl mx-auto font-light drop-shadow-lg"
            >
              Masa <span className="text-yellow-300 font-bold">Golden Age</span> yang Menyenangkan 
              dengan Pendekatan <span className="text-pink-300 font-bold">Belajar Sambil Bermain</span>
            </motion.p>

            {/* Secondary Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100 leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-lg"
            >
              Membentuk karakter islami, mengembangkan kreativitas, dan mempersiapkan 
              masa depan cerah melalui pendidikan yang menyenangkan dan penuh kasih sayang
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-yellow-300"
          >
            <span className="text-sm mb-2 drop-shadow">Scroll Kebawah</span>
            <div className="w-6 h-10 border-2 border-yellow-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-300 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex space-x-2 text-sm">
            <Link to="/" className="text-yellow-200 hover:text-white transition-colors">🏠 Home</Link>
            <span className="text-white/60">/</span>
            <Link to="/program" className="text-yellow-200 hover:text-white transition-colors">📚 Program</Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-semibold">🎨 TK Mutiara Al-Madani</span>
          </nav>
        </div>
      </div>

      {/* Kata Sambutan Kepala TK dengan Foto */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-200"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Sambutan Kepala TK</h2>
              
              {/* Container untuk foto dan sambutan */}
              <div className="flex flex-col lg:flex-row items-center gap-8 mb-6">
                {/* Foto Kepala TK */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src="/images/tk10.jpeg" 
                      alt="Kiki Anggraini, S.Hi - Kepala TK Mutiara Al-Madani"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/192/192?text=Foto+Kepala+TK';
                        e.target.alt = 'Foto Kepala TK Mutiara Al-Madani';
                      }}
                    />
                  </div>
                </div>

                {/* Sambutan Text */}
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border border-pink-300">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify">
                      "Selamat datang di TK Islam Mutiara Al-Madani. Kami percaya bahwa masa kanak-kanak 
                      adalah periode emas untuk menanamkan nilai-nilai akhlak mulia dan mengembangkan 
                      potensi anak melalui pendekatan yang menyenangkan dan islami."
                    </p>
                    <div className="text-center">
                      <h4 className="font-bold text-gray-800 text-xl">KIKI ANGGRAINI, S.HI</h4>
                      <p className="text-gray-600">Kepala TK Mutiara Al-Madani</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section 
        ref={visionRef}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={visionVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Visi Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-pink-500 text-3xl mb-6">
                👁️
              </div>
              <h3 className="text-3xl font-bold mb-6">VISI KAMI</h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <p className="text-lg leading-relaxed italic">
                  "Membentuk generasi muslim yang cerdas, kreatif, berakhlak mulia, dan siap 
                  melanjutkan ke jenjang pendidikan dasar"
                </p>
              </div>
            </motion.div>

            {/* Misi Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl mb-6">
                🎯
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">MISI KAMI</h3>
              <div className="space-y-4">
                {[
                  "Menyelenggarakan pembelajaran yang menyenangkan",
                  "Menanamkan nilai-nilai Islam sejak dini",
                  "Mengembangkan kreativitas dan motorik anak",
                  "Membangun karakter positif dan kemandirian",
                  "Menjalin kerjasama yang baik dengan orang tua",
                  "Menyediakan lingkungan belajar yang aman dan nyaman"
                ].map((mission, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{mission}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sertifikat Akreditasi Section */}
      <section 
        ref={sertifikatRef}
        className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={sertifikatVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {/* Section Header */}
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 border border-emerald-200 mb-4">
                <span className="text-emerald-600 font-semibold text-lg">🏆 PRESTASI & PENGHARGAAN</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Sertifikat Akreditasi
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Pengakuan resmi atas kualitas pendidikan TK Mutiara Al-Madani
              </p>
            </motion.div>

            {/* Sertifikat Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300"
            >
              {/* Sertifikat Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-6 px-8 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">SERTIFIKAT AKREDITASI</h3>
                <p className="text-emerald-100 text-lg">No. 00546/100000/TK/2023</p>
              </div>

              {/* Sertifikat Body */}
              <div className="p-8">
                {/* Keputusan BAN */}
                <div className="text-center mb-8">
                  <p className="text-gray-700 text-lg mb-2">
                    <strong>Keputusan Ketua Badan Akreditasi Nasional</strong>
                  </p>
                  <p className="text-gray-600">
                    Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah
                  </p>
                  <p className="text-gray-600 font-semibold">
                    Nomor: 137/BAN-PDM/SK/2023
                  </p>
                  <p className="text-gray-700 mt-4 italic">
                    menyatakan bahwa:
                  </p>
                </div>

                {/* Nama TK */}
                <div className="text-center mb-8 bg-gradient-to-r from-yellow-50 to-amber-50 py-6 rounded-2xl border border-yellow-200">
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    TK. MUTIARA AL-MADANI
                  </h4>
                  <p className="text-gray-600 text-sm">(NPSN 69914874)</p>
                  <p className="text-gray-700 mt-2">
                    DESA GEDANG, GEDANG, KEC. SUNGAI PENUH<br />
                    KOTA SUNGAI PENUH, PROV. JAMBI
                  </p>
                </div>

                {/* Peringkat Akreditasi */}
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full px-8 py-4">
                    <span className="text-4xl font-bold text-white">TERAKREDITASI</span>
                    <div className="text-6xl font-bold text-white mt-2">A</div>
                  </div>
                </div>

                {/* Masa Berlaku */}
                <div className="text-center mb-8 bg-gray-50 py-4 rounded-xl">
                  <p className="text-gray-700 text-lg">
                    <strong>Sertifikat ini berlaku sampai dengan:</strong>
                  </p>
                  <p className="text-2xl font-bold text-emerald-600">
                    31 Desember 2028
                  </p>
                </div>

                {/* Keterangan */}
                <div className="text-center text-gray-600 text-sm mb-8">
                  <p>
                    Peringkat akreditasi ini diberikan berdasarkan asesmen lapangan 
                    atas kinerja satuan pendidikan.
                  </p>
                </div>

                {/* Footer Sertifikat */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">Ditetapkan di Jakarta</p>
                      <p className="text-gray-700 font-semibold">Pada tanggal 19 Desember 2023</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">
                        Ditandatangani secara elektronik oleh:
                      </p>
                      <p className="text-gray-700 font-semibold">
                        Ketua Badan Akreditasi Nasional<br />
                        Pendidikan Anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah
                      </p>
                      <p className="text-lg font-bold text-emerald-600 mt-2">
                        Totok Suprayimo, Ph.D.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Informasi Tambahan */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  🎉 Selamat atas Pencapaian Akreditasi A!
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Akreditasi A merupakan pengakuan tertinggi dari Badan Akreditasi Nasional 
                  yang membuktikan komitmen kami dalam menyelenggarakan pendidikan anak usia dini 
                  yang berkualitas, bermutu, dan sesuai dengan standar nasional pendidikan.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Prestasi & Penghargaan Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 border border-amber-200 mb-4">
                <span className="text-amber-600 font-semibold text-lg">🏆 PRESTASI SISWA TK</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Prestasi Gemilang TK Mutiara Al-Madani
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pencapaian membanggakan siswa-siswi kami dalam berbagai kompetisi dan program
              </p>
            </motion.div>

            {/* Error Message */}
            {achievementError && (
              <motion.div 
                variants={fadeInUp}
                className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8"
              >
                <div className="flex items-center">
                  <div className="text-yellow-600 text-2xl mr-4">⚠️</div>
                  <div>
                    <p className="text-yellow-800 font-medium">Perhatian: {achievementError}</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      Menampilkan data contoh. Data asli akan ditampilkan saat koneksi tersedia.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {loadingAchievements ? (
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-3xl p-12 shadow-2xl border border-amber-200 text-center"
              >
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Memuat Data Prestasi</h3>
                <p className="text-gray-600">Sedang mengambil data prestasi terbaru dari server...</p>
              </motion.div>
            ) : (
              <>
                {/* Prestasi Terbaru */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200 mb-12"
                >
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
                      🎖️
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800">
                        Prestasi Terbaru Siswa TK ({tkAchievements.length})
                      </h3>
                      <p className="text-gray-600 mt-2">
                        Berbagai penghargaan yang diraih oleh siswa-siswi TK Mutiara Al-Madani
                      </p>
                    </div>
                  </div>

                  {tkAchievements.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {tkAchievements.map((prestasi, index) => (
                        <div key={prestasi.id} className="group bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl p-6 border border-amber-100 hover:border-amber-300 transition-all duration-300 hover:shadow-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
                                  {index + 1}
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 line-clamp-2">{prestasi.title}</h4>
                              </div>
                              
                              <div className="ml-11 space-y-2">
                                {/* Kategori */}
                                <div className="flex items-center text-sm">
                                  <span className="w-20 text-gray-500 font-medium flex-shrink-0">Kategori:</span>
                                  <div className="flex-1">
                                    {getCategoryBadge(prestasi.category)}
                                  </div>
                                </div>
                                
                                {/* Tingkat */}
                                <div className="flex items-center text-sm">
                                  <span className="w-20 text-gray-500 font-medium flex-shrink-0">Tingkat:</span>
                                  <div className="flex-1">
                                    {getLevelBadge(prestasi.level)}
                                  </div>
                                </div>
                                
                                {/* Peserta */}
                                {prestasi.participants && prestasi.participants.trim() !== '' && (
                                  <div className="flex items-center text-sm">
                                    <span className="w-20 text-gray-500 font-medium flex-shrink-0">Peserta:</span>
                                    <span className="text-gray-700 font-medium flex-1 truncate">{prestasi.participants}</span>
                                  </div>
                                )}
                                
                                {/* Tahun */}
                                <div className="flex items-center text-sm">
                                  <span className="w-20 text-gray-500 font-medium flex-shrink-0">Tahun:</span>
                                  <span className="text-gray-700 font-semibold flex-1">{prestasi.year}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Badge Juara */}
                            <div className="flex-shrink-0 ml-4">
                              {getAchievementBadge(prestasi.title)}
                            </div>
                          </div>
                          
                          {/* Deskripsi */}
                          <div className="mt-4 pt-4 border-t border-amber-200">
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{prestasi.description}</p>
                          </div>
                          
                          {/* Tanggal */}
                          <div className="mt-4 pt-3 border-t border-amber-100">
                            <div className="flex items-center text-xs text-gray-500">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {prestasi.date ? new Date(prestasi.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              }) : '2024'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🏆</div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">
                        Belum ada data prestasi
                      </h4>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Data prestasi siswa TK akan ditampilkan di sini. Hubungi administrasi untuk menambahkan data prestasi.
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Statistik Prestasi */}
                {tkAchievements.length > 0 && (
                  <motion.div
                    variants={fadeInUp}
                    className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 shadow-2xl text-white mb-12"
                  >
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 text-2xl mr-4">
                        📊
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">Statistik Prestasi TK</h3>
                        <p className="text-orange-100 mt-2">
                          Ringkasan pencapaian siswa-siswi TK Mutiara Al-Madani
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {/* Total Prestasi */}
                      <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-4xl font-bold mb-2">{tkAchievements.length}</div>
                        <div className="text-sm text-orange-100 font-medium">Total Prestasi</div>
                      </div>
                      
                      {/* Prestasi Seni */}
                      <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-4xl font-bold mb-2">
                          {tkAchievements.filter(p => p.category === 'seni').length}
                        </div>
                        <div className="text-sm text-orange-100 font-medium">Prestasi Seni</div>
                      </div>
                      
                      {/* Tingkat Nasional/Provinsi */}
                      <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-4xl font-bold mb-2">
                          {tkAchievements.filter(p => p.level === 'nasional' || p.level === 'provinsi').length}
                        </div>
                        <div className="text-sm text-orange-100 font-medium">Tingkat Nasional/Provinsi</div>
                      </div>
                      
                      {/* Tahun Berprestasi */}
                      <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-4xl font-bold mb-2">
                          {new Set(tkAchievements.map(p => p.year)).size}
                        </div>
                        <div className="text-sm text-orange-100 font-medium">Tahun Berprestasi</div>
                      </div>
                    </div>

                    {/* Distribusi Kategori */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <h4 className="text-xl font-bold mb-4 text-center">Distribusi Berdasarkan Kategori</h4>
                      <div className="flex flex-wrap justify-center gap-4">
                        {['seni', 'akademik', 'olahraga', 'lainnya'].map((category) => {
                          const count = tkAchievements.filter(p => p.category === category).length;
                          if (count === 0) return null;
                          
                          const percentage = Math.round((count / tkAchievements.length) * 100);
                          
                          return (
                            <div key={category} className="flex items-center bg-white/10 rounded-full px-4 py-2">
                              <span className="text-lg mr-2">
                                {category === 'seni' ? '🎨' : 
                                 category === 'akademik' ? '📚' : 
                                 category === 'olahraga' ? '⚽' : '🏆'}
                              </span>
                              <span className="font-medium mr-2">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </span>
                              <span className="text-yellow-300 font-bold">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Link ke halaman prestasi lengkap */}
                <motion.div
                  variants={fadeInUp}
                  className="text-center"
                >
                  <Link
                    to="/achievement#tk"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-3">🏆</span>
                    Lihat Semua Prestasi TK
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <p className="text-gray-600 mt-4 text-sm">
                    Jelajahi lebih banyak prestasi dan detail lengkap di halaman prestasi utama
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Program & Konsep Pembelajaran Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-200 mb-4">
                <span className="text-blue-600 font-semibold text-lg">📘 PROGRAM & KONSEP PEMBELAJARAN</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Konsep Pembelajaran TK Mutiara Al-Madani
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pendekatan holistik yang mengintegrasikan nilai islami dengan perkembangan anak usia dini
              </p>
            </motion.div>

            {/* Konsep Dasar Pembelajaran */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 mb-12"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
                  🎯
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Konsep Dasar Pembelajaran</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Berbasis Karakter Islami",
                    description: "Penanaman akhlak mulia sejak dini dengan pembiasaan adab sehari-hari",
                    features: ["Salam, doa, antri, berbagi", "Menghormati guru & orang tua", "Pengenalan ibadah dasar", "Wudhu, shalat dhuha", "Hafalan doa harian dan surat pendek"],
                    icon: "🕌",
                    color: "from-green-400 to-green-500"
                  },
                  {
                    title: "Pembelajaran Tematik Integratif",
                    description: "Tema pembelajaran berdasarkan dunia anak yang menggabungkan berbagai aspek",
                    features: ["Tema: diriku, keluargaku, alam", "Integrasi bahasa, sosial-emosional", "Pengembangan motorik dan seni", "Nilai agama dalam setiap tema"],
                    icon: "🎨",
                    color: "from-blue-400 to-blue-500"
                  },
                  {
                    title: "Bermain Sambil Belajar",
                    description: "Belajar melalui permainan aktif, eksplorasi, dan pengalaman langsung",
                    features: ["Play-based learning", "Fokus pada keceriaan & kreativitas", "Kolaborasi & rasa ingin tahu", "Pengalaman langsung"],
                    icon: "🎪",
                    color: "from-yellow-400 to-yellow-500"
                  },
                  {
                    title: "Saintifik & Kreativitas",
                    description: "Mengembangkan kemampuan observasi dan problem solving",
                    features: ["Mengamati, menanya, mencoba", "Menalar dan menyimpulkan", "Membangun percaya diri", "Problem solving sederhana"],
                    icon: "🔬",
                    color: "from-purple-400 to-purple-500"
                  },
                  {
                    title: "Lingkungan Berkarakter",
                    description: "Ruang belajar ramah anak dengan guru sebagai fasilitator",
                    features: ["Lingkungan aman & nyaman", "Ruang penuh warna & literasi", "Guru sebagai teladan", "Fasilitator penuh kasih"],
                    icon: "🏫",
                    color: "from-pink-400 to-pink-500"
                  }
                ].map((konsep, index) => (
                  <div key={index} className="group bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                    <div className={`w-16 h-16 bg-gradient-to-br ${konsep.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {konsep.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{konsep.title}</h4>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{konsep.description}</p>
                    <div className="space-y-2">
                      {konsep.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bidang Pengembangan Utama */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-indigo-200 mb-12"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
                  🌟
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Bidang Pengembangan Utama</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Nilai Agama & Moral Islami",
                    activities: ["Hafalan surat pendek pilihan", "Doa harian", "Adab pada guru, teman, keluarga", "Storytelling kisah nabi"],
                    icon: "📿",
                    color: "from-emerald-400 to-emerald-500"
                  },
                  {
                    title: "Fisik-Motorik",
                    activities: ["Senam ceria", "Permainan outdoor", "Outbound mini", "Fine motor activities"],
                    icon: "🏃",
                    color: "from-blue-400 to-blue-500"
                  },
                  {
                    title: "Bahasa & Literasi",
                    activities: ["Baca gambar & fonik dasar", "Kosakata islami", "Bercerita & mendengarkan", "Huruf hijaiyah"],
                    icon: "📚",
                    color: "from-orange-400 to-orange-500"
                  },
                  {
                    title: "Kognitif: Matematika & Sains",
                    activities: ["Pengenalan angka & pola", "Eksperimen sains sederhana", "Observasi lingkungan", "Bentuk & ukuran"],
                    icon: "🔢",
                    color: "from-purple-400 to-purple-500"
                  },
                  {
                    title: "Sosial-Emosional",
                    activities: ["Disiplin & mandiri", "Berbagi & kerja sama", "Tanggung jawab kecil", "Merapikan alat"],
                    icon: "👥",
                    color: "from-pink-400 to-pink-500"
                  },
                  {
                    title: "Seni & Kreativitas",
                    activities: ["Melukis & kolase", "Menyanyi islami", "Nasyid anak", "Tari & gerak kreatif"],
                    icon: "🎭",
                    color: "from-red-400 to-red-500"
                  }
                ].map((bidang, index) => (
                  <div key={index} className="group bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 border border-indigo-100 hover:border-indigo-300 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${bidang.color} rounded-2xl flex items-center justify-center text-white text-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        {bidang.icon}
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">{bidang.title}</h4>
                    </div>
                    <div className="space-y-2">
                      {bidang.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-tight">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Program Unggulan Detail */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl text-white mb-12"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 text-2xl mr-4">
                  ⭐
                </div>
                <h3 className="text-3xl font-bold">Program Unggulan TK Mutiara Al-Madani</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Mutiara Qur'ani",
                    description: "Program tahfiz dan pengenalan Al-Qur'an yang menyenangkan",
                    features: ["Tahfiz surat pendek", "Pengenalan huruf hijaiyah", "Pembiasaan doa pagi", "Maulid kecil"],
                    icon: "📖"
                  },
                  {
                    title: "Fun Islamic Science",
                    description: "Eksplorasi sains dengan pendekatan islami",
                    features: ["Eksperimen sains sesuai usia", "Pengenalan alam ciptaan Allah", "Observation book", "Learning by doing"],
                    icon: "🔭"
                  },
                  {
                    title: "English for Kids",
                    description: "Pengenalan bahasa Inggris melalui aktivitas menyenangkan",
                    features: ["Basic vocabulary", "Games dan songs", "Conversation sederhana", "Fun learning"],
                    icon: "🌍"
                  },
                  {
                    title: "Creative Art & Craft",
                    description: "Pengembangan kreativitas dan imajinasi",
                    features: ["Melatih seni & imajinasi", "Kolaborasi kelompok", "Galeri karya bulanan", "Berbagai media seni"],
                    icon: "🎨"
                  },
                  {
                    title: "Life Skill Anak Muslim",
                    description: "Pembentukan kemandirian dan life skill islami",
                    features: ["Merapikan barang", "Cara makan & minum", "Kebersihan diri", "Tanggung jawab"],
                    icon: "💫"
                  },
                  {
                    title: "Field Trip Edukatif",
                    description: "Belajar langsung dari lingkungan sekitar",
                    features: ["Kunjungan masjid", "Kebun & peternakan", "Pemadam kebakaran", "Learning experience"],
                    icon: "🚌"
                  },
                  {
                    title: "Parenting & Kolaborasi",
                    description: "Kemitraan dengan orang tua dalam pendidikan",
                    features: ["Seminar parenting", "Laporan perkembangan", "Class Meeting Parents Day", "Kolaborasi aktif"],
                    icon: "👨‍👩‍👧‍👦"
                  }
                ].map((program, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 text-xl mr-3 group-hover:scale-110 transition-transform duration-300">
                        {program.icon}
                      </div>
                      <h4 className="text-xl font-bold">{program.title}</h4>
                    </div>
                    <p className="text-blue-100 mb-4 text-sm leading-relaxed">{program.description}</p>
                    <div className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full mr-2"></div>
                          <span className="text-blue-50">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Metode dan Evaluasi */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Metode Pembelajaran */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-green-200"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
                    🎓
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Metode Pembelajaran</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    "Circle Time (doa pagi, cerita, diskusi tema)",
                    "Project-based Learning mini",
                    "Outdoor learning experience",
                    "Role play & drama islami",
                    "Storytelling interaktif",
                    "Sentra bermain (balok, peran, seni, bahan alam)"
                  ].map((metode, index) => (
                    <div key={index} className="flex items-center p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm mr-4 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 font-medium">{metode}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Evaluasi Perkembangan */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-teal-500 to-green-600 rounded-3xl p-8 shadow-2xl text-white"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 text-2xl mr-4">
                    📊
                  </div>
                  <h3 className="text-2xl font-bold">Evaluasi Perkembangan Anak</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Observasi Harian",
                      desc: "Pemantauan perkembangan anak secara kontinu"
                    },
                    {
                      title: "Portofolio Karya Anak",
                      desc: "Dokumentasi perkembangan melalui karya seni"
                    },
                    {
                      title: "Capaian Perkembangan Usia",
                      desc: "Penilaian sesuai milestone perkembangan"
                    },
                    {
                      title: "Laporan Berkala Orang Tua",
                      desc: "Komunikasi rutin perkembangan anak"
                    },
                    {
                      title: "Fokus Karakter & Kemandirian",
                      desc: "Penekanan pada nilai bukan angka"
                    }
                  ].map((evaluasi, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs mr-3">
                          ✓
                        </div>
                        <h4 className="font-bold text-lg">{evaluasi.title}</h4>
                      </div>
                      <p className="text-teal-100 text-sm pl-9">{evaluasi.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section 
        ref={programRef}
        className="py-20 bg-gradient-to-br from-yellow-50 to-pink-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate={programVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Program Unggulan
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Program khusus yang dirancang untuk mengoptimalkan tumbuh kembang anak usia dini
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Bimbingan Program Cinta Al-Qur`an",
                  description: "Bimbingan Belajar Al-Qur`an Sejak Dini",
                  features: ["Belajar Mengaji", "Hafalan Surat-Surat Pendek", "Penanaman Rukun Islam Dan Rukun Iman"],
                  icon: "📖",
                  color: "from-yellow-400 to-yellow-500"
                },
                {
                  title: "Bimbingan Program Cinta Ibadah",
                  description: "Bimbingan Untuk Belajar Beribadah Dari Dini",
                  features: ["Bimbingan Sholat 5 Waktu", "Bimbingan Wudhu", "Bimbingan Do`a Sehari-hari", "Bimbingan Puasa", "Bimbingan Manasik Haji", "Bimbingan Zakat, Shadaqah, Infaq", "Bimbingan Sholat Dhuha", "Bimbingan Sholat Berjamaah"],
                  icon: "🕌",
                  color: "from-pink-400 to-pink-500"
                },
                {
                  title: "Bimbingan Program Cinta Rasul",
                  description: "Menumbuhkan Rasa Cinta Kepada Rasul Dari Dini",
                  features: ["Bimbingan Hafalan Hadis", "Bimbingan Kisah-Kisah Nabi Dan Rasul(Shirah Nabawiyah)", "Peringatan Hari Besar Islam", "Penanaman Adab-Adab Sehari-hari"],
                  icon: "🌟",
                  color: "from-purple-400 to-purple-500"
                },
                {
                  title: "Bimbingan Program Pengembangan Minat Dan Bakat",
                  description: "Pengembangan kreativitas dan ekspresi diri melalui berbagai media seni",
                  features: ["Bahsa Arab-Inggris Untuk Anak Usia Dini", "Pentas Seni Dan Kreatifitas", "Field Trip", "Bazar/Pameran","Karnaval","Teknik Melukis Dan Menggambar","Tari Daerah Gerak Dan Lagu"],
                  icon: "🎨",
                  color: "from-blue-400 to-blue-500"
                }
              ].map((program, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {program.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-center">{program.description}</p>
                  <div className="space-y-3">
                    {program.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                        <span className="text-pink-600 font-semibold text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Bergabunglah dengan Keluarga Besar TK Mutiara Al-Madani
            </h2>
            <p className="text-xl text-yellow-100 mb-8 drop-shadow">
              Daftarkan putra-putri Anda untuk pengalaman belajar yang menyenangkan dan islami
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/spmb/daftar"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>🎓</span>
                <span>Daftar Sekarang</span>
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center space-x-2"
              >
                <span>📞</span>
                <span>Konsultasi Gratis</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TK;