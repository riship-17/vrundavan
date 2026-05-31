import React from 'react';

const CtaBanner: React.FC = () => {
  return (
    <section className="bg-brand-orange py-24 text-center">
      <div className="max-w-4xl mx-auto px-gutter">
        <h2 className="font-headline-h1 text-white text-[clamp(40px,8vw,80px)] mb-10 leading-tight">READY TO START YOUR PROJECT?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-black text-white px-12 py-5 font-headline-h3 tracking-widest text-xl hover:bg-white hover:text-black transition-colors">
            CONTACT OUR EXPERTS
          </button>
          <button className="bg-transparent border-2 border-white text-white px-12 py-5 font-headline-h3 tracking-widest text-xl hover:bg-white hover:text-brand-orange transition-colors">
            DOWNLOAD BROCHURE
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
