import React, { useState, useEffect } from 'react';
import { IndianRupee, Users, CheckSquare, TrendingUp } from 'lucide-react';
import { statsService, socketService } from '../services/api';

export default function Dashboard({ onNotify }) {
  const [clickCount, setClickCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(12482);
  const [revenue, setRevenue] = useState(48259.00);
  const [completionPercent, setCompletionPercent] = useState(84.2);
  const [latency, setLatency] = useState(14);
  const [isLive, setIsLive] = useState(false);

  // 1. Fetch initial statistics
  useEffect(() => {
    async function loadStats() {
      try {
        const data = await statsService.getDashboardStats();
        setRevenue(data.revenue);
        setActiveUsers(data.activeUsers);
        setCompletionPercent(data.projectCompletionPercent);
      } catch (err) {
        console.warn('[Dashboard] Could not load API stats, using local mock data fallback.');
      }
    }
    loadStats();
  }, []);

  // 2. Setup Socket.io Real-Time Telemetry Connection
  useEffect(() => {
    const handleTelemetryUpdate = (data) => {
      setActiveUsers(data.activeUsers);
      setLatency(data.latency);
      setIsLive(true);
    };

    const handleThroughputSpike = () => {
      // Handled globally or inside Analytics page, but we can log it here
      console.log('[Dashboard WS] Traffic spike event detected.');
    };

    const socket = socketService.connect(handleTelemetryUpdate, handleThroughputSpike);

    // If socket connects successfully, set live status
    if (socket) {
      setIsLive(true);
    }

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleNotifyTrigger = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Call user notification integration handler
    if (typeof onNotify === 'function') {
      onNotify(`Interaction recorded at ${new Date().toLocaleTimeString()}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Real-time platform metrics and quick management actions.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-2xs">
          <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-2xs font-bold text-gray-600 uppercase tracking-wider">
            {isLive ? 'WS Telemetry Live' : 'Mock Mode (WS Offline)'}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:translate-y-[-4px] hover:border-gray-200/80 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-600">Total Revenue</span>
            <div className="p-2 bg-primary/10 text-primary rounded-md">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 tracking-tight mb-2">₹{revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>+12.4% this month</span>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:translate-y-[-4px] hover:border-gray-200/80 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-600">Active Users</span>
            <div className="p-2 bg-primary/10 text-primary rounded-md">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 tracking-tight mb-2 tabular-nums">
            {activeUsers.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>+4.8% since last week</span>
          </div>
        </div>

        {/* Project Completion */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:translate-y-[-4px] hover:border-gray-200/80 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-600">Project Completion</span>
            <div className="p-2 bg-primary/10 text-primary rounded-md">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{completionPercent}%</div>
          <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>Synchronized with Database</span>
          </div>
        </div>
      </div>

      {/* Interactive Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:translate-y-[-4px] hover:border-gray-200/80 hover:shadow-md transition-all duration-300">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Router State & Lifecycle Demo</h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            This dashboard uses a background timer initialized on <code>mount()</code> and destroyed on <code>unmount()</code> to simulate live user activity.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleNotifyTrigger}
              className="px-5 py-2.5 bg-warning hover:bg-[#E65A00] text-white text-xs font-semibold rounded-md transition-colors shadow-sm select-none cursor-pointer"
            >
              Trigger Notification Hook
            </button>
            <span className="text-xs text-gray-600">
              {clickCount === 0 ? 'Button not clicked yet' : `Interactions: ${clickCount}`}
            </span>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:translate-y-[-4px] hover:border-gray-200/80 hover:shadow-md transition-all duration-300">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Live WebSockets Telemetry</h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Receiving telemetry events directly from the Express/Socket.io backend service.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <span className="text-2xs text-gray-600 uppercase block mb-1">Server Latency</span>
              <span className="text-lg font-bold text-gray-900 tabular-nums">{latency} ms</span>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <span className="text-2xs text-gray-600 uppercase block mb-1">Telemetry Sync</span>
              <span className="text-lg font-bold text-gray-900">3s interval</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
