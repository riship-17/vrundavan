import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import { handleGlobalNavClick } from '../utils/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data/servicesData';

gsap.registerPlugin(ScrollTrigger);

// For demonstration, we'll default to 'tower', but this should be passed via props or React Router useParams()
interface ServiceDetailProps {
  serviceId?: keyof typeof servicesData; 
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId = 'tower' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = servicesData[serviceId];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Image Scale & Title Reveal
      gsap.from(".hero-image", {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top"
        }
      });

      // Sidebar reveal
      gsap.from("#sidebar-card", {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#sidebar-card",
          start: "top 80%"
        }
      });

      // Bullets stagger reveal
      gsap.from(".bullet-item", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#bullet-list",
          start: "top 85%"
        }
      });

      // Navbar transition
      const handleScroll = () => {
        const nav = document.getElementById('detail-top-nav');
        if (window.scrollY > 100) {
          nav?.classList.remove('bg-transparent');
          nav?.classList.add('bg-black', 'py-2');
        } else {
          nav?.classList.add('bg-transparent');
          nav?.classList.remove('bg-black', 'py-2');
        }
      };
      window.addEventListener('scroll', handleScroll);

      // Projects reveal
      gsap.from(".project-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#projects-section",
          start: "top 90%"
        }
      });

      return () => window.removeEventListener('scroll', handleScroll);
    }, containerRef);

    return () => ctx.revert();
  }, [serviceId]);

  if (!data) return <div>Service not found</div>;

  return (
    <div className="bg-background text-on-background overflow-x-hidden" ref={containerRef}>
      {/* Ensure .blind-reveal { clip-path: inset(0 0 100% 0); } is in your CSS */}
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[614px] w-full flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt={data.title} 
            className="w-full h-full object-cover" 
            src={data.heroImage} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
        </div>
        <div className="relative z-10 max-w-max-width mx-auto px-gutter w-full pb-16">
          <div className="mb-6 opacity-80">
            <p className="font-headline-h2 text-[11px] font-normal tracking-[0.40em] text-white uppercase">HOME / SERVICES / {data.title}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-primary tracking-widest">{data.category}</span>
            <h1 className="font-display-lg text-[64px] md:text-[80px] leading-none text-white uppercase">{data.title}</h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-[#F5F5F0] py-section-gap">
        <div className="max-w-max-width mx-auto px-gutter grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Content */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-6">
              {data.paragraphs.map((p, idx) => (
                <p key={idx} className="font-body-md text-[16px] text-[#34343E] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            
            <ul id="bullet-list" className="space-y-4 pt-4">
              {data.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3 bullet-item">
                  <span className="h-[2px] w-4 bg-primary shrink-0"></span>
                  <span className="font-headline-h2 text-[14px] font-medium text-black uppercase tracking-wider">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Quick Facts Card */}
          <div id="sidebar-card" className="md:col-span-5 md:sticky md:top-32">
            <div className="bg-black p-10 border border-white/10">
              <span className="font-label-caps text-primary tracking-widest mb-8 block">QUICK FACTS</span>
              <div className="space-y-0">
                {Object.entries(data.quickFacts).map(([key, val], idx, arr) => (
                  <div key={key} className={`flex justify-between items-center py-5 ${idx !== arr.length - 1 ? 'border-b border-white/10' : ''}`}>
                    <span className="font-caption text-white/40 uppercase tracking-widest">{key}</span>
                    <span className="font-headline-h2 text-[18px] text-white">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Related Projects Section */}
      <section id="projects-section" className="bg-black py-section-gap overflow-hidden">
        <div className="max-w-max-width mx-auto px-gutter">
          <h2 className="font-display-lg text-[48px] text-white uppercase mb-16 project-reveal">RELATED PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            
            {data.projects.map((project, idx) => (
              <div key={idx} className="group cursor-pointer project-reveal">
                <div className="aspect-[16/9] overflow-hidden border border-white/10 relative">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                    src={project.image} 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-500"></div>
                </div>
                <div className="mt-6 flex justify-between items-end">
                  <div>
                    <span className="font-label-caps text-primary tracking-widest">{project.category}</span>
                    <h3 className="font-headline-h2 text-[24px] text-white mt-1">{project.title}</h3>
                  </div>
                  <span className="material-symbols-outlined text-white group-hover:text-primary transition-colors">arrow_outward</span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-brand-orange py-20" style={{ backgroundColor: '#F45B32' }}>
        <div className="max-w-max-width mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-8">
          <h2 className="font-display-lg text-[48px] md:text-[64px] text-white uppercase leading-tight text-center md:text-left">
            HAVE A {data.title.split(' ')[0].toUpperCase()} PROJECT?
          </h2>
          <button className="bg-black text-white px-10 py-5 font-headline-h2 text-[20px] uppercase tracking-widest hover:bg-zinc-900 transition-all duration-300 transform active:scale-95 shrink-0">
            GET A QUOTE
          </button>
        </div>
      </section>

      {/* Footer placeholder */}
    </div>
  );
};

export default ServiceDetail;