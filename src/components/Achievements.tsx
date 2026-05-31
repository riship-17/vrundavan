import React from 'react';

const Achievements: React.FC = () => {
  return (
    <section className="bg-dark-slate py-section-gap text-white overflow-hidden" id="achievements">
      <div className="max-w-max-width mx-auto px-gutter text-center mb-20">
        <span className="font-label-caps text-brand-orange mb-4 block">PROVEN METRICS</span>
        <h2 className="font-headline-h1">OUR INDUSTRIAL FOOTPRINT</h2>
      </div>
      <div className="max-w-max-width mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="border-t border-white/20 pt-8 text-center md:text-left">
          <div className="font-headline-h1 text-[80px] leading-none text-white mb-4" data-count="15">0</div>
          <h4 className="font-headline-h3 text-brand-orange uppercase tracking-widest text-lg">States Presence</h4>
          <p className="font-body-md text-white/60 mt-4">Operational presence across major industrial corridors and remote regions of India.</p>
        </div>
        <div className="border-t border-white/20 pt-8 text-center md:text-left">
          <div className="font-headline-h1 text-[80px] leading-none text-white mb-4" data-count="12000">0</div>
          <h4 className="font-headline-h3 text-brand-orange uppercase tracking-widest text-lg">KM OFC Laid</h4>
          <p className="font-body-md text-white/60 mt-4">Pioneering the digital revolution by connecting cities with high-speed fiber networks.</p>
        </div>
        <div className="border-t border-white/20 pt-8 text-center md:text-left">
          <div className="font-headline-h1 text-[80px] leading-none text-white mb-4" data-count="50">0</div>
          <h4 className="font-headline-h3 text-brand-orange uppercase tracking-widest text-lg">Govt Clients</h4>
          <p className="font-body-md text-white/60 mt-4">A trusted partner for Municipal Corporations, Rail Authorities, and State Govts.</p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
