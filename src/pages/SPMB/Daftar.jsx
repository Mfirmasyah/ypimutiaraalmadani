import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Daftar = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking', 'connected', 'error'
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
    riwayatPenyakit: null
  });

  // State untuk menampilkan error per field
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});

  // ✅ Deteksi environment untuk production
  const IS_LOCALHOST = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
  
  // ✅ Konfigurasi untuk Production - FIXED untuk React
  // Gunakan window._env_ untuk environment variables atau fallback
  const USE_MOCK_API = window._env_?.REACT_APP_USE_MOCK_API === 'true' || false;
  
  // Mode tanpa file hanya untuk development
  const TEST_WITHOUT_FILES = IS_LOCALHOST || false;
  
  // ✅ URL API - Gunakan environment variable jika ada, atau default
  const API_BASE = window._env_?.REACT_APP_STRAPI_URL || 
                   (IS_LOCALHOST 
                     ? 'http://localhost:1337'
                     : 'https://incredible-sparkle-f34960cd1e.strapiapp.com');
  const API_URL = `${API_BASE}/api`;

  // ✅ Test koneksi ke Strapi
  useEffect(() => {
    const testStrapiConnection = async () => {
      try {
        setConnectionStatus('checking');
        
        // Test dengan GET request
        const testResponse = await fetch(`${API_URL}/pendaftars`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (testResponse.ok) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('error');
        }
        
      } catch (error) {
        console.error('Koneksi gagal:', error.message);
        setConnectionStatus('error');
      }
    };
    
    if (!USE_MOCK_API) {
      testStrapiConnection();
    }
  }, [USE_MOCK_API, API_URL]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
    
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

  // ✅ FUNGSI VALIDASI PER STEP
  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch(currentStep) {
      case 1:
        if (!formData.namaLengkap.trim()) newErrors.namaLengkap = 'Nama lengkap harus diisi';
        else if (formData.namaLengkap.length > 100) newErrors.namaLengkap = 'Nama maksimal 100 karakter';
        
        if (!formData.jenisKelamin) newErrors.jenisKelamin = 'Jenis kelamin harus dipilih';
        
        if (!formData.tempatLahir.trim()) newErrors.tempatLahir = 'Tempat lahir harus diisi';
        else if (formData.tempatLahir.length > 50) newErrors.tempatLahir = 'Tempat lahir maksimal 50 karakter';
        
        if (!formData.tanggalLahir) newErrors.tanggalLahir = 'Tanggal lahir harus diisi';
        
        if (!formData.agama) newErrors.agama = 'Agama harus dipilih';
        
        if (!formData.telepon.trim()) newErrors.telepon = 'Telepon harus diisi';
        else if (!/^[0-9]{10,15}$/.test(formData.telepon)) newErrors.telepon = 'Format telepon tidak valid';
        
        if (!formData.email.trim()) newErrors.email = 'Email harus diisi';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Format email tidak valid';
        else if (formData.email.length > 100) newErrors.email = 'Email maksimal 100 karakter';
        
        if (!formData.alamat.trim()) newErrors.alamat = 'Alamat harus diisi';
        else if (formData.alamat.length > 500) newErrors.alamat = 'Alamat maksimal 500 karakter';
        break;
        
      case 2:
        if (!formData.namaAyah.trim()) newErrors.namaAyah = 'Nama ayah harus diisi';
        else if (formData.namaAyah.length > 100) newErrors.namaAyah = 'Nama ayah maksimal 100 karakter';
        
        if (!formData.pekerjaanAyah.trim()) newErrors.pekerjaanAyah = 'Pekerjaan ayah harus diisi';
        else if (formData.pekerjaanAyah.length > 50) newErrors.pekerjaanAyah = 'Pekerjaan ayah maksimal 50 karakter';
        
        if (!formData.teleponAyah.trim()) newErrors.teleponAyah = 'Telepon ayah harus diisi';
        else if (!/^[0-9]{10,15}$/.test(formData.teleponAyah)) newErrors.teleponAyah = 'Format telepon tidak valid';
        
        if (!formData.namaIbu.trim()) newErrors.namaIbu = 'Nama ibu harus diisi';
        else if (formData.namaIbu.length > 100) newErrors.namaIbu = 'Nama ibu maksimal 100 karakter';
        
        if (!formData.pekerjaanIbu.trim()) newErrors.pekerjaanIbu = 'Pekerjaan ibu harus diisi';
        else if (formData.pekerjaanIbu.length > 50) newErrors.pekerjaanIbu = 'Pekerjaan ibu maksimal 50 karakter';
        
        if (!formData.teleponIbu.trim()) newErrors.teleponIbu = 'Telepon ibu harus diisi';
        else if (!/^[0-9]{10,15}$/.test(formData.teleponIbu)) newErrors.teleponIbu = 'Format telepon tidak valid';
        
        if (!formData.alamatOrtu.trim()) newErrors.alamatOrtu = 'Alamat orang tua harus diisi';
        else if (formData.alamatOrtu.length > 500) newErrors.alamatOrtu = 'Alamat maksimal 500 karakter';
        break;
        
      case 3:
        if (!formData.sekolahAsal.trim()) newErrors.sekolahAsal = 'Sekolah asal harus diisi';
        else if (formData.sekolahAsal.length > 100) newErrors.sekolahAsal = 'Sekolah asal maksimal 100 karakter';
        
        if (!formData.tahunLulus) newErrors.tahunLulus = 'Tahun lulus harus dipilih';
        
        if (!formData.nilaiRataRata) newErrors.nilaiRataRata = 'Nilai rata-rata harus diisi';
        else {
          const nilai = parseFloat(formData.nilaiRataRata);
          if (isNaN(nilai) || nilai < 0 || nilai > 100) newErrors.nilaiRataRata = 'Nilai harus antara 0-100';
        }
        
        if (!formData.programPilihan) newErrors.programPilihan = 'Program pilihan harus dipilih';
        
        if (!formData.jalurPendaftaran) newErrors.jalurPendaftaran = 'Jalur pendaftaran harus dipilih';
        
        if (formData.alamatSekolah && formData.alamatSekolah.length > 500) {
          newErrors.alamatSekolah = 'Alamat sekolah maksimal 500 karakter';
        }
        break;
        
      case 4:
        if (!TEST_WITHOUT_FILES) {
          if (!formData.foto) newErrors.foto = 'Foto harus diupload';
          if (!formData.aktaKelahiran) newErrors.aktaKelahiran = 'Akta kelahiran harus diupload';
          if (!formData.kartuKeluarga) newErrors.kartuKeluarga = 'Kartu keluarga harus diupload';
          if (!formData.rapor) newErrors.rapor = 'Rapor harus diupload';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Helper untuk menampilkan error message
  const renderError = (fieldName) => {
    if (errors[fieldName] && (formTouched[fieldName] || currentStep === 4)) {
      return (
        <p className="text-red-600 text-xs mt-1 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[fieldName]}
        </p>
      );
    }
    return null;
  };

  // ✅ REAL FUNCTION TO SAVE TO STRAPI
  const saveToStrapi = async (pendaftarData) => {
    try {
      // Prepare data in Strapi v4 format
      const strapiData = {
        data: {
          nomorPendaftaran: pendaftarData.nomorPendaftaran,
          namaLengkap: pendaftarData.namaLengkap,
          jenisKelamin: pendaftarData.jenisKelamin,
          tempatLahir: pendaftarData.tempatLahir,
          tanggalLahir: pendaftarData.tanggalLahir,
          agama: pendaftarData.agama,
          alamat: pendaftarData.alamat,
          telepon: pendaftarData.telepon,
          email: pendaftarData.email,
          namaAyah: pendaftarData.namaAyah,
          pekerjaanAyah: pendaftarData.pekerjaanAyah,
          teleponAyah: pendaftarData.teleponAyah,
          namaIbu: pendaftarData.namaIbu,
          pekerjaanIbu: pendaftarData.pekerjaanIbu,
          teleponIbu: pendaftarData.teleponIbu,
          alamatOrtu: pendaftarData.alamatOrtu,
          sekolahAsal: pendaftarData.sekolahAsal,
          alamatSekolah: pendaftarData.alamatSekolah || '',
          tahunLulus: parseInt(pendaftarData.tahunLulus),
          nilaiRataRata: parseFloat(pendaftarData.nilaiRataRata),
          programPilihan: pendaftarData.programPilihan,
          jalurPendaftaran: pendaftarData.jalurPendaftaran,
          status: 'menunggu',
          tanggalDaftar: new Date().toISOString()
        }
      };
      
      const response = await fetch(`${API_URL}/pendaftars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(strapiData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Gagal menyimpan data';
        
        if (response.status === 400) {
          errorMessage = 'Data tidak valid. Silakan periksa kembali';
        } else if (response.status === 403) {
          errorMessage = 'Akses ditolak';
        } else if (response.status === 404) {
          errorMessage = 'Endpoint tidak ditemukan';
        } else if (response.status === 409) {
          errorMessage = 'Data sudah terdaftar';
        }
        
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      return result;
      
    } catch (error) {
      throw error;
    }
  };

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
      throw new Error(`Nilai tidak valid untuk: ${invalidFields.join(', ')}`);
    }
  };

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
      throw new Error(`Data terlalu panjang untuk: ${tooLongFields.join(', ')}`);
    }
  };

  // ✅ REAL SUBMIT HANDLER - SAVES TO STRAPI
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (connectionStatus === 'error') {
      alert('❌ Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      return;
    }
    
    if (connectionStatus === 'checking') {
      alert('🔄 Sedang memeriksa koneksi ke server...');
      return;
    }
    
    setLoading(true);

    try {
      // Validate all steps
      for (let step = 1; step <= 4; step++) {
        const tempErrors = {};
        
        switch(step) {
          case 1:
            if (!formData.namaLengkap.trim()) tempErrors.namaLengkap = 'Nama lengkap harus diisi';
            if (!formData.jenisKelamin) tempErrors.jenisKelamin = 'Jenis kelamin harus dipilih';
            if (!formData.tanggalLahir) tempErrors.tanggalLahir = 'Tanggal lahir harus diisi';
            if (!formData.agama) tempErrors.agama = 'Agama harus dipilih';
            if (!formData.telepon.trim()) tempErrors.telepon = 'Telepon harus diisi';
            if (!formData.email.trim()) tempErrors.email = 'Email harus diisi';
            if (!formData.alamat.trim()) tempErrors.alamat = 'Alamat harus diisi';
            break;
          case 2:
            if (!formData.namaAyah.trim()) tempErrors.namaAyah = 'Nama ayah harus diisi';
            if (!formData.pekerjaanAyah.trim()) tempErrors.pekerjaanAyah = 'Pekerjaan ayah harus diisi';
            if (!formData.teleponAyah.trim()) tempErrors.teleponAyah = 'Telepon ayah harus diisi';
            if (!formData.namaIbu.trim()) tempErrors.namaIbu = 'Nama ibu harus diisi';
            if (!formData.pekerjaanIbu.trim()) tempErrors.pekerjaanIbu = 'Pekerjaan ibu harus diisi';
            if (!formData.teleponIbu.trim()) tempErrors.teleponIbu = 'Telepon ibu harus diisi';
            if (!formData.alamatOrtu.trim()) tempErrors.alamatOrtu = 'Alamat orang tua harus diisi';
            break;
          case 3:
            if (!formData.sekolahAsal.trim()) tempErrors.sekolahAsal = 'Sekolah asal harus diisi';
            if (!formData.tahunLulus) tempErrors.tahunLulus = 'Tahun lulus harus dipilih';
            if (!formData.nilaiRataRata) tempErrors.nilaiRataRata = 'Nilai rata-rata harus diisi';
            if (!formData.programPilihan) tempErrors.programPilihan = 'Program pilihan harus dipilih';
            if (!formData.jalurPendaftaran) tempErrors.jalurPendaftaran = 'Jalur pendaftaran harus dipilih';
            break;
          case 4:
            if (!TEST_WITHOUT_FILES) {
              if (!formData.foto) tempErrors.foto = 'Foto harus diupload';
              if (!formData.aktaKelahiran) tempErrors.aktaKelahiran = 'Akta kelahiran harus diupload';
              if (!formData.kartuKeluarga) tempErrors.kartuKeluarga = 'Kartu keluarga harus diupload';
              if (!formData.rapor) tempErrors.rapor = 'Rapor harus diupload';
            }
            break;
        }
        
        if (Object.keys(tempErrors).length > 0) {
          setCurrentStep(step);
          setErrors(tempErrors);
          throw new Error(`Silakan lengkapi data di Step ${step}`);
        }
      }

      // Additional validation
      validateEnumValues();
      validateFieldLengths();

      const tempNomor = `SPMB-TEMP-${Date.now().toString().slice(-6)}`;
      
      const pendaftarData = {
        nomorPendaftaran: tempNomor,
        namaLengkap: formData.namaLengkap,
        jenisKelamin: formData.jenisKelamin,
        tempatLahir: formData.tempatLahir,
        tanggalLahir: formData.tanggalLahir,
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
        alamatSekolah: formData.alamatSekolah || '',
        tahunLulus: parseInt(formData.tahunLulus),
        nilaiRataRata: parseFloat(formData.nilaiRataRata),
        programPilihan: formData.programPilihan,
        jalurPendaftaran: formData.jalurPendaftaran,
        status: 'menunggu',
        tanggalDaftar: new Date().toISOString()
      };
      
      // SAVE TO REAL STRAPI
      const result = await saveToStrapi(pendaftarData);
      
      await processRegistrationSuccess(result.data.id, tempNomor);
      
    } catch (error) {
      // Scroll to top
      window.scrollTo(0, 0);
      
      // User-friendly error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('❌ Gagal terhubung ke server. Silakan periksa koneksi internet Anda.');
      } else {
        alert(`⚠️ Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ PROCESS REGISTRATION SUCCESS
  const processRegistrationSuccess = async (pendaftarId, tempNomor) => {
    const nomorPendaftaran = `SPMB-${new Date().getFullYear()}${String(pendaftarId).padStart(4, '0')}`;
    
    // Try to update the nomorPendaftaran in Strapi
    try {
      const updateData = {
        data: {
          nomorPendaftaran: nomorPendaftaran
        }
      };
      
      await fetch(`${API_URL}/pendaftars/${pendaftarId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      
    } catch (error) {
      // If update fails, use temporary number
      console.warn('Gagal update nomor pendaftaran:', error.message);
    }

    // Save to localStorage for backup and confirmation
    const registrationData = {
      nomorPendaftaran,
      nama: formData.namaLengkap,
      program: formData.programPilihan,
      email: formData.email,
      telepon: formData.telepon,
      tanggal: new Date().toLocaleDateString('id-ID'),
      waktu: new Date().toLocaleTimeString('id-ID'),
      timestamp: new Date().getTime(),
      strapiId: pendaftarId
    };

    // Save to localStorage
    localStorage.setItem('lastRegistration', JSON.stringify(registrationData));
    
    // Save to array of registrations
    const allRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    allRegistrations.push(registrationData);
    localStorage.setItem('registrations', JSON.stringify(allRegistrations));

    // Redirect to confirmation page
    navigate('/spmb/konfirmasi', { 
      state: registrationData,
      replace: true
    });
  };

  const steps = [
    { number: 1, title: 'Data Pribadi' },
    { number: 2, title: 'Data Orang Tua' },
    { number: 3, title: 'Data Akademik' },
    { number: 4, title: 'Upload Dokumen' },
    { number: 5, title: 'Konfirmasi' }
  ];

  const isStepComplete = (step) => {
    switch(step) {
      case 1:
        return formData.namaLengkap && formData.jenisKelamin && formData.tanggalLahir && 
               formData.agama && formData.telepon && formData.email && formData.alamat;
      case 2:
        return formData.namaAyah && formData.pekerjaanAyah && formData.teleponAyah && 
               formData.namaIbu && formData.pekerjaanIbu && formData.teleponIbu && formData.alamatOrtu;
      case 3:
        return formData.sekolahAsal && formData.tahunLulus && formData.nilaiRataRata && 
               formData.programPilihan && formData.jalurPendaftaran;
      case 4:
        if (TEST_WITHOUT_FILES) return true;
        return formData.foto && formData.aktaKelahiran && formData.kartuKeluarga && formData.rapor;
      default:
        return false;
    }
  };

  // ✅ Render connection status indicator (Hanya tampil jika error)
  const renderConnectionStatus = () => {
    if (USE_MOCK_API) return null;
    
    if (connectionStatus === 'error') {
      return (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 rounded-lg p-3 shadow-lg max-w-xs">
          <div className="flex items-center">
            <span className="mr-2 text-red-600">⚠️</span>
            <div>
              <p className="font-medium text-sm text-red-800">Koneksi Error</p>
              <p className="text-xs text-red-700">Tidak dapat terhubung ke server</p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs text-red-800 underline mt-1"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {renderConnectionStatus()}
      
      <section className="bg-white border-b">
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Formulir Pendaftaran
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Isi formulir pendaftaran dengan data yang benar dan lengkap
            </p>
          </div>
        </div>
      </section>

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
                  } font-semibold relative`}>
                    {step.number}
                    {isStepComplete(step.number) && step.number < 5 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
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

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-700 font-medium">
                    Menyimpan data pendaftaran...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Harap tunggu beberapa saat
                  </p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Data Pribadi</h2>
                  {isStepComplete(1) && (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Data lengkap
                    </span>
                  )}
                </div>
                
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.namaLengkap ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama lengkap"
                    />
                    {renderError('namaLengkap')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.jenisKelamin ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    {renderError('jenisKelamin')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.tempatLahir ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Kota tempat lahir"
                    />
                    {renderError('tempatLahir')}
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
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.tanggalLahir ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {renderError('tanggalLahir')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.agama ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                    {renderError('agama')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telepon *
                    </label>
                    <input
                      type="tel"
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.telepon ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="08xxxxxxxxxx"
                    />
                    {renderError('telepon')}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="email@contoh.com"
                  />
                  {renderError('email')}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.alamat ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Alamat lengkap (jalan, RT/RW, kelurahan, kecamatan, kota)"
                  ></textarea>
                  {renderError('alamat')}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Data Orang Tua</h2>
                  {isStepComplete(2) && (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Data lengkap
                    </span>
                  )}
                </div>
                
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.namaAyah ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama ayah"
                    />
                    {renderError('namaAyah')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.pekerjaanAyah ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan pekerjaan ayah"
                    />
                    {renderError('pekerjaanAyah')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.teleponAyah ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="08xxxxxxxxxx"
                    />
                    {renderError('teleponAyah')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.namaIbu ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama ibu"
                    />
                    {renderError('namaIbu')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.pekerjaanIbu ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan pekerjaan ibu"
                    />
                    {renderError('pekerjaanIbu')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.teleponIbu ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="08xxxxxxxxxx"
                    />
                    {renderError('teleponIbu')}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.alamatOrtu ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Alamat lengkap orang tua"
                  ></textarea>
                  {renderError('alamatOrtu')}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Data Akademik</h2>
                  {isStepComplete(3) && (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Data lengkap
                    </span>
                  )}
                </div>
                
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.sekolahAsal ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nama sekolah sebelumnya"
                    />
                    {renderError('sekolahAsal')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.tahunLulus ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih Tahun Lulus</option>
                      {Array.from({length: 10}, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </select>
                    {renderError('tahunLulus')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nilai Rata-rata *
                    </label>
                    <input
                      type="number"
                      name="nilaiRataRata"
                      value={formData.nilaiRataRata}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="100"
                      step="0.1"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.nilaiRataRata ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Contoh: 85.5"
                    />
                    {renderError('nilaiRataRata')}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.programPilihan ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih Program</option>
                      <option value="TK">TK</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                    </select>
                    {renderError('programPilihan')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jalur Pendaftaran *
                    </label>
                    <select
                      name="jalurPendaftaran"
                      value={formData.jalurPendaftaran}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.jalurPendaftaran ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih Jalur</option>
                      <option value="reguler">Reguler</option>
                      <option value="prestasi">Prestasi</option>
                      <option value="afirmasi">Afirmasi</option>
                      <option value="perpindahan">Perpindahan</option>
                    </select>
                    {renderError('jalurPendaftaran')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Sekolah (Opsional)
                    </label>
                    <textarea
                      name="alamatSekolah"
                      value={formData.alamatSekolah}
                      onChange={handleInputChange}
                      rows="2"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                        errors.alamatSekolah ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Alamat sekolah sebelumnya"
                    ></textarea>
                    {renderError('alamatSekolah')}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Upload Dokumen</h2>
                  {isStepComplete(4) && (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Dokumen lengkap
                    </span>
                  )}
                </div>
                
                <div className="space-y-6">
                  {TEST_WITHOUT_FILES ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                      <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Mode Tanpa File</h3>
                      <p className="text-yellow-700">
                        Saat ini sistem dalam mode pengujian. Upload file akan diaktifkan saat production.
                      </p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* File upload components */}
                    </div>
                  )}
                </div>
              </div>
            )}

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
                      <h3 className="text-lg font-semibold text-green-800">Data Lengkap dan Valid!</h3>
                      <p className="text-green-600">
                        Data siap disimpan ke sistem
                      </p>
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
                      <p><span className="text-gray-600">Alamat:</span> {formData.alamat.substring(0, 50)}...</p>
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
                    <h3 className="font-semibold text-gray-800 border-b pb-2">Data Orang Tua</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Nama Ayah:</span> {formData.namaAyah}</p>
                      <p><span className="text-gray-600">Pekerjaan Ayah:</span> {formData.pekerjaanAyah}</p>
                      <p><span className="text-gray-600">Nama Ibu:</span> {formData.namaIbu}</p>
                      <p><span className="text-gray-600">Pekerjaan Ibu:</span> {formData.pekerjaanIbu}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-blue-800 text-sm font-medium">
                        Dengan menekan tombol "Submit Pendaftaran", saya menyatakan bahwa:
                      </p>
                      <ul className="text-blue-700 text-sm mt-2 space-y-1 list-disc pl-5">
                        <li>Data yang diisi adalah benar dan dapat dipertanggungjawabkan</li>
                        <li>Siap mengikuti proses seleksi penerimaan siswa baru</li>
                        <li>Akan mematuhi semua peraturan yang berlaku</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={loading}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
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
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      isStepComplete(currentStep) 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!isStepComplete(currentStep) || loading}
                  >
                    Lanjut ke Step {currentStep + 1}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || connectionStatus === 'error'}
                    className={`px-8 py-3 rounded-lg font-medium flex items-center transition-colors ${
                      'bg-green-600 text-white hover:bg-green-700'
                    } disabled:opacity-70`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Menyimpan Data...
                      </>
                    ) : (
                      'Submit Pendaftaran'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Informasi Penting</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Data akan disimpan ke sistem secara permanen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Setelah submit, Anda akan mendapatkan nomor pendaftaran</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Proses seleksi membutuhkan waktu 3-5 hari kerja</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Pastikan data yang diisi sudah benar sebelum submit</span>
                  </li>
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