import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Navbar from '../components/Navbar';
import { handleGlobalNavClick } from '../utils/navigation';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
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

    // 3. GSAP Animations
    const ctx = gsap.context(() => {
      // Hero Animation
      const tlHero = gsap.timeline();
      tlHero.to("#hero-title", {
        opacity: 1,
        y: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Replaces the CSS .clip-reveal
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      })
      .to("#hero-sub", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8");

      // Form Stagger Reveal
      gsap.from(".stagger-reveal > *", {
        scrollTrigger: {
          trigger: ".stagger-reveal",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Contact Card Entrance
      gsap.fromTo("#contact-card", 
        { x: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: "#contact-card",
            start: "top 85%",
          },
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out"
        }
      );

      // Input Focus Styling (Fallback for complex states)
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input.parentElement, { borderColor: "#ae2a00", duration: 0.3 });
        });
        input.addEventListener('blur', (e) => {
          const target = e.target as HTMLInputElement;
          if (!target.value) {
            gsap.to(input.parentElement, { borderColor: "rgba(0,0,0,0.12)", duration: 0.3 });
          }
        });
      });

    }, containerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-surface font-body-md text-on-surface overflow-x-hidden" ref={containerRef}>
      
      {/* TopNavBar */}
      <Navbar />

      <main>
        {/* Page Hero */}
        <section className="relative h-[409px] w-full overflow-hidden flex items-center justify-center contact-hero-section">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <img
              src="/@fs/Users/rishi/.gemini/antigravity-ide/brain/194793b2-4f6d-49e7-9934-8409df194d68/civil_hero_1780235901467.png"
              alt="Corporate structure looking up"
              className="w-full h-full object-cover opacity-40 grayscale contact-bg-image"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
          </div>
          <div className="relative z-20 text-center px-gutter">
            <h1 
              className="font-display-lg text-[64px] md:text-[96px] text-on-primary-container opacity-0 translate-y-8" 
              id="hero-title"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            >
              CONTACT US
            </h1>
            <p className="font-body-md text-[18px] text-on-primary-container/90 mt-4 opacity-0" id="hero-sub">
              Mon – Sat, 9 AM to 8 PM. We respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-[#F5F5F0] py-section-gap">
          <div className="max-w-max-width mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7 space-y-12 stagger-reveal">
              <div>
                <span className="font-label-caps text-[11px] text-primary uppercase tracking-[0.2em]">SEND US A MESSAGE</span>
                <h2 className="font-headline-h1 text-[64px] mt-2 text-black leading-none">TELL US ABOUT YOUR PROJECT.</h2>
              </div>
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  {/* Full Name */}
                  <div className="floating-label-group border-b-2 border-black/12 focus-within:border-primary transition-colors">
                    <input className="block w-full bg-transparent border-none px-0 py-2 focus:ring-0 peer" id="name" placeholder=" " type="text" />
                    <label className="absolute top-2 left-0 font-headline-h3 text-base text-black/40 transition-all pointer-events-none uppercase" htmlFor="name">Full Name*</label>
                  </div>
                  {/* Organisation */}
                  <div className="floating-label-group border-b-2 border-black/12 focus-within:border-primary transition-colors">
                    <input className="block w-full bg-transparent border-none px-0 py-2 focus:ring-0 peer" id="org" placeholder=" " type="text" />
                    <label className="absolute top-2 left-0 font-headline-h3 text-base text-black/40 transition-all pointer-events-none uppercase" htmlFor="org">Organisation (Optional)</label>
                  </div>
                  {/* Email */}
                  <div className="floating-label-group border-b-2 border-black/12 focus-within:border-primary transition-colors">
                    <input className="block w-full bg-transparent border-none px-0 py-2 focus:ring-0 peer" id="email" placeholder=" " type="email" />
                    <label className="absolute top-2 left-0 font-headline-h3 text-base text-black/40 transition-all pointer-events-none uppercase" htmlFor="email">Email Address*</label>
                  </div>
                  {/* Phone */}
                  <div className="floating-label-group border-b-2 border-black/12 focus-within:border-primary transition-colors">
                    <input className="block w-full bg-transparent border-none px-0 py-2 focus:ring-0 peer" id="phone" placeholder=" " type="tel" />
                    <label className="absolute top-2 left-0 font-headline-h3 text-base text-black/40 transition-all pointer-events-none uppercase" htmlFor="phone">Phone Number*</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  {/* Service Interest */}
                  <div className="floating-label-group border-b-2 border-black/12 focus-within:border-primary transition-colors">
                    <select className="block w-full bg-transparent border-none px-0 py-2 focus:ring-0 peer appearance-none" id="service" defaultValue="">
                      <option disabled hidden value=""></option>
                      <option value="pipeline">Pipeline</option>
                      <option value="road">Road</option>
                      <option value="civil">Civil</option>
                      <option value="tower">Tower</option>
                      <option value="ofc">OFC</option>
                      <option value="earthwork">Earthwork</option>
                      <option value="lining">Lining</option>
                      <option value="railway">Railway</option>
                      <option value="other">Other</option>
                    </select>
                    <label className="absolute top-2 left-0 font-headline-h3 text-base text-black/40 transition-all pointer-events-none uppercase" htmlFor="service">Service Interested In*</label>
                  </div>
                  {/* Project Location */}
                  <div className="floating-label-group border-b-2 border-black/12 focus-within:border-primary transition-colors">
                    <input className="block w-full bg-transparent border-none px-0 py-2 focus:ring-0 peer" id="location" placeholder=" " type="text" />
                    <label className="absolute top-2 left-0 font-headline-h3 text-base text-black/40 transition-all pointer-events-none uppercase" htmlFor="location">Project Location — State</label>
                  </div>
                </div>

                {/* Message */}
                <div className="floating-label-group border-b-2 border-black/12 focus-within:border-primary transition-colors">
                  <textarea className="block w-full bg-transparent border-none px-0 py-2 focus:ring-0 peer resize-none" id="message" placeholder=" " rows={3}></textarea>
                  <label className="absolute top-2 left-0 font-headline-h3 text-base text-black/40 transition-all pointer-events-none uppercase" htmlFor="message">Message*</label>
                </div>

                {/* Referrer */}
                <div className="floating-label-group border-b-2 border-black/12 focus-within:border-primary transition-colors">
                  <input className="block w-full bg-transparent border-none px-0 py-2 focus:ring-0 peer" id="referrer" placeholder=" " type="text" />
                  <label className="absolute top-2 left-0 font-headline-h3 text-base text-black/40 transition-all pointer-events-none uppercase" htmlFor="referrer">How did you hear about us?</label>
                </div>

                {/* Submit Button */}
                <button className="group w-full bg-primary py-6 px-8 flex items-center justify-center space-x-4 hover:brightness-110 transition-all active:scale-[0.98]" type="submit">
                  <span className="font-headline-h3 text-on-primary text-xl uppercase tracking-widest font-bold">SEND INQUIRY</span>
                  <span className="material-symbols-outlined text-on-primary group-hover:translate-x-1 transition-transform">send</span>
                </button>
              </form>
            </div>

            {/* Right Column: Contact Card */}
            <div className="lg:col-span-5 bg-black p-10 md:p-12 flex flex-col justify-between border border-white/5 opacity-0" id="contact-card">
              <div className="space-y-12">
                <div className="font-headline-h1 text-[32px] text-white tracking-tighter">
                  ● VRUNDAVAN
                </div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    <div className="text-white font-body-md leading-relaxed">
                      Suite 405, Industrial Hub West,<br /> 
                      Maharashtra, India 400013
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                    <div className="text-white font-body-md">
                      +91 123 456 7890
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                    <div className="text-white font-body-md">
                      projects@vrundavan.com
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                    <div className="text-white font-body-md">
                      Mon – Sat: 09:00 AM – 08:00 PM
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 overflow-hidden border border-white/10 grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-500">
                <iframe 
                  allowFullScreen 
                  height="260" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120610.158021004!2d72.932407!3d19.126584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b931908b98bf%3A0xc48f4384a65f973e!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  style={{ border: 0 }} 
                  width="100%"
                  title="Vrundavan Office Location"
                ></iframe>
              </div>
            </div>

          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="bg-black py-24">
          <div className="max-w-max-width mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
              <div className="font-display-lg text-[64px] text-white leading-none">450+</div>
              <div className="font-label-caps text-white/60 uppercase">PROJECTS COMPLETED</div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
              <div className="font-display-lg text-[64px] text-white leading-none">12</div>
              <div className="font-label-caps text-white/60 uppercase">STATES COVERED</div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
              <div className="font-display-lg text-[64px] text-white leading-none">150</div>
              <div className="font-label-caps text-white/60 uppercase">EQUIPMENT UNITS</div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
              <div className="font-display-lg text-[64px] text-white leading-none">25+</div>
              <div className="font-label-caps text-white/60 uppercase">YEARS EXPERIENCE</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2f312e] border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-max-width mx-auto px-gutter py-section-gap">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="font-headline-h1 text-[32px] text-white leading-none tracking-tighter">● VRUNDAVAN</div>
            <p className="font-body-md text-white/60">
              Delivering structural excellence through industrial precision and heritage-grade engineering for over two decades.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-headline-h3 text-[24px] text-white uppercase">Sitemap</h4>
            <ul className="space-y-4">
              <li><a className="font-body-md text-white/60 hover:text-primary transition-colors" href="/">HOME</a></li>
              <li><a className="font-body-md text-white/60 hover:text-primary transition-colors" href="/about">ABOUT</a></li>
              <li><a className="font-body-md text-white/60 hover:text-primary transition-colors" href="/services">SERVICES</a></li>
              <li><a className="font-body-md text-white/60 hover:text-primary transition-colors" href="/projects">PROJECTS</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-headline-h3 text-[24px] text-white uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="font-body-md text-white/60">Phone: +91 123 456 7890</li>
              <li className="font-body-md text-white/60">Email: projects@vrundavan.com</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-headline-h3 text-[24px] text-white uppercase">Newsletter</h4>
            <div className="flex border-b border-white/20 pb-2">
              <input className="bg-transparent border-none text-white focus:ring-0 font-label-caps w-full focus:outline-none" placeholder="YOUR EMAIL" type="email" />
              <button className="material-symbols-outlined text-primary">arrow_forward</button>
            </div>
          </div>
        </div>
        <div className="max-w-max-width mx-auto px-gutter py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="font-label-caps text-[12px] text-white/40">© 2024 VRUNDAVAN CONSTRUCTION. ALL RIGHTS RESERVED.</div>
          <div className="flex space-x-8">
            <a className="font-label-caps text-[12px] text-white/40 hover:text-primary transition-colors" href="#">PRIVACY POLICY</a>
            <a className="font-label-caps text-[12px] text-white/40 hover:text-primary transition-colors" href="#">TERMS OF SERVICE</a>
            <a className="font-label-caps text-[12px] text-white/40 hover:text-primary transition-colors" href="#">SITE MAP</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
