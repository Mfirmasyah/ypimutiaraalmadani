import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const SMP = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.3);
  const [visionRef, visionVisible] = useScrollAnimation(0.2);
  const [kurikulumRef, kurikulumVisible] = useScrollAnimation(0.2);
  const [extracurricularRef, extracurricularVisible] = useScrollAnimation(0.2);
  const [facilitiesRef, facilitiesVisible] = useScrollAnimation(0.2);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Multiple background images untuk SMP
  const backgroundImages = [
    '/assets/background1.jpg',
    '/assets/aktivitas1.png',
    '/assets/drumband1.png',
    '/assets/pramuka5.png',
    '/assets/yasinan_pagi.png'
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/50"></div>
        
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-8 h-8 bg-yellow-400 rounded-full opacity-60"
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
            className="absolute bottom-40 right-32 w-12 h-12 bg-purple-400 rounded-full opacity-50"
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
          <motion.div
            className="absolute top-1/2 left-1/3 w-6 h-6 bg-indigo-300 rounded-full opacity-70"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4,
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
                  ? 'bg-yellow-400 w-8' 
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
                <span className="text-yellow-400 font-semibold text-lg">Pendidikan Menengah Berkualitas</span>
              </div>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent leading-tight"
            >
              SMP ISLAM
              <br />
              MUTIARA AL-MADANI
            </motion.h1>

            {/* Decorative Line */}
            <motion.div
              variants={fadeInUp}
              className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-purple-400 mx-auto mb-8 rounded-full"
            />
            
            {/* Main Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 max-w-4xl mx-auto font-light drop-shadow-lg"
            >
              Mempersiapkan Siswa Menghadapi <span className="text-yellow-400 font-bold">Tantangan Global</span> 
              {' '}dengan Bekal <span className="text-purple-300 font-bold">Ilmu</span> dan{' '}
              <span className="text-indigo-300 font-bold">Iman</span>
            </motion.p>

            {/* Secondary Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100 leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-lg"
            >
              Mengintegrasikan kurikulum nasional dengan pengembangan karakter, leadership, 
              dan entrepreneurship untuk membentuk generasi unggul yang siap bersaing di era global
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
            className="flex flex-col items-center text-yellow-400"
          >
            <span className="text-sm mb-2 drop-shadow">Scroll Kebawah</span>
            <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Breadcrumb */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex space-x-2 text-sm">
            <Link to="/" className="text-yellow-200 hover:text-white transition-colors">🏠 Home</Link>
            <span className="text-white/60">/</span>
            <Link to="/program" className="text-yellow-200 hover:text-white transition-colors">📚 Program</Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-semibold">🎓 SMP Islam Mutiara Al-Madani</span>
          </nav>
        </div>
      </div>

      {/* Kata Sambutan Kepala SMP dengan Foto */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-200"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Sambutan Kepala SMP</h2>
              
              {/* Container untuk foto dan sambutan */}
              <div className="flex flex-col lg:flex-row items-center gap-8 mb-6">
                {/* Foto Kepala SMP */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src="/images/smp1.jpeg" 
                      alt="Arif Maulana, M.Pd - Kepala SMP Islam Mutiara Al-Madani"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/192/192?text=Foto+Kepala+SMP';
                        e.target.alt = 'Foto Kepala SMP Islam Mutiara Al-Madani';
                      }}
                    />
                  </div>
                </div>

                {/* Sambutan Text */}
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6 border border-purple-300">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify">
                      "SMP Islam Mutiara Al-Madani hadir untuk mempersiapkan generasi muda yang siap menghadapi 
                      tantangan zaman. Kami tidak hanya fokus pada akademik, tetapi juga pembentukan karakter 
                      kepemimpinan dan entrepreneurship berdasarkan nilai-nilai Islam."
                    </p>
                    <div className="text-center">
                      <h4 className="font-bold text-gray-800 text-xl">ARIF MAULANA, M.Pd</h4>
                      <p className="text-gray-600">Kepala SMP Islam Mutiara Al-Madani</p>
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
              className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-purple-600 text-3xl mb-6">
                👁️
              </div>
              <h3 className="text-3xl font-bold mb-6">VISI KAMI</h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <p className="text-lg leading-relaxed italic">
                  "Religius, Cerdas, Kompetitif, Mandiri, Berwawasan Luas, Nasional dan Global"
                </p>
              </div>
            </motion.div>

            {/* Misi Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-indigo-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl mb-6">
                🎯
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">MISI KAMI</h3>
              <div className="space-y-4">
                {[
                  "Mengembangkan pribadi siswa yang berkarakter, Religius, Cerdas, Disiplin, dan Cinta Tanah air",
                  "Menetapkan sistem pembelajaran yang Inovatif, Kreatif, Berbasis Iptek dan Peduli Lingkungan",
                  "Menanamkan sikap mandiri siswa serta penguasaan Bahasa Arab, Inggris, dan Ibadah-Ibadah Praktis"
                ].map((mission, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{mission}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Program Unggulan Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Program Unggulan
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Program khusus untuk mengembangkan potensi maksimal siswa SMP
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Boarding School MABIT",
                  description: "Boarding School peserta didik mabit di sekolah setiap akhir minggu untuk penguatan pengembangan bahasa,tahfiz,tahsin & penguatan interaksi social emonsional serta kemadirian",
                  features: ["Program Tilawah Qur`an", "Tahsi Qur`an", "Khatam Qur`an"],
                  color: "from-purple-500 to-purple-600"
                },
                {
                  title: "Cerdas Berbahasa",
                  description: "Pengembangan bahasa arab dan bahasa inggris menjadi fokus penting bagi seluruh peserta didik",
                   features: [""],
                  color: "from-indigo-500 to-indigo-600"
                },
                {
                  title: "Cerdas Al-Qur`an",
                  description: "Pembinaan untuk tahfiz Al-Qur`an",
                  features: [""],
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Cerdas Tahfiz Qur`an",
                  description: "Program tahfidz wajib diikuti seluruh peserta didik dan kegiatan ini dibina,dibimbing oleh ustadz dan ustadzah yang kompeten",
                  features: [""],
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Cerdas Ibadah, Zikir & Do`a",
                  description: "Seluruh peserta didik mampu melaksanakan sholat wajib 5 waktu dan sholat sunnah lainnya",
                  features: [""],
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Cerdas IPTEK",
                  description: "Karakteristik pendidikan generasi Z adalah paham teknologi,momen pembelajaran senantiasa terkoneksi dengan alat digital ",
                  features: [""],
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Cerdas Social Emosional",
                  description: "Anak sekolah menengah pertama sedang dalam masa-masa peralihan,peralihan puberitas, pengembangan sosial dan pemgarahan pergaulannya perlu pendekatan yang tepat",
                   features: [""],
                  color: "from-blue-500 to-blue-600"
                },
              ].map((program, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Kurikulum Section */}
      <section 
        ref={kurikulumRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate={kurikulumVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Kurikulum Terintegrasi
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Perpaduan kurikulum nasional dan nilai-nilai Islam untuk pendidikan holistik
              </p>
            </motion.div>
            
            {/* Kurikulum Nasional */}
            <motion.div
              variants={fadeInUp}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 shadow-2xl text-white">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-purple-600 text-2xl mr-6">
                    🇮🇩
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Kurikulum Nasional</h3>
                    <p className="text-purple-100 font-semibold">Kurikulum 2013 yang Disempurnakan</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-yellow-300">Mata Pelajaran Inti</h4>
                    <div className="space-y-3">
                      {[
                        "Bahasa Indonesia",
                        "Pendidikan Kewarganegaraan",
                        "Bahasa Inggris",
                        "Ilmu Pengetahuan Alam (IPA)",
                        "Ilmu Pengetahuan Sosial (IPS)",
                        "Pendidikan Agama Islam",
                        "Seni Budaya dan Prakarya",
                        "Pendidikan Jasmani, Olahraga dan Kesehatan",
                        "Seni & Prakarya",
                        "Informatika"
                      ].map((subject, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          <span className="text-indigo-100">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Kurikulum Yayasan */}
            <motion.div
              variants={fadeInUp}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-200">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl mr-6">
                    🕌
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">Kurikulum Yayasan</h3>
                    <p className="text-purple-600 font-semibold">Nilai-nilai Islami dan Pengembangan Karakter</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Sejarah & Kebudayaan Islam",
                      items: [""],
                      icon: "",
                      color: "from-yellow-400 to-yellow-500"
                    },
                    {
                      title: "Bahasa Arab",
                      items: [""],
                      icon: "",
                      color: "from-green-400 to-green-500"
                    },
                    {
                      title: "Aqidah Akhlak",
                      items: [""],
                      icon: "",
                      color: "from-blue-400 to-blue-500"
                    },
                    {
                      title: "Al-Qur`an Tafsir",
                      items: [""],
                      icon: "",
                      color: "from-purple-400 to-purple-500"
                    },
                    {
                      title: "Fiqih",
                      items: [""],
                      icon: "",
                      color: "from-indigo-400 to-indigo-500"
                    },
                    {
                      title: "Mulok",
                      items: [""],
                      icon: "",
                      color: "from-red-400 to-red-500"
                    },
                    {
                      title: "Tahfizd Qur`an",
                      items: [""],
                      icon: "",
                      color: "from-red-400 to-red-500"
                    }
                  ].map((program, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                      <div className={`w-12 h-12 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center text-white text-xl mb-4`}>
                        {program.icon}
                      </div>
                      <h4 className="text-lg font-bold mb-4 text-gray-800">{program.title}</h4>
                      <ul className="space-y-2">
                        {program.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-1 h-1 bg-purple-500 rounded-full mr-2"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Ekstrakurikuler Section */}
      <section 
        ref={extracurricularRef}
        className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate={extracurricularVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ekstrakurikuler
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Berbagai kegiatan untuk mengembangkan bakat, minat, dan keterampilan siswa
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Olahraga", icon: "", description: "Atletik, Badminton, Futsal, Dll ", color: "bg-yellow-500" },
                { name: "Seni", icon: "", description: "Tari, Asamble Vocal, Karya Anyam, Marawis,Melukis", color: "bg-green-500" },
                { name: "Pramuka", icon: "", description: "", color: "bg-red-500" },
                { name: "Story Telling", icon: "", description: "", color: "bg-blue-500" },
                { name: "Public Speaking", icon: "", description: "", color: "bg-purple-500" },
                { name: "Palang Merah Remaja", icon: "", description: "", color: "bg-indigo-500" },
                { name: "Osis", icon: "", description: "", color: "bg-orange-500" },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <div className={`w-16 h-16 ${activity.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {activity.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-yellow-300">{activity.name}</h3>
                  <p className="text-purple-100 text-sm leading-relaxed">{activity.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Enhanced Prestasi Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Prestasi Siswa
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Bukti nyata kualitas pendidikan di SMP Islam Mutiara Al-Madani
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { achievement: "Juara 1 LCC bahasa inggris (Tingkat Kota)", year: "" },
                { achievement: "Juara Harapan 2 Solo Song (Tingkat Kota", year: "" },
                { achievement: "Juara 1 lomba inovasi sekolah program No English No Service(Tingkat Kota)", year: "" },
                { achievement: "Juara 3 Tahfiz Putri MTQ(Tingkat Kota)", year: "" },
                { achievement: "Juara 3 Tahfiz Putri MTQ(Tingkat Kota)", year: "" },
                { achievement: "Juara 3 Tahfiz Putra MTQ(Tingkat Kota)", year: "" },
                { achievement: "Juara 1 FL2SN Lomba Cipta Baca Puisi(Tingkat Kota)", year: "" },
                { achievement: "Juara 2 Lomba Story Telling(Tingkat Kota)", year: "" },
                { achievement: "Juara 3 Lomba K3 Sekolah(Tingkat Kota)", year: "" },
                { achievement: "Juara Harapan 1 Lomba Menulis Aksara Incung(Tingkat Kota)", year: "" },
                { achievement: "Juara Harapan 2 Lomba Menulis Aksara Incung(Tingkat Kota)", year: "" },
                { achievement: "Juara 1 FTBI Cabang Tentang Tradisi Daerah(Tingkat Kota)", year: "" },
                { achievement: "Juara 2 FTBI Cabang Mendongeng Bahasa Daerah(Tingkat Kota)", year: "" },
                { achievement: "Juara Harapan 1 FTBI LombaMenulis Dan Baca Aksara Incung(Tingkat Kota)", year: "" },
                { achievement: "Juara Harapan2 FTBI Lomba Baca Pantun Bahasa Daerah(Tingkat Kota)", year: "" },
                { achievement: "Juara Harapan 3 Menulis Cerpen Bahasa Daerah(Tingkat Kota)", year: "" },
                { achievement: "Juara 1 FTBI Tembang Tradisi(Tingkat Provinsi)", year: "" },
                { achievement: "Juara 1 FTBI Mendongeng Bahasa Daerah(Tingkat Provinsi)", year: "" },
                { achievement: "Juara 2 FTBI Menulis Baca Aksara(Tingkat Provinsi)", year: "" },
                { achievement: "Peserta Kemah Cerpen(Tingkat Provinsi)", year: "" },
              ].map((prestasi, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
                >
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="font-bold text-lg mb-3 text-yellow-300">{prestasi.achievement}</h3>
                  <p className="text-purple-100 font-semibold">{prestasi.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-600 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Bergabunglah dengan SMP Islam Mutiara Al-Madani
            </h2>
            <p className="text-xl text-purple-100 mb-8 drop-shadow">
              Daftarkan putra-putri Anda untuk pendidikan menengah yang berkualitas dan berwawasan global
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

export default SMP;