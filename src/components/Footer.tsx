import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-inverse-surface text-on-tertiary-container/60 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-max-width mx-auto px-gutter py-section-gap">
        <div className="col-span-1 md:col-span-1">
          <div className="font-headline-h3 text-[28px] text-on-primary-container mb-6">● VRUNDAVAN</div>
          <p className="font-body-md text-body-md pr-8">Pioneering industrial excellence and infrastructure resilience across the Indian subcontinent since 2001.</p>
        </div>
        <div>
          <h4 className="font-headline-h3 text-headline-h3 text-on-primary-container mb-6">Quick Links</h4>
          <ul className="space-y-3 font-body-md">
            <li><a className="hover:text-primary transition-colors" href="#">Infrastructure</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Telecom Solutions</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Civil Engineering</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline-h3 text-headline-h3 text-on-primary-container mb-6">Legal</h4>
          <ul className="space-y-3 font-body-md uppercase text-[12px] tracking-wider">
            <li><a className="hover:text-primary transition-colors" href="#">PRIVACY POLICY</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">TERMS OF SERVICE</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">SITE MAP</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline-h3 text-headline-h3 text-on-primary-container mb-6">Connect</h4>
          <div className="flex flex-col space-y-2">
            <span className="font-body-md">info@vrundavan.in</span>
            <span className="font-body-md">+91 22 4567 8900</span>
            <div className="flex gap-4 mt-4">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-8 text-center">
        <p className="font-label-caps text-[12px] tracking-widest text-white/30">© 2024 VRUNDAVAN CONSTRUCTION. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
