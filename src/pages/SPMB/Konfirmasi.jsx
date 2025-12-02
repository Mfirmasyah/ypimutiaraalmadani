// Konfirmasi.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Konfirmasi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Coba ambil data dari state navigation
    if (location.state) {
      setRegistrationData(location.state);
      setLoading(false);
    } else {
      // Coba ambil dari localStorage
      const savedData = localStorage.getItem('lastRegistration');
      if (savedData) {
        setRegistrationData(JSON.parse(savedData));
        setLoading(false);
      } else {
        // Redirect ke halaman pendaftaran jika tidak ada data
        navigate('/spmb/daftar');
      }
    }
  }, [location, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Memuat data konfirmasi...</p>
        </div>
      </div>
    );
  }

  if (!registrationData) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Data pendaftaran tidak ditemukan</p>
          <Link to="/spmb/daftar" className="text-blue-600 hover:underline">
            Kembali ke formulir pendaftaran
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Konfirmasi Pendaftaran
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pendaftaran Anda telah berhasil diproses
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Pendaftaran Berhasil!
              </h2>
              <p className="text-gray-600">
                Data pendaftaran Anda telah berhasil disimpan
              </p>
            </div>

            {/* Registration Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 border-b pb-2">
                Informasi Pendaftaran
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nomor Pendaftaran</p>
                  <p className="text-xl font-bold text-blue-700">
                    {registrationData.nomorPendaftaran}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nama Lengkap</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {registrationData.nama}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Program Pilihan</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {registrationData.program === 'TK' && 'TK Islam Terpadu'}
                    {registrationData.program === 'SD' && 'SD Islam Terpadu'}
                    {registrationData.program === 'SMP' && 'SMP Islam Terpadu'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tanggal Pendaftaran</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {registrationData.tanggal}
                  </p>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Informasi Penting
              </h3>
              <ul className="space-y-3 text-yellow-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Simpan nomor pendaftaran ini untuk keperluan verifikasi</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Proses seleksi akan memakan waktu 3-5 hari kerja</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Hasil seleksi akan diumumkan melalui email dan website sekolah</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Untuk informasi lebih lanjut, hubungi: 0853-6826-2156</span>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Langkah Selanjutnya
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Tunggu Pengumuman</p>
                    <p className="text-sm text-gray-600">Hasil seleksi akan diumumkan dalam 3-5 hari kerja</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Cek Email dan Website</p>
                    <p className="text-sm text-gray-600">Pantau email dan website sekolah untuk pengumuman</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Hubungi Kami</p>
                    <p className="text-sm text-gray-600">Jika ada pertanyaan, hubungi nomor telepon di atas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={handlePrint}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Konfirmasi
            </button>
            
            <button
              onClick={handleBackToHome}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Kembali ke Beranda
            </button>
          </div>

          {/* Print Styles (hidden on screen) */}
          <style jsx="true">{`
            @media print {
              .no-print {
                display: none !important;
              }
              body {
                background: white !important;
              }
              .container-custom {
                max-width: 100% !important;
                padding: 0 !important;
              }
            }
          `}</style>
        </div>
      </section>
    </div>
  );
};

export default Konfirmasi;