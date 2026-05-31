import React, { useState, useEffect } from 'react';
import { handleGlobalNavClick } from '../utils/navigation';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="font-headline-h3 text-[28px] text-on-primary-container tracking-tighter">
          VRUNDAVAN
        </div>
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
        <button className="px-6 py-2 bg-primary text-white font-label-caps tracking-widest text-[13px] hover:bg-primary-container transition-all active:scale-95 duration-200">
          GET A QUOTE
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
