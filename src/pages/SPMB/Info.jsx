import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const Info = () => {
  const [activeTab, setActiveTab] = useState('tk');
  const [heroRef, heroVisible] = useScrollAnimation(0.3);
  const [infoRef, infoVisible] = useScrollAnimation(0.2);
  const [requirementsRef, requirementsVisible] = useScrollAnimation(0.2);
  const [timelineRef, timelineVisible] = useScrollAnimation(0.2);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FIX: Gunakan URL langsung untuk development
  const API_URL = 'https://incredible-sparkle-f34960cd1e.strapiapp.com';

  // Multiple background images untuk PPDB
  const backgroundImages = [
    '/assets/background2.jpg',
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

  // Helper untuk mendapatkan nama bulan Indonesia
  const getMonthName = (monthIndex) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[monthIndex];
  };

  // ✅ PERBAIKAN: Function untuk parse tanggal Indonesia dengan benar
  const parseIndonesianDate = (dateString) => {
    try {
      console.log('🔍 Parsing date string:', dateString);
      
      // Jika hanya angka, ini kemungkinan hanya tanggal saja (dalam format range)
      const trimmedStr = dateString.trim();
      if (/^\d{1,2}$/.test(trimmedStr)) {
        console.log('⚠️  Only day number detected, using current month/year as fallback');
        const today = new Date();
        const day = parseInt(trimmedStr);
        // Buat tanggal dengan hari ini, bulan dan tahun saat ini
        const date = new Date(today.getFullYear(), today.getMonth(), day, 0, 0, 0, 0);
        console.log('✅ Created date from day only:', date.toLocaleDateString('id-ID'));
        return date;
      }
      
      // Mapping bulan Indonesia ke angka bulan (0-11)
      const monthMap = {
        'januari': 0, 'jan': 0,
        'februari': 1, 'feb': 1,
        'maret': 2, 'mar': 2,
        'april': 3, 'apr': 3,
        'mei': 4, 'may': 4,
        'juni': 5, 'jun': 5,
        'juli': 6, 'jul': 6,
        'agustus': 7, 'agu': 7, 'aug': 7,
        'september': 8, 'sep': 8,
        'oktober': 9, 'okt': 9, 'oct': 9,
        'november': 10, 'nov': 10,
        'desember': 11, 'des': 11, 'dec': 11
      };

      // Hilangkan spasi berlebih dan lowercase
      const cleanStr = dateString.toLowerCase().trim();
      
      // Cari tahun
      const yearMatch = cleanStr.match(/(\d{4})/);
      let year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();
      
      console.log('🔍 Found year:', year);
      
      // Cari bulan
      let month = -1;
      let monthNameFound = '';
      for (const [monthName, monthNum] of Object.entries(monthMap)) {
        if (cleanStr.includes(monthName)) {
          month = monthNum;
          monthNameFound = monthName;
          break;
        }
      }
      
      // Jika tidak menemukan bulan, coba gunakan bulan saat ini
      if (month === -1) {
        console.log('⚠️  No month found, using current month');
        month = new Date().getMonth();
        monthNameFound = 'current month';
      }
      
      console.log('🔍 Found month:', month, '(', monthNameFound, ')');
      
      // Cari tanggal (angka 1-2 digit) - cari angka pertama
      let day = 1;
      const dayMatch = cleanStr.match(/(\d{1,2})/);
      if (dayMatch) {
        day = parseInt(dayMatch[1]);
      }
      
      console.log('🔍 Found day:', day);
      
      // Validasi
      if (day < 1 || day > 31) {
        console.warn('❌ Invalid day:', day, 'in date string:', dateString);
        return new Date(NaN);
      }
      
      // Buat date object (set ke jam 00:00:00)
      const date = new Date(year, month, day, 0, 0, 0, 0);
      
      // Validasi hasil parsing
      if (isNaN(date.getTime())) {
        console.warn('❌ Invalid date after parsing:', dateString);
        return new Date(NaN);
      }
      
      console.log('✅ Successfully parsed date:', {
        original: dateString,
        parsed: date.toLocaleDateString('id-ID'),
        year, month, day
      });
      
      return date;
    } catch (error) {
      console.error('❌ Error parsing date:', error);
      return new Date(NaN);
    }
  };

  // ✅ PERBAIKAN: Function untuk extract bulan dan tahun dari string tanggal
  const extractMonthAndYear = (dateString) => {
    const monthMap = {
      'januari': 'Januari', 'jan': 'Januari',
      'februari': 'Februari', 'feb': 'Februari',
      'maret': 'Maret', 'mar': 'Maret',
      'april': 'April', 'apr': 'April',
      'mei': 'Mei', 'may': 'Mei',
      'juni': 'Juni', 'jun': 'Juni',
      'juli': 'Juli', 'jul': 'Juli',
      'agustus': 'Agustus', 'agu': 'Agustus', 'aug': 'Agustus',
      'september': 'September', 'sep': 'September',
      'oktober': 'Oktober', 'okt': 'Oktober', 'oct': 'Oktober',
      'november': 'November', 'nov': 'November',
      'desember': 'Desember', 'des': 'Desember', 'dec': 'Desember'
    };

    const cleanStr = dateString.toLowerCase();
    
    // Cari bulan
    let monthName = '';
    for (const [key, value] of Object.entries(monthMap)) {
      if (cleanStr.includes(key)) {
        monthName = value;
        break;
      }
    }
    
    // Cari tahun
    const yearMatch = cleanStr.match(/(\d{4})/);
    const year = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();
    
    return { monthName, year };
  };

  // ✅ PERBAIKAN TELAH DIPERBAIKI: Function untuk calculate status berdasarkan tanggal
  const calculateTimelineStatus = (dateRange) => {
    const now = new Date();
    
    try {
      // Handle tanggal kosong
      if (!dateRange || dateRange === 'Tanggal belum ditentukan') {
        return 'upcoming';
      }
      
      console.log('🔍 Processing date range:', dateRange);
      
      // PERBAIKAN UTAMA: Handle en dash (–) dengan berbagai kemungkinan separator
      let normalizedRange = dateRange;
      
      // Replace en dash (–) dengan regular dash (-) untuk parsing
      if (dateRange.includes('–')) {
        console.log('🔍 Detected en dash, normalizing...');
        normalizedRange = dateRange.replace(/–/g, '-');
      }
      
      // Juga handle jika ada double dash atau spasi tidak konsisten
      normalizedRange = normalizedRange.replace(/\s+/g, ' ').trim();
      
      console.log('🔍 Normalized date range:', normalizedRange);
      
      // Split dengan berbagai kemungkinan separator
      let parts;
      if (normalizedRange.includes(' - ')) {
        parts = normalizedRange.split(' - ');
      } else if (normalizedRange.includes('-')) {
        parts = normalizedRange.split('-').map(s => s.trim());
      } else {
        console.warn('❌ Cannot parse date range (no separator):', dateRange);
        return 'upcoming';
      }
      
      console.log('🔍 Split parts:', parts);
      
      if (!parts || parts.length < 2) {
        console.warn('❌ Cannot parse date range:', dateRange);
        return 'upcoming';
      }
      
      let [startStr, endStr] = parts.map(s => s.trim());
      
      console.log('🔍 Start:', startStr, 'End:', endStr);
      
      // PERBAIKAN KHUSUS: Jika start hanya angka, ambil bulan dan tahun dari end
      if (/^\d{1,2}$/.test(startStr)) {
        console.log('⚠️  Start only contains day number, extracting month/year from end');
        const { monthName, year } = extractMonthAndYear(endStr);
        
        if (monthName) {
          const originalStart = startStr;
          startStr = `${startStr} ${monthName} ${year}`;
          console.log(`✅ Adjusted start: "${originalStart}" → "${startStr}"`);
        } else {
          console.warn('⚠️  Could not extract month from end string');
        }
      }
      
      // Parse tanggal
      const startDate = parseIndonesianDate(startStr);
      let endDate = parseIndonesianDate(endStr);
      
      // Set endDate ke jam 23:59:59.999
      if (!isNaN(endDate.getTime())) {
        endDate = new Date(endDate);
        endDate.setHours(23, 59, 59, 999);
      }
      
      // Validasi parsing
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.warn('❌ Failed to parse dates:', {
          original: dateRange,
          adjustedStart: startStr,
          endStr,
          startDate,
          endDate
        });
        return 'upcoming';
      }
      
      // Debug logging
      console.log('📅 Date Calculation:', {
        input: dateRange,
        normalized: normalizedRange,
        now: now.toLocaleDateString('id-ID'),
        start: startDate.toLocaleDateString('id-ID'),
        end: endDate.toLocaleDateString('id-ID'),
        nowTime: now.getTime(),
        startTime: startDate.getTime(),
        endTime: endDate.getTime(),
        isPast: now.getTime() > endDate.getTime(),
        isActive: now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime()
      });
      
      // Determine status
      if (now.getTime() > endDate.getTime()) {
        console.log('✅ Status: COMPLETED - Date has passed');
        return 'completed';
      } else if (now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime()) {
        console.log('✅ Status: ACTIVE - Currently within date range');
        return 'active';
      } else {
        console.log('✅ Status: UPCOMING - Future date');
        return 'upcoming';
      }
      
    } catch (error) {
      console.error('❌ Error calculating timeline status:', error);
      return 'upcoming';
    }
  };

  // ✅ PERBAIKAN: Function untuk calculate progress
  const calculateProgress = (dateRange) => {
    const now = new Date();
    
    try {
      if (!dateRange || dateRange === 'Tanggal belum ditentukan') {
        return 0;
      }
      
      // Normalize en dash
      let normalizedRange = dateRange;
      if (dateRange.includes('–')) {
        normalizedRange = dateRange.replace(/–/g, '-');
      }
      
      // Split dengan berbagai kemungkinan separator
      let parts;
      if (normalizedRange.includes(' - ')) {
        parts = normalizedRange.split(' - ');
      } else if (normalizedRange.includes('-')) {
        parts = normalizedRange.split('-').map(s => s.trim());
      } else {
        return 0;
      }
      
      if (parts.length !== 2) return 0;
      
      let [startStr, endStr] = parts.map(s => s.trim());
      
      // PERBAIKAN KHUSUS: Jika start hanya angka, ambil bulan dan tahun dari end
      if (/^\d{1,2}$/.test(startStr)) {
        const { monthName, year } = extractMonthAndYear(endStr);
        if (monthName) {
          startStr = `${startStr} ${monthName} ${year}`;
        }
      }
      
      const startDate = parseIndonesianDate(startStr);
      let endDate = parseIndonesianDate(endStr);
      
      // Set endDate ke jam 23:59:59.999
      if (!isNaN(endDate.getTime())) {
        endDate = new Date(endDate);
        endDate.setHours(23, 59, 59, 999);
      }
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return 0;
      }
      
      // Cek jika sudah lewat atau belum dimulai
      if (now.getTime() > endDate.getTime()) return 100;
      if (now.getTime() < startDate.getTime()) return 0;
      
      // Hitung progress
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsed = now.getTime() - startDate.getTime();
      const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
      
      return Math.round(progress * 10) / 10; // Round to 1 decimal
    } catch (error) {
      console.error('❌ Error calculating progress:', error);
      return 0;
    }
  };

  // Fetch Timeline Data dari Strapi
  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        setLoading(true);
        
        console.log('🚀 Fetching timeline from:', `${API_URL}/api/timelines?sort=order:asc`);
        
        const response = await fetch(`${API_URL}/api/timelines?sort=order:asc`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Full API response:', data);
        
        // Cek berbagai kemungkinan struktur data
        let items = [];
        
        if (data.data && Array.isArray(data.data)) {
          items = data.data;
          console.log('✅ Using data.data structure');
        } else if (Array.isArray(data)) {
          items = data;
          console.log('✅ Using direct array structure');
        } else {
          throw new Error('Unknown data structure from API');
        }
        
        console.log('📋 Items found:', items.length);
        
        // Transform data
        const transformedData = items.map((item, index) => {
          // Cek berbagai kemungkinan struktur item
          const attributes = item.attributes || item.data || item;
          
          console.log(`🔧 Processing item ${index + 1}:`, {
            id: item.id,
            attributes: attributes
          });
          
          const order = attributes.order || (index + 1);
          const phase = attributes.phase || `Phase ${index + 1}`;
          const dateRange = attributes.dateRange || 'Tanggal belum ditentukan';
          const description = attributes.description || 'Deskripsi belum tersedia';
          
          console.log(`   📅 Date range: "${dateRange}"`);
          
          // Hitung status berdasarkan tanggal
          const status = calculateTimelineStatus(dateRange);
          const isActive = status === 'active';
          const isCompleted = status === 'completed';
          const progress = calculateProgress(dateRange);
          
          console.log(`   📊 Status calculated: ${status} (active: ${isActive}, completed: ${isCompleted})`);
          
          return {
            id: item.id || `timeline-${index + 1}`,
            date: dateRange,
            phase: phase,
            description: description,
            status: status,
            order: order,
            isActive: isActive,
            isCompleted: isCompleted,
            progress: progress
          };
        }).filter(Boolean);
        
        // Sort by order
        transformedData.sort((a, b) => a.order - b.order);
        
        console.log('✅ Processed timeline data:', transformedData);
        setTimelineData(transformedData);
        setError(null);
        
      } catch (err) {
        console.error('❌ Error fetching timeline data:', err);
        setError(err.message);
        setTimelineData(getFallbackTimelineData());
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, []);

  // Fallback data jika Strapi tidak tersedia
  const getFallbackTimelineData = () => {
    const currentYear = new Date().getFullYear();
    
    // Buat tanggal untuk testing - GUNAKAN EN DASH UNTUK KONSISTENSI
    const today = new Date();
    const pastDate1 = new Date(today);
    pastDate1.setDate(today.getDate() - 30); // 30 hari lalu
    const pastDate2 = new Date(today);
    pastDate2.setDate(today.getDate() - 15); // 15 hari lalu
    
    const futureDate1 = new Date(today);
    futureDate1.setDate(today.getDate() + 15); // 15 hari mendatang
    const futureDate2 = new Date(today);
    futureDate2.setDate(today.getDate() + 45); // 45 hari mendatang
    
    return [
      {
        id: 1,
        date: `${pastDate1.getDate()} ${getMonthName(pastDate1.getMonth())} ${currentYear} – ${pastDate2.getDate()} ${getMonthName(pastDate2.getMonth())} ${currentYear}`,
        phase: "Pendaftaran Online",
        description: "Pendaftaran dilakukan secara online melalui website resmi Mutiara Al-Madani",
        status: "completed",
        order: 1,
        isActive: false,
        isCompleted: true,
        progress: 100
      },
      {
        id: 2,
        date: `${today.getDate()} ${getMonthName(today.getMonth())} ${currentYear} – ${futureDate1.getDate()} ${getMonthName(futureDate1.getMonth())} ${currentYear}`,
        phase: "Tes Masuk & Wawancara",
        description: "Tes akademik dan wawancara untuk calon siswa dan orang tua",
        status: "active",
        order: 2,
        isActive: true,
        isCompleted: false,
        progress: 50
      },
      {
        id: 3,
        date: `${futureDate1.getDate() + 5} ${getMonthName(futureDate1.getMonth())} ${currentYear}`,
        phase: "Pengumuman Hasil",
        description: "Pengumuman hasil seleksi melalui website dan papan pengumuman sekolah",
        status: "upcoming",
        order: 3,
        isActive: false,
        isCompleted: false,
        progress: 0
      },
      {
        id: 4,
        date: `${futureDate1.getDate() + 6} ${getMonthName(futureDate1.getMonth())} ${currentYear} – ${futureDate2.getDate()} ${getMonthName(futureDate2.getMonth())} ${currentYear}`,
        phase: "Daftar Ulang",
        description: "Proses daftar ulang bagi calon siswa yang diterima",
        status: "upcoming",
        order: 4,
        isActive: false,
        isCompleted: false,
        progress: 0
      },
      {
        id: 5,
        date: `15 Juli ${currentYear + 1}`,
        phase: "Awal Tahun Ajaran",
        description: "Hari pertama masuk tahun ajaran baru 2025/2026",
        status: "upcoming",
        order: 5,
        isActive: false,
        isCompleted: false,
        progress: 0
      }
    ];
  };

  // Function untuk mendapatkan icon berdasarkan phase
  const getPhaseIcon = (phase) => {
    const iconMap = {
      'Pendaftaran Online': '📝',
      'Tes Masuk & Wawancara': '📚',
      'Pengumuman Hasil': '🎉',
      'Daftar Ulang': '✅',
      'Awal Tahun Ajaran': '🏫',
      'default': '📅'
    };
    
    return iconMap[phase] || iconMap.default;
  };

  // Function untuk mendapatkan status color
  const getStatusColor = (status) => {
    const colorMap = {
      'completed': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'active': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      'upcoming': { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' }
    };
    
    return colorMap[status] || colorMap.upcoming;
  };

  // Function untuk mendapatkan status text
  const getStatusText = (status) => {
    const textMap = {
      'completed': 'Selesai',
      'active': 'Sedang Berlangsung',
      'upcoming': 'Akan Datang'
    };
    
    return textMap[status] || 'Akan Datang';
  };

  const programInfo = {
    tk: {
      title: "TK Islam Mutiara Al-Madani",
      age: "5-6 tahun",
      quota: "30 siswa",
      fees: "Rp 4.500.000",
      description: "Pendidikan anak usia dini dengan pendekatan belajar sambil bermain"
    },
    sd: {
      title: "SD Islam Mutiara Al-Madani", 
      age: "7-12 tahun",
      quota: "60 siswa",
      fees: "Rp 5.500.000",
      description: "Pendidikan dasar dengan kurikulum nasional dan penguatan karakter"
    },
    smp: {
      title: "SMP Islam Terpadu",
      age: "13-15 tahun",
      quota: "20 siswa",
      fees: "Rp 6.450.000",
      description: "Pendidikan menengah pertama dengan pengembangan bakat dan minat"
    }
  };

  // Skeleton Loader Component
  const TimelineSkeleton = () => (
    <div className="max-w-4xl mx-auto">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="relative flex items-start mb-8">
          <div className="absolute left-8 transform -translate-x-1/2 z-10 w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="ml-16 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 w-full">
            <div className="animate-pulse">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <div className="h-6 bg-gray-300 rounded w-48"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded-full w-32"></div>
              </div>
              <div className="mb-3">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-300 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Refresh timeline data
  const handleRefreshTimeline = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Refreshing timeline data...');
      
      const response = await fetch(`${API_URL}/api/timelines?sort=order:asc`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      let items = [];
      if (data.data && Array.isArray(data.data)) {
        items = data.data;
      } else if (Array.isArray(data)) {
        items = data;
      } else {
        throw new Error('Unknown data structure from API');
      }
      
      const transformedData = items.map((item, index) => {
        const attributes = item.attributes || item.data || item;
        
        const order = attributes.order || (index + 1);
        const phase = attributes.phase || `Phase ${index + 1}`;
        const dateRange = attributes.dateRange || 'Tanggal belum ditentukan';
        const description = attributes.description || 'Deskripsi belum tersedia';
        
        if (!attributes.phase || !attributes.dateRange) {
          console.warn('❌ Timeline item missing required fields:', attributes);
          return null;
        }
        
        const status = calculateTimelineStatus(dateRange);
        const isActive = status === 'active';
        const isCompleted = status === 'completed';
        const progress = calculateProgress(dateRange);
        
        return {
          id: item.id || `timeline-${index + 1}`,
          date: dateRange,
          phase: phase,
          description: description,
          status: status,
          order: order,
          isActive: isActive,
          isCompleted: isCompleted,
          progress: progress
        };
      }).filter(Boolean);
      
      transformedData.sort((a, b) => a.order - b.order);
      
      console.log('✅ Timeline data refreshed successfully');
      setTimelineData(transformedData);
      
    } catch (err) {
      console.error('❌ Error refreshing timeline:', err);
      setError(`Gagal refresh data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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
                <span className="text-yellow-400 font-semibold text-lg">Penerimaan Peserta Didik Baru</span>
              </div>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-green-300 to-blue-300 bg-clip-text text-transparent leading-tight"
            >
              SPMB 2025
              <br />
              MUTIARA AL-MADANI
            </motion.h1>

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
              Pendaftaran Peserta Didik Baru Tahun Ajaran{' '}
              <span className="text-yellow-400 font-bold">2025/2026</span>
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
            >
              {[
                { number: "3", label: "Jenjang Pendidikan" },
                { number: "110", label: "Kuota Tersedia" },
                { number: "50+", label: "Guru Professional" },
                { number: "18+", label: "Tahun Pengalaman" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1 drop-shadow-lg">{stat.number}</div>
                  <div className="text-green-200 text-sm drop-shadow">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/spmb/daftar"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>🎓</span>
                <span>Daftar Online Sekarang</span>
              </Link>
              <Link
                to="/spmb/cek-status"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center space-x-2"
              >
                <span>📋</span>
                <span>Cek Status Pendaftaran</span>
              </Link>
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
            <span className="text-sm mb-2 drop-shadow">Scroll Kebawah</span>
            <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Program Tabs Section */}
      <section 
        ref={infoRef}
        className="py-20 bg-gradient-to-br from-green-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={infoVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
            >
              Program Pendidikan
            </motion.h2>
            
            {/* Enhanced Tabs */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 flex shadow-lg border border-gray-200">
                {[
                  { key: 'tk', label: 'TK', icon: '🎨' },
                  { key: 'sd', label: 'SD', icon: '🎓' },
                  { key: 'smp', label: 'SMP', icon: '📚' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      activeTab === tab.key 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:text-green-600 hover:bg-white'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">
                        {programInfo[activeTab].title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {programInfo[activeTab].description}
                      </p>
                      
                      <div className="space-y-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                        <div className="flex justify-between items-center py-3 border-b border-green-200">
                          <span className="text-gray-600 font-semibold flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            Usia
                          </span>
                          <span className="font-bold text-green-600 text-lg">{programInfo[activeTab].age}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-green-200">
                          <span className="text-gray-600 font-semibold flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            Kuota
                          </span>
                          <span className="font-bold text-blue-600 text-lg">{programInfo[activeTab].quota}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600 font-semibold flex items-center">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                            Biaya Pendaftaran
                          </span>
                          <span className="font-bold text-yellow-600 text-lg">{programInfo[activeTab].fees}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-2xl p-6">
                      <h4 className="font-bold text-2xl mb-6 text-yellow-300">Keunggulan Program</h4>
                      <ul className="space-y-4">
                        {[
                          "Guru berkualitas dan berpengalaman",
                          "Fasilitas lengkap dan modern",
                          "Kurikulum terpadu Islam dan nasional",
                          "Program pengembangan karakter",
                          "Ekstrakurikuler beragam",
                          "Lingkungan belajar yang nyaman"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                              <span className="text-green-600 font-bold">✓</span>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Persyaratan Section */}
      <section 
        ref={requirementsRef}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={requirementsVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-center text-gray-800 mb-12"
            >
              Persyaratan Pendaftaran
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Dokumen Umum",
                  icon: "📄",
                  items: [
                    "Formulir pendaftaran",
                    "Foto copy akta kelahiran",
                    "Foto copy kartu keluarga", 
                    "Pas foto 3x4 (2 lembar)",
                    "Foto copy KTP orang tua"
                  ]
                },
                {
                  title: "Dokumen Akademik",
                  icon: "🎓",
                  items: [
                    "Rapor semester terakhir",
                    "Surat keterangan lulus",
                    "Foto copy ijazah (bagi lulusan)",
                    "Sertifikat prestasi (jika ada)",
                    "Portofolio karya (jika ada)"
                  ]
                },
                {
                  title: "Dokumen Khusus",
                  icon: "📋",
                  items: [
                    "Surat keterangan sehat dari dokter",
                    "Foto copy buku nikah orang tua",
                    "Surat pernyataan orang tua",
                    "Bukti pembayaran pendaftaran",
                    "Surat rekomendasi (jika ada)"
                  ]
                }
              ].map((requirement, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="text-4xl mb-4 text-center">{requirement.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{requirement.title}</h3>
                  <ul className="space-y-2">
                    {requirement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Timeline Section - VERSI DIPERBAIKI */}
      <section 
        ref={timelineRef}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={timelineVisible ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-center text-gray-800 mb-4"
            >
              Timeline Pendaftaran
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            >
              Jadwal lengkap penerimaan peserta didik baru tahun ajaran 2025/2026
            </motion.p>

            {/* Debug Info */}
            {!loading && !error && (
              <div className="text-center mb-8">
                <div className="inline-block bg-gray-100 rounded-lg px-4 py-2 text-sm">
                  <span className="font-semibold">Hari ini: </span> 
                  {new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  <span className="mx-2">|</span>
                  <span className="font-semibold">Total: </span> {timelineData.length} tahap
                </div>
              </div>
            )}

            {loading ? (
              <TimelineSkeleton />
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-yellow-600 text-lg mb-4">⚠️ {error}</div>
                <p className="text-gray-600 mb-4">Timeline akan diperbarui ketika koneksi tersedia</p>
                <button
                  onClick={handleRefreshTimeline}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                >
                  <span className="mr-2">🔄</span>
                  Coba Lagi
                </button>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {/* Timeline dengan garis vertikal */}
                <div className="relative">
                  {/* Garis vertikal timeline */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-blue-400 transform -translate-x-1/2 z-0"></div>
                  
                  {timelineData.map((timeline, index) => {
                    const statusColor = getStatusColor(timeline.status);
                    const phaseIcon = getPhaseIcon(timeline.phase);
                    
                    return (
                      <motion.div
                        key={timeline.id}
                        variants={fadeInUp}
                        className="relative flex items-start mb-8 last:mb-0 group"
                      >
                        {/* Bullet point */}
                        <div className={`absolute left-8 transform -translate-x-1/2 z-10 w-6 h-6 rounded-full border-4 border-white ${
                          timeline.status === 'completed' 
                            ? 'bg-green-500' 
                            : timeline.status === 'active'
                            ? 'bg-blue-500 animate-pulse'
                            : 'bg-gray-400'
                        }`}></div>
                        
                        {/* Konten timeline */}
                        <div className={`ml-16 bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 flex-1 ${
                          statusColor.border
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <div className="flex items-center mb-2 sm:mb-0">
                              <div className="text-2xl mr-3">{phaseIcon}</div>
                              <h3 className="text-xl font-bold text-gray-800">{timeline.phase}</h3>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}>
                              {getStatusText(timeline.status)}
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex items-center text-gray-600 mb-2">
                              <span className="mr-2">📅</span>
                              <span className="font-semibold">{timeline.date}</span>
                            </div>
                            {timeline.description && (
                              <p className="text-gray-600 leading-relaxed">{timeline.description}</p>
                            )}
                          </div>

                          {/* Progress indicator untuk status active */}
                          {timeline.status === 'active' && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{Math.round(timeline.progress)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${timeline.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Completed indicator */}
                          {timeline.status === 'completed' && (
                            <div className="mt-4 flex items-center text-green-600">
                              <span className="mr-2">✅</span>
                              <span className="text-sm font-semibold">Tahap ini telah selesai</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Info tambahan */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white text-center"
                >
                  <h3 className="text-xl font-bold mb-2">📢 Informasi Penting</h3>
                  <p className="opacity-90">
                    Pastikan untuk mengikuti setiap tahapan timeline dengan teliti. 
                    Hubungi kami jika ada pertanyaan melalui WhatsApp: <strong>+62 853-6826-2156</strong>
                  </p>
                  <button
                    onClick={handleRefreshTimeline}
                    className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    🔄 Refresh Timeline
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Siap Bergabung dengan Kami?</h2>
            <p className="text-xl mb-8 opacity-90">
              Jangan lewatkan kesempatan untuk memberikan pendidikan terbaik bagi putra-putri Anda
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/spmb/daftar"
                className="bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-colors transform hover:scale-105 shadow-lg"
              >
                Daftar Sekarang
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-green-600 transition-colors transform hover:scale-105"
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Info;