import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer } from "../utils/animations";

const About = () => {
  // Gunakan hook scroll animation asli Anda
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [profileRef, profileVisible] = useScrollAnimation(0.1);
  const [visionRef, visionVisible] = useScrollAnimation(0.1);
  const [facilitiesRef, facilitiesVisible] = useScrollAnimation(0.1);
  const [organizationRef, organizationVisible] = useScrollAnimation(0.05);
  const [teachersRef, teachersVisible] = useScrollAnimation(0.1);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDepartment, setActiveDepartment] = useState("pengurus");
  const [activeFacilityCategory, setActiveFacilityCategory] = useState("all");
  const [activeFacility, setActiveFacility] = useState(null);

  // Background images untuk slider
  const backgroundImages = [
    "/assets/background2.jpg",
    "/assets/aktivitas1.png",
    "/assets/drumband1.png", 
    "/assets/pramuka5.png",
    "/assets/yasinan_pagi.png",
  ];

  // Auto slide background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Data struktur organisasi LENGKAP
  const organizationalStructure = {
    pengurus: [
      {
        name: "Dra. Dirga Rosya",
        position: "Pembina Yayasan",
        photo: "/assets/y1.jpeg",
      },
      {
        name: "Hj. Syamsarina Nasution, Lc., MA",
        position: "Ketua Yayasan", 
        photo: "/assets/kepala_yayasan.jpeg",
      },
      {
        name: "H. Samsul Bahri Harahap, Lc., MA",
        position: "Pengawas Yayasan",
        photo: "/assets/y3.jpeg",
      },
    ],
    smp: [
      {
        name: "Arif Maulana, M.Pd",
        position: "Kepala Sekolah SMP",
        photo: "/images/smp1.jpeg",
      },
      {
        name: "Pengki Yudistira, M.Pd",
        position: "Waka Kurikulum SMP",
        photo: "/images/smp2.jpeg",
      },
      {
        name: "Alta Dwi Rezki, S.Pd",
        position: "Waka Kesiswaan",
        photo: "/images/smp6.jpeg",
      },
      {
        name: "Sindi Mertisia Bouti, M.Pd", 
        position: "Wali Kelas IX Al-Fatih",
        photo: "/images/smp3.jpeg",
      },
      {
        name: "Andika Yudistira",
        position: "Wali Kelas VIII Al-Baithar", 
        photo: "/images/smp4.jpeg",
      },
      {
        name: "Melly Marliza, S.Pd",
        position: "Wali Kelas VII Al-Ayyubi",
        photo: "/images/smp8.jpeg",
      },
      {
        name: "Halimatun Sakdiah, S.IQ, S.Ag",
        position: "Wali Kelas VII Al-Ghazali",
        photo: "/images/smp7.jpeg", 
      },
      {
        name: "Sahrian, S.Pdi",
        position: "Guru Pendidikan Agama",
        photo: "/images/smp5.jpeg",
      },
    ],
    sd: [
      {
        name: "Tri Setiani, S.Pd",
        position: "Kepala Sekolah SD",
        photo: "/images/sd19.jpeg",
      },
      {
        name: "Julaswan Muda, S.H",
        position: "Waka Sarpras",
        photo: "/images/sd1.JPG",
      },
      {
        name: "Mat Jali, S.Pd",
        position: "Waka Kurikulum",
        photo: "/images/sd2.jpeg",
      },
      {
        name: "Mat Padil, S.Pd",
        position: "Waka Kurikulum",
        photo: "/images/sd21.jpeg",
      },
      {
        name: "Ellya Aprilda, S.Pd",
        position: "Waka Kesiswaan",
        photo: "/images/sd20.jpeg",
      },
      {
        name: "Annisa Yustika, S.Pd",
        position: "Guru Kelas 2",
        photo: "/images/sd3.jpeg",
      },
      {
        name: "Nuraini, M.H.",
        position: "Guru Kelas 3", 
        photo: "/images/sd4.jpeg",
      },
      {
        name: "Rafdiana, S.Pd",
        position: "Guru Kelas 1",
        photo: "/images/sd5.jpeg",
      },
      {
        name: "Vanesa Iftina, S.Pd",
        position: "Guru Kelas 4",
        photo: "/images/sd6.jpeg",
      },
      {
        name: "Nurhayatun, S.Pd",
        position: "Guru Kelas 5",
        photo: "/images/sd7.jpeg",
      },
      {
        name: "Popi Purna Dewi, S.Pd",
        position: "Guru Kelas 6",
        photo: "/images/sd8.jpeg",
      },
      {
        name: "Sundari, S.Pd",
        position: "Guru Seni Budaya",
        photo: "/images/sd9.jpg",
      },
      {
        name: "Vipin Cenya Putri, S.Pd",
        position: "Guru Bahasa Inggris",
        photo: "/images/sd10.jpg",
      },
      {
        name: "Jeri Andesta, M.Pd",
        position: "Wali Kelas 4",
        photo: "/images/sd11.jpeg",
      },
      {
        name: "Deni Septia Eriza, M.Pd",
        position: "Wali Kelas 5",
        photo: "/images/sd12.jpg",
      },
      {
        name: "Fitri Yeni, S.Pd",
        position: "Wali Kelas 5",
        photo: "/images/sd13.jpeg",
      },
      {
        name: "Cantika Rahayu, S.Pd",
        position: "Wali Kelas 6", 
        photo: "/images/sd14.jpg",
      },
      {
        name: "Dina Wulandari, S.Pd",
        position: "Wali Kelas 1",
        photo: "/images/sd15.jpg",
      },
      {
        name: "Suci Aprilliya, M.Pd",
        position: "Wali Kelas 1",
        photo: "/images/sd16.jpeg",
      },
      {
        name: "Uci Alvionita, S.Pd",
        position: "Tata Usaha",
        photo: "/images/sd17.jpeg",
      },
      {
        name: "Suci Puspa Dewi, S.Pd",
        position: "Tata Usaha OPS",
        photo: "/images/sd18.jpg",
      },
    ],
    tk: [
      {
        name: "Kiki Anggraini, S.Hi",
        position: "Kepala Sekolah TK",
        photo: "/images/tk10.jpeg",
      },
      {
        name: "Leni Marlina, S.Pd.I",
        position: "Waka HUMAS",
        photo: "/images/tk8.jpeg", 
      },
      {
        name: "Eka Putri Irponi, S.Pd",
        position: "Waka Kurikulum",
        photo: "/images/tk11.jpeg",
      },
      {
        name: "Ratna Sari Dewi, S.H.",
        position: "Waka Kesiswaan",
        photo: "/images/tk5.jpeg",
      },
      {
        name: "Cica Febriani, S.Pd",
        position: "Guru PAI TK",
        photo: "/images/tk1.jpeg",
      },
      {
        name: "Desti Mulyani, S.Pd.I",
        position: "Guru PAI TK",
        photo: "/images/tk2.jpeg",
      },
      {
        name: "Murni, S.Pd.I",
        position: "Guru PAI TK",
        photo: "/images/tk3.jpg",
      },
      {
        name: "Sonia Melinda, S.Pd",
        position: "Wali Kelas A",
        photo: "/images/tk4.jpeg",
      },
      {
        name: "Eva Susanti, S.Pd",
        position: "Wali Kelas B2",
        photo: "/images/tk6.jpeg",
      },
      {
        name: "Melsa Puspita Sari, S.Pd",
        position: "Wali Kelas B4",
        photo: "/images/tk7.jpg",
      },
      {
        name: "Lena Mardiana, A.MA",
        position: "Wali Kelas B5",
        photo: "/images/tk12.jpeg",
      },
    ],
  };

  // Data Fasilitas dengan Kategori TK, SD, SMP (TANPA FASILITAS UMUM)
  const facilitiesData = [
    // FASILITAS TK
    {
      id: 1,
      name: "Area Bermain",
      description: "Area bermain yang aman",
      image: "/fasilitas/fasilitas-tk1.jpeg",
      category: "tk"
    },
    {
      id: 2,
      name: "Ruang Kelas TK",
      description: "Ruang kelas nyaman dengan pendingin ruangan, dekorasi menarik, dan furniture anak-friendly untuk mendukung pembelajaran yang menyenangkan",
      image: "/fasilitas/fasilitas-tk2.jpeg",
      category: "tk"
    },
    {
      id: 3,
      name: "Ruang Aula TK",
      description: "Ruangan Aula Tk yg cukup besar",
      image: "/fasilitas/fasilitas-tk3.jpeg",
      category: "tk"
    },
    {
      id: 4,
      name: "Halaman Tk",
      description: "Halaman yg luas untuk area bermain anak-anak",
      image: "/fasilitas/fasilitas-tk4.jpeg",
      category: "tk"
    },
     {
      id: 5,
      name: "Toilet Tk",
      description: "Toilet Khusus TK",
      image: "/fasilitas/fasilitas-tk5.jpeg",
      category: "tk"
    },

    // FASILITAS SD
    {
      id: 6,
      name: "Perpustakaan SD",
      description: "Perpustakaan yg lengkap untuk mendukung proses belajar",
      image: "/fasilitas/fasilitas-sd1.jpeg",
      category: "sd"
    },
    {
      id: 7,
      name: "Ruang UKS",
      description: "Ruang UKS SD ",
      image: "/fasilitas/fasilitas-sd2.jpeg",
      category: "sd"
    },
    {
      id: 8,
      name: "Halaman  SD",
      description: "Halaman Sd yg luas untuk melaksanakan berbagai kegiatan",
      image: "/fasilitas/fasilitas-sd3.jpeg",
      category: "sd"
    },
    {
      id: 9,
      name: "Kantin Digital SD",
      description: "Kantin Sd yang bersih",
      image: "/fasilitas/fasiltas-sd4.jpeg",
      category: "sd"
    },
    {
      id: 10,
      name: "tempat Wudhu` & Toilet Sd",
      description: "Tempat Wudhu` & Toilet yang bersih",
      image: "/fasilitas/fasiltas-sd5.jpeg",
      category: "sd"
    },
    {
      id: 11,
      name: "Ruang Kelas",
      description: "Tempat Wudhu` & Toilet yang bersih",
      image: "/fasilitas/fasiltas-sd6.jpeg",
      category: "sd"
    },


    // FASILITAS SMP
    {
      id: 12,
      name: "Perpustakaan",
      description: "Perpustakaan lengkap untuk mendukung proses belajar dan mengajar",
      image: "/fasilitas/fasilitas-smp1.webp",
      category: "smp"
    },
    {
      id: 13,
      name: "Ruang Kesenian & Budaya",
      description: "Ruang Khusus Kesenian & Budaya Untuk Pengembangan Minat",
      image: "/fasilitas/fasilitas-smp2.webp",
      category: "smp"
    },
    {
      id: 14,
      name: "Tempat Wudhu & toilet",
      description: "Tempat Wudhu & Toilet yang bersih",
      image: "/fasilitas/fasilitas-smp3.webp",
      category: "smp"
    },
    {
      id: 15,
      name: "Aula Sekolah",
      description: "Aula yang luas untuk berbagai kegiatan",
      image: "/fasilitas/fasilitas-smp4.webp",
      category: "smp"
    },
    {
      id: 16,
      name: "Ruang Kelas",
      description: "Ruang Kelas nyaman dan bersih",
      image: "/fasilitas/fasilitas-smp5.webp",
      category: "smp"
    },
  ];

  const departments = [
    {
      id: "pengurus",
      name: "Pengurus Yayasan",
      count: organizationalStructure.pengurus.length,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "smp",
      name: "Guru SMP", 
      count: organizationalStructure.smp.length,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "sd",
      name: "Guru SD",
      count: organizationalStructure.sd.length,
      color: "from-purple-500 to-pink-500", 
    },
    {
      id: "tk",
      name: "Guru TK",
      count: organizationalStructure.tk.length,
      color: "from-orange-500 to-red-500",
    },
  ];

  // Function untuk get color berdasarkan department
  const getDepartmentColor = (deptId) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.color : "from-gray-500 to-slate-500";
  };

  // Fallback image handler dengan lazy loading
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/200/200?text=Foto+Tidak+Tersedia";
    e.target.alt = "Foto tidak tersedia";
  };

  // Grid item variants untuk animasi yang lebih smooth
  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Komponen Image dengan Lazy Loading
  const LazyImage = ({ src, alt, className, onError }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={onError}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <div className="pt-20">
      {/* Hero Section dengan Background Slider */}
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
              style={{
                backgroundImage: `url(${backgroundImages[currentSlide]})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          </AnimatePresence>
        </div>

        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-30"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-40"
            animate={{
              y: [0, 30, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
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
                  ? "bg-yellow-400 w-8"
                  : "bg-white/50 hover:bg-white/80"
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
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-block mb-8">
              <div className="bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-8 py-3 inline-block">
                <span className="text-yellow-300 font-semibold text-lg">
                  Tentang Kami
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent leading-tight"
            >
              MUTIARA
              <br />
              AL-MADANI
            </motion.h1>

            {/* Subtitle Line */}
            <motion.div
              variants={fadeInUp}
              className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 mx-auto mb-8"
            ></motion.div>

            {/* Main Description */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl lg:text-3xl text-blue-100 leading-relaxed mb-8 max-w-4xl mx-auto font-light"
            >
              <span className="text-yellow-300 font-semibold">
                Yayasan Pendidikan Islam Unggulan
              </span>{" "}
              yang menanamkan{" "}
              <span className="text-green-300 font-semibold">Ilmu</span>,{" "}
              <span className="text-blue-300 font-semibold">Iman</span>, dan{" "}
              <span className="text-purple-300 font-semibold">
                Akhlak Mulia
              </span>
            </motion.p>

            {/* Secondary Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-200 leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              Membentuk generasi yang cerdas intelektual, matang
              emosional, dan kuat spiritual untuk menghadapi tantangan zaman.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
            >
              {[
                { number: "18+", label: "Tahun Pengalaman" },
                { number: "625", label: "Siswa Aktif" },
                { number: "58+", label: "Guru Professional" },
                { number: "10+", label: "Prestasi" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
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
            className="flex flex-col items-center text-yellow-400"
          >
            <span className="text-sm mb-2">Scroll</span>
            <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Profile Section */}
      <section
        ref={profileRef}
        className="py-20 bg-gradient-to-br from-white to-blue-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={profileVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                PROFIL YAYASAN
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed text-justify bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-100">
                  <span className="text-blue-600 font-semibold">
                    Yayasan Pendidikan Islam Mutiara Al-Madani
                  </span>{" "}
                  hadir sebagai pusat pembentukan generasi berilmu dan
                  berakhlak.
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed text-justify">
                    <span className="text-orange-600 font-semibold">
                      "Ilmu tanpa agama menyesatkan arah, dan agama tanpa ilmu
                      kehilangan pijakan."
                    </span>
                  </p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Setiap proses belajar di Mutiara Al-Madani dirancang untuk
                  mengintegrasikan kecerdasan intelektual, kematangan emosional,
                  dan kekuatan spiritual.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <LazyImage
                  src="/assets/sekolah.webp"
                  alt="Gedung Sekolah"
                  className="w-full h-96 object-cover"
                  onError={handleImageError}
                />
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-blue-900 p-6 rounded-2xl shadow-2xl border-4 border-white">
                  <div className="text-xl font-bold">
                    "Zona Penanaman Ilmu, Iman Dan Akhlak Mulia"
                  </div>
                  <div className="font-semibold text-blue-900/80">
                    Since 2006
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visi Misi */}
      <section ref={visionRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={visionVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              Visi & Misi
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-24 h-1 bg-blue-600 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Visi Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                👁️
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Visi Kami
              </h3>
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  "Menjadi lembaga pendidikan Islam unggulan di Sungai Penuh
                  yang mengedepankan ilmu, iman, dan akhlak mulia serta mampu
                  menghasilkan generasi mandiri dan berbudi pekerti luhur."
                </p>
              </div>
            </motion.div>

            {/* Misi Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100"
            >
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                🎯
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Misi Kami
              </h3>
              <div className="space-y-4">
                {[
                  "Mengintegrasikan pendidikan agama Islam dan ilmu pengetahuan umum secara seimbang.",
                  "Mengembangkan potensi akademik dan non-akademik siswa.",
                  "Membina karakter santri agar menjadi pribadi yang beriman, bertakwa, mandiri, dan berakhlak mulia.",
                  "Mendorong kreativitas, inovasi, dan semangat belajar yang tinggi melalui pengajaran berkualitas.",
                  "Menyediakan fasilitas dan lingkungan belajar yang aman, nyaman, dan mendukung perkembangan spiritual serta akademik.",
                  "Membentuk kerjasama dengan orang tua, masyarakat, dan lembaga keagamaan untuk mendukung pendidikan holistik.",
                ].map((mission, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1">
                      {mission}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FASILITAS SECTION DENGAN KATEGORI TK, SD, SMP (TANPA UMUM) */}
      <section ref={facilitiesRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={facilitiesVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4"
            >
              Fasilitas Unggulan
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            >
              Fasilitas modern yang disesuaikan dengan kebutuhan setiap jenjang pendidikan
            </motion.p>

            {/* Category Filter */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {[
                { id: "all", name: "Semua Fasilitas", color: "from-blue-500 to-cyan-500" },
                { id: "tk", name: "Fasilitas TK", color: "from-green-500 to-emerald-500" },
                { id: "sd", name: "Fasilitas SD", color: "from-purple-500 to-pink-500" },
                { id: "smp", name: "Fasilitas SMP", color: "from-orange-500 to-red-500" },
              ].map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveFacilityCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                    activeFacilityCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg border-transparent`
                      : "bg-white/80 text-gray-700 hover:bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            {/* Facilities Grid by Category */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFacilityCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              >
                {facilitiesData
                  .filter(facility => 
                    activeFacilityCategory === "all" || facility.category === activeFacilityCategory
                  )
                  .map((facility, index) => (
                    <motion.div
                      key={facility.id}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                      onClick={() => setActiveFacility(facility)}
                    >
                      {/* Facility Image */}
                      <div className="relative h-48 overflow-hidden">
                        <LazyImage
                          src={facility.image}
                          alt={facility.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {/* Category Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          facility.category === 'tk' ? 'bg-green-500' :
                          facility.category === 'sd' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}>
                          {facility.category === 'tk' ? 'TK' :
                           facility.category === 'sd' ? 'SD' : 'SMP'}
                        </div>
                      </div>

                      {/* Facility Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                          {facility.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {facility.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            facility.category === 'tk' ? 'bg-green-100 text-green-800' :
                            facility.category === 'sd' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {facility.category === 'tk' ? '🎨 TK' :
                             facility.category === 'sd' ? '📚 SD' : '🔬 SMP'}
                          </span>
                          <span className="text-blue-600 text-sm font-semibold flex items-center">
                            Lihat Detail
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>

            {/* Category Stats */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                {[
                  { 
                    number: facilitiesData.filter(f => f.category === 'tk').length, 
                    label: "Fasilitas TK",
                    icon: "🎨"
                  },
                  { 
                    number: facilitiesData.filter(f => f.category === 'sd').length, 
                    label: "Fasilitas SD",
                    icon: "📚"
                  },
                  { 
                    number: facilitiesData.filter(f => f.category === 'smp').length, 
                    label: "Fasilitas SMP",
                    icon: "🔬"
                  },
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal Detail Fasilitas */}
      <AnimatePresence>
        {activeFacility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setActiveFacility(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl w-full mx-auto relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveFacility(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                ×
              </button>
              
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <LazyImage
                  src={activeFacility.image}
                  alt={activeFacility.name}
                  className="w-full h-64 object-cover"
                  onError={handleImageError}
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                    activeFacility.category === 'tk' ? 'bg-green-500' :
                    activeFacility.category === 'sd' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}>
                    {activeFacility.category === 'tk' ? 'Fasilitas TK' :
                     activeFacility.category === 'sd' ? 'Fasilitas SD' : 'Fasilitas SMP'}
                  </span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {activeFacility.name}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {activeFacility.description}
              </p>

              <div className="bg-gray-50 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Jenjang Pendidikan:</h4>
                <p className="text-gray-600">
                  {activeFacility.category === 'tk' ? 'Taman Kanak-Kanak (TK)' :
                   activeFacility.category === 'sd' ? 'Sekolah Dasar (SD)' : 
                   'Sekolah Menengah Pertama (SMP)'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Struktur Organisasi & Staff Pengajar */}
      <section ref={organizationRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={organizationVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4"
            >
              Struktur Organisasi
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            >
              Tim profesional yang berdedikasi dalam membentuk generasi penerus
              bangsa
            </motion.p>

            {/* Department Filter */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {departments.map((dept) => (
                <motion.button
                  key={dept.id}
                  onClick={() => setActiveDepartment(dept.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                    activeDepartment === dept.id
                      ? `bg-gradient-to-r ${dept.color} text-white shadow-lg border-transparent`
                      : "bg-white/80 text-gray-700 hover:bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg"
                  }`}
                >
                  {dept.name}
                  <span className="ml-2 text-sm opacity-75">
                    ({dept.count})
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Organizational Structure Grid */}
            <AnimatePresence mode="sync">
              <motion.div
                key={activeDepartment}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {organizationalStructure[activeDepartment].map(
                  (person, index) => (
                    <motion.div
                      key={`${activeDepartment}-${index}`}
                      variants={gridItemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group"
                    >
                      <div className="flex flex-col items-center text-center">
                        {/* Foto Profil */}
                        <div className="relative mb-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <LazyImage
                              src={person.photo}
                              alt={person.name}
                              className="w-full h-full object-cover"
                              onError={handleImageError}
                            />
                          </div>
                          {/* Badge Department */}
                          <div
                            className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${getDepartmentColor(
                              activeDepartment
                            )} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white`}
                          >
                            {activeDepartment === "pengurus"
                              ? "🏛️"
                              : activeDepartment === "smp"
                              ? "👨‍🎓"
                              : activeDepartment === "sd"
                              ? "📚"
                              : "🎨"}
                          </div>
                        </div>

                        {/* Informasi */}
                        <div className="flex-1 w-full">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {person.name}
                          </h3>

                          <div className="mb-3">
                            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {person.position}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Additional Teachers Section */}
      <section
        ref={teachersRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={teachersVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4"
            >
              Tim Pengajar Berpengalaman
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            >
              Dikelola oleh tenaga pendidik yang kompeten dan berkomitmen
              terhadap perkembangan siswa
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: "👨‍🏫",
                  title: "Guru Bersertifikasi",
                  description:
                    "Tenaga pendidik dengan sertifikasi profesional dan pengalaman mengajar yang mumpuni",
                },
                {
                  icon: "📚",
                  title: "Kurikulum Terintegrasi",
                  description:
                    "Penggabungan kurikulum nasional dengan nilai-nilai Islami secara seimbang",
                },
                {
                  icon: "💡",
                  title: "Metode Inovatif",
                  description:
                    "Pembelajaran dengan pendekatan modern yang menyenangkan dan efektif",
                },
                {
                  icon: "🏆",
                  title: "Prestasi Terbukti",
                  description:
                    "Track record menghasilkan siswa berprestasi di berbagai bidang",
                },
                {
                  icon: "🤝",
                  title: "Pendekatan Personal",
                  description:
                    "Perhatian individual terhadap perkembangan setiap siswa",
                },
                {
                  icon: "🌱",
                  title: "Pengembangan Karakter",
                  description:
                    "Pembinaan akhlak dan karakter Islami dalam keseharian",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Bergabung Dengan Keluarga Besar Mutiara Al-Madani
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Wujudkan impian pendidikan terbaik yang mengintegrasikan ilmu,
              iman, dan akhlak mulia untuk putra-putri Anda
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Daftar Sekarang
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;