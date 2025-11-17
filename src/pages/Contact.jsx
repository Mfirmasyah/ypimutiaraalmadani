import React, { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

const Contact = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.3);
  const [contactRef, contactVisible] = useScrollAnimation(0.2);
  const [currentBackground, setCurrentBackground] = useState(0);

  // Multiple background images untuk hero section
  const backgroundImages = [
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1588072432836-4b4f66ea8c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ];

  // Auto change background
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const contactInfo = [
    {
      icon: '📍',
      title: 'Alamat Sekolah',
      details: ['Jl. Yos Sudarso No. 28', 'Kec. Sungai Penuh, Kota Sungai Penuh', 'Jambi 37111'],
      link: '#',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📞',
      title: 'Telepon',
      details: ['+62 853-6826-2156', '+62 852-6712-3555','+62 853-6834-6043','+62 812-7378-5083','+62 853-8093-8543'],
      link: 'tel:+6285368262156',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['ypimutiaraalmadani@gmail.com'],
      link: 'mailto:ypimutiaraalmadani@gmail.com',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🕒',
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 08:00 - 14:00', 'Minggu: Tutup'],
      link: '#',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const departments = [
    {
      name: 'Administrasi',
      phone: '+62 853-6826-2156',
      email: 'ypimutiaraalmadani@gmail.com',
      icon: '📊'
    },
    {
      name: 'Kurikulum',
      phone: '+62 853-6826-2156', 
      email: 'ypimutiaraalmadani@gmail.com',
      icon: '📚'
    },
    {
      name: 'Kesiswaan',
      phone: '+62 853-6826-2156',
      email: 'ypimutiaraalmadani@gmail.com',
      icon: '👨‍🎓'
    },
    {
      name: 'PPDB',
      phone: '+62 853-6826-2156',
      email: 'ypimutiaraalmadani@gmail.com',
      icon: '🎓'
    }
  ];

  // Social Media Data
  const socialMedia = [
    {
      name: 'Instagram',
      icon: '📷',
      username: '@ypimutiaramadani',
      url: 'https://www.instagram.com/ypimutiaraalmadani/?next=%2F',
      gradient: 'from-pink-500 to-purple-600',
      description: 'Follow untuk update kegiatan harian dan prestasi siswa'
    },
    {
      name: 'TikTok',
      icon: '🎵',
      username: '@ypimutiaramadani',
      url: 'https://www.tiktok.com/@ypimutiaraalmadani_',
      gradient: 'from-gray-800 to-black',
      description: 'Tonton video kreatif dan aktivitas seru di sekolah'
    },
    {
      name: 'YouTube',
      icon: '📺',
      username: 'YPI-Mutiara Al-Madani',
      url: 'https://www.youtube.com/@YPIMutiaraAlMadani-d9w',
      gradient: 'from-red-500 to-red-700',
      description: 'Subscribe untuk video edukasi dan dokumentasi kegiatan'
    }
  ];

  // Google Maps embed URL untuk lokasi sekolah
  const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.441366455743!2d101.3922774749181!3d-2.063246237019209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2e5e9c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sJl.%20Yos%20Sudarso%20No.28%2C%20Gedang%2C%20Kec.%20Sungai%20Penuh%2C%20Kota%20Sungai%20Penuh%2C%20Jambi%2037111!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid";

  // URL untuk membuka Google Maps di tab baru
  const googleMapsDirectUrl = "https://maps.google.com/?q=Jl.+Yos+Sudarso+No.28,+Gedang,+Kec.+Sungai+Penuh,+Kota+Sungai+Penuh,+Jambi+37111";

  return (
    <div className="pt-20">
      {/* Modern Hero Section dengan Multiple Background */}
      <section 
        ref={heroRef}
        className="relative min-h-[60vh] py-20 text-white overflow-hidden"
      >
        {/* Multiple Background Images dengan Transition */}
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
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-teal-600/80 to-emerald-800/80" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate={heroVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-400">Kami</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90 mb-8 font-light leading-relaxed"
            >
              Kami siap membantu dan menjawab semua pertanyaan Anda tentang Mutiara Al-Madani
            </motion.p>
          </motion.div>

          {/* Background Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBackground(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentBackground === index 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 text-xl group-hover:scale-110 transition-transform duration-300`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {info.link !== '#' && (
                  <motion.a
                    href={info.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-all duration-300"
                  >
                    Hubungi
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Ikuti Kami di Media Sosial
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tetap terhubung dengan kegiatan terbaru, prestasi siswa, dan informasi penting 
                melalui platform media sosial kami
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {social.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{social.name}</h3>
                  <p className="text-gray-600 font-medium mb-3">{social.username}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {social.description}
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center justify-center px-6 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r ${social.gradient} group-hover:shadow-md transition-all duration-300`}
                  >
                    <span>Follow</span>
                    <svg 
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Quick Social Links */}
            <motion.div
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-6">Atau kunjungi langsung:</p>
              <div className="flex justify-center space-x-4">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                    title={`Follow kami di ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map & Department Contacts */}
      <section 
        ref={contactRef}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={contactVisible ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Interactive Map */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="h-80 relative">
                {/* Google Maps Embed */}
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Yayasan Pendidikan Islam Mutiara Al-Madani"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Lokasi Kami</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Yayasan Pendidikan Islam Mutiara Al-Madani berlokasi di Jl. Yos Sudarso No. 28, 
                  Kecamatan Sungai Penuh, Kota Sungai Penuh, Jambi.
                </p>
                
                <motion.a
                  href={googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-md transition-all duration-300 flex items-center justify-center text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Buka di Google Maps
                </motion.a>
              </div>
            </motion.div>

            {/* Department Contacts */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Kontak Yayasan</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 3 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm mr-3">
                        {dept.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-emerald-600 transition-colors">{dept.name}</h4>
                        <p className="text-gray-600 text-xs">{dept.phone}</p>
                      </div>
                    </div>
                    <motion.a
                      href={`mailto:${dept.email}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Simple FAQ Section */}
      <section className="py-16 bg-white">
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Pertanyaan Umum
              </h2>
              <p className="text-gray-600">
                Jawaban untuk pertanyaan yang sering diajukan
              </p>
            </motion.div>
            
            <div className="space-y-4">
              {[
                {
                  question: "Bagaimana cara mendaftar sebagai siswa baru?",
                  answer: "Pendaftaran dapat dilakukan secara online melalui website kami di menu PPDB atau datang langsung ke sekolah dengan membawa dokumen yang diperlukan."
                },
                {
                  question: "Apa saja persyaratan untuk mendaftar?",
                  answer: "Persyaratan meliputi formulir pendaftaran, fotocopy akta kelahiran, kartu keluarga, pas foto 3x4, dan rapor semester terakhir."
                },
                {
                  question: "Apakah tersedia program beasiswa?",
                  answer: "Ya, kami menyediakan program beasiswa untuk siswa berprestasi akademik, non-akademik, dan yang membutuhkan bantuan finansial."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="font-bold text-gray-800 text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">
              Butuh Bantuan?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Hubungi kami langsung untuk informasi lebih lanjut
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="tel:+6285368262156"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <span className="text-xl mr-2">📞</span>
                Telepon Sekarang
              </motion.a>
              <motion.a
                href="https://wa.me/6285368262156"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center"
              >
                <span className="text-xl mr-2">💬</span>
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;