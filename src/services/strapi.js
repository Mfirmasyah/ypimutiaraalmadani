// Gunakan environment variables yang sesuai dengan bundler Anda
const STRAPI_URL = import.meta.env?.VITE_STRAPI_URL || 
                  'https://incredible-sparkle-f34960cd1e.strapiapp.com';

console.log('Strapi URL:', STRAPI_URL);

export const strapiService = {
  // ===== NEWS SERVICE =====
  async getNews(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'sort': 'date:desc',
        ...params
      }).toString();

      console.log('Fetching news from:', `${STRAPI_URL}/api/beritas?${queryParams}`);
      
      const response = await fetch(`${STRAPI_URL}/api/beritas?${queryParams}`);
      
      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('News data received:', data);
      return this.transformNewsData(data.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback to sample data
      const sampleData = this.getSampleNews();
      console.log('Using sample news data:', sampleData);
      return sampleData;
    }
  },

  // ===== GALLERY SERVICE =====
  async getGallery(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'sort': 'date:desc',
        ...params
      }).toString();

      const response = await fetch(`${STRAPI_URL}/api/galleries?${queryParams}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return this.transformGalleryData(data.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return this.getSampleGallery();
    }
  },

  // ===== EDUKASI SERVICE ===== (DULU ARTIKELS)
  async getEdukasi(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'sort': 'date:desc',
        ...params
      }).toString();

      const response = await fetch(`${STRAPI_URL}/api/edukasis?${queryParams}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return this.transformEdukasiData(data.data);
    } catch (error) {
      console.error('Error fetching edukasi:', error);
      return this.getSampleEdukasi();
    }
  },

  // ===== ACHIEVEMENTS SERVICE =====
  async getAchievements(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'sort': 'date:desc',
        ...params
      }).toString();

      const response = await fetch(`${STRAPI_URL}/api/prestasis?${queryParams}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return this.transformAchievementsData(data.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return this.getSampleAchievements();
    }
  },

  // ===== PARENTING SERVICE =====
  async getParenting(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'sort': 'date:desc',
        ...params
      }).toString();

      const response = await fetch(`${STRAPI_URL}/api/parentings?${queryParams}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return this.transformParentingData(data.data);
    } catch (error) {
      console.error('Error fetching parenting articles:', error);
      return this.getSampleParenting();
    }
  },

  // ===== SPMB PROGRAMS SERVICE =====
  async getPrograms(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'sort': 'jenjang',
        ...params
      }).toString();

      const response = await fetch(`${STRAPI_URL}/api/programs?${queryParams}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return this.transformProgramsData(data.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      return this.getSamplePrograms();
    }
  },

  // ===== SPMB TIMELINE SERVICE =====
  async getTimeline(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'sort': 'order:asc',
        ...params
      }).toString();

      const response = await fetch(`${STRAPI_URL}/api/timelines?${queryParams}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return this.transformTimelineData(data.data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      return this.getSampleTimeline();
    }
  },

  // ===== SINGLE ITEM SERVICES =====
  async getNewsBySlug(slug) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'filters[slug][$eq]': slug
      }).toString();

      console.log('Fetching news by slug:', `${STRAPI_URL}/api/beritas?${queryParams}`);
      
      const response = await fetch(`${STRAPI_URL}/api/beritas?${queryParams}`);
      
      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('News by slug data received:', data);
      
      if (data.data && data.data.length > 0) {
        return this.transformSingleNewsData(data.data[0]);
      }
      return null;
    } catch (error) {
      console.error('Error fetching news by slug:', error);
      // Fallback to sample data
      const sampleNews = this.getSampleNews();
      return sampleNews.find(news => news.slug === slug) || null;
    }
  },

  async getEdukasiBySlug(slug) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'filters[slug][$eq]': slug
      }).toString();

      const response = await fetch(`${STRAPI_URL}/api/edukasis?${queryParams}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        return this.transformSingleEdukasiData(data.data[0]);
      }
      return null;
    } catch (error) {
      console.error('Error fetching edukasi by slug:', error);
      const sampleEdukasi = this.getSampleEdukasi();
      return sampleEdukasi.find(edukasi => edukasi.slug === slug) || null;
    }
  },

  async getParentingBySlug(slug) {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'filters[slug][$eq]': slug
      }).toString();

      const response = await fetch(`${STRAPI_URL}/api/parentings?${queryParams}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        return this.transformSingleParentingData(data.data[0]);
      }
      return null;
    } catch (error) {
      console.error('Error fetching parenting article by slug:', error);
      const sampleParenting = this.getSampleParenting();
      return sampleParenting.find(parenting => parenting.slug === slug) || null;
    }
  },

  // ===== TRANSFORM METHODS =====
  transformNewsData(strapiData) {
    if (!strapiData || !Array.isArray(strapiData)) {
      console.log('No valid news data, using sample data');
      return this.getSampleNews();
    }
    return strapiData.map(item => this.transformSingleNewsData(item)).filter(Boolean);
  },

  transformSingleNewsData(item) {
    if (!item || !item.attributes) {
      console.log('Invalid news item:', item);
      return null;
    }

    const attributes = item.attributes;
    const imageUrl = this.getImageUrl(attributes.image);
    
    return {
      id: item.id,
      title: attributes.title,
      excerpt: attributes.excerpt,
      content: attributes.content,
      category: attributes.category,
      author: attributes.author,
      date: this.formatDate(attributes.date),
      readTime: attributes.readTime,
      image: imageUrl,
      isImportant: attributes.isImportant,
      views: attributes.views || 0,
      tags: attributes.tags || [],
      slug: attributes.slug,
      publishedAt: attributes.publishedAt
    };
  },

  transformEdukasiData(strapiData) {
    if (!strapiData || !Array.isArray(strapiData)) {
      return this.getSampleEdukasi();
    }
    return strapiData.map(item => {
      if (!item || !item.attributes) return null;
      
      const attributes = item.attributes;
      const imageUrl = this.getImageUrl(attributes.image);
      
      return {
        id: item.id,
        title: attributes.title,
        excerpt: attributes.excerpt,
        content: attributes.content,
        category: attributes.category,
        author: attributes.author,
        date: this.formatDate(attributes.date),
        readTime: attributes.readTime,
        image: imageUrl,
        views: attributes.views || 0,
        slug: attributes.slug
      };
    }).filter(Boolean);
  },

  transformSingleEdukasiData(item) {
    if (!item || !item.attributes) {
      console.log('Invalid edukasi item:', item);
      return null;
    }

    const attributes = item.attributes;
    const imageUrl = this.getImageUrl(attributes.image);
    
    return {
      id: item.id,
      title: attributes.title,
      excerpt: attributes.excerpt,
      content: attributes.content,
      category: attributes.category,
      author: attributes.author,
      date: this.formatDate(attributes.date),
      readTime: attributes.readTime,
      image: imageUrl,
      views: attributes.views || 0,
      slug: attributes.slug
    };
  },

  transformGalleryData(strapiData) {
    if (!strapiData || !Array.isArray(strapiData)) {
      return this.getSampleGallery();
    }
    return strapiData.map(item => {
      if (!item || !item.attributes) return null;
      
      const attributes = item.attributes;
      const imageUrl = this.getImageUrl(attributes.image);
      
      return {
        id: item.id,
        title: attributes.title,
        description: attributes.description,
        category: attributes.category,
        image: imageUrl,
        date: this.formatDate(attributes.date),
        views: attributes.views || 0,
        likes: attributes.likes || 0
      };
    }).filter(Boolean);
  },

  transformAchievementsData(strapiData) {
    if (!strapiData || !Array.isArray(strapiData)) {
      return this.getSampleAchievements();
    }
    return strapiData.map(item => {
      if (!item || !item.attributes) return null;
      
      const attributes = item.attributes;
      const imageUrl = this.getImageUrl(attributes.image);
      
      return {
        id: item.id,
        title: attributes.title,
        description: attributes.description,
        category: attributes.category,
        level: attributes.level,
        image: imageUrl,
        date: this.formatDate(attributes.date),
        participants: attributes.participants || ''
      };
    }).filter(Boolean);
  },

  transformParentingData(strapiData) {
    if (!strapiData || !Array.isArray(strapiData)) {
      return this.getSampleParenting();
    }
    return strapiData.map(item => {
      if (!item || !item.attributes) return null;
      
      const attributes = item.attributes;
      const imageUrl = this.getImageUrl(attributes.image);
      
      return {
        id: item.id,
        title: attributes.title,
        excerpt: attributes.excerpt,
        content: attributes.content,
        category: attributes.category,
        author: attributes.author,
        date: this.formatDate(attributes.date),
        readTime: attributes.readTime,
        image: imageUrl,
        views: attributes.views || 0,
        tags: attributes.tags || [],
        slug: attributes.slug,
        isFeatured: attributes.isFeatured || false
      };
    }).filter(Boolean);
  },

  transformSingleParentingData(item) {
    if (!item || !item.attributes) {
      console.log('Invalid parenting item:', item);
      return null;
    }

    const attributes = item.attributes;
    const imageUrl = this.getImageUrl(attributes.image);
    
    return {
      id: item.id,
      title: attributes.title,
      excerpt: attributes.excerpt,
      content: attributes.content,
      category: attributes.category,
      author: attributes.author,
      date: this.formatDate(attributes.date),
      readTime: attributes.readTime,
      image: imageUrl,
      views: attributes.views || 0,
      tags: attributes.tags || [],
      slug: attributes.slug,
      isFeatured: attributes.isFeatured || false
    };
  },

  transformProgramsData(strapiData) {
    if (!strapiData || !Array.isArray(strapiData)) {
      return this.getSamplePrograms();
    }
    return strapiData.map(item => {
      if (!item || !item.attributes) return null;
      
      const attributes = item.attributes;
      const imageUrl = this.getImageUrl(attributes.image);
      
      return {
        id: item.id,
        title: attributes.title,
        description: attributes.description,
        jenjang: attributes.jenjang,
        ageRange: attributes.ageRange,
        quota: attributes.quota,
        fees: attributes.fees,
        features: attributes.features || [],
        image: imageUrl,
        isActive: attributes.isActive || true
      };
    }).filter(Boolean);
  },

  transformTimelineData(strapiData) {
    if (!strapiData || !Array.isArray(strapiData)) {
      return this.getSampleTimeline();
    }
    return strapiData.map(item => {
      if (!item || !item.attributes) return null;
      
      const attributes = item.attributes;
      
      return {
        id: item.id,
        phase: attributes.phase,
        dateRange: attributes.dateRange,
        description: attributes.description,
        status: attributes.status,
        order: attributes.order
      };
    }).filter(Boolean);
  },

  // ===== HELPER METHODS =====
  getImageUrl(imageData) {
    if (!imageData?.data?.attributes?.url) {
      console.log('No image data found');
      return null;
    }
    
    const url = imageData.data.attributes.url;
    const fullUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    console.log('Image URL:', fullUrl);
    return fullUrl;
  },

  formatDate(dateString) {
    if (!dateString) return 'Tanggal tidak tersedia';
    
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Tanggal tidak valid';
    }
  },

  // ===== SAMPLE DATA (Fallback) =====
  getSampleNews() {
    console.log('Using sample news data');
    return [
      {
        id: 1,
        title: "Penerimaan Peserta Didik Baru Tahun Ajaran 2024/2025",
        excerpt: "Pendaftaran PPDB dibuka mulai 1 Januari 2024. Kuota terbatas untuk semua jenjang pendidikan dengan program beasiswa prestasi...",
        content: "Sekolah Kita membuka pendaftaran peserta didik baru untuk tahun ajaran 2024/2025...",
        category: "pengumuman",
        author: "Admin Sekolah",
        date: "20 Maret 2024",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isImportant: true,
        views: 2456,
        tags: ["ppdb", "pendaftaran", "siswa-baru"],
        slug: "ppdb-2024"
      }
    ];
  },

  getSampleGallery() {
    return [
      {
        id: 1,
        title: "Kegiatan Belajar Mengajar",
        category: "akademik",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        date: "18 Oktober 2024",
        description: "Siswa-siswi aktif dalam proses pembelajaran di kelas",
        views: 1234,
        likes: 89
      }
    ];
  },

  getSampleEdukasi() {
    return [
      {
        id: 1,
        title: "Metode Pembelajaran Abad 21 untuk Generasi Z",
        category: "pedagogi",
        author: "Dr. Ahmad Fauzi",
        date: "15 Maret 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
        excerpt: "Bagaimana menyesuaikan metode pembelajaran dengan karakteristik generasi digital native...",
        content: "Artikel lengkap tentang metode pembelajaran...",
        views: 1200,
        slug: "metode-pembelajaran-abad-21"
      }
    ];
  },

  getSampleAchievements() {
    return [
      {
        id: 1,
        title: "Juara 1 Lomba Cerdas Cermat Islami",
        description: "Tingkat Nasional Tahun 2024",
        category: "akademik",
        level: "nasional",
        image: "https://images.unsplash.com/photo-1600195077075-0e8a4f3a4c33?auto=format&fit=crop&w=800&q=80",
        date: "15 Maret 2024",
        participants: "Tim Siswa SMP"
      }
    ];
  },

  getSampleParenting() {
    return [
      {
        id: 1,
        title: "5 Cara Mendidik Anak dengan Pola Asuh Islami",
        excerpt: "Bagaimana menerapkan nilai-nilai Islam dalam pola asuh sehari-hari untuk membentuk karakter anak yang shalih dan shalihah...",
        content: "Artikel lengkap tentang pola asuh islami...",
        category: "pola-asuh",
        author: "Dr. Siti Aisyah, M.Psi",
        date: "15 Maret 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80",
        views: 1247,
        tags: ["parenting", "islami", "karakter"],
        isFeatured: true,
        slug: "pola-asuh-islami"
      }
    ];
  },

  getSamplePrograms() {
    return [
      {
        id: 1,
        title: "TK Islam Mutiara Al-Madani",
        description: "Pendidikan anak usia dini dengan pendekatan belajar sambil bermain",
        jenjang: "tk",
        ageRange: "5-6 tahun",
        quota: "30 siswa",
        fees: "Rp 4.500.000",
        features: ["Guru berkualitas", "Fasilitas lengkap", "Kurikulum terpadu"],
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
        isActive: true
      }
    ];
  },

  getSampleTimeline() {
    return [
      {
        id: 1,
        phase: "Pendaftaran Online",
        dateRange: "1 Jan - 28 Feb 2024",
        description: "Pendaftaran dilakukan secara online melalui website",
        status: "active",
        order: 1
      }
    ];
  }
};