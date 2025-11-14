import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Daftar = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Data Pribadi
    namaLengkap: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    agama: '',
    alamat: '',
    telepon: '',
    email: '',

    // Step 2: Data Orang Tua
    namaAyah: '',
    pekerjaanAyah: '',
    teleponAyah: '',
    namaIbu: '',
    pekerjaanIbu: '',
    teleponIbu: '',
    alamatOrtu: '',

    // Step 3: Data Akademik
    sekolahAsal: '',
    alamatSekolah: '',
    tahunLulus: '',
    nilaiRataRata: '',
    programPilihan: '',
    jalurPendaftaran: '',

    // Step 4: Dokumen
    foto: null,
    aktaKelahiran: null,
    kartuKeluarga: null,
    rapor: null,
    suratSehat: null
  });

  // ✅ DIPERBAIKI: URL Strapi Cloud langsung
  const API_URL = 'https://incredible-sparkle-f34960cd1e.strapiapp.com';

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Upload file ke Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'spmb_documents');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  // ✅ DIPERBAIKI: Simpan data ke Strapi dengan error handling yang lebih baik
  const saveToStrapi = async (pendaftarData) => {
    try {
      console.log('🚀 Saving to Strapi:', pendaftarData);
      
      const response = await fetch(`${API_URL}/api/pendaftars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: pendaftarData }),
      });

      console.log('📊 Strapi response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Strapi error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Strapi save successful:', result);
      return result;

    } catch (error) {
      console.error('❌ Error saving to Strapi:', error);
      throw new Error(`Gagal menyimpan data: ${error.message}`);
    }
  };

  // ✅ DIPERBAIKI: Validasi enum values sesuai schema
  const validateEnumValues = () => {
    const enumChecks = {
      jenisKelamin: ['Laki-laki', 'Perempuan'].includes(formData.jenisKelamin),
      agama: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'].includes(formData.agama),
      programPilihan: ['TK', 'SD', 'SMP'].includes(formData.programPilihan),
      jalurPendaftaran: ['reguler', 'prestasi', 'afirmasi', 'perpindahan'].includes(formData.jalurPendaftaran)
    };

    const invalidFields = Object.entries(enumChecks)
      .filter(([_, isValid]) => !isValid)
      .map(([field]) => field);

    if (invalidFields.length > 0) {
      throw new Error(`Nilai tidak valid untuk field: ${invalidFields.join(', ')}`);
    }
  };

  // ✅ DIPERBAIKI: Validasi field lengths sesuai schema
  const validateFieldLengths = () => {
    const lengthChecks = {
      namaLengkap: formData.namaLengkap.length <= 100,
      tempatLahir: formData.tempatLahir.length <= 50,
      alamat: formData.alamat.length <= 500,
      telepon: formData.telepon.length <= 15,
      email: formData.email.length <= 100,
      namaAyah: formData.namaAyah.length <= 100,
      pekerjaanAyah: formData.pekerjaanAyah.length <= 50,
      teleponAyah: formData.teleponAyah.length <= 15,
      namaIbu: formData.namaIbu.length <= 100,
      pekerjaanIbu: formData.pekerjaanIbu.length <= 50,
      teleponIbu: formData.teleponIbu.length <= 15,
      alamatOrtu: formData.alamatOrtu.length <= 500,
      sekolahAsal: formData.sekolahAsal.length <= 100,
      alamatSekolah: formData.alamatSekolah ? formData.alamatSekolah.length <= 500 : true
    };

    const tooLongFields = Object.entries(lengthChecks)
      .filter(([_, isValid]) => !isValid)
      .map(([field]) => field);

    if (tooLongFields.length > 0) {
      throw new Error(`Field terlalu panjang: ${tooLongFields.join(', ')}`);
    }
  };

  // ✅ DIPERBAIKI: Handle submit dengan flow yang diperbaiki
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🚀 Starting form submission...');

      // Validasi field required
      const requiredFields = [
        'namaLengkap', 'jenisKelamin', 'tempatLahir', 'tanggalLahir', 
        'agama', 'alamat', 'telepon', 'email', 'namaAyah', 'pekerjaanAyah',
        'teleponAyah', 'namaIbu', 'pekerjaanIbu', 'teleponIbu', 'alamatOrtu',
        'sekolahAsal', 'tahunLulus', 'nilaiRataRata', 'programPilihan', 'jalurPendaftaran'
      ];

      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`Field ${field} harus diisi`);
        }
      }

      // Validasi enum values dan field lengths
      validateEnumValues();
      validateFieldLengths();

      // Upload semua file ke Cloudinary
      const uploadPromises = [];
      const documentFields = ['foto', 'aktaKelahiran', 'kartuKeluarga', 'rapor', 'suratSehat'];

      console.log('📤 Uploading documents...');
      
      for (const field of documentFields) {
        if (formData[field]) {
          uploadPromises.push(
            uploadToCloudinary(formData[field])
              .then(url => {
                console.log(`✅ ${field} uploaded:`, url);
                return { field, url };
              })
              .catch(error => {
                console.error(`❌ Error uploading ${field}:`, error);
                throw new Error(`Gagal mengupload ${field}: ${error.message}`);
              })
          );
        }
      }

      // Tunggu semua upload selesai
      const uploadResults = await Promise.all(uploadPromises);
      
      // Buat object untuk URL dokumen
      const documents = {};
      uploadResults.forEach(result => {
        documents[result.field] = result.url;
      });

      console.log('📝 Preparing data for Strapi...');

      // ✅ DIPERBAIKI: Siapkan data untuk Strapi - SESUAI SCHEMA
      const tempNomor = `SPMB-TEMP-${Date.now()}`;
      const pendaftarData = {
        nomorPendaftaran: tempNomor, // Temporary dulu
        namaLengkap: formData.namaLengkap,
        jenisKelamin: formData.jenisKelamin,
        tempatLahir: formData.tempatLahir,
        tanggalLahir: formData.tanggalLahir, // Schema: date (YYYY-MM-DD)
        agama: formData.agama,
        alamat: formData.alamat,
        telepon: formData.telepon,
        email: formData.email,
        namaAyah: formData.namaAyah,
        pekerjaanAyah: formData.pekerjaanAyah,
        teleponAyah: formData.teleponAyah,
        namaIbu: formData.namaIbu,
        pekerjaanIbu: formData.pekerjaanIbu,
        teleponIbu: formData.teleponIbu,
        alamatOrtu: formData.alamatOrtu,
        sekolahAsal: formData.sekolahAsal,
        alamatSekolah: formData.alamatSekolah || '', // Bisa kosong
        tahunLulus: parseInt(formData.tahunLulus),
        nilaiRataRata: parseFloat(formData.nilaiRataRata),
        programPilihan: formData.programPilihan,
        jalurPendaftaran: formData.jalurPendaftaran,
        status: 'menunggu',
        tanggalDaftar: new Date().toISOString(), // Schema: datetime (ISO format)
        foto: documents.foto || null,
        aktaKelahiran: documents.aktaKelahiran || null,
        kartuKeluarga: documents.kartuKeluarga || null,
        rapor: documents.rapor || null,
        suratSehat: documents.suratSehat || null
      };

      console.log('💾 Saving to Strapi...');

      // Simpan ke Strapi dengan nomor temporary
      const result = await saveToStrapi(pendaftarData);

      // ✅ DIPERBAIKI: Generate nomor pendaftaran final berdasarkan ID dari Strapi
      const nomorPendaftaran = `SPMB-${new Date().getFullYear()}${String(result.data.id).padStart(4, '0')}`;

      console.log('🔄 Updating registration number:', nomorPendaftaran);

      // Update dengan nomor final
      const updateResponse = await fetch(`${API_URL}/api/pendaftars/${result.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          data: { 
            nomorPendaftaran: nomorPendaftaran 
          } 
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Gagal update nomor pendaftaran');
      }

      // Simpan data ke localStorage untuk konfirmasi
      localStorage.setItem('lastRegistration', JSON.stringify({
        nomorPendaftaran,
        nama: formData.namaLengkap,
        program: formData.programPilihan,
        tanggal: new Date().toLocaleDateString('id-ID')
      }));

      console.log('✅ Registration successful!');

      // Redirect ke halaman konfirmasi
      navigate('/spmb/konfirmasi', { 
        state: { 
          nomorPendaftaran,
          nama: formData.namaLengkap,
          program: formData.programPilihan
        }
      });

    } catch (error) {
      console.error('❌ Error during submission:', error);
      alert(`Terjadi kesalahan: ${error.message}. Silakan coba lagi.`);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Data Pribadi' },
    { number: 2, title: 'Data Orang Tua' },
    { number: 3, title: 'Data Akademik' },
    { number: 4, title: 'Upload Dokumen' },
    { number: 5, title: 'Konfirmasi' }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Formulir Pendaftaran
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Isi formulir pendaftaran dengan data yang benar dan lengkap untuk proses seleksi siswa baru
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white shadow-sm">
        <div className="container-custom py-6">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 md:space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-500'
                  } font-semibold`}>
                    {step.number}
                  </div>
                  <span className={`ml-2 hidden md:block ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Loading Overlay */}
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-700">Menyimpan data dan mengupload dokumen...</p>
                  <p className="text-sm text-gray-500 mt-2">Harap tunggu sebentar</p>
                </div>
              </div>
            )}

            {/* Step 1: Data Pribadi */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Pribadi Calon Siswa</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="namaLengkap"
                      value={formData.namaLengkap}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Kelamin *
                    </label>
                    <select
                      name="jenisKelamin"
                      value={formData.jenisKelamin}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempat Lahir *
                    </label>
                    <input
                      type="text"
                      name="tempatLahir"
                      value={formData.tempatLahir}
                      onChange={handleInputChange}
                      required
                      maxLength={50}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Kota tempat lahir"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Lahir *
                    </label>
                    <input
                      type="date"
                      name="tanggalLahir"
                      value={formData.tanggalLahir}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agama *
                    </label>
                    <select
                      name="agama"
                      value={formData.agama}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. Telepon/HP *
                    </label>
                    <input
                      type="tel"
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleInputChange}
                      required
                      maxLength={15}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap *
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Alamat lengkap tempat tinggal"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 2: Data Orang Tua */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Orang Tua/Wali</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Ayah *
                    </label>
                    <input
                      type="text"
                      name="namaAyah"
                      value={formData.namaAyah}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Nama lengkap ayah"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pekerjaan Ayah *
                    </label>
                    <input
                      type="text"
                      name="pekerjaanAyah"
                      value={formData.pekerjaanAyah}
                      onChange={handleInputChange}
                      required
                      maxLength={50}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Pekerjaan ayah"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telepon Ayah *
                    </label>
                    <input
                      type="tel"
                      name="teleponAyah"
                      value={formData.teleponAyah}
                      onChange={handleInputChange}
                      required
                      maxLength={15}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Ibu *
                    </label>
                    <input
                      type="text"
                      name="namaIbu"
                      value={formData.namaIbu}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Nama lengkap ibu"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pekerjaan Ibu *
                    </label>
                    <input
                      type="text"
                      name="pekerjaanIbu"
                      value={formData.pekerjaanIbu}
                      onChange={handleInputChange}
                      required
                      maxLength={50}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Pekerjaan ibu"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telepon Ibu *
                    </label>
                    <input
                      type="tel"
                      name="teleponIbu"
                      value={formData.teleponIbu}
                      onChange={handleInputChange}
                      required
                      maxLength={15}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Orang Tua *
                  </label>
                  <textarea
                    name="alamatOrtu"
                    value={formData.alamatOrtu}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Alamat lengkap orang tua"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 3: Data Akademik */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Akademik</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sekolah Asal *
                    </label>
                    <input
                      type="text"
                      name="sekolahAsal"
                      value={formData.sekolahAsal}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Nama sekolah sebelumnya"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tahun Lulus *
                    </label>
                    <select
                      name="tahunLulus"
                      value={formData.tahunLulus}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Pilih Tahun Lulus</option>
                      {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nilai Rata-rata Rapor *
                    </label>
                    <input
                      type="number"
                      name="nilaiRataRata"
                      value={formData.nilaiRataRata}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Contoh: 85.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Pilihan *
                    </label>
                    <select
                      name="programPilihan"
                      value={formData.programPilihan}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Pilih Program</option>
                      <option value="TK">TK Islam Terpadu</option>
                      <option value="SD">SD Islam Terpadu</option>
                      <option value="SMP">SMP Islam Terpadu</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jalur Pendaftaran *
                    </label>
                    <select
                      name="jalurPendaftaran"
                      value={formData.jalurPendaftaran}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Pilih Jalur Pendaftaran</option>
                      <option value="reguler">Reguler</option>
                      <option value="prestasi">Jalur Prestasi</option>
                      <option value="afirmasi">Jalur Afirmasi</option>
                      <option value="perpindahan">Perpindahan Orang Tua</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Sekolah Asal
                  </label>
                  <textarea
                    name="alamatSekolah"
                    value={formData.alamatSekolah}
                    onChange={handleInputChange}
                    rows="2"
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Alamat lengkap sekolah asal"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 4: Upload Dokumen */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Dokumen Persyaratan</h2>
                <p className="text-gray-600 mb-6">
                  Upload dokumen-dokumen berikut dalam format PDF, JPG, atau PNG (maks. 2MB per file)
                </p>

                <div className="space-y-4">
                  {[
                    { name: 'foto', label: 'Foto 3x4 Background Merah', required: true },
                    { name: 'aktaKelahiran', label: 'Akta Kelahiran', required: true },
                    { name: 'kartuKeluarga', label: 'Kartu Keluarga (KK)', required: true },
                    { name: 'rapor', label: 'Rapor Semester Terakhir', required: true },
                    { name: 'suratSehat', label: 'Surat Keterangan Sehat', required: true }
                  ].map((doc, index) => (
                    <div key={doc.name} className="border border-gray-200 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {doc.label} {doc.required && '*'}
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          name={doc.name}
                          onChange={handleInputChange}
                          required={doc.required}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {formData[doc.name] && (
                          <span className="text-green-600 text-sm font-medium">
                            ✓ Terupload
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Format: PDF, JPG, PNG (maks. 2MB)
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Konfirmasi */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Konfirmasi Pendaftaran</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Data Sudah Lengkap!</h3>
                      <p className="text-green-600">Silakan periksa kembali data yang telah Anda isi sebelum submit.</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 border-b pb-2">Data Pribadi</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Nama:</span> {formData.namaLengkap}</p>
                      <p><span className="text-gray-600">Jenis Kelamin:</span> {formData.jenisKelamin}</p>
                      <p><span className="text-gray-600">TTL:</span> {formData.tempatLahir}, {formData.tanggalLahir}</p>
                      <p><span className="text-gray-600">Agama:</span> {formData.agama}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 border-b pb-2">Kontak</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Telepon:</span> {formData.telepon}</p>
                      <p><span className="text-gray-600">Email:</span> {formData.email}</p>
                      <p><span className="text-gray-600">Alamat:</span> {formData.alamat}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 border-b pb-2">Data Akademik</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Sekolah Asal:</span> {formData.sekolahAsal}</p>
                      <p><span className="text-gray-600">Tahun Lulus:</span> {formData.tahunLulus}</p>
                      <p><span className="text-gray-600">Nilai Rata-rata:</span> {formData.nilaiRataRata}</p>
                      <p><span className="text-gray-600">Program:</span> {formData.programPilihan}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 border-b pb-2">Dokumen</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'foto', label: 'Foto' },
                        { name: 'aktaKelahiran', label: 'Akta Kelahiran' },
                        { name: 'kartuKeluarga', label: 'Kartu Keluarga' },
                        { name: 'rapor', label: 'Rapor' },
                        { name: 'suratSehat', label: 'Surat Sehat' }
                      ].map(doc => (
                        <p key={doc.name}>
                          <span className="text-gray-600">{doc.label}:</span>{' '}
                          {formData[doc.name] ? '✓ Terupload' : '✗ Belum upload'}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-blue-800 text-sm">
                        Dengan mengirim formulir ini, saya menyatakan bahwa semua data yang diisi adalah benar dan siap 
                        mengikuti proses seleksi sesuai ketentuan yang berlaku.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={loading}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Kembali
                  </button>
                )}
              </div>

              <div className="flex space-x-4">
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Lanjut
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Memproses...
                      </>
                    ) : (
                      'Submit Pendaftaran'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Informasi Penting</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Pastikan semua data yang diisi benar dan lengkap</li>
                  <li>• Setelah submit, Anda akan mendapatkan nomor pendaftaran</li>
                  <li>• Proses seleksi membutuhkan waktu 3-5 hari kerja</li>
                  <li>• Hasil seleksi akan diumumkan melalui email dan website</li>
                  <li>• Untuk pertanyaan, hubungi: (022) 1234-5678</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Daftar;