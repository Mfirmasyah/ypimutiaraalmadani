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
  
  const [currentSlide, setCurrentSlide] = useState(0);

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
            viewport={{ once: true }}
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
                  icon: "",
                  color: "from-yellow-400 to-yellow-500"
                },
                {
                  title: "Bimbingan Program Cinta Ibadah",
                  description: "Bimbingan Untuk Belajar Beribadah Dari Dini",
                  features: ["Bimbingan Sholat 5 Waktu", "Bimbingan Wudhu", "Bimbingan Do`a Sehari-hari", "Bimbingan Puasa", "Bimbingan Manasik Haji", "Bimbingan Zakat, Shadaqah, Infaq", "Bimbingan Sholat Dhuha", "Bimbingan Sholat Berjamaah"],
                  icon: "",
                  color: "from-pink-400 to-pink-500"
                },
                {
                  title: "Bimbingan Program Cinta Rasul",
                  description: "Menumbuhkan Rasa Cinta Kepada Rasul Dari Dini",
                  features: ["Bimbingan Hafalan Hadis", "Bimbingan Kisah-Kisah Nabi Dan Rasul(Shirah Nabawiyah)", "Peringatan Hari Besar Islam", "Penanaman Adab-Adab Sehari-hari"],
                  icon: "",
                  color: "from-purple-400 to-purple-500"
                },
                {
                  title: "Bimbingan Program Pengembangan Minat Dan Bakat",
                  description: "Pengembangan kreativitas dan ekspresi diri melalui berbagai media seni",
                  features: ["Bahsa Arab-Inggris Untuk Anak Usia Dini", "Pentas Seni Dan Kreatifitas", "Field Trip", "Bazar/Pameran","Karnaval","Teknik Melukis Dan Menggambar","Tari Daerah Gerak Dan Lagu"],
                  icon: "",
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

      {/* Kegiatan Harian Section */}
      <section 
        ref={activitiesRef}
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={activitiesVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Kegiatan Seru di TK
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Berbagai aktivitas menyenangkan yang mendukung perkembangan anak
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { 
                  image: '/assets/aktivitas1.png',
                  title: 'Belajar Sambil Bermain',
                  description: 'Anak-anak belajar konsep dasar melalui permainan edukatif yang menyenangkan. Kegiatan ini dirancang untuk mengembangkan motorik halus, kognitif, dan sosial emosional anak dengan pendekatan yang sesuai usia.'
                },
                { 
                  image: '/assets/yasinan_pagi.png',
                  title: 'Pembiasaan Nilai Islami',
                  description: 'Melalui kegiatan doa bersama, hafalan surat pendek, dan cerita kisah nabi, anak-anak dikenalkan dengan nilai-nilai Islam sejak dini. Pembiasaan ini membantu membentuk karakter dan akhlak mulia.'
                },
                { 
                  image: '/assets/drumband1.png',
                  title: 'Seni dan Kreativitas',
                  description: 'Kegiatan seni seperti melukis, mewarnai, dan bermain musik membantu mengembangkan kreativitas dan imajinasi anak. Mereka bebas berekspresi sambil belajar tentang warna, bentuk, dan irama.'
                },
                { 
                  image: '/assets/pramuka5.png',
                  title: 'Aktivitas Outdoor',
                  description: 'Kegiatan di luar ruangan seperti berkebun, olahraga ringan, dan eksplorasi alam membantu anak mengenal lingkungan sekitar sekaligus mengembangkan motorik kasar dan keberanian.'
                }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{activity.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{activity.description}</p>
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
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
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