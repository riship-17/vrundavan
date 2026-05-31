import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

import { handleGlobalNavClick } from '../utils/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

const categories = ['ALL', 'PIPELINE', 'ENERGY', 'RESIDENTIAL', 'INDUSTRIAL', 'COMMERCIAL', 'BRIDGES', 'HIGHWAY', 'URBAN'];

const ProjectsOverview: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const projectsArray = Object.values(projectsData).filter(p => p.id !== 'statue-of-unity'); // Exclude detailed one for grid match, or include as needed

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar Background Toggle
      const handleScroll = () => {
        const nav = document.getElementById('projects-nav');
        if (window.scrollY > 100) {
          nav?.classList.add('bg-black');
          nav?.classList.remove('bg-transparent');
        } else {
          nav?.classList.remove('bg-black');
          nav?.classList.add('bg-transparent');
        }
      };
      window.addEventListener('scroll', handleScroll);

      // Entrance Animations
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: "#project-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      return () => window.removeEventListener('scroll', handleScroll);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Filtering Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      
      const matching = cards.filter((card: HTMLElement) => activeCategory === 'ALL' || card.dataset.category === activeCategory.toLowerCase());
      const nonMatching = cards.filter((card: HTMLElement) => activeCategory !== 'ALL' && card.dataset.category !== activeCategory.toLowerCase());

      if (nonMatching.length) {
        gsap.to(nonMatching, { scale: 0.8, opacity: 0, duration: 0.4, ease: "power2.in", display: 'none' });
      }
      if (matching.length) {
        gsap.to(matching, { display: 'block', scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", clearProps: "transform" });
      }
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Logic to append more data would go here
    }, 2000);
  };

  return (
    <div className="bg-background text-on-background" ref={containerRef}>
      {/* TopNavBar */}
      <header id="projects-nav" className="fixed top-0 w-full z-50 bg-transparent transition-colors duration-500 border-b border-white/10">
        <nav className="flex justify-between items-center max-w-max-width mx-auto px-gutter py-base">
          <div className="font-headline-h3 text-[28px] text-on-primary-container tracking-tighter">● VRUNDAVAN</div>
          <div className="hidden md:flex items-center space-x-8">
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
          </div>
          <button className="bg-primary hover:bg-primary-container text-white px-6 py-3 font-label-caps tracking-widest transition-all duration-300 active:scale-95">
            GET A QUOTE
          </button>
        </nav>
      </header>

      {/* Page Hero */}
      <section className="relative h-[512px] min-h-[400px] flex flex-col justify-end overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940&auto=format&fit=crop"
            alt="Cinematic wide shot of a massive bridge construction"
            className="w-full h-full object-cover grayscale-[30%] opacity-70"
          />
        </div>
        <div className="max-w-max-width mx-auto px-gutter relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="font-headline-h1 text-[64px] md:text-[96px] text-white mb-2 uppercase leading-none">OUR PROJECTS</h1>
            <p className="font-body-lg text-white/80 text-[18px]">412+ completed infrastructure and commercial milestones across the nation. Engineering excellence, delivered.</p>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[70px] z-40 bg-black overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-white/10">
        <div className="max-w-max-width mx-auto px-gutter flex items-center h-16 space-x-10">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-label-caps h-full flex items-center transition-colors ${activeCategory === cat ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <section className="bg-black py-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]" id="project-grid" ref={gridRef}>
          {projectsArray.map((project) => (
            <a 
              key={project.id} 
              href={`/projects/${project.id}`} 
              className={`project-card relative overflow-hidden group bg-inverse-surface ${project.heightClass} block`} 
              data-category={project.category}
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('triggerMorphTransition', { 
                  detail: { 
                    onNavigate: () => {
                      window.history.pushState({}, '', `/projects/${project.id}`);
                      window.dispatchEvent(new Event('popstate'));
                    }
                  } 
                }));
              }}
            >
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={project.title} src={project.thumbnailImage} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="inline-block w-fit bg-primary text-white text-[10px] font-label-caps px-2 py-1 mb-3">{project.categoryLabel}</span>
                <h3 className="font-headline-h1 text-[36px] leading-none mb-1">{project.title}</h3>
                <p className="font-label-caps text-white/60 text-[12px]">{project.location}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center py-20">
          <button 
            onClick={handleLoadMore} 
            disabled={isLoading}
            className={`flex items-center space-x-3 px-12 py-4 border border-white text-white font-headline-h3 tracking-widest transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'hover:bg-white hover:text-black'}`}
          >
            <span>{isLoading ? 'LOADING PROJECTS...' : 'LOAD MORE PROJECTS'}</span>
            {isLoading && <span className="material-symbols-outlined animate-spin">progress_activity</span>}
          </button>
        </div>
      </section>

      {/* Footer Placeholder */}
    </div>
  );
};

export default ProjectsOverview;
