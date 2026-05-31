import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="bg-black py-20 border-b border-white/5 relative overflow-hidden" id="stats-bar">
      <div className="max-w-max-width mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        <div className="flex flex-col">
          <span className="font-headline-h1 text-white text-[48px] md:text-[72px] leading-none" data-count="412">0</span>
          <span className="font-headline-h3 text-brand-orange text-sm tracking-[0.2em] uppercase mt-2">Projects Completed</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-h1 text-white text-[48px] md:text-[72px] leading-none" data-count="122">0</span>
          <span className="font-headline-h3 text-brand-orange text-sm tracking-[0.2em] uppercase mt-2">Ongoing Sites</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-h1 text-white text-[48px] md:text-[72px] leading-none" data-count="965">0</span>
          <span className="font-headline-h3 text-brand-orange text-sm tracking-[0.2em] uppercase mt-2">Expert Team</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-h1 text-white text-[48px] md:text-[72px] leading-none" data-count="24">0</span>
          <span className="font-headline-h3 text-brand-orange text-sm tracking-[0.2em] uppercase mt-2">Years Excellence</span>
        </div>
      </div>
    </section>
  );
};

export default Stats;
