import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer } from "../utils/animations";

// Custom hook untuk data management - VERSI DIPERBAIKI
const useLatestData = () => {
  const [latestGallery, setLatestGallery] = useState([]);
  const [latestAchievements, setLatestAchievements] = useState([]);
  const [loading, setLoading] = useState({
    gallery: true,
    achievements: true
  });

  const STRAPI_URL = "http://localhost:1337";

  // Fetch achievements dari Strapi - SAMA DENGAN ACHIEVEMENT.JSX
  const fetchAchievements = async () => {
    try {
      setLoading(prev => ({ ...prev, achievements: true }));
      
      console.log('🚀 Fetching achievements from Strapi...');
      
      const response = await fetch(
        `${STRAPI_URL}/api/prestasis?populate=*&sort=date:desc&pagination[pageSize]=6`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Achievements API Response:', data);
      
      if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) {
        console.log('🔄 No data from Strapi, using fallback data');
        // Fallback data jika tidak ada data dari Strapi
        const fallbackAchievements = [
          {
            id: 1,
            title: "Juara 1 Olimpiade Sains Nasional",
            description: "Siswa berhasil meraih juara 1 dalam Olimpiade Sains Nasional tingkat provinsi",
            image: "https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80",
            category: "akademik",
            level: "provinsi",
            date: "2024-03-15",
            participants: "Tim Olimpiade Sains",
            year: "2024"
          },
          {
            id: 2,
            title: "Lomba Pidato Bahasa Arab", 
            description: "Prestasi membanggakan dalam lomba pidato bahasa arab tingkat nasional",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
            category: "akademik",
            level: "nasional",
            date: "2024-03-10",
            participants: "Ahmad Rizki",
            year: "2024"
          },
          {
            id: 3,
            title: "Festival Robotik Sekolah",
            description: "Juara 3 dalam festival robotik tingkat kota",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
            category: "teknologi",
            level: "kota",
            date: "2024-03-05",
            participants: "Tim Robotik SMP",
            year: "2024"
          }
        ];
        setLatestAchievements(fallbackAchievements);
        return;
      }
      
      // Format data dari Strapi
      const formattedAchievements = data.data.map((item) => {
        const itemData = item.attributes || item;
        
        let imageUrl = "https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80";
        if (itemData.image) {
          const img = itemData.image;
          if (img.data?.attributes?.url) {
            imageUrl = `${STRAPI_URL}${img.data.attributes.url}`;
          } else if (img.url) {
            imageUrl = `${STRAPI_URL}${img.url}`;
          }
          
          // Clean duplicate URLs
          if (imageUrl.includes('http://localhost:1337http')) {
            imageUrl = imageUrl.replace('http://localhost:1337', '');
          }
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
          description: itemData.description || 'Tidak ada deskripsi',
          image: imageUrl,
          category: itemData.category || 'lainnya',
          level: itemData.level || 'sekolah',
          date: itemData.date || '2024-01-01',
          participants: itemData.participants || '',
          year: year
        };
      });
      
      console.log('✅ Processed achievements:', formattedAchievements);
      setLatestAchievements(formattedAchievements.slice(0, 3)); // Ambil 3 terbaru untuk home
      
    } catch (error) {
      console.error('❌ Error fetching achievements:', error);
      // Tetap gunakan fallback data
      const fallbackAchievements = [
        {
          id: 1,
          title: "Juara 1 Olimpiade Sains Nasional",
          description: "Siswa berhasil meraih juara 1 dalam Olimpiade Sains Nasional tingkat provinsi",
          image: "https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80",
          category: "akademik",
          level: "provinsi",
          date: "2024-03-15",
          participants: "Tim Olimpiade Sains",
          year: "2024"
        }
      ];
      setLatestAchievements(fallbackAchievements);
    } finally {
      setLoading(prev => ({ ...prev, achievements: false }));
    }
  };

  // Load data gallery dari localStorage
  const loadGalleryData = () => {
    try {
      const galleryData = JSON.parse(localStorage.getItem('galleryItems') || '[]');
      const sortedGallery = [...galleryData]
        .sort((a, b) => new Date(b.date || b.id) - new Date(a.date || a.id))
        .slice(0, 6);
      setLatestGallery(sortedGallery);
    } catch (error) {
      console.error('Error loading gallery data:', error);
      setLatestGallery([]);
    } finally {
      setLoading(prev => ({ ...prev, gallery: false }));
    }
  };

  const loadData = () => {
    // Load achievements dari Strapi
    fetchAchievements();
    // Load gallery dari localStorage
    loadGalleryData();
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 30000); // Refresh setiap 30 detik

    return () => clearInterval(interval);
  }, []);

  return {
    latestGallery,
    latestAchievements,
    loading,
    refreshData: loadData
  };
};

// Slideshow Component (tetap sama)
const Slideshow = ({ galleryImages }) => {
  const [index, setIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    if (isFullscreen || galleryImages.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [galleryImages.length, isFullscreen]);

  const nextSlide = React.useCallback(() => {
    if (galleryImages.length === 0) return;
    setIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevSlide = React.useCallback(() => {
    if (galleryImages.length === 0) return;
    setIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, [galleryImages.length]);

  const handleSwipe = (offsetX) => {
    if (offsetX > 100) prevSlide();
    if (offsetX < -100) nextSlide();
  };

  React.useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFullscreen, nextSlide, prevSlide]);

  if (galleryImages.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-gray-100 h-[400px] md:h-[500px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Belum ada foto di gallery</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={galleryImages[index]?.id || index}
            src={galleryImages[index]?.src}
            alt={galleryImages[index]?.alt}
            className="w-full h-[400px] md:h-[500px] object-cover cursor-pointer select-none"
            onClick={() => setIsFullscreen(true)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => handleSwipe(info.offset.x)}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-6">
          <h3 className="text-xl font-semibold">
            {galleryImages[index]?.title}
          </h3>
        </div>

        <button
          aria-label="Previous slide"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.img
              key={galleryImages[index]?.id || index}
              src={galleryImages[index]?.src}
              alt={galleryImages[index]?.alt}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg select-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                handleSwipe(info.offset.x);
              }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              aria-label="Previous (fullscreen)"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-8 text-white text-5xl font-bold hover:text-blue-400 transition"
            >
              ‹
            </button>
            <button
              aria-label="Next (fullscreen)"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-8 text-white text-5xl font-bold hover:text-blue-400 transition"
            >
              ›
            </button>

            <button
              aria-label="Close lightbox"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="absolute top-6 right-6 text-white text-4xl hover:text-red-400 transition"
            >
              ×
            </button>

            <div className="absolute bottom-8 left-0 w-full text-center text-white pointer-events-none">
              <p className="text-lg font-semibold">
                {galleryImages[index]?.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Home = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.3);
  const [aboutRef, aboutVisible] = useScrollAnimation(0.2);
  const [programRef, programVisible] = useScrollAnimation(0.2);
  const [achievementRef, achievementVisible] = useScrollAnimation(0.2);
  const [galleryRef, galleryVisible] = useScrollAnimation(0.2);

  const [latestGalleryStrapi, setLatestGalleryStrapi] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState(null);

  const STRAPI_BASE_URL = 'http://localhost:1337';
  const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";

  // Gunakan custom hook yang sudah diperbarui
  const { latestGallery, latestAchievements, loading, refreshData } = useLatestData();

  const [currentHeroBg, setCurrentHeroBg] = React.useState(0);

  const heroBackgrounds = [
    {
      id: 1,
      src: "/assets/background2.jpg",
      alt: "Guru Dan Pengurus Yayasan",
    },
    {
      id: 2,
      src: "/assets/aktivitas1.png",
      alt: "Kegiatan Pagi Siswa",
    },
    {
      id: 3,
      src: "/assets/pramuka5.png",
      alt: "Kegiatan Pramuka",
    },
    {
      id: 4,
      src: "/assets/drumband1.png",
      alt: "Ekstrakurikuler Drumband",
    },
    {
      id: 5,
      src: "/assets/yasinan_pagi.png",
      alt: "Kegiatan Keagamaan",
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  const getImageUrl = (imageData) => {
    if (!imageData) {
      return FALLBACK_IMAGE_URL;
    }

    if (imageData.url) {
      return imageData.url;
    }

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

  const getOptimizedImageUrl = (url, width = 400) => {
    if (!url || typeof url !== 'string') {
      return FALLBACK_IMAGE_URL;
    }
    
    if (url.includes('res.cloudinary.com')) {
      return url;
    }
    
    return url;
  };

  const formatDateStrapi = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  };

  // Fetch data gallery terbaru dari Strapi
  useEffect(() => {
    const fetchLatestGalleryStrapi = async () => {
      try {
        setGalleryLoading(true);
        setGalleryError(null);
        
        console.log('🚀 Fetching latest gallery from Strapi...');
        
        const response = await fetch(
          `${STRAPI_BASE_URL}/api/galleries?populate=*&sort[0]=createdAt:desc&pagination[pageSize]=6`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Latest Gallery API Response:', data);
        
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
            tanggal: formatDateStrapi(itemData.date || itemData.createdAt),
            gambar: imageUrl,
            dilihat: itemData.views || 0,
            suka: itemData.likes || 0
          };
        });

        setLatestGalleryStrapi(transformedData);
        
      } catch (error) {
        console.error('❌ Error fetching latest gallery:', error);
        setGalleryError(error.message);
        
        const sampleData = [
          { 
            id: 1, 
            judul: "Tabligh Jumat Terbaru", 
            kategori: "keagamaan", 
            gambar: "https://res.cloudinary.com/djg7valvf/image/upload/v1761893878/Whats_App_Image_2025_10_23_at_08_07_06_86fcec10b1.jpg", 
            tanggal: "15 Oktober 2025", 
            deskripsi: "Tabligh Jumat minggu ini", 
            dilihat: 245, 
            suka: 89 
          },
          { 
            id: 2, 
            judul: "Kegiatan Belajar Terbaru", 
            kategori: "akademik", 
            gambar: FALLBACK_IMAGE_URL, 
            tanggal: "18 Oktober 2025", 
            deskripsi: "Proses pembelajaran terkini", 
            dilihat: 312, 
            suka: 124 
          }
        ];
        setLatestGalleryStrapi(sampleData);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchLatestGalleryStrapi();
  }, []);

  const handleImageError = (e, fallbackText = "Gambar") => {
    e.target.style.display = "none";
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = "w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg text-center p-2";
    fallbackDiv.innerHTML = fallbackText;
    e.target.parentNode.appendChild(fallbackDiv);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return dateString;
    }
  };

  const handleRefreshData = () => {
    refreshData();
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section (tetap sama) */}
      <section
        ref={heroRef}
        className="min-h-screen bg-cover bg-center text-white relative overflow-hidden pt-32 pb-16"
      >
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroBg}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroBackgrounds[currentHeroBg].src})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial="initial"
            animate={heroVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mb-8"
            >
              <div className="glass bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20">
                <img
                  src="/assets/logo.png"
                  alt="Logo Yayasan Pendidikan Islam Mutiara Al-Madani"
                  className="h-32 md:h-48 rounded-full border-4 border-white/30 shadow-2xl"
                  onError={(e) => handleImageError(e, "Logo")}
                />
              </div>
            </motion.div>

            <div className="mb-6 overflow-hidden">
              <motion.div
                className="text-4xl md:text-6xl font-bold drop-shadow-2xl whitespace-nowrap"
                animate={{
                  x: ["100vw", "-100vw"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  SELAMAT DATANG DI YAYASAN PENDIDIKAN ISLAM MUTIARA AL-MADANI
                </span>
              </motion.div>
            </div>

            <div className="mb-8 overflow-hidden">
              <motion.div
                className="text-xl md:text-2xl drop-shadow-md whitespace-nowrap"
                animate={{
                  x: ["100vw", "-100vw"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                <span className="bg-gradient-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">
                  "ZONA PENANAMAN ILMU, IMAN DAN AKHLAK MULIA."
                </span>
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/spmb/daftar"
                className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-500 group transform hover:scale-105 shadow-lg"
              >
                <span className="relative z-10">Daftar Sekarang</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Link>
              <Link
                to="/about"
                className="glass bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Tentang Kami
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroBg(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHeroBg
                  ? "bg-yellow-400 scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Background ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Sambutan Section (tetap sama) */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={aboutVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SAMBUTAN KEPALA YAYASAN
              </span>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-2 mx-auto rounded-full"></div>
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src="/assets/kepala_yayasan.jpeg"
                      alt="Kepala Yayasan"
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, "Foto Kepala Yayasan")}
                    />
                  </div>

                  <div className="text-center md:text-left mt-4">
                    <h4 className="font-bold text-gray-800 text-lg">
                      Hj. Syamsarina Nasution, Lc., MA
                    </h4>
                    <p className="text-gray-600">Kepala Yayasan</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Yayasan Pendidikan Islam Mutiara Al-Madani
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-2/3">
                  <div className="space-y-6">
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed lg:leading-loose text-justify" style={{ textIndent: "2em" }}>
                      Assalamu'alaikum warahmatullahi wabarakatuh,
                    </p>

                    <p className="text-base md:text-lg text-gray-600 leading-relaxed lg:leading-loose text-justify" style={{ textIndent: "2em" }}>
                      Segala puji bagi Allah Subhanahu wa Ta'ala yang telah melimpahkan rahmat, taufik, dan hidayah-Nya kepada kita semua. Shalawat serta salam semoga selalu tercurah kepada junjungan kita, Nabi Muhammad Shallallahu 'alaihi wasallam, keluarga, sahabat, dan para pengikutnya hingga akhir zaman.
                    </p>

                    <p className="text-base md:text-lg text-gray-600 leading-relaxed lg:leading-loose text-justify" style={{ textIndent: "2em" }}>
                      Dengan penuh rasa syukur, kami menyambut kehadiran Anda di website resmi Yayasan Pendidikan Islam Mutiara Al-Madani. Website ini kami hadirkan sebagai sarana informasi dan komunikasi yang transparan antara yayasan, peserta didik, orang tua, serta masyarakat luas.
                    </p>

                    <p className="text-base md:text-lg text-gray-600 leading-relaxed lg:leading-loose text-justify" style={{ textIndent: "2em" }}>
                      Wassalamu'alaikum warahmatullahi wabarakatuh
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Program Unggulan Section (tetap sama) */}
      <section ref={programRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={programVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PROGRAM PENDIDIKAN
              </span>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-2 mx-auto rounded-full"></div>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "TK ISLAM MUTIARA AL-MADANI",
                  desc: "Pendidikan anak usia dini dengan pendekatan islami dan menyenangkan",
                  icon: "🎨",
                  link: "/program/tk",
                },
                {
                  title: "SD ISLAM MUTIARA AL-MADANI",
                  desc: "Membangun fondasi akademik dan karakter yang kuat sejak dini",
                  icon: "📚",
                  link: "/program/sd",
                },
                {
                  title: "SMP ISLAM MUTIARA AL-MADANI",
                  desc: "Mempersiapkan siswa menghadapi tantangan global dengan nilai islami",
                  icon: "🔬",
                  link: "/program/smp",
                },
              ].map((program, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      {program.desc}
                    </p>
                    <Link
                      to={program.link}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group/link transition-all duration-300"
                    >
                      Selengkapnya
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prestasi Section - VERSI BARU DENGAN DATA DARI STRAPI */}
      <section ref={achievementRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={achievementVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-4 text-blue-900"
            >
              Prestasi Terbaru
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Berbagai prestasi membanggakan yang telah diraih oleh siswa-siswi kami
            </motion.p>

            {loading.achievements ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Memuat data prestasi...</p>
              </div>
            ) : latestAchievements.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-yellow-800 mb-2">Belum Ada Prestasi</h3>
                  <p className="text-yellow-700">Data prestasi akan ditampilkan di sini</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {latestAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      variants={fadeInUp}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={achievement.image || "https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80"}
                          alt={achievement.title}
                          className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1516627145497-ae69578cfc06?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            achievement.category === 'akademik' ? 'bg-blue-100 text-blue-800' :
                            achievement.category === 'olahraga' ? 'bg-green-100 text-green-800' :
                            achievement.category === 'seni' ? 'bg-purple-100 text-purple-800' :
                            achievement.category === 'teknologi' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {achievement.category === 'akademik' ? '📚' :
                             achievement.category === 'olahraga' ? '⚽' :
                             achievement.category === 'seni' ? '🎨' :
                             achievement.category === 'teknologi' ? '💻' : '🏆'} {achievement.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                            achievement.level === 'internasional' ? 'bg-teal-500' :
                            achievement.level === 'nasional' ? 'bg-red-500' :
                            achievement.level === 'provinsi' ? 'bg-pink-500' :
                            achievement.level === 'kota' ? 'bg-indigo-500' :
                            'bg-yellow-500'
                          }`}>
                            {achievement.level}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                            {achievement.year || '2024'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {achievement.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {achievement.description}
                        </p>
                        {achievement.participants && (
                          <p className="text-sm text-gray-500 mb-3">
                            <strong>Peserta:</strong> {achievement.participants}
                          </p>
                        )}
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            achievement.level === 'internasional' ? 'bg-teal-100 text-teal-800' :
                            achievement.level === 'nasional' ? 'bg-red-100 text-red-800' :
                            achievement.level === 'provinsi' ? 'bg-pink-100 text-pink-800' :
                            achievement.level === 'kota' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {achievement.level}
                          </span>
                          <span className="text-blue-600 font-semibold text-sm flex items-center gap-1">
                            Selengkapnya
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={fadeInUp} className="text-center">
                  <Link
                    to="/achievement"
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg group"
                  >
                    <span>Lihat Semua Prestasi</span>
                    <svg
                      className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section (tetap sama) */}
      <section ref={galleryRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={galleryVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-4"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GALLERY TERBARU
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Dokumentasi berbagai kegiatan dan momen berharga di Yayasan Pendidikan Islam Mutiara Al-Madani
            </motion.p>

            {galleryLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Memuat gallery...</p>
              </div>
            ) : latestGalleryStrapi.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Belum ada foto di gallery.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh Data
                </button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestGalleryStrapi.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => {/* bisa tambahkan modal klik */}}
                    >
                      <div className="h-48 relative bg-gray-200 overflow-hidden">
                        <img 
                          src={getOptimizedImageUrl(photo.gambar, 400)}
                          alt={photo.judul}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.src = FALLBACK_IMAGE_URL;
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {photo.kategori}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                            {photo.tanggal}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                          {photo.judul}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {photo.deskripsi}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <span>👁️ {photo.dilihat}</span>
                            <span>❤️ {photo.suka}</span>
                          </div>
                          <span className="text-blue-500 font-semibold">Lihat Detail</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={fadeInUp} className="text-center mt-10">
                  <Link
                    to="/gallery"
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Lihat Gallery Lengkap
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </>
            )}

            {galleryError && (
              <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-lg text-center mt-4 max-w-2xl mx-auto">
                <div className="font-bold text-yellow-800">⚠️ Perhatian</div>
                <div className="text-yellow-700">Menggunakan data sample: {galleryError}</div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section (tetap sama) */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              BERGABUNGLAH BERSAMA KAMI
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari keluarga besar Yayasan Pendidikan Islam Mutiara Al-Madani dan raih masa depan gemilang
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/spmb/info"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Info Pendaftaran
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top FAB (tetap sama) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Home;