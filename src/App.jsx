import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages Publik
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import TK from './pages/Program/TK.jsx';
import SD from './pages/Program/SD.jsx';
import SMP from './pages/Program/SMP.jsx';
import Info from './pages/SPMB/Info.jsx';
import Daftar from './pages/SPMB/Daftar.jsx';
import CekStatus from './pages/SPMB/CekStatus.jsx';
import Achievement from './pages/Achievement.jsx';
import Edukasi from './pages/Edukasi.jsx';
import EdukasiDetail from './pages/edukasiDetail.jsx';
import Parenting from './pages/Parenting.jsx';
import ParentingDetail from './pages/ParentingDetail.jsx';
import Gallery from './pages/Gallery.jsx';
import Berita from './pages/News.jsx';
import BeritaDetail from './pages/NewsDetail.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/program/tk" element={<TK />} />
            <Route path="/program/sd" element={<SD />} />
            <Route path="/program/smp" element={<SMP />} />
            <Route path="/spmb/info" element={<Info />} />
            <Route path="/spmb/daftar" element={<Daftar />} />
            <Route path="/spmb/cek-status" element={<CekStatus />} />
            <Route path="/achievement" element={<Achievement />} />
            <Route path="/edukasi" element={<Edukasi />} />
             <Route path="/edukasi/:slug" element={<EdukasiDetail />} />
            <Route path="/parenting" element={<Parenting />} />
            <Route path="/parenting/:slug" element={<ParentingDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<Berita />} />
            <Route path="/news/:slug" element={<BeritaDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer & WhatsApp */}
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;