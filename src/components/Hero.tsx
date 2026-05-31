import React from 'react';

const Hero: React.FC = () => {
  return (
    <main className="relative h-screen w-full overflow-hidden flex items-center bg-black">
      <div className="absolute inset-0 z-0">
        <img src="/ChatGPT Image May 31, 2026, 10_27_08 AM.png" alt="Hero Background" className="w-full h-full object-cover grayscale-[20%] brightness-[0.8]" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 w-full pl-[10vw] flex flex-col items-start">
        <span className="font-headline-h3 text-[13px] font-semibold text-brand-orange tracking-[0.20em] uppercase mb-4" id="hero-label">
          INFRASTRUCTURE · CIVIL · TELECOM
        </span>
        <h1 className="font-display-lg text-[clamp(72px,10vw,140px)] text-white leading-none mb-8 max-w-5xl" id="hero-title">
          <span className="inline-block overflow-hidden"><span className="inline-block clip-text">WE</span></span>
          <span className="inline-block overflow-hidden"><span className="inline-block clip-text">BUILD</span></span>
          <span className="inline-block overflow-hidden"><span className="inline-block clip-text">INDIA'S</span></span><br />
          <span className="inline-block overflow-hidden"><span className="inline-block clip-text">TOMORROW.</span></span>
        </h1>
        <p className="font-body-lg text-white/70 max-w-xl mb-10 text-lg" id="hero-subcopy">
          Trusted since 2001. 412+ completed projects across pipeline, road, tower, OFC, civil and railway infrastructure across India.
        </p>
        <div className="flex flex-wrap gap-4" id="hero-ctas">
          <button className="px-10 py-4 bg-brand-orange text-white font-headline-h3 font-bold text-lg tracking-wider rounded-[2px] hover:brightness-110 transition-all active:scale-95">
            VIEW PROJECTS
          </button>
          <button className="px-10 py-4 bg-transparent border border-white text-white font-headline-h3 font-bold text-lg tracking-wider rounded-[2px] hover:bg-white hover:text-black transition-all active:scale-95">
            GET IN TOUCH
          </button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
