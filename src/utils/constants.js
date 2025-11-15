export const SCHOOL_INFO = {
  name: "Mutiara Al-Madani",
  fullName: "Yayasan Pendidikan Islam Mutiara Al-Madani",
  address: "Jl. Yos Sudarso No. 28, Desa Gedang, Kecamatan Sungai Penuh, Kota Sungai Penuh, Jambi",
  phone: "+6285368262156",
  email: "ypimutiaraalmadani@gmail.com",
  whatsapp: "+6285368262156",
  socialMedia: {
    Tiktok: "https://www.tiktok.com/@ypimutiaraalmadani_",
    instagram: "https://www.instagram.com/ypimutiaraalmadani/?next=%2F",
    youtube: "https://www.youtube.com/@YPIMutiaraAlMadani-d9w",
  }
};

export const NAVIGATION = [
  { name: 'Home', path: '/', current: true },
  { name: 'Tentang', path: '/about', current: false },
  { 
    name: 'Program', 
    path: '/program',
    children: [
      { name: 'Taman Kanak-Kanak Mutiara Al-Madani', path: '/program/tk' },
      { name: 'SD Mutiara Al-Madani', path: '/program/sd' },
      { name: 'SMP Mutiara Al-Madani', path: '/program/smp' }
    ]
  },
  {
    name: 'SPMB',
    path: '/spmb',
    children: [
      { name: 'Info Pendaftaran', path: '/spmb/info' },
      { name: 'Daftar Online', path: '/spmb/daftar' },
      { name: 'Cek Status', path: '/spmb/cek-status' }
    ]
  },
  { name: "Edukasi", path: "/edukasi" },
  { name: "Parenting", path: "/parenting" },
  { name: 'Prestasi', path: '/achievement', current: false },
  { name: 'Galeri', path: '/gallery', current: false },
  { name: 'Berita', path: '/news', current: false },
  { name: 'Kontak', path: '/contact', current: false }
];

export const PRAYER_TIMES = {
  subuh: '04:30',
  dzuhur: '12:00',
  ashar: '15:30',
  maghrib: '18:00',
  isya: '19:30'
};