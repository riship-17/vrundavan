import React, { useState, useEffect } from 'react';
import { handleGlobalNavClick } from '../utils/navigation';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 border-b border-white/10 ${
        isScrolled ? 'bg-black' : 'bg-transparent'
      }`}
      id="top-nav"
    >
      <div className="flex justify-between items-center max-w-max-width mx-auto px-gutter py-base">
        <div className="font-headline-h3 text-[24px] md:text-[28px] text-on-primary-container tracking-tighter z-[60]">
          VRUNDAVAN
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['HOME', 'ABOUT', 'SERVICES', 'PROJECTS', 'CONTACT'].map((item) => {
            const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
            const isActive = window.location.pathname === path;
            return (
              <a
                key={item}
                href={path}
                onClick={(e) => handleGlobalNavClick(e, item, path)}
                className={`font-nav-link text-nav-link uppercase transition-colors duration-300 ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-primary-container hover:text-primary orange-underline-animation'}`}
              >
                {item}
              </a>
            );
          })}
        </div>
        
        <button className="hidden md:block px-6 py-2 bg-primary text-white font-label-caps tracking-widest text-[13px] hover:bg-primary-container transition-all active:scale-95 duration-200">
          GET A QUOTE
        </button>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-white z-[60] p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div 
        className={`fixed inset-0 bg-black z-[50] flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {['HOME', 'ABOUT', 'SERVICES', 'PROJECTS', 'CONTACT'].map((item) => {
            const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
            const isActive = window.location.pathname === path;
            return (
              <a
                key={item}
                href={path}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleGlobalNavClick(e, item, path);
                }}
                className={`font-display-lg text-4xl uppercase transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white hover:text-primary'}`}
              >
                {item}
              </a>
            );
        })}
        <button className="mt-8 px-8 py-4 bg-primary text-white font-label-caps tracking-widest text-lg hover:bg-primary-container transition-all active:scale-95 duration-200 w-3/4 max-w-sm">
          GET A QUOTE
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
