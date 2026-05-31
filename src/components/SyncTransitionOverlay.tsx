import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const SyncTransitionOverlay: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTransition = (e: any) => {
      // 1. Accept the router callback
      const { onNavigate } = e.detail;
      const overlay = overlayRef.current;
      const mainContainer = document.getElementById('main-container');

      if (!overlay || !mainContainer) {
        if (onNavigate) onNavigate();
        return;
      }

      // 2. Create a snapshot clone of the current page
      const clone = mainContainer.cloneNode(true) as HTMLElement;
      const currentScroll = window.scrollY;
      
      // Style the clone so it perfectly overlaps the current view
      gsap.set(clone, {
        position: 'fixed',
        top: -currentScroll,
        left: 0,
        width: '100%',
        height: mainContainer.scrollHeight,
        margin: 0,
        pointerEvents: 'none',
        // Center the scale origin based on where the user is currently looking
        transformOrigin: `50% ${currentScroll + (window.innerHeight / 2)}px`,
        zIndex: 2
      });

      overlay.innerHTML = '';
      overlay.appendChild(clone);
      
      gsap.set(overlay, { display: 'block', zIndex: 9998, backgroundColor: '#000' });
      document.body.style.overflow = 'hidden'; // Hide scrollbar during transition

      // 3. Trigger React Router to change the page behind the scenes
      if (onNavigate) onNavigate();
      window.scrollTo(0, 0);

      // 4. Wait for React to render the new page (requestAnimationFrame ensures DOM is ready)
      requestAnimationFrame(() => {
        setTimeout(() => {
          // Prepare the REAL mainContainer (the new page)
          gsap.set(mainContainer, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            scale: 0.6,
            clipPath: 'inset(100% 0 0 0)', // Hidden at the bottom
            zIndex: 9999, // Above the overlay (which is 9998)
            overflow: 'hidden',
            willChange: 'transform, clip-path'
          });

          // 5. The Properly Sequenced Timeline (Matching the Tutorial)
          const tl = gsap.timeline({
            defaults: { duration: 1.0, ease: "power3.inOut" },
            onComplete: () => {
              // Cleanup
              overlay.innerHTML = '';
              gsap.set(overlay, { display: 'none' });
              gsap.set(mainContainer, { clearProps: 'all' });
              document.body.style.overflow = '';
              window.dispatchEvent(new Event('resize')); // Force layout recalculation if needed
            }
          });

          // Phase 1: Current page shrinks
          tl.to(clone, { 
            scale: 0.6 
          });

          // Phase 2: Current fades, Next page wipes up
          tl.to(clone, { 
            opacity: 0.45, 
            ease: "power3.inOut" 
          }, "-=0.2") // Slight overlap for fluidity
          .to(mainContainer, { 
            clipPath: 'inset(0% 0 0 0)', 
            ease: "power3.inOut" 
          }, "<");

          // Phase 3: Next page expands
          tl.to(mainContainer, { 
            scale: 1,
            duration: 1.25 // Slightly longer for the final satisfying snap
          }, "-=0.4"); 

        }, 50); // Small buffer for React 18 concurrent rendering
      });
    };

    window.addEventListener('triggerSyncTransition', handleTransition);
    return () => window.removeEventListener('triggerSyncTransition', handleTransition);
  }, []);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 pointer-events-none hidden"
    />
  );
};