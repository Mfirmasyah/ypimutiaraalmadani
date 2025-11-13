import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";


const JadwalSholat = () => {
  const [jadwal, setJadwal] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulasi data jadwal sholat (dalam implementasi nyata, ambil dari API)
    const sampleJadwal = {
      tanggal: new Date().toLocaleDateString('id-ID'),
      jadwal: [
        { name: 'Subuh', time: '04:30' },
        { name: 'Dzuhur', time: '12:00' },
        { name: 'Ashar', time: '15:30' },
        { name: 'Maghrib', time: '18:00' },
        { name: 'Isya', time: '19:30' }
      ]
    };
    setJadwal(sampleJadwal);

    // Update waktu setiap detik
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getNextPrayer = () => {
    if (!jadwal) return null;

    const current = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (let prayer of jadwal.jadwal) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      
      if (prayerTime > current) {
        return {
          ...prayer,
          timeLeft: prayerTime - current
        };
      }
    }
    
    // Jika tidak ada sholat berikutnya, kembalikan sholat pertama besok
    return {
      ...jadwal.jadwal[0],
      timeLeft: (24 * 60 - current) + (4 * 60 + 30) // sampai subuh besok
    };
  };

  const nextPrayer = getNextPrayer();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Jadwal Sholat
      </h3>
      
      <div className="text-center mb-4">
        <p className="text-gray-600">{jadwal?.tanggal}</p>
        <p className="text-2xl font-bold text-gray-800 mt-2">
          {currentTime.toLocaleTimeString('id-ID')}
        </p>
      </div>

      {nextPrayer && (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-blue-50 rounded-lg p-4 mb-4 text-center"
        >
          <p className="text-sm text-gray-600">Sholat Berikutnya</p>
          <p className="text-lg font-bold text-blue-600">{nextPrayer.name}</p>
          <p className="text-2xl font-bold text-gray-800">{nextPrayer.time}</p>
          <p className="text-sm text-gray-600 mt-1">
            {Math.floor(nextPrayer.timeLeft / 60)} jam {nextPrayer.timeLeft % 60} menit lagi
          </p>
        </motion.div>
      )}

      <div className="space-y-3">
        {jadwal?.jadwal.map((sholat, index) => (
          <motion.div
            key={sholat.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span className="font-medium text-gray-700">{sholat.name}</span>
            <span className="font-bold text-gray-800">{sholat.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default JadwalSholat;