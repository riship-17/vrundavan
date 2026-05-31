import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Marquee from '../components/Marquee';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const mainContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Animations (Scoped to Context)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Hero Animation
      tl.from('#hero-label', { duration: 1, opacity: 0, y: 30, delay: 0.5 })
        .to('.clip-text', { duration: 1.2, clipPath: 'inset(0 0% 0 0)', stagger: 0.15, ease: 'power3.inOut' }, '-=0.6')
        .from('#hero-subcopy', { duration: 0.8, opacity: 0, y: 20 }, '-=0.4')
        .from('#hero-ctas', { duration: 0.8, opacity: 0, y: 20 }, '-=0.6');

      // Stats Counter Animation
      const counters = document.querySelectorAll<HTMLElement>('[data-count]');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-count') || '0', 10);
        gsap.to(counter, {
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
          },
          innerText: target,
          duration: 2.5,
          snap: { innerText: 1 },
          ease: 'power2.out',
        });
      });

      // About Intro Entrance
      gsap.from('.reveal-stagger > *', {
        scrollTrigger: { trigger: '#about-intro', start: 'top 70%' },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Parallax & Pinned Card
      gsap.to('#about-parallax-img', {
        scrollTrigger: {
          trigger: '#parallax-img-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        yPercent: -20,
        ease: 'none',
      });

      gsap.from('#pinned-stat', {
        scrollTrigger: { trigger: '#about-intro', start: 'top center' },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });

      // Services Cards Stagger
      gsap.from('.service-card', {
        scrollTrigger: { trigger: '#services', start: 'top 60%' },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Project Showcase Entrance
      gsap.from('#projects .group', {
        scrollTrigger: { trigger: '#projects', start: 'top 60%' },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.out',
      });

      // Achievements Reveal
      gsap.from('#achievements .border-t', {
        scrollTrigger: { trigger: '#achievements', start: 'top 70%' },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
      });
    }, mainContainer);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div className="antialiased" ref={mainContainer}>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Achievements />
      <Marquee />
      <CtaBanner />
      <Footer />
    </div>
  );
};

export default HomePage;
