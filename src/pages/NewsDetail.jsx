import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from '../utils/animations';

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  const STRAPI_URL = "https://incredible-sparkle-f34960cd1e.strapiapp.com";

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

  // Get image URL - DIPERBAIKI dengan lebih banyak fallback
  const getImageUrl = (imageData) => {
    console.log('🖼️ Image data received:', imageData);
    
    // Jika imageData null/undefined
    if (!imageData) {
      return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
    }

    // Cek berbagai kemungkinan struktur
    let imageUrl = '';

    // Struktur 1: imageData.data.attributes.url (Strapi v4 standard)
    if (imageData.data?.attributes?.url) {
      imageUrl = imageData.data.attributes.url;
    }
    // Struktur 2: imageData.attributes.url
    else if (imageData.attributes?.url) {
      imageUrl = imageData.attributes.url;
    }
    // Struktur 3: imageData.url (direct URL)
    else if (imageData.url) {
      imageUrl = imageData.url;
    }
    // Struktur 4: imageData langsung string URL
    else if (typeof imageData === 'string') {
      imageUrl = imageData;
    }

    // Jika dapat URL, format sesuai kebutuhan
    if (imageUrl) {
      if (imageUrl.startsWith('http')) {
        return imageUrl;
      }
      return `${STRAPI_URL}${imageUrl}`;
    }

    // Fallback image
    return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  };

  // Sample data fallback
  const getSampleNews = () => {
    return [
      {
        id: 1,
        title: "Penerimaan Peserta Didik Baru Tahun Ajaran 2024/2025",
        excerpt: "Pendaftaran PPDB dibuka mulai 1 Januari 2024. Kuota terbatas untuk semua jenjang pendidikan dengan program beasiswa prestasi...",
        content: `
          <h2>Pendaftaran Peserta Didik Baru Tahun Ajaran 2024/2025</h2>
          <p>Sekolah Mutiara Al-Madani dengan bangga mengumumkan pembukaan pendaftaran peserta didik baru untuk tahun ajaran 2024/2025.</p>
        `,
        category: "pengumuman",
        author: "Admin Sekolah",
        date: "2024-03-20",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        isImportant: true,
        views: 2456,
        tags: ["ppdb", "pendaftaran", "siswa-baru"],
        slug: "ppdb-2024"
      }
    ];
  };

  // Fetch data berita detail - DIPERBAIKI dengan debugging lebih detail
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Memuat detail berita dengan slug:', slug);

        // Query untuk Strapi v4
        const endpoint = `${STRAPI_URL}/api/beritas?filters[slug][$eq]=${slug}&populate=*`;
        
        console.log('🔍 Endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('📦 Data RAW dari Strapi:', data);

        // Debug: Lihat struktur data sebenarnya
        if (data.data && data.data.length > 0) {
          const item = data.data[0];
          console.log('🔍 Item lengkap:', item);
          console.log('🔍 Keys item:', Object.keys(item));
          
          // Cek apakah ada attributes
          if (item.attributes) {
            console.log('✅ Menggunakan struktur dengan attributes');
            console.log('🔍 Attributes keys:', Object.keys(item.attributes));
          } else {
            console.log('ℹ️ Tidak ada attributes, menggunakan data langsung');
            console.log('🔍 Data langsung:', item);
          }
        }

        if (data.data && data.data.length > 0) {
          const item = data.data[0];
          
          // Tentukan apakah menggunakan attributes atau data langsung
          const itemData = item.attributes || item;
          
          console.log('🔍 Data yang akan diproses:', itemData);
          console.log('🔍 Keys data:', Object.keys(itemData));

          // Validasi data yang diperlukan
          if (!itemData) {
            throw new Error('Data berita tidak valid');
          }

          // TRANSFORM DATA dengan fallback yang aman
          const transformedItem = {
            id: item.id || 'unknown',
            // Gunakan field sesuai schema dengan fallback
            judul: itemData.title || itemData.judul || 'Judul tidak tersedia',
            deskripsi: itemData.excerpt || itemData.deskripsi || itemData.description || '',
            konten: itemData.content || itemData.konten || itemData.body || 'Konten tidak tersedia',
            kategori: itemData.category || itemData.kategori || 'umum',
            penulis: itemData.author || itemData.penulis || 'Admin Sekolah',
            tanggal: formatDate(itemData.date || itemData.tanggal || itemData.publishedAt),
            waktuBaca: itemData.readTime || itemData.waktuBaca || '5 min read',
            gambar: getImageUrl(itemData.image || itemData.gambar),
            penting: itemData.isImportant || itemData.penting || false,
            dilihat: (itemData.views || itemData.dilihat || 0) + 1,
            tags: itemData.tags || itemData.label || [],
            slug: itemData.slug || `berita-${item.id}`
          };

          console.log('✅ Data setelah transformasi:', transformedItem);
          setNewsItem(transformedItem);
          
          // Fetch related news
          if (transformedItem.kategori) {
            fetchRelatedNews(transformedItem.kategori, transformedItem.id);
          }
        } else {
          throw new Error('Berita tidak ditemukan');
        }
      } catch (error) {
        console.error('❌ Error fetching news detail:', error);
        setError(error.message);
        
        // Fallback ke sample data
        console.log('🔄 Menggunakan sample data sebagai fallback');
        const sampleData = getSampleNews();
        const foundItem = sampleData.find(item => item.slug === slug) || sampleData[0];
        
        const transformedSample = {
          id: foundItem.id,
          judul: foundItem.title,
          deskripsi: foundItem.excerpt,
          konten: foundItem.content,
          kategori: foundItem.category,
          penulis: foundItem.author,
          tanggal: formatDate(foundItem.date),
          waktuBaca: foundItem.readTime,
          gambar: getImageUrl(foundItem.image),
          penting: foundItem.isImportant,
          dilihat: foundItem.views,
          tags: foundItem.tags,
          slug: foundItem.slug
        };
        
        setNewsItem(transformedSample);
        setRelatedNews([]); // Kosongkan related news untuk sample data
      } finally {
        setLoading(false);
      }
    };

    // Fetch related news
    const fetchRelatedNews = async (kategori, currentId) => {
      try {
        const encodedKategori = encodeURIComponent(kategori);
        const endpoint = `${STRAPI_URL}/api/beritas?filters[category][$eq]=${encodedKategori}&filters[id][$ne]=${currentId}&populate=*&pagination[pageSize]=3`;
        
        console.log('🔍 Fetch related news dari:', endpoint);
        const response = await fetch(endpoint);
        
        if (response.ok) {
          const data = await response.json();
          console.log('📦 Related news data:', data);
          
          if (data.data && data.data.length > 0) {
            const transformedData = data.data.map(item => {
              const itemData = item.attributes || item;
              return {
                id: item.id,
                judul: itemData.title || itemData.judul || 'Judul tidak tersedia',
                deskripsi: itemData.excerpt || itemData.deskripsi || '',
                kategori: itemData.category || itemData.kategori || 'umum',
                tanggal: formatDate(itemData.date || itemData.tanggal),
                gambar: getImageUrl(itemData.image || itemData.gambar),
                slug: itemData.slug || `berita-${item.id}`,
                dilihat: itemData.views || itemData.dilihat || 0
              };
            });
            setRelatedNews(transformedData);
          }
        }
      } catch (error) {
        console.log('⚠️ Tidak bisa fetch related news:', error);
        // Biarkan relatedNews kosong jika gagal
      }
    };

    if (slug) {
      fetchNewsDetail();
    }
  }, [slug, STRAPI_URL]);

  // [KODE RENDERING SAMA SEPERTI SEBELUMNYA]
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat berita...</p>
        </div>
      </div>
    );
  }

  if (error && !newsItem) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => navigate('/news')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Kembali ke Berita
          </button>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return null;
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>›</span>
            <Link to="/news" className="hover:text-blue-600 transition-colors">Berita</Link>
            <span>›</span>
            <span className="text-gray-800 font-medium truncate">{newsItem.judul}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Content */}
          <div className="lg:w-2/3">
            <motion.article
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Featured Image */}
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={newsItem.gambar} 
                  alt={newsItem.judul}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {newsItem.penting && (
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      🔥 Penting
                    </span>
                  )}
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {newsItem.kategori ? newsItem.kategori.charAt(0).toUpperCase() + newsItem.kategori.slice(1) : 'Berita'}
                  </span>
                </div>
              </div>

              {/* Article Header */}
              <div className="p-8">
                <motion.div variants={fadeInUp} className="flex items-center text-sm text-gray-500 mb-6">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {newsItem.tanggal}
                  </span>
                  <span className="mx-4">•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {newsItem.waktuBaca}
                  </span>
                  <span className="mx-4">•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {newsItem.penulis}
                  </span>
                  <span className="mx-4">•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {newsItem.dilihat} dilihat
                  </span>
                </motion.div>

                <motion.h1 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                  {newsItem.judul}
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {newsItem.deskripsi}
                </motion.p>

                {/* Tags */}
                {newsItem.tags && newsItem.tags.length > 0 && (
                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
                    {newsItem.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Article Content */}
                <motion.div 
                  variants={fadeInUp}
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: newsItem.konten }}
                />
              </div>

              {/* Share Section */}
              <motion.div variants={fadeInUp} className="px-8 py-6 bg-gray-50 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Bagikan berita ini:</span>
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <span className="text-sm">f</span>
                    </button>
                    <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                      <span className="text-sm">t</span>
                    </button>
                    <button className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                      <span className="text-sm">in</span>
                    </button>
                    <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                      <span className="text-sm">wa</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.article>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigate('/news')}
                className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Berita
              </button>
              
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center text-gray-600 hover:text-gray-800 font-semibold transition-colors"
              >
                Ke Atas
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Related News */}
            {relatedNews.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-gray-800">Berita Terkait</h3>
                </div>
                <div className="space-y-4">
                  {relatedNews.map((relatedItem) => (
                    <motion.div
                      key={relatedItem.id}
                      whileHover={{ x: 5 }}
                      className="group bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200"
                    >
                      <Link to={`/news/${relatedItem.slug}`} className="block">
                        <div className="flex items-start space-x-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedItem.gambar} 
                              alt={relatedItem.judul}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-purple-600 transition-colors line-clamp-2 mb-1">
                              {relatedItem.judul}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{relatedItem.tanggal}</span>
                              <span className="mx-2">•</span>
                              <span className="flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {relatedItem.dilihat}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Quick Links */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-gray-800">Akses Cepat</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "📋", title: "Info PPDB 2024", path: "/spmb/info" },
                  { icon: "🏆", title: "Prestasi Terbaru", path: "/achievement" },
                  { icon: "📷", title: "Galeri Kegiatan", path: "/gallery" },
                  { icon: "📰", title: "Semua Berita", path: "/news" }
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;