import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesOverview from './pages/ServicesOverview';
import ServiceDetail from './pages/ServiceDetail';
import ProjectsOverview from './pages/ProjectsOverview';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

import { PageTransitionOverlay } from './components/PageTransitionOverlay';
import { MorphTransitionOverlay } from './components/MorphTransitionOverlay';
import { SyncTransitionOverlay } from './components/SyncTransitionOverlay';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  let pageContent;
  if (currentPath === '/about') {
    pageContent = <AboutPage />;
  } else if (currentPath === '/services') {
    pageContent = <ServicesOverview />;
  } else if (currentPath.startsWith('/services/')) {
    pageContent = <ServiceDetail />;
  } else if (currentPath === '/projects') {
    pageContent = <ProjectsOverview />;
  } else if (currentPath.startsWith('/projects/')) {
    const projectId = currentPath.replace('/projects/', '');
    pageContent = <ProjectDetail projectId={projectId as any} />;
  } else if (currentPath === '/contact') {
    pageContent = <Contact />;
  } else {
    pageContent = <HomePage />;
  }

  return (
    <>
      <PageTransitionOverlay />
      <MorphTransitionOverlay />
      <SyncTransitionOverlay />
      <div id="main-container" className="min-h-screen bg-black">
        {pageContent}
      </div>
    </>
  );
};

export default App;