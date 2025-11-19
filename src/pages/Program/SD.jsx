import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const SD = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.3);
  const [visionRef, visionVisible] = useScrollAnimation(0.2);
  const [programRef, programVisible] = useScrollAnimation(0.2);
  const [extracurricularRef, extracurricularVisible] = useScrollAnimation(0.2);
  const [facilitiesRef, facilitiesVisible] = useScrollAnimation(0.2);
  const [kurikulumRef, kurikulumVisible] = useScrollAnimation(0.2);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Multiple background images untuk SD
  const backgroundImages = [
    '/images/SD.jpg',
    '/assets/background2.jpg',
    'assets/drumband1.png',
    '/assets/aktivitas1.png',
    '/assets/pramuka5.png'
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/50"></div>
        
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
            className="absolute bottom-40 right-32 w-12 h-12 bg-green-400 rounded-full opacity-50"
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
            className="absolute top-1/2 left-1/3 w-6 h-6 bg-blue-300 rounded-full opacity-70"
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
                <span className="text-yellow-400 font-semibold text-lg">Pendidikan Dasar Berkualitas</span>
              </div>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-green-300 to-blue-300 bg-clip-text text-transparent leading-tight"
            >
              SD ISLAM
              <br />
              MUTIARA AL-MADANI
            </motion.h1>

            {/* Akreditasi Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-block mt-6 mb-8"
            >
              <div className="bg-white/20 backdrop-blur-sm border border-yellow-400/50 rounded-full px-4 py-2 inline-block">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 font-bold">🏆</span>
                  <span className="text-yellow-300 font-semibold text-sm">TERAKREDITASI A - NILAI 94</span>
                  <span className="text-yellow-400 font-bold">⭐</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              variants={fadeInUp}
              className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-green-400 mx-auto mb-8 rounded-full"
            />
            
            {/* Main Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 max-w-4xl mx-auto font-light drop-shadow-lg"
            >
              Membangun <span className="text-yellow-400 font-bold">Fondasi Akademik</span> dan{' '}
              <span className="text-green-300 font-bold">Karakter Islami</span> untuk{' '}
              <span className="text-blue-300 font-bold">Masa Depan Gemilang</span>
            </motion.p>

            {/* Secondary Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100 leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-lg"
            >
              Mengintegrasikan kurikulum nasional dengan nilai-nilai Islam untuk membentuk 
              generasi yang cerdas, berakhlak mulia, dan siap menghadapi tantangan masa depan
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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex space-x-2 text-sm">
            <Link to="/" className="text-yellow-200 hover:text-white transition-colors">🏠 Home</Link>
            <span className="text-white/60">/</span>
            <Link to="/program" className="text-yellow-200 hover:text-white transition-colors">📚 Program</Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-semibold">🎓 SD Islam Mutiara Al-Madani</span>
          </nav>
        </div>
      </div>

      {/* Legalitas & Izin Operasional Section */}
      <section className="py-16 bg-white border-b">
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
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Legalitas & Izin Operasional
              </h2>
              <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600">
                Sekolah yang legal dan diakui oleh Pemerintah
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Izin Operasional */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 text-white text-center shadow-2xl"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">
                  📜
                </div>
                <h3 className="text-2xl font-bold mb-4">Izin Operasional</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Dinas Pendidikan Kota Sungai Penuh</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Nomor: 420/Kep.163/2010</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Tahun Berdiri: 2010</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Status: Aktif & Terdaftar</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-green-100 text-sm">
                    Sekolah telah memenuhi semua persyaratan operasional sesuai peraturan perundang-undangan
                  </p>
                </div>
              </motion.div>

              {/* NPSN */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 border-2 border-green-200 text-center shadow-xl"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">
                  🏛️
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">NPSN</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">69787162</div>
                <p className="text-gray-600">Nomor Pokok Sekolah Nasional</p>
                <p className="text-sm text-gray-500 mt-2">Terdaftar di Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI</p>
                
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <h4 className="font-bold text-green-800 mb-2">Verifikasi Data</h4>
                  <div className="flex justify-between text-sm text-green-700">
                    <span>Status:</span>
                    <span className="font-bold">✓ AKTIF</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-700">
                    <span>Bentuk:</span>
                    <span className="font-bold">SEKOLAH</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-700">
                    <span>Status Kepemilikan:</span>
                    <span className="font-bold">SWASTA</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Additional Legal Info */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 text-center"
            >
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-3">📋 Dokumen Legalitas Lengkap</h4>
                <p className="text-gray-600 mb-4">
                  Semua dokumen legalitas dapat dilihat di administrasi sekolah dan telah diverifikasi oleh instansi terkait
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✓ Izin Operasional</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">✓ Akta Notaris</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">✓ NPWP Sekolah</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">✓ SK Yayasan</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Kata Sambutan Kepala SD dengan Foto */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
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
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-200"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Sambutan Kepala SD</h2>
              
              {/* Container untuk foto dan sambutan */}
              <div className="flex flex-col lg:flex-row items-center gap-8 mb-6">
                {/* Foto Kepala SD */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src="/images/sd19.jpeg" 
                      alt="Tri Setiani, S.Pd - Kepala SD Islam Mutiara Al-Madani"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/192/192?text=Foto+Kepala+SD';
                        e.target.alt = 'Foto Kepala SD Islam Mutiara Al-Madani';
                      }}
                    />
                  </div>
                </div>

                {/* Sambutan Text */}
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border border-green-300">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify">
                      "Di SD Islam Mutiara Al-Madani, kami memadukan kurikulum nasional dengan nilai-nilai Islam 
                      untuk membentuk siswa yang tidak hanya cerdas secara akademik tetapi juga berakhlak mulia. 
                      Kami berkomitmen menciptakan lingkungan belajar yang menyenangkan dan menantang."
                    </p>
                    <div className="text-center">
                      <h4 className="font-bold text-gray-800 text-xl">TRI SETIANI, S.Pd</h4>
                      <p className="text-gray-600">Kepala SD Islam Mutiara Al-Madani</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Visi Misi Section */}
      <section 
        ref={visionRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-100 rounded-full opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate={visionVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Visi Card */}
            <motion.div
              variants={fadeInUp}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-3xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-500 h-full">
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-green-600 text-3xl shadow-lg">
                  👁️
                </div>
                <div className="mt-8">
                  <h3 className="text-3xl font-bold mb-6">VISI KAMI</h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <p className="text-2xl leading-relaxed font-semibold text-center">
                      "Unggul, Berakhlak, Mandiri dan Terampil"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Misi Card */}
            <motion.div
              variants={fadeInUp}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 transform group-hover:scale-105 transition-all duration-500 h-full">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                  🎯
                </div>
                <div className="mt-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">MISI KAMI</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                    {[
                      "Membangun kepribadian siswa untuk mampu mengenal dan mengoptimalkan potensi dirinya berupa intelektual, emosional maupun spiritual",
                      "Membudayakan nilai-nilai islam dalam kehidupan siswa demi tercapainya generasi yang cerdas terampil dan berakhlak mulia",
                      "Menumbuhkan dan membangun potensi diri serta kemandirian siswa dalam kehidupan sosial",
                      "Mengoptimalkan pembinaan siswa agar terampil dalam penyelesaian permasalahan dan terampil dalam menggunakan teknologi"
                    ].map((mission, index) => (
                      <div key={index} className="flex items-start group/item">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover/item:bg-blue-500 transition-colors duration-300 mt-1">
                          <span className="text-blue-600 group-hover/item:text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 group-hover/item:text-blue-600 transition-colors duration-300 leading-relaxed">{mission}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sertifikat Akreditasi Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-yellow-200"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Sertifikat Image */}
                <div className="flex-shrink-0">
                  <div className="relative group cursor-pointer">
                    {/* Sertifikat Frame */}
                    <div className="w-64 h-80 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300 p-4">
                      <div className="w-full h-full bg-white rounded-lg border-4 border-yellow-800 flex flex-col items-center justify-center p-4 text-center">
                        {/* Sertifikat Header */}
                        <div className="text-xs font-bold text-gray-800 mb-2">
                          BADAN AKREDITASI NASIONAL SEKOLAH/MADRASAH
                        </div>
                        <div className="text-lg font-bold text-red-600 mb-1">
                          SERTIFIKAT AKREDITASI
                        </div>
                        <div className="w-full h-px bg-red-600 my-2"></div>
                        
                        {/* Content */}
                        <div className="text-6xl font-bold text-yellow-600 mb-2">A</div>
                        <div className="text-sm font-bold text-gray-700">UNGGUL</div>
                        <div className="text-xs text-gray-600 mt-1">Nilai: 94</div>
                        
                        <div className="text-xs text-gray-500 mt-4">
                          No. 15.22.00084
                        </div>
                        <div className="text-xs text-gray-500">
                          Berlaku: 2022-2027
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Stamp */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs transform rotate-12 shadow-lg border-2 border-white">
                      RESMI
                    </div>
                    
                    {/* Ribbon */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      TERAKREDITASI
                    </div>
                  </div>
                </div>

                {/* Sertifikat Content */}
                <div className="flex-1 text-left">
                  <div className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
                    🏆 AKREDITASI A (UNGGUL)
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Sertifikat Akreditasi <span className="text-yellow-600">Nilai 94</span>
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center bg-green-50 rounded-xl p-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-green-600 font-bold text-lg">A</span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-bold">Predikat: UNGGUL</span>
                        <p className="text-green-600 font-semibold">Nilai Akreditasi: 94/100</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-blue-50 rounded-xl p-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold">🏛️</span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-bold">BAN-S/M</span>
                        <p className="text-blue-600">Badan Akreditasi Nasional Sekolah/Madrasah</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-purple-50 rounded-xl p-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-purple-600 font-bold">📅</span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-bold">Masa Berlaku</span>
                        <p className="text-purple-600">Oktober 2022 - Oktober 2027 (5 Tahun)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-amber-50 rounded-xl p-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-amber-600 font-bold">⭐</span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-bold">Standar Nasional</span>
                        <p className="text-amber-600">Memenuhi 8 Standar Nasional Pendidikan</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      <strong>SD ISLAM MUTIARA AL MADANI</strong> telah meraih predikat <strong>UNGGUL</strong> 
                      dengan nilai <strong>94</strong> dari Badan Akreditasi Nasional Sekolah/Madrasah. 
                      Sertifikat No. <strong>15.22.00084</strong> berdasarkan SK No. <strong>1453/BAN-SM/SK/2022</strong>.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => document.getElementById('sertifikatModal').showModal()}
                      className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                    >
                      <span>🔍</span>
                      <span>Lihat Sertifikat Lengkap</span>
                    </button>
                    
                    <a 
                      href="/documents/SERTIFIKAT_AKREDITASI_SD.pdf"
                      download
                      className="border-2 border-yellow-500 text-yellow-600 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-50 transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>📥</span>
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Program Unggulan Section */}
      <section 
        ref={programRef}
        className="py-20 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden"
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
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Program khusus yang dirancang untuk mengembangkan potensi maksimal siswa
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Pembinaan Belajar Al-Qur`an",
                  description: "Pembinaan Belajar & menghafal Al-Quran dengan target 3 juz dan pemahaman tajwid",
                  features: ["Tahsin", "Tilawah", "Dll"],
                  icon: "",
                  color: "from-yellow-500 to-yellow-600"
                },
                {
                  title: "Pembinaan Praktek Ibadah",
                  description: "Pembinaan Untuk Sholat Dan Ibadah Lainnya",
                  features: ["Wudhu", "Sholat", "Zikir", "Manasiq Haji","Do`a","Dll"],
                  icon: "",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Tahfiz Al-Qur`an",
                  description: "Pembinaan Untuk Penghafal Al-Qur`an",
                  features: ["Minimal 1 Juz s.d 3 Juz Sesuai Kemampuan Siswa"],
                  icon: "",
                  color: "from-green-500 to-green-600"
                },
                {
                  title: "Kegiatan Tabliq",
                  description: "Kegiatan yang terjadwal,terencana dan beragam untuk meningkatkan peduli sosial,kemandirian,kesehatan & keamanan peserta didik",
                  features: [""],
                  icon: "",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  title: "Musabaqoh Tilawatil Qur`an(MHQ)",
                  description: "Menanamkan kecintaan peserta didik & pendidikan terhadap Al-Qur`an & Hadis",
                  features: [""],
                  icon: "",
                  color: "from-indigo-500 to-indigo-600"
                },
                {
                  title: "English Club",
                  description: "",
                  features: [""],
                  icon: "",
                  color: "from-red-500 to-red-600"
                },
                  {
                  title: "Story Telling",
                  description: "",
                  features: [""],
                  icon: "",
                  color: "from-red-500 to-red-600"
                },
                  {
                  title: "Program Penguasaan Bertutur",
                  description: "",
                  features: [""],
                  icon: "",
                  color: "from-red-500 to-red-600"
                },
                  {
                  title: "Pentas Kreatifitas Tahunan",
                  description: "",
                  features: [""],
                  icon: "",
                  color: "from-red-500 to-red-600"
                },
                  {
                  title: "Al-Madani Expo",
                  description: "",
                  features: [""],
                  icon: "",
                  color: "from-red-500 to-red-600"
                },
                  {
                  title: "Pembinaan Olimpiade SAINS & Matematika",
                  description: "",
                  features: [""],
                  icon: "",
                  color: "from-red-500 to-red-600"
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
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-green-600 font-semibold text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
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
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Perpaduan kurikulum nasional dan nilai-nilai Islam untuk pendidikan holistik
              </p>
            </motion.div>
            
            {/* Kurikulum Nasional */}
            <motion.div
              variants={fadeInUp}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl p-8 shadow-2xl text-white">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-600 text-2xl mr-6">
                    🇮🇩
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Kurikulum Nasional</h3>
                    <p className="text-green-100 font-semibold">Kurikulum 2013 (K13) yang Disempurnakan</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-yellow-300">Mata Pelajaran Inti</h4>
                    <div className="space-y-3">
                      {[
                        "Pendidikan Agama Islam dan Budi Pekerti",
                        "Pendidikan Pancasila dan Kewarganegaraan",
                        "Bahasa Indonesia",
                        "Matematika",
                        "Bahasa Inggris",
                        "Ilmu Pengetahuan Alam (IPA)",
                        "Ilmu Pengetahuan Sosial (IPS)",
                        "Seni Budaya dan Prakarya",
                        "Pendidikan Jasmani, Olahraga dan Kesehatan"
                      ].map((subject, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          <span className="text-blue-100">{subject}</span>
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
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-200">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl mr-6">
                    🕌
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">Kurikulum Yayasan</h3>
                    <p className="text-green-600 font-semibold">Nilai-nilai Islami dan Pengembangan Karakter</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Bahasa Arab",
                      items: [""],
                      icon: "",
                      color: "from-yellow-400 to-yellow-500"
                    },
                    {
                      title: "Pendidikan Aqidah & Akhlak",
                      items: [
                        "Aqidah Islamiyah",
                        "Akhlak Terpuji",
                        "Sejarah Nabi & Sahabat",
                        "Praktik Ibadah Harian"
                      ],
                      icon: "",
                      color: "from-green-400 to-green-500"
                    },
                    {
                      title: "Al-Qur`an Hadist & Tafsir",
                      items: [""],
                      icon: "",
                      color: "from-purple-400 to-purple-500"
                    },
                    {
                      title: "Tahfidz",
                      items: [""],
                      icon: "",
                      color: "from-purple-400 to-purple-500"
                    },
                    {
                      title: "Fiqih",
                      items: [""],
                      icon: "",
                      color: "from-purple-400 to-purple-500"
                    },
                    {
                      title: "Al-Adab",
                      items: [""],
                      icon: "",
                      color: "from-purple-400 to-purple-500"
                    },
                    {
                      title:"SBDT",
                      items: [""],
                      icon: "",
                      color: "from-purple-400 to-purple-500"
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
                            <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
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

      {/* Enhanced Daftar Prestasi Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-700 text-white relative overflow-hidden">
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
                Daftar Prestasi
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Bukti nyata kualitas pendidikan dan dedikasi siswa-siswi SD Islam Mutiara Al-Madani
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { 
                  achievement: "Juara 3 Dokter Kecil Tingkat Puskesmas Desa Gedang", 
                  year: "2022",
                  category: "",
                  level: ""
                },
                 { 
                  achievement: "Juara 1 Lomba Bertutur Tingkat Kota Sungai Penuh", 
                  year: "2022",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 2 Lomba Phantomim ", 
                  year: "2022",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 1 Lomba Karate Putri", 
                  year: "2022",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 1 Inobel", 
                  year: "2023",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 3 Guru Berprestasi", 
                  year: "2023",
                  category: "",
                  level: ""
                },
                 { 
                  achievement: "Juara 1 Lomba Bertutur", 
                  year: "2023",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 1 tunggal Anak-Anak Putra", 
                  year: "2023",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Sekolah Penerima Penghargaan Kajian Pustaka", 
                  year: "2024",
                  category: "",
                  level: "Nasional"
                },
                 { 
                  achievement: "Juara 2 Lomba MTQ", 
                  year: "2024",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 1 Lomba Menggambar", 
                  year: "2024",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 1 Lomba Bertutur", 
                  year: "2024",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara Harapan 1 Lomba Bertutur", 
                  year: "2024",
                  category: "",
                  level: "Provinsi"
                },
                 { 
                  achievement: "Juara 1 Barisan Indah", 
                  year: "2024",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 1 Lomba Pidato Bahasa Kerinci", 
                  year: "2024",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara Harapan 1 Cerpen Bahasa Kerinci", 
                  year: "2024",
                  category: "",
                  level: "Kota"
                },
                 { 
                  achievement: "Juara 3 Lomba Cerpen Bahasa Kerinci", 
                  year: "2024",
                  category: "",
                  level: "Provinsi Jambi"
                },
                 { 
                  achievement: "Juara 1 Lomba Pidato Bahasa Kerinci", 
                  year: "2024",
                  category: "",
                  level: "Provinsi"
                },
              ].map((prestasi, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">🏆</div>
                    <div className="text-right">
                      <span className="bg-yellow-400 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                        {prestasi.level}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-yellow-300">{prestasi.achievement}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100 font-semibold">{prestasi.year}</span>
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                      {prestasi.category}
                    </span>
                  </div>
                </motion.div>
              ))}
              </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Ekstrakurikuler Section */}
      <section 
        ref={extracurricularRef}
        className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white relative overflow-hidden"
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
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Berbagai kegiatan untuk mengembangkan bakat dan minat siswa
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Pramuka", icon: "", description: "Program Bulanan Dan Tahunan", color: "bg-yellow-500" },
                { name: "UKS(Usaha Kesehatan Sekolah", icon: "", description: "Pengembangan Dokter Kecil,Pembinaan Penilaian Hidup Bersih Dan Sehat,Pembinaan Badanku Sehat,Pembinaan Sekolahku Hijau", color: "bg-green-500" },
                { name: "Seni", icon: "", description: "Tari,Vokal,Musik & Drumb Band", color: "bg-blue-500" },
                { name: "Olahraga", icon: "", description: "Atletik,Badminton,Futsal,Renang,Silat,Karate", color: "bg-red-500" },
                { name: "Pengembangan Bahasa", icon: "", description: "Bertutur,Story Telling,English Club,Pidato", color: "bg-orange-500" },
                { name: "Field Trip", icon: "", description: "", color: "bg-purple-500" },
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
                  <p className="text-green-100 text-sm leading-relaxed">{activity.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Bergabunglah dengan SD Islam Mutiara Al-Madani
            </h2>
            <p className="text-xl text-green-100 mb-8 drop-shadow">
              Daftarkan putra-putri Anda untuk pendidikan dasar yang berkualitas dan islami
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/spmb/daftar"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
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

      {/* Modal for Full Certificate */}
      <dialog id="sertifikatModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-4xl p-0 bg-white rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-4 text-white text-center">
            <h3 className="text-xl font-bold">SERTIFIKAT AKREDITASI SD ISLAM MUTIARA AL-MADANI</h3>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-yellow-200">
              {/* Sertifikat Content dalam Modal */}
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-2">BADAN AKREDITASI NASIONAL SEKOLAH/MADRASAH</div>
                <div className="text-2xl font-bold text-red-600 mb-2">SERTIFIKAT AKREDITASI</div>
                <div className="w-32 h-1 bg-red-600 mx-auto mb-4"></div>
                <div className="text-4xl font-bold text-yellow-600 mb-2">A</div>
                <div className="text-lg font-bold text-gray-800">UNGGUL</div>
                <div className="text-gray-600">Nilai: 94/100</div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Informasi Sekolah:</h4>
                  <p><strong>Nama:</strong> SD ISLAM MUTIARA AL MADANI</p>
                  <p><strong>NPSN:</strong> 69787162</p>
                  <p><strong>Alamat:</strong> JL YOS SUDARSO NO 28, KOTA SUNGAI PENUH, JAMBI</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Informasi Akreditasi:</h4>
                  <p><strong>No. Sertifikat:</strong> 15.22.00084</p>
                  <p><strong>SK BAN-S/M:</strong> 1453/BAN-SM/SK/2022</p>
                  <p><strong>Masa Berlaku:</strong> 20 Oktober 2022 - 20 Oktober 2027</p>
                  <p><strong>Ditandatangani oleh:</strong> Dr. Toni Toharudin, M.Sc.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-action p-4">
            <form method="dialog">
              <button className="btn bg-yellow-500 text-white hover:bg-yellow-600">Tutup</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SD;