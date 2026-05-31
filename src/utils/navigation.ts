import React from 'react';

export const handleGlobalNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string, path: string) => {
  e.preventDefault();
  
  if (window.location.pathname === path) return; // Ignore if already on page

  if (item === 'SERVICES') {
    window.dispatchEvent(new CustomEvent('triggerTransition', { 
      detail: { destName: "Services", url: "/services" } 
    }));
  } else if (item === 'ABOUT') {
    window.dispatchEvent(new CustomEvent('triggerSyncTransition', { 
      detail: { 
        onNavigate: () => {
          window.history.pushState({}, '', '/about');
          window.dispatchEvent(new Event('popstate'));
        }
      } 
    }));
  } else {
    // HOME, PROJECTS, CONTACT use Morph Transition
    window.dispatchEvent(new CustomEvent('triggerMorphTransition', { 
      detail: { 
        onNavigate: () => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new Event('popstate'));
        }
      } 
    }));
  }
};
