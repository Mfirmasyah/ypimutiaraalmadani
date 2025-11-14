import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Config untuk Strapi Cloud
const STRAPI_CONFIG = {
  URL: 'https://incredible-sparkle-f34960cd1e.strapiapp.com',
  CLOUDINARY_BASE_URL: 'https://res.cloudinary.com'
};

const ParentingDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Sample data fallback
  const sampleArticles = [
    {
      id: 1,
      title: "Panduan Pola Asuh Anak di Era Digital",
      excerpt: "Tips dan strategi untuk orang tua dalam menghadapi tantangan parenting di era teknologi modern. Pelajari cara membatasi screen time dan memilih konten yang tepat untuk anak.",
      content: `
        <h2>Pengantar: Tantangan Parenting di Era Digital</h2>
        <p>Di era digital seperti sekarang, orang tua menghadapi tantangan baru dalam mengasuh anak. Teknologi yang seharusnya memudahkan justru seringkali menjadi sumber kekhawatiran.</p>
        
        <h3>Dampak Positif dan Negatif Teknologi</h3>
        <p><strong>Dampak Positif:</strong></p>
        <ul>
          <li>Akses informasi edukasi yang luas</li>
          <li>Platform belajar interaktif</li>
          <li>Kemampuan belajar mandiri</li>
          <li>Pengembangan keterampilan digital</li>
        </ul>
        
        <p><strong>Dampak Negatif:</strong></p>
        <ul>
          <li>Kecanduan gadget dan screen time berlebihan</li>
          <li>Paparan konten tidak pantas</li>
          <li>Gangguan tidur dan kesehatan</li>
          <li>Berkurangnya interaksi sosial langsung</li>
        </ul>
        
        <h3>Strategi Membatasi Screen Time</h3>
        <ol>
          <li><strong>Buat Aturan yang Jelas:</strong> Tentukan waktu penggunaan gadget setiap hari</li>
          <li><strong>Zona Bebas Gadget:</strong> Area tertentu di rumah seperti kamar tidur dan meja makan</li>
          <li><strong>Quality Time:</strong> Sediakan waktu berkualitas tanpa gangguan gadget</li>
          <li><strong>Lead by Example:</strong> Orang tua juga harus membatasi penggunaan gadget</li>
        </ol>
        
        <h3>Memilih Konten yang Tepat</h3>
        <p>Beberapa kriteria konten yang baik untuk anak:</p>
        <ul>
          <li>Konten edukasi dan mendidik</li>
          <li>Usia sesuai dengan perkembangan anak</li>
          <li>Mengandung nilai-nilai positif</li>
          <li>Interaktif dan engaging</li>
        </ul>
        
        <h3>Tips Praktis untuk Orang Tua</h3>
        <p>Berikut beberapa tips yang bisa langsung diterapkan:</p>
        <ul>
          <li>Gunakan parental control pada perangkat</li>
          <li>Review aplikasi dan game sebelum diinstall</li>
          <li>Ajak diskusi tentang konten yang dikonsumsi</li>
          <li>Berikan alternatif aktivitas offline yang menarik</li>
        </ul>
        
        <h3>Kesimpulan</h3>
        <p>Teknologi adalah alat, bagaimana kita menggunakannya yang menentukan dampaknya. Dengan pendekatan yang tepat, orang tua bisa memanfaatkan teknologi untuk mendukung tumbuh kembang anak secara optimal.</p>
      `,
      category: "pola-asuh",
      author: "Dr. Siti Aisyah, M.Psi",
      date: "15 Maret 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80",
      views: 1250,
      tags: ["parenting", "digital", "anak", "teknologi"],
      slug: "panduan-pola-asuh-digital",
      isFeatured: true
    },
    {
      id: 2,
      title: "Membangun Komunikasi Efektif dengan Remaja",
      excerpt: "Teknik komunikasi yang tepat untuk menjaga hubungan harmonis dengan anak remaja.",
      content: "Konten lengkap artikel tentang komunikasi remaja...",
      category: "komunikasi",
      author: "Ahmad Fauzi, S.Psi",
      date: "10 Maret 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
      views: 890,
      tags: ["komunikasi", "remaja", "keluarga", "psikologi"],
      slug: "komunikasi-efektif-remaja",
      isFeatured: false
    }
  ];

  // Kategori
  const categories = [
    { id: 'all', name: 'Semua Artikel' },
    { id: 'pola-asuh', name: 'Pola Asuh' },
    { id: 'teknologi', name: 'Teknologi' },
    { id: 'komunikasi', name: 'Komunikasi' },
    { id: 'kesehatan', name: 'Kesehatan' },
    { id: 'karakter', name: 'Karakter' },
    { id: 'pendidikan', name: 'Pendidikan' }
  ];

  // Fungsi untuk membersihkan URL gambar
  const cleanImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
    
    // Handle Strapi Cloud URLs
    if (url.startsWith('/') && !url.includes('strapiapp.com')) {
      return `https://incredible-sparkle-f34960cd1e.strapiapp.com${url}`;
    }
    
    // Remove duplicate localhost:1337
    if (url.includes('http://localhost:1337http')) {
      url = url.replace('http://localhost:1337', '');
    }
    if (url.includes('http://localhost:1337https')) {
      url = url.replace('http://localhost:1337', '');
    }
    
    // Remove duplicate Cloudinary URLs
    if (url.includes('https://res.cloudinary.comhttps://res.cloudinary.com')) {
      url = url.replace('https://res.cloudinary.com', '');
    }
    
    return url;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  };

  // Format views
  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  // Get image URL untuk Strapi v4
  const getImageUrl = (imageData) => {
    if (!imageData) return 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
    
    let imageUrl = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
    
    if (imageData) {
      const img = imageData;
      
      // Strapi v4 structure
      if (img.data?.attributes?.url) {
        const url = img.data.attributes.url;
        imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
      }
      // Alternative Strapi v4 structure
      else if (img.attributes?.url) {
        const url = img.attributes.url;
        imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
      }
      // Fallback structure
      else if (img.url) {
        const url = img.url;
        imageUrl = url.startsWith('http') ? url : `${STRAPI_CONFIG.URL}${url}`;
      }
      
      // Cleanup: Remove any duplicate base URLs
      imageUrl = cleanImageUrl(imageUrl);
    }
    
    return imageUrl;
  };

  // Optimize image
  const optimizeImage = (url, width = 800) => {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/w_${width},c_fill,f_auto,q_auto:good/`);
  };

  // Fetch article detail dari Strapi Cloud
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Coba fetch dari Strapi Cloud
        const response = await fetch(
          `${STRAPI_CONFIG.URL}/api/parentings?filters[slug][$eq]=${slug}&populate=*`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data?.data && data.data.length > 0) {
          const item = data.data[0];
          const articleData = item.attributes || item;
          
          // Format data
          const formattedArticle = {
            id: item.id,
            title: articleData.title,
            excerpt: articleData.excerpt || 'Deskripsi tidak tersedia...',
            content: articleData.content || '<p>Konten artikel sedang dalam proses penulisan...</p>',
            category: articleData.category || 'pola-asuh',
            author: articleData.author || 'Admin',
            date: formatDate(articleData.date || articleData.publishedAt),
            readTime: articleData.readTime || '5 min read',
            image: getImageUrl(articleData.image),
            views: formatViews(articleData.views || 0),
            tags: Array.isArray(articleData.tags) ? articleData.tags : 
                  (typeof articleData.tags === 'string' ? JSON.parse(articleData.tags) : []),
            slug: articleData.slug || `parenting-${item.id}`,
            isFeatured: articleData.isFeatured || false
          };
          
          setArticle(formattedArticle);
          
          // Fetch related articles
          const relatedResponse = await fetch(
            `${STRAPI_CONFIG.URL}/api/parentings?filters[category][$eq]=${formattedArticle.category}&filters[slug][$ne]=${slug}&populate=*&pagination[limit]=3&sort[0]=date:desc`
          );
          
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            
            if (relatedData?.data) {
              const related = relatedData.data.map(relatedItem => {
                const relatedAttr = relatedItem.attributes || relatedItem;
                return {
                  id: relatedItem.id,
                  title: relatedAttr.title,
                  excerpt: relatedAttr.excerpt,
                  image: getImageUrl(relatedAttr.image),
                  slug: relatedAttr.slug,
                  category: relatedAttr.category,
                  author: relatedAttr.author,
                  date: formatDate(relatedAttr.date || relatedAttr.publishedAt)
                };
              });
              setRelatedArticles(related);
            }
          }
          
        } else {
          // Jika tidak ditemukan di Strapi, cari di sample data
          const foundArticle = sampleArticles.find(art => art.slug === slug);
          if (foundArticle) {
            setArticle(foundArticle);
            setRelatedArticles(
              sampleArticles.filter(art => art.id !== foundArticle.id && art.category === foundArticle.category).slice(0, 3)
            );
          } else {
            throw new Error('Artikel tidak ditemukan');
          }
        }
        
      } catch (err) {
        setError(err.message);
        
        // Fallback ke sample data
        const foundArticle = sampleArticles.find(art => art.slug === slug);
        if (foundArticle) {
          setArticle(foundArticle);
          setRelatedArticles(
            sampleArticles.filter(art => art.id !== foundArticle.id && art.category === foundArticle.category).slice(0, 3)
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticleDetail();
    }
  }, [slug]);

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat artikel parenting...</p>
        </div>
      </div>
    );
  }

  if (error && !article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Artikel Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/parenting"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Kembali ke Parenting
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
              <Link to="/parenting" className="hover:text-white transition-colors">Parenting</Link>
              <span>/</span>
              <span className="text-white">{article.title}</span>
            </nav>

            {/* Article Header */}
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
                <span className="text-yellow-400 font-semibold text-sm">
                  {categories.find(cat => cat.id === article.category)?.name || article.category}
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {article.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-semibold">{article.author}</span>
                </div>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {article.date}
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
                  {article.views} views
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
                  {article.tags && article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
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
                          to={`/parenting/${relatedArticle.slug}`}
                          className="block group"
                        >
                          <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={optimizeImage(relatedArticle.image, 100)} 
                                alt={relatedArticle.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={handleImageError}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-tight">
                                {relatedArticle.title}
                              </h4>
                              <p className="text-gray-600 text-xs line-clamp-2 mt-1">
                                {relatedArticle.excerpt}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <span>{relatedArticle.author}</span>
                                <span className="mx-2">•</span>
                                <span>{relatedArticle.date}</span>
                              </div>
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
                    <h4 className="font-bold text-gray-800 mb-2">Parenting Newsletter</h4>
                    <p className="text-gray-600 text-sm">
                      Dapatkan tips parenting terbaru langsung di email Anda
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

                {/* Expert Tips */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-gray-800">Tips Parenting</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Beri pujian pada usaha, bukan hasil",
                      "Jadilah pendengar yang aktif untuk anak",
                      "Konsisten dalam menerapkan aturan",
                      "Berikan teladan yang baik",
                      "Luangkan waktu berkualitas setiap hari"
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-orange-500 mr-3 mt-1 text-lg">💡</span>
                        <p className="text-gray-700 text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Back to Parenting */}
                <Link
                  to="/parenting"
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors text-center shadow-lg"
                >
                  ← Kembali ke Semua Artikel
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Butuh Konsultasi Parenting?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
              Tim ahli kami siap membantu Anda dalam menghadapi tantangan parenting dengan pendekatan Islami
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Hubungi Ahli
              </Link>
              <button className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm">
                Buat Janji Konsultasi
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ParentingDetail;