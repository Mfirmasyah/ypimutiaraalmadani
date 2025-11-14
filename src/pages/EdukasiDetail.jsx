import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Terjadi Kesalahan</h2>
            <p className="text-gray-600 mb-6">
              Maaf, terjadi masalah saat memuat artikel. Silakan refresh halaman atau coba lagi nanti.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Refresh Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const EdukasiDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Konfigurasi sama dengan Edukasi.jsx
  const STRAPI_URL = "https://incredible-sparkle-f34960cd1e.strapiapp.com";
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";

  // Kategori yang sama dengan Edukasi.jsx
  const categories = [
    { 
      id: "all", 
      name: "Semua Artikel", 
      icon: "📚", 
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    { 
      id: "pedagogi", 
      name: "Pedagogi", 
      icon: "👨‍🏫", 
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    { 
      id: "kurikulum", 
      name: "Kurikulum", 
      icon: "📖", 
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    { 
      id: "teknologi", 
      name: "Teknologi Pendidikan", 
      icon: "💻", 
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500"
    },
    { 
      id: "motivasi", 
      name: "Motivasi Belajar", 
      icon: "🌟", 
      color: "from-yellow-500 to-amber-500",
      gradient: "bg-gradient-to-r from-yellow-500 to-amber-500"
    }
  ];

  // Sample data fallback yang sama
  const sampleArticles = [
    {
      id: "1",
      title: "Metode Pembelajaran Abad 21 untuk Generasi Z",
      excerpt: "Bagaimana menyesuaikan metode pembelajaran dengan karakteristik generasi digital native dalam era teknologi modern.",
      content: `
        <h2>Pendahuluan</h2>
        <p>Generasi Z, yang lahir antara tahun 1997 dan 2012, merupakan generasi digital native pertama. Mereka tumbuh dengan teknologi dan memiliki cara belajar yang berbeda dari generasi sebelumnya.</p>
        
        <h2>Karakteristik Generasi Z</h2>
        <ul>
          <li>Terbiasa dengan teknologi digital</li>
          <li>Lebih suka pembelajaran visual</li>
          <li>Menyukai konten yang interaktif</li>
          <li>Memiliki rentang perhatian yang pendek</li>
          <li>Lebih mandiri dalam mencari informasi</li>
        </ul>
        
        <h2>Metode Pembelajaran yang Efektif</h2>
        <p>Beberapa metode yang cocok untuk Generasi Z antara lain:</p>
        <ol>
          <li><strong>Project-Based Learning</strong>: Pembelajaran berbasis proyek nyata</li>
          <li><strong>Flipped Classroom</strong>: Materi dipelajari di rumah, diskusi di kelas</li>
          <li><strong>Gamification</strong>: Menggunakan elemen game dalam pembelajaran</li>
          <li><strong>Collaborative Learning</strong>: Belajar melalui kolaborasi</li>
        </ol>
        
        <h2>Implementasi Teknologi</h2>
        <p>Pemanfaatan teknologi dalam pembelajaran:</p>
        <ul>
          <li>Platform pembelajaran online</li>
          <li>Aplikasi mobile edukasi</li>
          <li>Video pembelajaran interaktif</li>
          <li>Virtual dan augmented reality</li>
        </ul>
        
        <h2>Kesimpulan</h2>
        <p>Pendidik perlu beradaptasi dengan karakteristik Generasi Z dengan menerapkan metode pembelajaran yang relevan dan memanfaatkan teknologi secara optimal.</p>
      `,
      category: "pedagogi",
      author: "Dr. Ahmad Fauzi, M.Pd",
      date: "2024-03-15",
      readTime: "5 min read",
      views: 1250,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
      slug: "metode-pembelajaran-abad-21"
    },
    {
      id: "2",
      title: "Integrasi Teknologi dalam Pembelajaran Modern",
      excerpt: "Pemanfaatan tools digital dan platform interaktif untuk meningkatkan engagement siswa dalam proses belajar mengajar.",
      content: `
        <h2>Pengenalan Teknologi Pendidikan</h2>
        <p>Teknologi telah mengubah landscape pendidikan modern, menawarkan berbagai tools dan platform untuk meningkatkan pengalaman belajar.</p>
        
        <h2>Tools Digital yang Efektif</h2>
        <ul>
          <li>Learning Management Systems (LMS)</li>
          <li>Aplikasi kolaborasi online</li>
          <li>Platform video conference</li>
          <li>Tools assessment digital</li>
        </ul>
        
        <h2>Strategi Implementasi</h2>
        <p>Langkah-langkah untuk mengintegrasikan teknologi:</p>
        <ol>
          <li>Identifikasi kebutuhan pembelajaran</li>
          <li>Pilih tools yang sesuai</li>
          <li>Training untuk guru dan siswa</li>
          <li>Evaluasi dan perbaikan berkelanjutan</li>
        </ol>
      `,
      category: "teknologi",
      author: "Siti Aminah, M.Kom",
      date: "2024-03-10",
      readTime: "4 min read",
      views: 890,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      slug: "integrasi-teknologi-pembelajaran"
    }
  ];

  // Format date untuk display dengan useCallback
  const formatDateForDisplay = useCallback((dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    try {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  }, []);

  // Format views dengan useCallback
  const formatViews = useCallback((views) => {
    if (!views) return '0';
    const viewsNum = typeof views === 'number' ? views : parseInt(views) || 0;
    if (viewsNum >= 1000) {
      return `${(viewsNum / 1000).toFixed(1)}K`;
    }
    return viewsNum.toString();
  }, []);

  // Get image URL dengan useCallback
  const getImageUrl = useCallback((imageData) => {
    if (!imageData) return FALLBACK_IMAGE;
    
    if (typeof imageData === 'string') {
      return imageData.startsWith('http') ? imageData : `${STRAPI_URL}${imageData}`;
    }
    
    if (imageData.url) return imageData.url;
    if (imageData.data?.url) return imageData.data.url;
    
    return FALLBACK_IMAGE;
  }, [STRAPI_URL, FALLBACK_IMAGE]);

  // Optimize image dengan useCallback
  const optimizeImage = useCallback((url, width = 800) => {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/w_${width},c_fill,f_auto,q_auto:good/`);
  }, []);

  // Handle image error dengan useCallback
  const handleImageError = useCallback((e) => {
    e.target.src = FALLBACK_IMAGE;
  }, [FALLBACK_IMAGE]);

  // Fetch article detail dari Strapi
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching article detail from Strapi...');
        // Coba fetch dari Strapi
        const response = await fetch(
          `${STRAPI_URL}/api/edukasis?filters[slug][$eq]=${slug}&populate=*`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data?.data && data.data.length > 0) {
          const item = data.data[0];
          const attributes = item.attributes || item;
          
          // Format data sama persis dengan Edukasi.jsx
          const formattedArticle = {
            id: item.id?.toString() || Math.random().toString(),
            title: attributes.title || attributes.judul || 'Judul Tidak Tersedia',
            excerpt: attributes.excerpt || attributes.deskripsi || 'Deskripsi tidak tersedia...',
            content: attributes.content || attributes.isi || '<p>Konten artikel sedang dalam proses penulisan...</p>',
            category: (attributes.category || attributes.kategori || 'umum').toLowerCase(),
            author: attributes.author || attributes.penulis || 'Admin',
            date: attributes.date || attributes.tanggal || attributes.publishedAt || attributes.createdAt,
            readTime: attributes.readTime || attributes.waktuBaca || '5 min read',
            views: attributes.views || attributes.dilihat || 0,
            image: getImageUrl(attributes.image),
            slug: attributes.slug || `artikel-${item.id}`
          };
          
          setArticle(formattedArticle);
          
          // Fetch related articles
          try {
            const relatedResponse = await fetch(
              `${STRAPI_URL}/api/edukasis?filters[category][$eq]=${formattedArticle.category}&filters[slug][$ne]=${slug}&populate=*&pagination[limit]=3&sort[0]=createdAt:desc`
            );
            
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              if (relatedData?.data && Array.isArray(relatedData.data)) {
                const related = relatedData.data.map(relatedItem => {
                  const relatedAttr = relatedItem.attributes || relatedItem;
                  return {
                    id: relatedItem.id?.toString() || Math.random().toString(),
                    title: relatedAttr.title || relatedAttr.judul || 'Judul Tidak Tersedia',
                    excerpt: relatedAttr.excerpt || relatedAttr.deskripsi || 'Deskripsi tidak tersedia...',
                    image: getImageUrl(relatedAttr.image),
                    slug: relatedAttr.slug || `artikel-${relatedItem.id}`,
                    category: (relatedAttr.category || relatedAttr.kategori || 'umum').toLowerCase()
                  };
                });
                setRelatedArticles(related);
              }
            }
          } catch (relatedError) {
            console.error('❌ Error fetching related articles:', relatedError);
            // Fallback ke sample data untuk related articles
            setRelatedArticles(
              sampleArticles
                .filter(art => art.id !== formattedArticle.id && art.category === formattedArticle.category)
                .slice(0, 3)
                .map(art => ({
                  id: art.id,
                  title: art.title,
                  excerpt: art.excerpt,
                  image: art.image,
                  slug: art.slug,
                  category: art.category
                }))
            );
          }
          
        } else {
          // Jika tidak ditemukan di Strapi, cari di sample data
          const foundArticle = sampleArticles.find(art => art.slug === slug);
          if (foundArticle) {
            setArticle(foundArticle);
            setRelatedArticles(
              sampleArticles
                .filter(art => art.id !== foundArticle.id && art.category === foundArticle.category)
                .slice(0, 3)
            );
          } else {
            throw new Error('Artikel tidak ditemukan');
          }
        }
        
      } catch (err) {
        console.error('❌ Error fetching article:', err);
        setError(err.message);
        
        // Fallback ke sample data
        const foundArticle = sampleArticles.find(art => art.slug === slug);
        if (foundArticle) {
          setArticle(foundArticle);
          setRelatedArticles(
            sampleArticles
              .filter(art => art.id !== foundArticle.id && art.category === foundArticle.category)
              .slice(0, 3)
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticleDetail();
    }
  }, [slug, getImageUrl]);

  // Loading Component
  const LoadingSpinner = () => (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Memuat artikel...</p>
      </div>
    </div>
  );

  // Error Alert Component
  const ErrorAlert = ({ error }) => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-8 rounded">
      <div className="flex">
        <div className="flex-shrink-0">⚠️</div>
        <div className="ml-3">
          <p className="text-yellow-700 text-sm">
            {error} - Menampilkan data contoh untuk demonstrasi.
          </p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Artikel Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/edukasi"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Kembali ke Edukasi
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-blue-200 mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/edukasi" className="hover:text-white transition-colors">Edukasi</Link>
              <span>/</span>
              <span className="text-white">{article.title}</span>
            </nav>

            {/* Article Header */}
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
                <span className="text-yellow-400 font-semibold text-sm">
                  {categories.find(cat => cat.id === article.category)?.icon} {categories.find(cat => cat.id === article.category)?.name}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                {article.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {article.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-semibold">{article.author}</span>
                </div>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDateForDisplay(article.date)}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {formatViews(article.views)} views
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Error Alert */}
      {error && <ErrorAlert error={error} />}

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                {/* Featured Image */}
                <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <img 
                    src={optimizeImage(article.image, 1200)} 
                    alt={article.title}
                    className="w-full h-64 md:h-96 object-cover"
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Article Content */}
                <div 
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  className="text-gray-700 leading-relaxed"
                />
                
                {/* Article Footer */}
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200">
                  <span className="text-gray-500 font-medium">Tags:</span>
                  {article.category && (
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      #{article.category}
                    </span>
                  )}
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    #pendidikan
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                    #edukasi
                  </span>
                </div>
              </motion.article>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-24 space-y-8"
              >
                {/* Related Articles */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="text-blue-500 mr-2">📚</span>
                    Artikel Terkait
                  </h3>
                  
                  <div className="space-y-4">
                    {relatedArticles.length > 0 ? (
                      relatedArticles.map((relatedArticle) => (
                        <Link
                          key={relatedArticle.id}
                          to={`/edukasi/${relatedArticle.slug}`}
                          className="block group"
                        >
                          <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={optimizeImage(relatedArticle.image, 100)} 
                                alt={relatedArticle.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={handleImageError}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-tight">
                                {relatedArticle.title}
                              </h4>
                              <p className="text-gray-600 text-xs line-clamp-2 mt-1">
                                {relatedArticle.excerpt}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-4">
                        Belum ada artikel terkait
                      </p>
                    )}
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl mx-auto mb-3">
                      ✉️
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Newsletter Edukasi</h4>
                    <p className="text-gray-600 text-sm">
                      Dapatkan artikel terbaru seputar pendidikan langsung di email Anda
                    </p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email Anda"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      Berlangganan
                    </motion.button>
                  </div>
                </div>

                {/* Back to Edukasi */}
                <Link
                  to="/edukasi"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors text-center shadow-lg"
                >
                  ← Kembali ke Semua Artikel
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EdukasiDetail;