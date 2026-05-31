import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { handleGlobalNavClick } from '../utils/navigation';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const mainContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis();
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Navbar Scroll Listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // 3. GSAP Animations Scoped to mainContainer
    const ctx = gsap.context(() => {
      // BURN WIPE Page Transition on Load
      gsap.to('.burn-wipe', {
        scaleY: 0,
        duration: 1,
        ease: 'power4.inOut',
      });

      // Hero Title Animation
      gsap.from('.hero-word', {
        y: 100,
        duration: 1.2,
        stagger: 0.06,
        delay: 0.3,
        ease: 'expo.out',
      });

      // Section 1: Intro Reveal (Left side)
      gsap.from('.reveal-intro-left', {
        scrollTrigger: {
          trigger: '.reveal-intro-left',
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Section 1: Intro Reveal (Right side image)
      gsap.from('.reveal-intro-right', {
        scrollTrigger: {
          trigger: '.reveal-intro-right',
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Section 2: Timeline Growth Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#growthLine',
          start: 'top 80%',
        },
      });

      // Animate the line
      const path = document.querySelector('#growthLine') as SVGPathElement;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power3.inOut',
        });
      }

      // Animate the area under the line
      tl.from('#growthArea', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, '-=1.0');

      // Animate the dots and content
      tl.from('.timeline-dot', {
        scale: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: 'back.out(2)',
      }, '-=1.2')
      .to('.timeline-content', {
        opacity: 1,
        y: -10,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=1.0');

      // Section 3: Mission & Vision Cards
      gsap.from('.mission-card', {
        scrollTrigger: {
          trigger: '.mission-card',
          start: 'top 80%',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.vision-card', {
        scrollTrigger: {
          trigger: '.vision-card',
          start: 'top 80%',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Section 4: Pillars Stagger
      gsap.from('.pillar-card', {
        scrollTrigger: {
          trigger: '.pillar-container',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, mainContainer);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden" ref={mainContainer}>
      {/* Page Transition Overlay */}
      <div className="burn-wipe bg-black absolute inset-0 z-[100] origin-top"></div>

      {/* TopNavBar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-500 border-b border-white/10 ${
          isScrolled ? 'bg-black' : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center max-w-max-width mx-auto px-gutter py-base">
          <div className="font-headline-h3 text-[28px] text-on-primary-container tracking-tighter">
            ● VRUNDAVAN
          </div>
          <div className="hidden md:flex space-x-8">
            {['HOME', 'ABOUT', 'SERVICES', 'PROJECTS', 'CONTACT'].map((item) => {
              const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
              const isActive = item === 'ABOUT';
              return (
                <a
                  key={item}
                  href={path}
                  onClick={(e) => handleGlobalNavClick(e, item, path)}
                  className={`font-nav-link text-nav-link uppercase transition-colors duration-300 ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-tertiary-container/60 hover:text-primary'}`}
                >
                  {item}
                </a>
              );
            })}
          </div>
          <button className="bg-primary text-on-primary px-6 py-2 font-label-caps text-label-caps tracking-widest hover:brightness-110 active:scale-95 transition-all duration-200">
            GET A QUOTE
          </button>
        </div>
      </nav>

      {/* Page Hero (55vh) */}
      <header className="relative h-[563px] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-black">
          <img
            className="w-full h-full object-cover opacity-50"
            alt="A cinematic wide shot of a massive infrastructure project at sunset."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz2AP39VMWp65a_ohOB6FLnEcGz58usF4B3O5qHxAnawyDB2hIOJXmcr4P9ek2dp719vtamXvRaBwq8rUxrNfu9xRBpvcw2VfFmfhFkQmTKJgwF1V19bGaNFSzt0SUBCBHqsQ0gHp-dvnt6KqPvBX_9UzpDSyjJkYfUl1ZQuxlYY_HSufWV_IPofww0xFvuVyv2DFCNo-TtPirxPNkXQX8Vfk3ntq5aFO2MyfT-haCg8WqA1vzCKa9jKoSFDQGr84RiV-eVjWM9fMi"
          />
        </div>
        <div className="max-w-max-width mx-auto w-full px-gutter pb-16 relative z-10">
          <nav className="mb-20 text-[11px] font-nav-link font-[400] text-white/40 tracking-[0.2em] uppercase">
            HOME / <span className="text-white">ABOUT</span>
          </nav>
          <div className="flex flex-col items-start">
            <span className="text-primary font-label-caps text-label-caps mb-4 tracking-widest">
              ABOUT US
            </span>
            <div className="clip-text overflow-hidden">
              <h1 className="font-headline-h1 text-white text-[clamp(48px,6vw,96px)] leading-[1.0] uppercase">
                {'ABOUT VRUNDAVAN CONSTRUCTION'.split(' ').map((word, index) => (
                  <span key={index} className="inline-block clip-text hero-word">
                    {word}&nbsp;
                  </span>
                ))}
              </h1>
            </div>
            <p className="mt-4 font-body-lg text-white/60 max-w-xl">
              We trust our experience and deliver the best.
            </p>
          </div>
        </div>
      </header>

      {/* SECTION 1: Full Introduction */}
      <section className="max-w-max-width mx-auto px-gutter py-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-7 space-y-8 reveal-intro-left">
          <div>
            <span className="text-primary font-label-caps text-label-caps tracking-widest">
              ABOUT VRUNDAVAN CONSTRUCTION
            </span>
            <h2 className="font-display-lg text-headline-h1 mt-4 text-on-background uppercase">
              WE TRUST OUR EXPERIENCE AND DELIVER THE BEST.
            </h2>
          </div>
          <div className="space-y-6 text-on-surface-variant font-body-md">
            <p>
              Since our inception, Vrundavan Construction has been at the forefront of India's infrastructure revolution. We specialize in heavy engineering, railway systems, and large-scale industrial projects that define the nation's progress. Our approach combines traditional craftsmanship with modern structural science.
            </p>
            <p>
              Our portfolio spans critical national assets, including railway bridges, highway networks, and iconic monuments. Every project we undertake is a testament to our commitment to structural integrity and engineering precision, ensuring long-term stability and performance.
            </p>
            <p>
              We leverage advanced construction technologies and a rigorous zero-accident safety culture. Our teams are equipped with state-of-the-art machinery and digital project management tools, ensuring that safety and innovation go hand-in-hand at every site we manage.
            </p>
          </div>
        </div>
        <div className="md:col-span-5 relative reveal-intro-right">
          <div className="border border-black/10 p-2 h-full">
            <img
              className="w-full h-[600px] object-cover"
              alt="A vertical architectural shot showing a low-angle perspective of a massive concrete and steel industrial building."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlalbDpRjOc4CePur24hrn099DVPuxEj1z2IVKJ8cKagurSS6RcxM-LkkhPIziwZ7h1bynRpgTolE2jnmY3G2oLx-93EeqlqVssqatNkxJnLrN9W3daqla7iMMiSjxFtDPacfCDvQalYmaKCPe2mpweT4Muy8oGopwJZl9MSRY5TSAgXvRA0AApu-56L36WmkWzywbe-a5_YG89pHCBHW5eWQBdbGSWEJt_rPTZq8qKbcYQhu4edbhyLh28bAr4FxYrSMkqotrx0Ln"
            />
          </div>
          {/* Stats Card */}
          <div className="absolute bottom-10 left-[-40px] md:left-[-80px] bg-primary p-8 text-white min-w-[200px]">
            <div className="font-display-lg text-[84px] leading-none mb-2">24+</div>
            <div className="font-headline-h3 uppercase text-sm tracking-widest">
              Years of Excellence
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Timeline Growth Graph */}
      <section className="bg-black text-white py-section-gap overflow-hidden">
        <div className="max-w-max-width mx-auto px-gutter">
          <div className="mb-20 text-center md:text-left">
            <span className="text-primary font-label-caps text-label-caps tracking-widest">
              OUR JOURNEY
            </span>
            <h2 className="font-display-lg text-headline-h1 mt-4 uppercase">
              GROWTH THAT SHAPED US
            </h2>
          </div>
          
          {/* Horizontal Scrollable Graph Container */}
          <div className="w-full overflow-x-auto pb-10 custom-scrollbar">
            <div className="relative h-[400px] min-w-[800px] mt-24 md:mt-20 ml-4 mr-10">
              {/* Background Grid Lines (Axis) */}
              <div className="absolute inset-0 border-l-2 border-b-2 border-white/20 pointer-events-none">
                <div className="absolute w-full border-t border-white/5 top-[20%]"></div>
                <div className="absolute w-full border-t border-white/5 top-[40%]"></div>
                <div className="absolute w-full border-t border-white/5 top-[60%]"></div>
                <div className="absolute w-full border-t border-white/5 top-[80%]"></div>
              </div>

              {/* Graph SVG & Nodes */}
              <div className="absolute inset-0">
                {/* The SVG Line & Area */}
                <svg className="w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Area under the line */}
                  <path 
                    id="growthArea"
                    d="M 8,100 L 8,90 L 25,75 L 42,55 L 59,35 L 76,20 L 93,15 L 93,100 Z" 
                    fill="url(#growthGradient)" 
                  />
                  {/* Line */}
                  <path 
                    id="growthLine"
                    d="M 8,90 L 25,75 L 42,55 L 59,35 L 76,20 L 93,15" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="4" 
                    vectorEffect="non-scaling-stroke" 
                  />
                </svg>
                
                {/* Nodes */}
                {[
                  { year: '2001', label: 'FOUNDED', x: 8, y: 90 },
                  { year: '2005', label: '100+ PROJECTS', x: 25, y: 75 },
                  { year: '2012', label: 'Reliance Jio', x: 42, y: 55 },
                  { year: '2018', label: 'Statue of Unity', x: 59, y: 35 },
                  { year: '2022', label: 'Pipavav Railway', x: 76, y: 20 },
                  { year: '2025', label: '412+ Delivered', x: 93, y: 15 },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="absolute flex flex-col items-center timeline-node"
                    style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="timeline-content text-center mb-6 opacity-0 absolute bottom-full pb-2">
                      <span className="font-display-lg text-4xl block text-primary">{item.year}</span>
                      <span className="font-label-caps text-[12px] text-white/60 uppercase whitespace-nowrap">{item.label}</span>
                    </div>
                    <div className="w-5 h-5 bg-black border-[3px] border-primary rounded-full relative z-10 timeline-dot shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Mission & Vision */}
      <section className="bg-brand-dark py-section-gap" style={{ backgroundColor: '#34343E' }}>
        <div className="max-w-max-width mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          <div className="bg-black border-t-4 border-primary p-12 mission-card">
            <span className="text-primary font-label-caps text-label-caps tracking-widest uppercase">
              Our Mission
            </span>
            <h2 className="font-headline-h2 text-white mt-4 mb-8 uppercase">
              COMMITTED TO BUILD A BETTER WORLD.
            </h2>
            <ul className="space-y-6">
              {[
                'To deliver industrial infrastructure that sets global benchmarks in quality and reliability.',
                'Foster long-term partnerships through transparency and consistent delivery performance.',
                'Empower local communities by creating sustainable infrastructure and employment.',
                'Integrate environmental responsibility into our heavy construction methodologies.',
                'Uphold the highest standards of engineering ethics and industrial safety.',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0"></span>
                  <p className="font-body-md text-white/70">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision Card */}
          <div className="bg-black border-t-4 border-primary p-12 vision-card">
            <span className="text-primary font-label-caps text-label-caps tracking-widest uppercase">
              Our Vision
            </span>
            <h2 className="font-headline-h2 text-white mt-4 mb-8 uppercase">
              BUILDING INDIA'S INFRASTRUCTURE, BETTER.
            </h2>
            <div className="space-y-6 font-body-md text-white/70">
              <p>
                Our vision is to be the primary architect of India's modernization journey, recognized as the most trusted partner for high-complexity infrastructure projects. We strive to redefine structural engineering by merging architectural beauty with industrial strength.
              </p>
              <p>
                Through relentless innovation and a workforce driven by excellence, we aim to build a future where infrastructure is not just functional, but enduring legacy for generations to come. We see Vrundavan as the gold standard for heavy engineering by 2030.
              </p>
            </div>
            <div className="mt-12 pt-12 border-t border-white/10">
              <img
                className="w-full h-48 object-cover grayscale opacity-50"
                alt="An abstract black and white photograph of a futuristic bridge design."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM-mKJ5h9sJ0XW1JImLVjx8_dlCJlJQ1MDq4F5BykO95z5MGGnM6UH8z_skqtxr-KcRo4kadUdKIhsyeVNAhFWFmElrsnc1aGCypKbxZpQihaYF5ytXfP-ki2coumgVlojuYOMBOn1FLKJMRJTh3nyHyz2-vl-JzrjDUNy1a1pH5S7zb-kmyMdY2nDHCLt4Gw_7zZ8HYCVPj3H630S1KMRCTBvyEW2x2WK-TLbO7tXHCdrTlqTmxGmDWpTham4iq6jr1kthOKJwWDc"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose Us */}
      <section className="bg-[#F5F5F0] py-section-gap">
        <div className="max-w-max-width mx-auto px-gutter">
          <div className="mb-20 text-center">
            <span className="text-primary font-label-caps text-label-caps tracking-widest uppercase">
              Why Vrundavan
            </span>
            <h2 className="font-display-lg text-headline-h1 text-black mt-4 uppercase">
              FOUR PILLARS OF OUR PROMISE.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter pillar-container">
            {[
              { icon: 'schedule', title: 'ON-TIME DELIVERY', desc: 'Precision scheduling ensures every project milestone is hit without delay.' },
              { icon: 'verified', title: 'IS CODE COMPLIANT', desc: 'Adhering strictly to Indian Standard (IS) codes for unparalleled structural safety.' },
              { icon: 'public', title: 'PAN-INDIA REACH', desc: 'A robust logistics network allowing us to execute projects in any corner of India.' },
              { icon: 'shield_with_heart', title: 'ZERO-ACCIDENT CULTURE', desc: 'Our highest priority is the life and well-being of every person on our sites.' },
            ].map((pillar, index) => (
              <div key={index} className="bg-white border border-black/5 p-8 flex flex-col items-center text-center pillar-card">
                <span className="material-symbols-outlined text-primary text-5xl mb-6">{pillar.icon}</span>
                <h3 className="font-headline-h3 text-black mb-4 uppercase">{pillar.title}</h3>
                <p className="font-body-md text-on-surface-variant">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-inverse-surface dark:bg-black border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-max-width mx-auto px-gutter py-section-gap">
          <div className="md:col-span-2">
            <div className="font-headline-h1 text-headline-h2 text-on-primary-container mb-6">
              ● VRUNDAVAN
            </div>
            <p className="font-body-md text-on-tertiary-container/60 max-w-sm mb-8">
              Defining the industrial landscape of India through integrity, precision, and heavy engineering expertise.
            </p>
            <div className="flex space-x-4">
              <a className="text-white/60 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">social_leaderboard</span>
              </a>
              <a className="text-white/60 hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-headline-h3 text-white mb-6 uppercase">QUICK LINKS</h4>
            <ul className="space-y-4 font-body-md text-on-tertiary-container/60">
              <li><a className="hover:text-primary transition-colors" href="#">Our History</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Core Team</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Safety Standards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline-h3 text-white mb-6 uppercase">LEGAL</h4>
            <ul className="space-y-4 font-body-md text-on-tertiary-container/60">
              <li><a className="hover:text-primary transition-colors" href="#">PRIVACY POLICY</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">TERMS OF SERVICE</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">SITE MAP</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-max-width mx-auto px-gutter py-8 border-t border-white/10 text-center md:text-left">
          <p className="font-label-caps text-label-caps text-on-tertiary-container/40">
            © 2024 VRUNDAVAN CONSTRUCTION. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
