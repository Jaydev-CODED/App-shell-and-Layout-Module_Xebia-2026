import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';

export default function Header({ activeRoute, hasNotification, onClearNotification }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/', id: 'dashboard' },
    { name: 'Projects', path: '/projects', id: 'projects' },
    { name: 'Reports', path: '/reports', id: 'reports' },
    { name: 'Settings', path: '/settings/configuration', id: 'settings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full text-white bg-primaryDark border-b border-gray-100/10 transition-colors duration-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Brand logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white select-none">
          <span className="text-white text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">◆</span>
          <span>AuraShell</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex flex-1 justify-center" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.id || (link.id === 'settings' && activeRoute.startsWith('settings'));
              return (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className={`text-sm font-medium py-2 px-1 border-b-2 transition-all duration-150 ${
                      isActive
                        ? 'text-white border-warning'
                        : 'text-gray-100/70 border-transparent hover:text-white hover:border-secondary'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 text-gray-100/70 hover:text-white hover:bg-white/10 rounded-md border border-gray-100/10 transition-all duration-150"
            aria-label="Search"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClearNotification}
            className={`p-2 relative rounded-md border transition-all duration-300 ${
              hasNotification
                ? 'text-warning border-warning bg-warning/10 animate-bounce scale-110'
                : 'text-gray-100/70 border-gray-100/10 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Notifications"
            title={hasNotification ? "New notifications! Click to clear" : "No new notifications"}
          >
            <Bell className="w-4 h-4" />
            {hasNotification && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full ring-2 ring-primaryDark" />
            )}
          </button>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold border-2 border-gray-100/15 select-none hover:border-primary transition-colors cursor-pointer" title="User account">
            JD
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-100/10 bg-primaryDark shadow-lg transition-all duration-200" aria-label="Mobile">
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.id || (link.id === 'settings' && activeRoute.startsWith('settings'));
              return (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-100/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
