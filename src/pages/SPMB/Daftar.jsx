import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Daftar = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('idle');
  
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

  // ✅ ENVIRONMENT CONFIGURATION
  const IS_LOCALHOST = import.meta.env.DEV;
  const IS_PRODUCTION = import.meta.env.PROD;
  
  // ✅ LOAD ENV VARIABLES
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://incredible-sparkle-f34960cd1e.strapiapp.com';
  const API_URL = import.meta.env.VITE_API_URL || `${STRAPI_URL}/api`;
  
  // ✅ PRODUCTION SETTINGS
  const USE_MOCK_API = IS_LOCALHOST; // Hanya mock di localhost
  const TEST_WITHOUT_FILES = IS_LOCALHOST; // Hanya test tanpa file di localhost
  const PAYLOAD_FORMAT = 1; // Format untuk Strapi v4
  
  // ✅ CLOUDINARY CONFIG
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // ✅ Check API connection on mount
  useEffect(() => {
    console.log(`🌍 Environment: ${IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'}`);
    console.log(`📡 API URL: ${API_URL}`);
    console.log(`🎭 Mock API: ${USE_MOCK_API ? 'ON' : 'OFF'}`);
    
    const checkApiConnection = async () => {
      if (IS_PRODUCTION && !USE_MOCK_API) {
        setApiStatus('checking');
        try {
          const response = await fetch(`${API_URL}/pendaftars`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (response.status === 200 || response.status === 401 || response.status === 403) {
            setApiStatus('connected');
            console.log('✅ API Production terhubung');
          } else if (response.status === 404) {
            setApiStatus('endpoint-not-found');
            console.warn('⚠️ Endpoint /pendaftars tidak ditemukan di Strapi');
          } else {
            setApiStatus('error');
            console.error('❌ Error koneksi API:', response.status);
          }
        } catch (error) {
          setApiStatus('offline');
          console.error('❌ API offline:', error.message);
        }
      } else {
        setApiStatus('ready');
      }
    };
    
    checkApiConnection();
  }, [IS_PRODUCTION, USE_MOCK_API, API_URL]);

  // ✅ Handle input changes
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

  // ✅ VALIDASI PER STEP
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

  // ✅ Upload file ke Cloudinary
  const uploadToCloudinary = async (file, folder = 'spmb_documents') => {
    if (!file || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      console.warn('⚠️ Cloudinary config tidak lengkap, skip upload');
      return null;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', folder);
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      
      if (!response.ok) {
        throw new Error(`Upload gagal: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ File uploaded: ${data.secure_url}`);
      return data.secure_url;
    } catch (error) {
      console.error('❌ Error upload ke Cloudinary:', error);
      return null;
    }
  };

  // ✅ SIMPAN DATA KE STRAPI (PRODUCTION READY)
  const saveToStrapi = async (pendaftarData, hasFiles = false) => {
    // Mock API untuk development
    if (USE_MOCK_API) {
      console.log('🎭 MOCK API: Simulating response');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockId = Math.floor(Math.random() * 1000) + 1;
      
      return {
        data: {
          id: mockId,
          attributes: {
            ...pendaftarData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString()
          }
        }
      };
    }
    
    try {
      console.log('🚀 Saving to Strapi Production...');
      
      // Data untuk Strapi v4 format
      const dataForStrapi = {
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
      };
      
      console.log('📤 Data to send:', dataForStrapi);
      
      // PRODUCTION: Upload file ke Cloudinary jika ada
      let fileUrls = {};
      
      if (hasFiles && CLOUDINARY_CLOUD_NAME) {
        console.log('☁️ Uploading files to Cloudinary...');
        
        // Upload semua file secara paralel
        const uploadPromises = [];
        
        if (pendaftarData.fotoFile) {
          uploadPromises.push(
            uploadToCloudinary(pendaftarData.fotoFile, 'spmb_foto')
              .then(url => fileUrls.foto = url)
          );
        }
        
        if (pendaftarData.aktaKelahiranFile) {
          uploadPromises.push(
            uploadToCloudinary(pendaftarData.aktaKelahiranFile, 'spmb_dokumen')
              .then(url => fileUrls.aktaKelahiran = url)
          );
        }
        
        if (pendaftarData.kartuKeluargaFile) {
          uploadPromises.push(
            uploadToCloudinary(pendaftarData.kartuKeluargaFile, 'spmb_dokumen')
              .then(url => fileUrls.kartuKeluarga = url)
          );
        }
        
        if (pendaftarData.raporFile) {
          uploadPromises.push(
            uploadToCloudinary(pendaftarData.raporFile, 'spmb_dokumen')
              .then(url => fileUrls.rapor = url)
          );
        }
        
        if (pendaftarData.riwayatPenyakitFile) {
          uploadPromises.push(
            uploadToCloudinary(pendaftarData.riwayatPenyakitFile, 'spmb_dokumen')
              .then(url => fileUrls.riwayatPenyakit = url)
          );
        }
        
        // Tunggu semua upload selesai
        await Promise.all(uploadPromises);
        console.log('✅ All files uploaded:', fileUrls);
        
        // Tambahkan URL file ke data
        dataForStrapi.foto = fileUrls.foto || null;
        dataForStrapi.aktaKelahiran = fileUrls.aktaKelahiran || null;
        dataForStrapi.kartuKeluarga = fileUrls.kartuKeluarga || null;
        dataForStrapi.rapor = fileUrls.rapor || null;
        dataForStrapi.riwayatPenyakit = fileUrls.riwayatPenyakit || null;
      }
      
      // Format payload sesuai Strapi v4
      const requestBody = PAYLOAD_FORMAT === 1 
        ? JSON.stringify({ data: dataForStrapi })
        : JSON.stringify(dataForStrapi);
      
      console.log('📤 Sending to:', `${API_URL}/pendaftars`);
      console.log('📦 Payload:', requestBody);
      
      const response = await fetch(`${API_URL}/pendaftars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response headers:', response.headers);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('❌ Error response:', errorData);
        } catch (e) {
          errorData = { error: { message: await response.text() } };
        }
        
        if (response.status === 404) {
          throw new Error(`Endpoint tidak ditemukan: ${API_URL}/pendaftars`);
        }
        
        if (response.status === 400) {
          if (errorData.error?.message) {
            throw new Error(`Validasi gagal: ${JSON.stringify(errorData.error.message)}`);
          }
          throw new Error(`Data tidak valid: ${JSON.stringify(errorData)}`);
        }
        
        if (response.status === 403) {
          throw new Error('Akses ditolak. Periksa CORS dan permissions di Strapi.');
        }
        
        throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log('✅ Save successful:', result);
      return result;

    } catch (error) {
      console.error('❌ Error saving:', error);
      
      if (IS_PRODUCTION) {
        console.error('🔧 Production Debug Info:');
        console.error('- API_URL:', API_URL);
        console.error('- Endpoint:', `${API_URL}/pendaftars`);
        console.error('- Time:', new Date().toISOString());
        console.error('- Cloudinary Ready:', !!CLOUDINARY_CLOUD_NAME);
      }
      
      throw error;
    }
  };

  // ✅ VALIDASI ENUM VALUES
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
      throw new Error(`Nilai tidak valid: ${invalidFields.join(', ')}`);
    }
  };

  // ✅ VALIDASI FIELD LENGTHS
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

  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🚀 Starting submission...');
      
      // Validasi semua step
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
          throw new Error(`Lengkapi data di Step ${step}`);
        }
      }

      // Validasi tambahan
      validateEnumValues();
      validateFieldLengths();

      console.log('📝 Preparing data...');

      const tempNomor = `SPMB-${Date.now()}`;
      
      if (TEST_WITHOUT_FILES) {
        console.log('🧪 TEST MODE: Tanpa file');
        
        const pendaftarDataNoFiles = {
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

        const result = await saveToStrapi(pendaftarDataNoFiles, false);
        await processRegistrationSuccess(result.data.id, tempNomor);
        
      } else {
        const pendaftarDataWithFiles = {
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
          tanggalDaftar: new Date().toISOString(),
          fotoFile: formData.foto,
          aktaKelahiranFile: formData.aktaKelahiran,
          kartuKeluargaFile: formData.kartuKeluarga,
          raporFile: formData.rapor,
          riwayatPenyakitFile: formData.riwayatPenyakit
        };

        const result = await saveToStrapi(pendaftarDataWithFiles, true);
        await processRegistrationSuccess(result.data.id, tempNomor);
      }

    } catch (error) {
      console.error('❌ Error:', error);
      
      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('Network Error')) {
        if (IS_LOCALHOST) {
          errorMessage = '❌ Tidak dapat menghubungi Strapi.\n\nPastikan Strapi berjalan di localhost:1337\nAtau ubah USE_MOCK_API ke true';
        } else {
          errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
        }
      } else if (error.message.includes('404')) {
        errorMessage = `Endpoint API tidak ditemukan.\n\nPastikan koleksi "pendaftars" sudah dibuat di Strapi.\n\nEndpoint: ${API_URL}/pendaftars`;
      } else if (error.message.includes('403')) {
        errorMessage = 'Akses ditolak. Hubungi administrator untuk konfigurasi permissions.';
      } else if (error.message.includes('400')) {
        errorMessage = 'Data tidak valid: ' + error.message;
      } else if (error.message.includes('413')) {
        errorMessage = 'File terlalu besar. Maksimal 5MB per file.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ PROSES SETELAH REGISTRASI BERHASIL
  const processRegistrationSuccess = async (pendaftarId, tempNomor) => {
    const nomorPendaftaran = `SPMB-${new Date().getFullYear()}${String(pendaftarId).padStart(4, '0')}`;

    if (!USE_MOCK_API) {
      try {
        const updateResponse = await fetch(`${API_URL}/pendaftars/${pendaftarId}`, {
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
          console.warn('⚠️ Gagal update nomor pendaftaran, tetap menggunakan nomor sementara');
        }
      } catch (error) {
        console.warn('⚠️ Error update nomor:', error);
      }
    }

    // Simpan ke localStorage untuk backup
    localStorage.setItem('lastRegistration', JSON.stringify({
      nomorPendaftaran,
      nama: formData.namaLengkap,
      program: formData.programPilihan,
      tanggal: new Date().toLocaleDateString('id-ID'),
      timestamp: Date.now()
    }));

    // Redirect ke halaman konfirmasi
    navigate('/spmb/konfirmasi', { 
      state: { 
        nomorPendaftaran,
        nama: formData.namaLengkap,
        program: formData.programPilihan,
        tanggal: new Date().toLocaleDateString('id-ID')
      }
    });
  };

  // ✅ NAVIGASI STEP
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

  // ✅ RENDER ERROR MESSAGE
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

  // ✅ STEP CONFIGURATION
  const steps = [
    { number: 1, title: 'Data Pribadi' },
    { number: 2, title: 'Data Orang Tua' },
    { number: 3, title: 'Data Akademik' },
    { number: 4, title: 'Upload Dokumen' },
    { number: 5, title: 'Konfirmasi' }
  ];

  // ✅ CHECK STEP COMPLETION
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

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* API Status Banner */}
      {apiStatus === 'offline' && IS_PRODUCTION && (
        <div className="fixed top-20 left-0 right-0 z-50">
          <div className="container-custom">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <strong>Server Offline!</strong>
                <span className="ml-2">Tidak dapat terhubung ke server. Silakan coba beberapa saat lagi.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
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

      {/* Main Form */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-700 font-medium">
                  {USE_MOCK_API ? 'Simulating...' : 'Menyimpan data...'}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Harap tunggu, proses mungkin memakan waktu beberapa detik.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Step 1: Data Pribadi */}
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
                    placeholder="Alamat lengkap"
                  ></textarea>
                  {renderError('alamat')}
                </div>
              </div>
            )}

            {/* Step 2: Data Orang Tua */}
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
                      placeholder="Nama ayah"
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
                      placeholder="Pekerjaan ayah"
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
                      placeholder="Nama ibu"
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
                      placeholder="Pekerjaan ibu"
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
                    placeholder="Alamat orang tua"
                  ></textarea>
                  {renderError('alamatOrtu')}
                </div>
              </div>
            )}

            {/* Step 3: Data Akademik */}
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
                      placeholder="Nama sekolah"
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
                      <option value="">Pilih Tahun</option>
                      {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
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
                      step="0.01"
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

                  <div className="md:col-span-2">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.alamatSekolah ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Alamat sekolah"
                  ></textarea>
                  {renderError('alamatSekolah')}
                </div>
              </div>
            )}

            {/* Step 4: Upload Dokumen */}
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
                
                <p className="text-gray-600 mb-6">
                  Upload dokumen-dokumen berikut (maks. 5MB per file, format: JPG, PNG, PDF)
                  {TEST_WITHOUT_FILES && IS_LOCALHOST && (
                    <span className="text-blue-600 ml-2">[Test Mode: File tidak diupload]</span>
                  )}
                </p>

                <div className="space-y-4">
                  {[
                    { name: 'foto', label: 'Foto 3x4', required: true },
                    { name: 'aktaKelahiran', label: 'Akta Kelahiran', required: true },
                    { name: 'kartuKeluarga', label: 'Kartu Keluarga', required: true },
                    { name: 'rapor', label: 'Rapor', required: true },
                    { name: 'riwayatPenyakit', label: 'Surat Riwayat Penyakit', required: false }
                  ].map((doc) => (
                    <div key={doc.name} className={`border rounded-lg p-4 ${
                      errors[doc.name] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {doc.label} {doc.required && '*'}
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          name={doc.name}
                          onChange={handleInputChange}
                          required={doc.required && !TEST_WITHOUT_FILES}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                        />
                        {formData[doc.name] && (
                          <span className="text-green-600 text-sm font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Terupload
                          </span>
                        )}
                      </div>
                      {errors[doc.name] && (
                        <p className="text-red-600 text-xs mt-2 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors[doc.name]}
                        </p>
                      )}
                      {formData[doc.name] && (
                        <p className="text-gray-500 text-xs mt-1">
                          File: {formData[doc.name].name} ({(formData[doc.name].size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Konfirmasi */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Konfirmasi</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Data Lengkap!</h3>
                      <p className="text-green-600">Periksa kembali data sebelum submit.</p>
                      {IS_PRODUCTION && (
                        <p className="text-yellow-600 text-sm mt-1">
                          Data akan disimpan ke server production.
                        </p>
                      )}
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
                      {['foto', 'aktaKelahiran', 'kartuKeluarga', 'rapor', 'riwayatPenyakit'].map(doc => (
                        <p key={doc}>
                          <span className="text-gray-600">{doc}:</span>{' '}
                          {formData[doc] ? '✓ Terupload' : doc === 'riwayatPenyakit' ? '✓ Opsional' : '✗ Belum'}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-blue-800 text-sm">
                        Data yang diisi adalah benar dan siap mengikuti proses seleksi.
                      </p>
                      <p className="text-blue-600 text-xs mt-1">
                        Dengan mengklik "Submit Pendaftaran", Anda menyetujui syarat dan ketentuan.
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
                    Lanjut
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {USE_MOCK_API ? 'Simulating...' : 'Memproses...'}
                      </>
                    ) : (
                      'Submit Pendaftaran'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Information Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Informasi Penting</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Pastikan data benar dan lengkap</li>
                  <li>• Anda akan mendapatkan nomor pendaftaran</li>
                  <li>• Proses seleksi 3-5 hari kerja</li>
                  <li>• Hubungi: 0853-6826-2156</li>
                  {IS_PRODUCTION && (
                    <li className="text-green-700 font-medium">• Mode: PRODUCTION - Data akan disimpan ke server</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Mode Banner */}
      {IS_LOCALHOST && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 shadow-lg max-w-xs">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h3 className="font-bold text-yellow-800">DEV MODE (Vite)</h3>
            </div>
            <p className="text-sm text-yellow-700 mb-2">
              {USE_MOCK_API ? 'Using Mock API' : `API: ${API_URL}`}
            </p>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Environment:</span>
                <span className="px-2 rounded bg-purple-200 text-purple-800">
                  {IS_LOCALHOST ? 'Development' : 'Production'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Mock API:</span>
                <span className={`px-2 rounded ${USE_MOCK_API ? 'bg-green-200 text-green-800' : 'bg-gray-200'}`}>
                  {USE_MOCK_API ? 'ON' : 'OFF'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>No Files:</span>
                <span className={`px-2 rounded ${TEST_WITHOUT_FILES ? 'bg-green-200 text-green-800' : 'bg-gray-200'}`}>
                  {TEST_WITHOUT_FILES ? 'ON' : 'OFF'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cloudinary:</span>
                <span className={`px-2 rounded ${CLOUDINARY_CLOUD_NAME ? 'bg-blue-200 text-blue-800' : 'bg-gray-200'}`}>
                  {CLOUDINARY_CLOUD_NAME ? 'READY' : 'OFF'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>API Status:</span>
                <span className={`px-2 rounded ${
                  apiStatus === 'connected' ? 'bg-green-200 text-green-800' : 
                  apiStatus === 'checking' ? 'bg-yellow-200 text-yellow-800' : 
                  apiStatus === 'offline' ? 'bg-red-200 text-red-800' : 'bg-gray-200'
                }`}>
                  {apiStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Daftar;