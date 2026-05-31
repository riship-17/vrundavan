import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const MorphTransitionOverlay: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleTransition = (e: any) => {
      const { onNavigate } = e.detail;
      const overlay = overlayRef.current;
      const path = pathRef.current;
      if (!overlay || !path) return;

      gsap.killTweensOf(overlay);
      gsap.killTweensOf(path);

      gsap.set(overlay, {
        pointerEvents: 'auto',
        autoAlpha: 1,
        visibility: 'visible',
      });

      // PERFECTED PATH MAPPING (Bypasses the need for MorphSVGPlugin)
      const pathHiddenBottom = "M 0 100 L 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100";
      const pathEnterCurve = "M 0 100 L 0 50  Q 50 0   100 50  L 100 100 Q 50 100 0 100";
      const pathFilled = "M 0 100 L 0 0   Q 50 0   100 0   L 100 100 Q 50 100 0 100";
      const pathLeaveCurve = "M 0 50  L 0 0   Q 50 0   100 0   L 100 50  Q 50 0   0 50";
      const pathHiddenTop = "M 0 0   L 0 0   Q 50 0   100 0   L 100 0   Q 50 0   0 0";

      gsap.set(path, { attr: { d: pathHiddenBottom } });

      const tl = gsap.timeline();

      // ENTER ANIMATION
      tl.to(path, { attr: { d: pathEnterCurve }, duration: 0.8, ease: 'sine.in' })
        // The "<0.4" forces the fill to start halfway through the curve, making it fluid
        .to(path, { attr: { d: pathFilled }, duration: 0.8, ease: 'sine.out' }, "<0.4")
        .call(() => {
          // Fire navigation when screen is fully black
          if (onNavigate) onNavigate();
          window.scrollTo(0, 0);
        })
        // LEAVE ANIMATION
        // Delay 0.1s to allow React to mount the next page behind the overlay
        .to(path, { attr: { d: pathLeaveCurve }, duration: 0.6, ease: 'sine.in', delay: 0.1 })
        // Overlap the final exit stretch
        .to(path, { attr: { d: pathHiddenTop }, duration: 0.6, ease: 'sine.out' }, "<0.3")
        .set(overlay, { pointerEvents: 'none', autoAlpha: 0, visibility: 'hidden' })
        .set(path, { attr: { d: pathHiddenBottom } });
    };

    window.addEventListener('triggerMorphTransition', handleTransition);
    return () => window.removeEventListener('triggerMorphTransition', handleTransition);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed top-0 left-0 w-full h-[100dvh] pointer-events-none invisible z-[9999]"
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          ref={pathRef}
          className="fill-primary"
          stroke="none"
          strokeWidth="0"
          vectorEffect="non-scaling-stroke"
          d="M 0 100 L 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100"
        ></path>
      </svg>
    </div>
  );
};