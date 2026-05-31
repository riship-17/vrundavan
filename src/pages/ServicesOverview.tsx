import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import { handleGlobalNavClick } from '../utils/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data/servicesData';

gsap.registerPlugin(ScrollTrigger);

const ServicesOverview: React.FC = () => {
  const mainContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header scroll effect logic
      const handleScroll = () => {
        const header = document.getElementById('services-header');
        if (window.scrollY > 50) {
          header?.classList.add('bg-black/95');
          header?.classList.remove('bg-transparent');
        } else {
          header?.classList.remove('bg-black/95');
          header?.classList.add('bg-transparent');
        }
      };
      window.addEventListener('scroll', handleScroll);

      // Hero Content Reveal
      gsap.from(".hero-content > *", {
        duration: 1.5,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Service Cards Reveal
      gsap.from(".service-card", {
        duration: 1.2,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".mosaic-grid",
          start: "top 80%",
        }
      });

      // Background Watermark Reveal
      gsap.from(".service-card .watermark-text", {
        duration: 2,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mosaic-grid",
          start: "top 80%",
        }
      });

      return () => window.removeEventListener('scroll', handleScroll);
    }, mainContainer);

    return () => ctx.revert();
  }, []);

  // Use Object.values to iterate over our data
  const servicesArray = Object.values(servicesData);

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden" ref={mainContainer}>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Page Hero */}
      <section className="relative h-[512px] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1541888081691-3e4a9057b1bc?q=80&w=2940&auto=format&fit=crop"
            alt="Cinematic shot of heavy construction site"
            className="w-full h-full object-cover grayscale-[30%] opacity-80"
          />
        </div>
        <div className="relative z-10 text-center px-gutter hero-content">
          <h1 className="font-display-lg text-[64px] md:text-[96px] text-white mb-4 tracking-tighter leading-none">OUR SERVICES</h1>
          <p className="font-headline-h3 text-[24px] text-white/80 max-w-2xl mx-auto uppercase tracking-widest">End-to-end infrastructure across eight specialisations.</p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="w-full bg-black">
        {/* Note: Ensure .mosaic-grid is in your index.css or use Tailwind grid classes: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-black border border-black */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-black border border-black mosaic-grid">
          {servicesArray.map((service) => (
            <a 
              href={`/services/${service.id}`} 
              key={service.id} 
              className="service-card group relative h-[380px] overflow-hidden cursor-pointer bg-inverse-surface block"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('triggerMorphTransition', { 
                  detail: { 
                    onNavigate: () => {
                      window.history.pushState({}, '', `/services/${service.id}`);
                      window.dispatchEvent(new Event('popstate'));
                    }
                  } 
                }));
              }}
            >
              <img 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={service.title} 
                src={service.heroImage} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
              
              <div className="absolute top-4 right-4 font-display-lg text-[80px] text-white/10 pointer-events-none uppercase watermark-text">
                {service.title.split(' ')[0]}
              </div>
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">arrow_forward</span>
              </div>
              
              <div className="absolute bottom-8 left-8 pr-4">
                <span className="inline-block bg-primary text-white font-label-caps text-[10px] px-3 py-1 mb-4 tracking-widest">
                  {service.category}
                </span>
                <h3 className="font-display-lg text-white text-[32px] leading-none mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                  {service.title}
                </h3>
                <p className="font-nav-link text-white/55 text-[13px] font-normal uppercase tracking-wider">
                  {service.shortDesc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Project CTA Section */}
      <section className="py-section-gap px-gutter bg-surface-container-low border-t border-white/10">
        <div className="max-w-max-width mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="md:max-w-xl">
            <h2 className="font-display-lg text-[64px] text-on-surface mb-6 uppercase tracking-tight leading-none">LET'S BUILD THE FUTURE</h2>
            <p className="font-body-lg text-[18px] text-tertiary mb-0">From complex pipeline networks to high-speed railway corridors, our infrastructure solutions are built to last generations.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-primary text-on-primary font-label-caps px-10 py-5 tracking-widest hover:brightness-110 transition-all uppercase">DOWNLOAD BROCHURE</button>
            <button className="border border-on-surface text-on-surface font-label-caps px-10 py-5 tracking-widest hover:bg-on-surface hover:text-surface transition-all uppercase">VIEW PROJECTS</button>
          </div>
        </div>
      </section>

      {/* Footer code remains identical to the template provided... */}
    </div>
  );
};

export default ServicesOverview;