import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const PageTransitionOverlay: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const handleTransition = (e: any) => {
      const { destName, url } = e.detail;
      setDestination(destName);
      
      const overlay = overlayRef.current;
      const title = titleRef.current;
      if (!overlay || !title) return;

      // Wait a tick for React to render the updated destination text
      setTimeout(() => {
        const titleBound = title.getBoundingClientRect();
        const halfHeightTitle = titleBound.height / 2;
        const halfHeightViewport = window.innerHeight / 2;
        const percentageVerticalClip = (halfHeightTitle / halfHeightViewport) * 50;

        const words = title.querySelectorAll('.word');
        gsap.killTweensOf(overlay);
        gsap.killTweensOf(words);
        
        // Reset words position
        gsap.set(words, { yPercent: 0 });

        // Set initial clip (thin horizontal strip)
        gsap.set(overlay, {
          '--clip': `polygon(0% ${50 - percentageVerticalClip}%, 0% ${50 - percentageVerticalClip}%, 0% ${50 + percentageVerticalClip}%, 0% ${50 + percentageVerticalClip}%)`,
          pointerEvents: 'auto',
          autoAlpha: 1,
          visibility: 'visible',
        });

        const lenis = (window as any).lenis;
        // Timeline for transitioning IN
        const tl = gsap.timeline();

        tl.call(() => {
          lenis?.stop();
        })
        // Step 1: Expand width
        .to(overlay, {
          '--clip': `polygon(0% ${50 - percentageVerticalClip}%, 100% ${50 - percentageVerticalClip}%, 100% ${50 + percentageVerticalClip}%, 0% ${50 + percentageVerticalClip}%)`,
          duration: 1, ease: 'expo.inOut'
        })
        // Step 2: Expand height
        .to(overlay, {
          '--clip': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1, ease: 'expo.inOut'
        })
        .call(() => {
          // Midway point: screen is covered. Change route!
          window.history.pushState({}, '', url);
          window.dispatchEvent(new Event('popstate'));
        })
        .to({}, { duration: 0.05 }) // Wait for React to render
        .call(() => {
          // Scroll to top instantly
          window.scrollTo(0, 0);
          requestAnimationFrame(() => {
            window.dispatchEvent(new Event('resize')); // Force GSAP/Lenis recalculation
          });
        });

        // Timeline for transitioning OUT
        const tlOut = gsap.timeline({
          delay: 2.1, // Wait for IN animation (1s + 1s + 0.05s)
          defaults: { duration: 1, ease: 'power4.inOut' },
          onComplete: () => {
            gsap.set(overlay, { pointerEvents: 'none', autoAlpha: 0, visibility: 'hidden' });
            lenis?.start();
          }
        });

        tlOut.to(words, {
          yPercent: -120,
          duration: 0.5,
          stagger: { amount: 0.25 },
          ease: 'back.in(1)'
        });

        tlOut.to(overlay, {
          '--clip': 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
        }, '<0.25');
      }, 50);
    };

    window.addEventListener('triggerTransition', handleTransition);
    return () => window.removeEventListener('triggerTransition', handleTransition);
  }, []);

  const text = `we're going to ${destination}`;
  const words = text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mx-[1vw]">
      <span className="word inline-block text-white">{word}</span>
    </span>
  ));

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] bg-primary pointer-events-none invisible flex items-center justify-center transition__overlay"
      style={{ clipPath: 'var(--clip)' }}
    >
      <h1 ref={titleRef} className="absolute w-full top-1/2 left-0 -translate-y-1/2 uppercase text-[5vw] text-center leading-none font-display-lg px-4 flex justify-center flex-wrap">
        {words}
      </h1>
    </div>
  );
};
