import React, { useState, useEffect } from 'react';
import { settingsService } from '../services/api';

export default function Settings() {
  const [transitions, setTransitions] = useState(true);
  const [telemetry, setTelemetry] = useState(true);
  const [cache, setCache] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Fetch settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await settingsService.getSettings();
        setTransitions(settings.routerTransitions);
        setTelemetry(settings.routerTelemetry);
        setCache(settings.routerCache);
      } catch (err) {
        console.warn('[Settings] Failed to fetch settings from API.');
      } finally {
        setIsLoaded(true);
      }
    }
    loadSettings();
  }, []);

  // 2. Save settings helper
  const handleToggle = async (key, val) => {
    if (!isLoaded) return;
    
    // Optimistic UI update
    if (key === 'routerTransitions') setTransitions(val);
    if (key === 'routerTelemetry') setTelemetry(val);
    if (key === 'routerCache') setCache(val);

    try {
      await settingsService.updateSettings({
        [key]: val
      });
      
      // Update local storage too for immediate local shell synchronization
      if (key === 'routerTransitions') localStorage.setItem('router-transitions', val);
      if (key === 'routerTelemetry') localStorage.setItem('router-telemetry', val);
      if (key === 'routerCache') localStorage.setItem('router-cache', val);
      
    } catch (err) {
      console.error('[Settings] Error saving configuration:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Workspace Configuration</h1>
        <p className="text-sm text-gray-600 mt-1">Adjust core application behavior and themes.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration options */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm lg:col-span-2 hover:shadow-md transition-shadow duration-300">
          <span className="text-sm font-semibold text-gray-600 block mb-6">Core Preferences</span>
          
          <div className="flex flex-col gap-5">
            {/* Dynamic Transitions */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Dynamic Transitions</h4>
                <p className="text-2xs text-gray-600 mt-0.5">Enable smooth fade/slide micro-animations during page swaps.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={transitions}
                  onChange={(e) => handleToggle('routerTransitions', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {/* Developer Telemetry Logging */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Developer Telemetry Logging</h4>
                <p className="text-2xs text-gray-600 mt-0.5">Dump router events and lifecycle mounts directly to the developer console.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={telemetry}
                  onChange={(e) => handleToggle('routerTelemetry', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {/* Force Router Cache */}
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Force Router Cache</h4>
                <p className="text-2xs text-gray-600 mt-0.5">Cache loaded pages in-memory instead of re-instantiating them.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={cache}
                  onChange={(e) => handleToggle('routerCache', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
          </div>
        </div>

        {/* Integration Meta Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
          <div>
            <span className="text-sm font-semibold text-gray-600 block mb-4">Integration Meta</span>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              This layout configuration allows other developers on the team to bind their settings components inside custom containers.
            </p>
          </div>

          <div className="text-3xs bg-gray-50 border border-dashed border-gray-200 p-3 rounded-md text-gray-600 font-mono leading-relaxed">
            active_router: "React_Vite_SPA_v1.0"<br />
            mount_node: "main#app-main"<br />
            styling_engine: "Tailwind_v4"
          </div>
        </div>
      </div>
    </div>
  );
}
