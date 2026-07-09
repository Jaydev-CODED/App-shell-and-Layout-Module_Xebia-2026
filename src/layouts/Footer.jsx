import React, { useState, useEffect } from 'react';

export default function Footer({ activePageName }) {
  const [timeString, setTimeString] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // 1. Clock timer
    const updateClock = () => {
      setTimeString(new Date().toLocaleTimeString());
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    // 2. Network listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <footer className="bg-primaryDark border-t border-gray-100/10 text-gray-100/70 z-10 transition-colors duration-200" id="app-footer">
      <div className="max-w-[1280px] mx-auto px-5 py-8 md:py-10 flex flex-col md:flex-row justify-between gap-8 md:gap-12">
        
        {/* Brand section */}
        <div className="max-w-[280px] flex-shrink-0">
          <a href="#/dashboard" className="flex items-center gap-2 text-md font-bold tracking-tight text-white mb-3">
            <span className="text-white text-lg">◆</span>
            <span>AuraShell</span>
          </a>
          <p className="text-xs leading-relaxed text-gray-100/60">
            A premium, modular App Shell layout engine built with React, Vite, and Tailwind CSS.
          </p>
        </div>

        {/* Footer link columns */}
        <div className="flex flex-wrap gap-8 md:gap-12">
          <div className="min-w-[100px]">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">Navigation</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#/analytics" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#/projects" className="hover:text-white transition-colors">Projects</a></li>
            </ul>
          </div>

          <div className="min-w-[100px]">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">Resources</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#/reports" className="hover:text-white transition-colors">Reports</a></li>
              <li><a href="#/settings" className="hover:text-white transition-colors">Settings</a></li>
              <li><a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Docs</a></li>
            </ul>
          </div>

          <div className="min-w-[140px]">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">System Details</h4>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              <li className="flex gap-1.5 items-center">
                <span>Active:</span>
                <strong className="text-white font-semibold">{activePageName}</strong>
              </li>
              <li className="flex gap-1.5 items-center">
                <span>Status:</span>
                <strong className={isOnline ? 'text-success font-semibold' : 'text-warning font-semibold'}>
                  {isOnline ? 'Online' : 'Offline'}
                </strong>
              </li>
              <li className="flex gap-1.5 items-center">
                <span>Uptime:</span>
                <strong className="text-white font-semibold tabular-nums">{timeString}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100/10 max-w-[1280px] mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs">
        <p>© 2026 AuraShell System. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
