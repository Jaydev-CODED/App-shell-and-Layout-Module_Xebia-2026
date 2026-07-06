import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

import { authService } from './services/api';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });
  const [hasNotification, setHasNotification] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // Auto authenticate with mock/seed account
  useEffect(() => {
    async function initAuth() {
      try {
        if (!authService.isAuthenticated()) {
          await authService.login('member@company.com', 'password123');
        }
      } catch (e) {
        console.warn('[App] Could not perform auto login, falling back to mock mode.');
      } finally {
        setIsAuthLoaded(true);
      }
    }
    initAuth();
  }, []);

  // 1. Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/dashboard';
      setCurrentHash(hash);

      // Console telemetry logger
      const showTelemetry = localStorage.getItem('router-telemetry') !== 'false';
      if (showTelemetry) {
        const routeId = hash.replace(/^#\//, '') || 'dashboard';
        const pageName = routeId.charAt(0).toUpperCase() + routeId.slice(1);
        console.log(`[Router Integration] Navigation completed. Current Page: ${pageName} (${hash})`);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initialize standard fallback route if hash is empty
    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 2. Notification handler
  const handleNotify = (message) => {
    setHasNotification(true);

    // Console telemetry logger
    const showTelemetry = localStorage.getItem('router-telemetry') !== 'false';
    if (showTelemetry) {
      console.log(`[Notification Integration] Received message from page: "${message}"`);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', next);
      
      // Dispatch resize event to recalculate SVG charts or responsive elements
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 200);

      return next;
    });
  };

  // Route resolver
  const activeRouteId = currentHash.replace(/^#\//, '') || 'dashboard';
  
  const pageNames = {
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    projects: 'Projects',
    reports: 'Reports',
    settings: 'Settings',
  };
  const activePageName = pageNames[activeRouteId] || 'Dashboard';

  const renderPage = () => {
    switch (activeRouteId) {
      case 'dashboard':
        return <Dashboard onNotify={handleNotify} />;
      case 'analytics':
        return <Analytics />;
      case 'projects':
        return <Projects />;
      case 'reports':
        return <Reports onNotify={handleNotify} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNotify={handleNotify} />;
    }
  };

  if (!isAuthLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-gray-500 font-semibold">
        Initializing Workspace Shell...
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[64px_1fr] h-screen w-screen overflow-hidden">
      {/* Header spanning across */}
      <Header
        activeRoute={activeRouteId}
        hasNotification={hasNotification}
        onClearNotification={() => setHasNotification(false)}
      />

      {/* Main Body container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar (collapsible on desktop, hidden on mobile) */}
        <div className={`hidden md:block transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
        }`}>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
            activeRoute={activeRouteId}
          />
        </div>

        {/* Content Area + Footer */}
        <main className="flex-1 flex flex-col justify-between overflow-y-auto bg-gray-50">
          <div className="flex-grow p-6 md:p-8 max-w-[1200px] w-full mx-auto">
            {/* Animating page wrapper on route switch */}
            <div key={activeRouteId} className="animate-fade-in-up">
              {renderPage()}
            </div>
          </div>
          
          <Footer activePageName={activePageName} />
        </main>
      </div>
    </div>
  );
}
