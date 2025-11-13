import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CekStatus = () => {
  const [searchMethod, setSearchMethod] = useState('nomor');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState('');

  // Fungsi untuk fetch data dari Strapi
  const fetchStatusFromAPI = async (method, value) => {
    const API_URL = import.meta.env.VITE_STRAPI_URL;
    
    try {
      let url = '';
      
      if (method === 'nomor') {
        url = `${API_URL}/api/pendaftars?filters[nomorPendaftaran][$eq]=${value}`;
      } else {
        url = `${API_URL}/api/pendaftars?filters[email][$eq]=${value}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari server');
      }

      const result = await response.json();
      
      // Handle response structure
      return result.data && result.data.length > 0 ? result.data[0] : null;
    } catch (error) {
      console.error('Error fetching status:', error);
      throw new Error('Tidak dapat terhubung ke server');
    }
  };

  // Format data dari Strapi ke format frontend
  const formatStatusData = (apiData) => {
    if (!apiData) return null;

    // Map status dari Strapi ke frontend
    const getFrontendStatus = (status) => {
      switch (status) {
        case 'menunggu': return 'menunggu';
        case 'diterima': return 'diterima';
        case 'ditolak': return 'ditolak';
        default: return 'menunggu';
      }
    };

    // Generate timeline berdasarkan status
    const generateTimeline = (status, tanggalDaftar) => {
      const baseDate = new Date(tanggalDaftar);
      const baseTimeline = [
        { 
          tahap: 'Pendaftaran', 
          status: 'selesai', 
          tanggal: baseDate.toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          }) 
        },
        { 
          tahap: 'Verifikasi Berkas', 
          status: status === 'menunggu' ? 'berlangsung' : 'selesai', 
          tanggal: status === 'menunggu' ? 'Sedang diproses' : 
            new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')
        },
        { 
          tahap: 'Tes Masuk', 
          status: (status === 'diterima' || status === 'ditolak') ? 'selesai' : 'menunggu', 
          tanggal: (status === 'diterima' || status === 'ditolak') ? 
            new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID') : 'Menunggu jadwal'
        },
        { 
          tahap: 'Pengumuman Hasil', 
          status: (status === 'diterima' || status === 'ditolak') ? 'selesai' : 'menunggu', 
          tanggal: (status === 'diterima' || status === 'ditolak') ? 
            new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID') : 'Akan diumumkan'
        },
        { 
          tahap: 'Daftar Ulang', 
          status: status === 'diterima' ? 'berlangsung' : 'menunggu', 
          tanggal: status === 'diterima' ? '25 - 30 Maret 2024' : 'Menunggu pengumuman'
        },
        { 
          tahap: 'Awal Masuk Sekolah', 
          status: 'menunggu', 
          tanggal: '15 Juli 2024' 
        }
      ];

      return baseTimeline;
    };

    // Get catatan berdasarkan status
    const getCatatan = (status) => {
      switch (status) {
        case 'diterima':
          return 'Selamat! Anda diterima. Silakan melakukan daftar ulang dengan membawa dokumen asli ke sekolah sesuai jadwal.';
        case 'ditolak':
          return 'Terima kasih telah mendaftar. Silakan mencoba lagi di kesempatan berikutnya.';
        case 'menunggu':
          return 'Proses verifikasi sedang berlangsung. Harap menunggu informasi lebih lanjut melalui email.';
        default:
          return 'Proses seleksi sedang berlangsung. Pantau terus informasi terbaru.';
      }
    };

    // Get tahap selanjutnya
    const getTahapSelanjutnya = (status) => {
      switch (status) {
        case 'diterima': return 'Daftar Ulang';
        case 'ditolak': return 'Tidak Ada';
        case 'menunggu': return 'Verifikasi Berkas';
        default: return 'Menunggu Pengumuman';
      }
    };

    // Get tanggal tahap selanjutnya
    const getTanggalTahapSelanjutnya = (status) => {
      switch (status) {
        case 'diterima': return '25 - 30 Maret 2024';
        case 'ditolak': return '-';
        case 'menunggu': return '1-3 hari kerja';
        default: return 'Akan diumumkan';
      }
    };

    return {
      nomorPendaftaran: apiData.attributes.nomorPendaftaran,
      nama: apiData.attributes.namaLengkap,
      program: apiData.attributes.programPilihan,
      tanggalDaftar: new Date(apiData.attributes.tanggalDaftar).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      status: getFrontendStatus(apiData.attributes.status),
      tahapSelanjutnya: getTahapSelanjutnya(apiData.attributes.status),
      tanggalTahapSelanjutnya: getTanggalTahapSelanjutnya(apiData.attributes.status),
      catatan: getCatatan(apiData.attributes.status),
      detail: generateTimeline(apiData.attributes.status, apiData.attributes.tanggalDaftar)
    };
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError(`Harap masukkan ${searchMethod === 'nomor' ? 'nomor pendaftaran' : 'alamat email'}`);
      return;
    }

    // Validasi format
    if (searchMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(searchValue)) {
        setError('Format email tidak valid');
        return;
      }
    }

    setIsLoading(true);
    setError('');
    setStatusData(null);

    try {
      const apiData = await fetchStatusFromAPI(searchMethod, searchValue);
      
      if (apiData) {
        const formattedData = formatStatusData(apiData);
        setStatusData(formattedData);
      } else {
        setError('Data pendaftaran tidak ditemukan. Pastikan nomor pendaftaran atau email sudah benar.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message || 'Terjadi kesalahan saat mencari data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'diterima': return 'text-green-600 bg-green-50 border-green-200';
      case 'diverifikasi': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'menunggu': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'ditolak': return 'text-red-600 bg-red-50 border-red-200';
      case 'selesai': return 'text-green-600 bg-green-50';
      case 'berlangsung': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'diterima': return 'Diterima';
      case 'diverifikasi': return 'Terverifikasi';
      case 'menunggu': return 'Menunggu Verifikasi';
      case 'ditolak': return 'Tidak Diterima';
      case 'selesai': return 'Selesai';
      case 'berlangsung': return 'Sedang Berlangsung';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'diterima':
      case 'selesai':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'diverifikasi':
      case 'berlangsung':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'menunggu':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'ditolak':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Cek Status Pendaftaran
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pantau perkembangan proses seleksi dan status pendaftaran Anda
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cari Status Pendaftaran</h2>
            
            {/* Search Method Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
              <button
                type="button"
                onClick={() => {
                  setSearchMethod('nomor');
                  setSearchValue('');
                  setError('');
                  setStatusData(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  searchMethod === 'nomor'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Nomor Pendaftaran
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchMethod('email');
                  setSearchValue('');
                  setError('');
                  setStatusData(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  searchMethod === 'email'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Email
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {searchMethod === 'nomor' ? 'Nomor Pendaftaran' : 'Alamat Email'} *
                </label>
                <input
                  type={searchMethod === 'nomor' ? 'text' : 'email'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchMethod === 'nomor' 
                      ? 'Masukkan nomor pendaftaran (contoh: SPMB-20240001)' 
                      : 'Masukkan alamat email yang didaftarkan'
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mencari Data...
                  </>
                ) : (
                  'Cek Status'
                )}
              </button>
            </form>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Tidak memiliki nomor pendaftaran?</p>
                  <p>Nomor pendaftaran dapat ditemukan di email konfirmasi setelah menyelesaikan pendaftaran online. Jika tidak menemukan, gunakan email yang didaftarkan.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {statusData && (
            <div className="space-y-6">
              {/* Status Overview Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Status Pendaftaran</h2>
                    <p className="text-gray-600">Hasil pencarian untuk: <span className="font-semibold">{searchValue}</span></p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(statusData.status)}`}>
                      {getStatusIcon(statusData.status)}
                      <span className="ml-2">{getStatusText(statusData.status)}</span>
                    </span>
                  </div>
                </div>

                {/* Student Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Calon Siswa</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nomor Pendaftaran:</span>
                        <span className="font-semibold">{statusData.nomorPendaftaran}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nama Lengkap:</span>
                        <span className="font-semibold text-right">{statusData.nama}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Program:</span>
                        <span className="font-semibold">{statusData.program}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tanggal Daftar:</span>
                        <span className="font-semibold">{statusData.tanggalDaftar}</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Tahap Selanjutnya</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kegiatan:</span>
                        <span className="font-semibold">{statusData.tahapSelanjutnya}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jadwal:</span>
                        <span className="font-semibold">{statusData.tanggalTahapSelanjutnya}</span>
                      </div>
                    </div>
                    {statusData.catatan && (
                      <div className={`mt-4 p-3 rounded-lg border ${
                        statusData.status === 'diterima' ? 'bg-green-50 border-green-200' :
                        statusData.status === 'ditolak' ? 'bg-red-50 border-red-200' :
                        'bg-yellow-50 border-yellow-200'
                      }`}>
                        <p className={`text-sm ${
                          statusData.status === 'diterima' ? 'text-green-700' :
                          statusData.status === 'ditolak' ? 'text-red-700' :
                          'text-yellow-700'
                        }`}>{statusData.catatan}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Progress Pendaftaran</h3>
                  <div className="space-y-4">
                    {statusData.detail.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                          item.status === 'selesai' ? 'bg-green-100 text-green-600' :
                          item.status === 'berlangsung' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {item.status === 'selesai' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : item.status === 'berlangsung' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          ) : (
                            <span className="text-xs font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 pb-4 border-b border-gray-200 last:border-b-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{item.tahap}</h4>
                              <p className="text-sm text-gray-600 mt-1">{item.tanggal}</p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === 'selesai' ? 'bg-green-100 text-green-800' :
                              item.status === 'berlangsung' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {getStatusText(item.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Cetak Status
                  </button>
                  <Link
                    to="/spmb/info"
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Info Lengkap PPDB
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pertanyaan Umum</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Kapan pengumuman hasil seleksi?",
                  answer: "Pengumuman hasil seleksi biasanya diumumkan 3-5 hari kerja setelah tes masuk. Informasi akan dikirim via email dan dapat dilihat di website."
                },
                {
                  question: "Apa yang harus dilakukan jika status 'Diterima'?",
                  answer: "Silakan melakukan daftar ulang sesuai jadwal yang ditentukan dengan membawa dokumen asli dan melunasi biaya pendaftaran ulang."
                },
                {
                  question: "Bagaimana jika nomor pendaftaran hilang?",
                  answer: "Gunakan fitur pencarian dengan email yang didaftarkan. Jika masih mengalami kendala, hubungi panitia PPDB di (022) 1234-5678."
                },
                {
                  question: "Apakah bisa mengubah pilihan program setelah mendaftar?",
                  answer: "Perubahan program hanya dapat dilakukan sebelum proses verifikasi berkas. Hubungi panitia untuk informasi lebih lanjut."
                },
                {
                  question: "Berapa lama proses verifikasi berkas?",
                  answer: "Proses verifikasi membutuhkan waktu 1-3 hari kerja setelah pendaftaran. Status akan diperbarui secara otomatis."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">?</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-9">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CekStatus;