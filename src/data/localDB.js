// src/data/localDB.js

// Ambil data dari localStorage
export const getData = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getData:", error);
    return [];
  }
};

// Simpan data ke localStorage
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saveData:", error);
  }
};

// Hapus data tertentu
export const deleteData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleteData:", error);
  }
};
