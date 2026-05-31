import React from 'react';

const Marquee: React.FC = () => {
  return (
    <section className="bg-black py-16 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content flex items-center gap-12 text-white">
          {Array(12).fill(null).map((_, i) => (
            <span key={i} className="font-headline-h1 text-[40px] uppercase flex items-center gap-6">
              {['RELIANCE JIO', 'GOVERNMENT OF GUJARAT', 'INDIAN RAILWAYS', 'TATA PROJECTS', 'ADANI GROUP', 'BHARTI AIRTEL'][i % 6]}
              <span className="w-3 h-3 bg-brand-orange"></span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
