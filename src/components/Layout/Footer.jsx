import React from 'react';
import { Link } from 'react-router-dom';
import { SCHOOL_INFO } from '../../utils/constants';
import JadwalSholat from '../JadwalSholat';
import Logo from '/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={Logo}
                alt="Logo Yayasan"
                className='w-12 h-12 object-contain rounded-full border-2 border-white'/>
              <span className="text-xl font-bold">YAYASAN PENDIDIKAN ISLAM<br></br> MUTIARA AL-MADANI</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Yayasan pendidikan islam yang berkomitmen untuk memberikan pendidikan terbaik 
              yang mengintegrasikan ilmu pengetahuan dan nilai-nilai Islam.
            </p>
            <div className="flex space-x-4">
              {Object.entries(SCHOOL_INFO.socialMedia).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/program" className="text-gray-300 hover:text-white transition-colors">Program</Link></li>
              <li><Link to="/spmb/info" className="text-gray-300 hover:text-white transition-colors">PPDB</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Galeri</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Prayer Times */}
          <div>
            <JadwalSholat />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Yayasan Pendidikan Islam Mutiara Al-Madani. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;