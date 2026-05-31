import React from 'react';

const Services: React.FC = () => {
  return (
    <section className="bg-surface py-section-gap" id="services">
      <div className="max-w-max-width mx-auto px-gutter mb-20">
        <span className="font-label-caps text-brand-orange mb-4 block">OUR EXPERTISE</span>
        <h2 className="font-headline-h1 text-inverse-surface">CORE INDUSTRIAL SERVICES</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 bg-black gap-[1px] border-y border-black">
        {[
          { 
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter">
                <rect x="4" y="8" width="16" height="14" />
                <path d="M4 12h16" />
                <path d="M4 16h16" />
                <path d="M8 8V4h8v4" />
                <path d="M12 4v18" />
              </svg>
            ), 
            title: 'CIVIL ENGINEERING', 
            desc: 'Comprehensive construction of industrial facilities, warehouses, and urban infrastructure developments.' 
          },
          { 
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M12 2v20" />
                <path d="M6 22l6-20 6 20" />
                <path d="M8 15h8" />
                <path d="M10 8h4" />
                <circle cx="12" cy="2" r="1.5" fill="currentColor" />
              </svg>
            ), 
            title: 'TELECOM TOWER', 
            desc: 'Expert installation and maintenance of telecommunication towers and high-capacity network infrastructure.' 
          },
          { 
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M2 12h6l4 6h10" />
                <path d="M2 16h8l4-6h8" />
                <circle cx="22" cy="18" r="1.5" fill="currentColor" />
                <circle cx="20" cy="10" r="1.5" fill="currentColor" />
              </svg>
            ), 
            title: 'PIPELINE NETWORK', 
            desc: 'Specialized laying of critical water, gas, and utility pipelines across diverse geographic landscapes.' 
          },
          { 
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M8 2l-2 20" />
                <path d="M16 2l2 20" />
                <path d="M7.5 6h9" />
                <path d="M6.5 12h11" />
                <path d="M5.5 18h13" />
              </svg>
            ), 
            title: 'RAILWAY INFRA', 
            desc: 'Strategic development of railway networks, bridge engineering, and railway station modernization projects.' 
          },
          { 
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M4 22s4-12 16-12" />
                <path d="M4 22s12-4 16-16" />
                <circle cx="20" cy="10" r="1.5" fill="currentColor" />
                <circle cx="20" cy="6" r="1.5" fill="currentColor" />
                <circle cx="4" cy="22" r="1.5" fill="currentColor" />
              </svg>
            ), 
            title: 'OFC LAYING', 
            desc: 'Precision laying of Optical Fiber Cables for high-speed connectivity across urban and rural sectors.' 
          },
          { 
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M12 2L2 22" />
                <path d="M12 2l10 20" />
                <path d="M12 22v-4" />
                <path d="M12 14v-4" />
                <path d="M12 6v-2" />
              </svg>
            ), 
            title: 'ROAD & HIGHWAY', 
            desc: 'Construction of high-durability road networks and arterial highway structures for seamless logistics.' 
          },
        ].map((service, idx) => (
          <div key={idx} className="service-card group bg-white p-12 relative min-h-[400px] flex flex-col justify-between overflow-hidden">
            <div className="service-card-border"></div>
            <div className="relative z-10">
              <div className="text-brand-orange mb-8 opacity-90 group-hover:scale-110 transition-transform duration-500 origin-left">
                {service.icon}
              </div>
              <h3 className="font-headline-h2 text-inverse-surface mb-4">{service.title}</h3>
              <p className="font-body-md text-secondary pr-4">{service.desc}</p>
            </div>
            <div className="font-headline-h1 text-surface-container/30 text-[120px] absolute -right-4 -bottom-8 leading-none select-none">
              {String(idx + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
