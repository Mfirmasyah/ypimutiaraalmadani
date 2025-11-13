import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION } from '../../utils/constants';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent accidental closing
  };

  const handleDropdownClick = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-2xl py-2 border-b border-gray-100' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo dengan Glass Effect */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 z-60 group"
          >
            <div className={`relative transition-all duration-500 ${
              scrolled ? 'p-1' : 'p-1.5'
            }`}>
              {/* Glass effect background */}
              <div className={`absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 ${
                scrolled ? 'shadow-lg' : 'shadow-xl'
              } transition-all duration-500`}></div>
              
              <img 
                src="/assets/logo.png"
                alt="Logo Yayasan Pendidikan Islam Mutiara Al-Madani"
                className={`relative transition-all duration-500 ${
                  scrolled ? 'h-10 w-10' : 'h-12 w-12'
                } object-cover rounded-full shadow-lg group-hover:scale-110 group-hover:rotate-3 transform-gpu`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = `relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                    scrolled ? 'h-10 w-10' : 'h-12 w-12'
                  }`;
                  fallback.textContent = 'MAM';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
            </div>
            
            {/* Nama Yayasan dengan Gradient Text */}
            <div className="flex flex-col">
              <span className={`text-lg font-bold transition-all duration-500 ${
                scrolled 
                  ? 'text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text' 
                  : 'text-white drop-shadow-lg'
              } group-hover:scale-105 transform-gpu`}>
                MUTIARA AL-MADANI
              </span>
              <span className={`text-xs transition-all duration-500 ${
                scrolled ? 'text-gray-600' : 'text-blue-100'
              }`}>
                Yayasan Pendidikan Islam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation dengan Enhanced Styling */}
          <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {NAVIGATION.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Main Navigation Item */}
                <div className="flex items-center">
                  <Link
                    to={item.path}
                    className={`relative font-semibold transition-all duration-300 py-3 px-4 rounded-xl ${
                      scrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80' 
                        : 'text-white hover:text-blue-200 hover:bg-white/10'
                    } ${
                      location.pathname === item.path 
                        ? (scrolled 
                            ? 'text-blue-600 bg-blue-50/80 shadow-sm' 
                            : 'text-blue-300 bg-white/20 shadow-lg')
                        : ''
                    } group/nav`}
                  >
                    {item.name}
                    
                    {/* Active Indicator */}
                    {location.pathname === item.path && (
                      <motion.div 
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                          scrolled ? 'bg-blue-600' : 'bg-yellow-400'
                        }`}
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover/nav:from-blue-500/10 group-hover/nav:to-purple-500/10 transition-all duration-500`}></div>
                  </Link>
                  
                  {/* Dropdown Arrow */}
                  {item.children && (
                    <button
                      onClick={() => handleDropdownClick(item.name)}
                      className={`ml-1 p-1 rounded-lg transition-all duration-200 ${
                        activeDropdown === item.name ? 'rotate-180 bg-white/20' : 'rotate-0'
                      } ${
                        scrolled 
                          ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                          : 'text-white hover:text-blue-200 hover:bg-white/10'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Enhanced Dropdown Menu */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-3 z-50 border border-white/20 overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Dropdown background effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/30 opacity-60"></div>
                        
                        {item.children.map((child, index) => (
                          <motion.div
                            key={child.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={child.path}
                              className="relative block px-6 py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium group/dropdown z-10"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {/* Hover background */}
                              <div className="absolute inset-0 bg-blue-500/0 group-hover/dropdown:bg-blue-500/5 rounded-lg transition-all duration-300"></div>
                              
                              {/* Animated bullet */}
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover/dropdown:opacity-100 transition-all duration-300 group-hover/dropdown:scale-150"></div>
                              
                              <span className="relative left-2">{child.name}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 z-60 ${
              scrolled 
                ? 'text-gray-700 bg-white/80 border-gray-200 hover:bg-white hover:shadow-lg' 
                : 'text-white bg-white/10 border-white/20 hover:bg-white/20 hover:shadow-lg'
            }`}
          >
            <motion.div
              animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden bg-white/95 backdrop-blur-md mt-4 rounded-2xl shadow-2xl overflow-hidden z-50 relative border border-white/20"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/30 opacity-60"></div>
              
              <div className="relative py-3">
                {NAVIGATION.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between px-4">
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 text-gray-700 hover:text-blue-600 transition-colors flex-1 font-medium group/mobile"
                      >
                        <div className="flex items-center">
                          {/* Active dot */}
                          {location.pathname === item.path && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          )}
                          <span className={`${location.pathname === item.path ? 'text-blue-600 font-semibold' : ''}`}>
                            {item.name}
                          </span>
                        </div>
                      </Link>
                      {item.children && (
                        <button
                          onClick={() => handleDropdownClick(item.name)}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-lg"
                        >
                          <motion.svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>
                      )}
                    </div>
                    {item.children && (
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-blue-50/30 backdrop-blur-sm border-t border-blue-100/30"
                          >
                            {item.children.map((child, childIndex) => (
                              <motion.div
                                key={child.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: childIndex * 0.05 }}
                              >
                                <Link
                                  to={child.path}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setActiveDropdown(null);
                                  }}
                                  className="block px-8 py-3 text-gray-600 hover:text-blue-600 hover:bg-white/50 transition-all duration-300 text-sm font-medium"
                                >
                                  {child.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;