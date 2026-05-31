import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { handleGlobalNavClick } from '../utils/navigation';
import { projectsData } from '../data/projectsData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectDetailProps {
  projectId?: keyof typeof projectsData;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId = 'statue-of-unity' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = projectsData[projectId];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('h1', { y: 100, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.from('.mini-stats > div', { y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.5 });
      
      // Navbar Color Toggle on Scroll
      const handleScroll = () => {
        const nav = document.getElementById('detail-nav');
        if (window.scrollY > 100) {
          nav?.classList.add('bg-black');
          nav?.classList.remove('bg-transparent');
        } else {
          nav?.classList.remove('bg-black');
          nav?.classList.add('bg-transparent');
        }

        // Subtle Parallax
        const heroImg = document.getElementById('hero-parallax-img');
        if (heroImg) {
          heroImg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
        }
      };
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }, containerRef);

    return () => ctx.revert();
  }, [projectId]);

  const triggerSlashTransition = (e: React.MouseEvent) => {
    e.preventDefault();
    const slash = document.getElementById('slash-overlay');
    if (slash) {
      gsap.set(slash, { left: '-100%' });
      gsap.to(slash, {
        left: '100%',
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(slash, { left: '-100%' });
          // Typically you would trigger your React Router navigation here
          window.location.href = '/projects'; // fallback
        }
      });
    }
  };

  if (!data) return <div>Project not found</div>;

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary selection:text-white" ref={containerRef}>
      {/* Horizontal Slash Transition Overlay */}
      <div className="horizontal-slash" id="slash-overlay"></div>

      {/* Navigation */}
      <header id="detail-nav" className="bg-transparent transition-colors duration-500 fixed top-0 w-full z-50 border-b border-white/10">
        <div className="flex justify-between items-center max-w-max-width mx-auto px-gutter py-base">
          <div className="font-headline-h3 text-[28px] text-white tracking-tighter">● VRUNDAVAN</div>
          <nav className="hidden md:flex items-center gap-8">
            {['HOME', 'ABOUT', 'SERVICES', 'PROJECTS', 'CONTACT'].map((item) => {
              const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
              return (
                <a 
                  key={item} 
                  href={path} 
                  className={`font-nav-link text-nav-link uppercase text-on-primary-container hover:text-primary transition-colors duration-300 ${item === 'PROJECTS' ? 'text-primary border-b-2 border-primary pb-1' : ''}`}
                  onClick={(e) => handleGlobalNavClick(e, item, path)}
                >
                  {item}
                </a>
              );
            })}
          </nav>
          <button className="bg-primary text-white font-label-caps px-6 py-3 tracking-widest hover:bg-primary-container transition-all duration-300 active:scale-95">
            GET A QUOTE
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[716px] w-full overflow-hidden flex items-end pb-20 bg-black">
        <div className="absolute inset-0 z-0">
          <img id="hero-parallax-img" className="w-full h-full object-cover origin-top" alt={data.title} src={data.heroImage} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="max-w-max-width mx-auto px-gutter w-full relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary text-white font-label-caps text-[12px] px-3 py-1 tracking-widest uppercase">{data.categoryLabel}</span>
            <span className="text-white/40 font-headline-h1 text-4xl opacity-50 select-none">01</span>
          </div>
          <h1 className="font-headline-h1 text-[64px] md:text-[80px] leading-none text-white uppercase max-w-4xl">{data.title}</h1>
          <div className="mt-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            <p className="font-headline-h2 text-[18px] text-white/80 uppercase tracking-wider">{data.location}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-[#f4f4ef] py-section-gap">
        <div className="max-w-max-width mx-auto px-gutter grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column: Description */}
          <div className="md:col-span-7">
            <div className="space-y-6 text-[#5a413a]">
              {data.description.map((paragraph, idx) => (
                <p key={idx} className={`font-body-md text-[16px] leading-relaxed ${idx === 0 ? 'text-[18px] font-medium' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Mini Stats */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 mini-stats">
              {data.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="h-[2px] w-12 bg-primary mb-4"></div>
                  <span className="font-headline-h1 text-4xl text-primary block leading-none">{stat.value}</span>
                  <span className="font-label-caps text-black uppercase text-[12px]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-32 bg-[#2f312e] p-10 border border-white/5 shadow-2xl">
              <h3 className="font-headline-h3 text-white mb-8 border-b border-white/10 pb-4 uppercase">Project Details</h3>
              <ul className="space-y-6">
                {Object.entries(data.quickFacts).map(([key, val]) => (
                  <li key={key} className="flex flex-col">
                    <span className="font-label-caps text-primary text-[11px] uppercase tracking-widest mb-1">{key}</span>
                    <span className="font-body-md text-white/90">{val}</span>
                  </li>
                ))}
                {data.highlights.length > 0 && (
                  <li className="flex flex-col">
                    <span className="font-label-caps text-primary text-[11px] uppercase tracking-widest mb-1">Highlights</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.highlights.map((tag, idx) => (
                        <span key={idx} className="bg-white/10 text-white/70 text-[10px] px-2 py-1 rounded-sm uppercase font-label-caps border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Gallery Slider */}
      <section className="bg-white py-section-gap overflow-hidden">
        <div className="max-w-max-width mx-auto px-gutter mb-12 flex justify-between items-end">
          <div>
            <span className="font-label-caps text-primary uppercase mb-2 block">Visual Progress</span>
            <h2 className="font-headline-h2 text-[32px] text-black uppercase leading-none">Project Site Gallery</h2>
          </div>
          <div className="flex gap-4 mb-2">
            <button className="gallery-prev swiper-button-prev !static !m-0 !mt-0"></button>
            <button className="gallery-next swiper-button-next !static !m-0 !mt-0"></button>
          </div>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1.2}
          spaceBetween={24}
          centeredSlides={true}
          loop={true}
          pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
          navigation={{ nextEl: '.gallery-next', prevEl: '.gallery-prev' }}
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 1.8 }
          }}
          className="px-gutter"
        >
          {data.gallery.map((imgUrl, idx) => (
            <SwiperSlide key={idx} className="h-[400px] md:h-[665px]">
              <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-black/5" src={imgUrl} alt={`Gallery image ${idx + 1}`} />
            </SwiperSlide>
          ))}
          <div className="custom-swiper-pagination text-center mt-8 relative"></div>
        </Swiper>
      </section>

      {/* Navigation Strip */}
      <section className="w-full flex flex-col md:flex-row h-auto md:h-[200px] border-t border-white/10">
        <a href="#" onClick={triggerSlashTransition} className="relative flex-1 bg-[#dadad5] h-[150px] md:h-full overflow-hidden flex items-center justify-start px-gutter group/prev">
          <div className="absolute inset-0 bg-black translate-y-full group-hover/prev:translate-y-0 transition-transform duration-500"></div>
          <div className="relative z-10">
            <span className="font-label-caps text-[12px] text-primary mb-2 block">PREVIOUS PROJECT</span>
            <h4 className="font-headline-h1 text-[36px] leading-none text-black group-hover/prev:text-white transition-colors duration-500 uppercase">Narmada Bridge Retrofit</h4>
          </div>
          <span className="material-symbols-outlined absolute right-12 text-primary opacity-0 group-hover/prev:opacity-100 translate-x-4 group-hover/prev:translate-x-0 transition-all duration-500 text-5xl hidden md:block">arrow_back</span>
        </a>
        
        <a href="#" onClick={triggerSlashTransition} className="relative flex-1 bg-black h-[150px] md:h-full overflow-hidden flex items-center justify-end px-gutter group/next text-right">
          <div className="absolute inset-0 bg-primary -translate-y-full group-hover/next:translate-y-0 transition-transform duration-500"></div>
          <div className="relative z-10">
            <span className="font-label-caps text-[12px] text-white/50 mb-2 block group-hover/next:text-white/80 transition-colors duration-500">NEXT PROJECT</span>
            <h4 className="font-headline-h1 text-[36px] leading-none text-white uppercase">Airport Terminal Foundation</h4>
          </div>
          <span className="material-symbols-outlined absolute left-12 text-white opacity-0 group-hover/next:opacity-100 -translate-x-4 group-hover/next:translate-x-0 transition-all duration-500 text-5xl hidden md:block">arrow_forward</span>
        </a>
      </section>
    </div>
  );
};

export default ProjectDetail;
