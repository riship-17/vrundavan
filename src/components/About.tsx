import React from 'react';

const About: React.FC = () => {
  return (
    <section className="bg-surface py-section-gap overflow-hidden" id="about-intro">
      <div className="max-w-max-width mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="reveal-stagger">
          <span className="font-label-caps text-brand-orange mb-6 block">LEGACY OF STRENGTH</span>
          <h2 className="font-headline-h1 text-inverse-surface mb-8">PIONEERING THE INFRASTRUCTURE REVOLUTION</h2>
          <p className="font-body-lg text-secondary mb-8">
            Since 2001, Vrundavan Construction has been at the forefront of India's development. We don't just build structures; we build the arteries and nervous system of the nation, from strategic telecom networks to critical highway pipelines.
          </p>
          <p className="font-body-md text-secondary/80 mb-12">
            Our commitment to precision engineering and industrial-grade quality has made us a trusted partner for both government entities and private industrial giants. With a footprint spanning across India, we deliver complex projects in some of the most challenging terrains.
          </p>
          <button className="px-8 py-4 border-2 border-inverse-surface font-label-caps hover:bg-inverse-surface hover:text-white transition-colors">
            OUR HERITAGE
          </button>
        </div>
        <div className="relative">
          <div className="w-full aspect-[4/5] bg-surface-container-high overflow-hidden" id="parallax-img-container">
            <img alt="Construction site" className="w-full h-full object-cover scale-110" id="about-parallax-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2NEvxIFcubhbZLcFv_rgGkLvLK5t6YGfJ5togwqO9e-yrRb3aPauIWRc4VADZpKUTgZhu4h1yymDhN2ROz3PmnSUSvMtynbZuey977xTeyFcmUuNJ2BOUSE8ZtyuomrjW2w7Z14Tx3jO7h9XXTSG1WvejnYPhlBr4g_gNE_z_dUqS6okhcYGFb3B-zo8eLShqDHmY5TDS4HdrPbxrT--hy3TKq5kWAXPG417nLi9mkYvWHvqBV-ErbiQVRAdnsigfnA_wPjypa_dD" />
          </div>
          <div className="absolute bottom-10 -left-10 md:-left-20 bg-black p-10 text-white min-w-[240px] z-10 hidden sm:block" id="pinned-stat">
            <div className="font-headline-h1 text-[64px] leading-none text-brand-orange">24+</div>
            <div className="font-headline-h3 text-lg leading-tight uppercase mt-2">Years of Industrial<br />Precision</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
