import React, { useState, useEffect } from 'react';
import { statsService, socketService } from '../services/api';

export default function Analytics() {
  const [chartData, setChartData] = useState([120, 150, 95, 140, 110, 190, 160, 210, 185, 230, 200, 250]);
  const [latency, setLatency] = useState(14);
  const [isLive, setIsLive] = useState(false);

  // 1. Fetch initial throughput on mount
  useEffect(() => {
    async function loadThroughput() {
      try {
        const data = await statsService.getThroughput();
        setChartData(data);
      } catch (err) {
        console.warn('[Analytics] Failed to load throughput, using local fallback.');
      }
    }
    loadThroughput();
  }, []);

  // 2. Listen to real-time spikes from Socket.io
  useEffect(() => {
    const handleTelemetryUpdate = (data) => {
      setLatency(data.latency);
      setIsLive(true);
    };

    const handleThroughputSpike = (newThroughput) => {
      setChartData(newThroughput);
      setIsLive(true);
    };

    const socket = socketService.connect(handleTelemetryUpdate, handleThroughputSpike);
    if (socket) {
      setIsLive(true);
    }

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleSimulateSpike = async () => {
    try {
      const updatedData = await statsService.simulateSpike();
      if (updatedData) {
        setChartData(updatedData);
      } else {
        // Fallback local simulation if backend server is offline
        const spikedData = chartData.map(() => Math.floor(Math.random() * 180) + 70);
        setChartData(spikedData);
      }
    } catch (err) {
      console.warn('[Analytics] Spike simulation error:', err);
    }
  };

  // SVG Chart calculation parameters
  const svgWidth = 600;
  const svgHeight = 200;
  const maxVal = Math.max(...chartData) * 1.1; // Add 10% safety padding
  const pointsCount = chartData.length;
  const stepX = svgWidth / (pointsCount - 1);

  // Build the SVG path string
  let pathD = '';
  let areaD = `M 0 ${svgHeight} `;

  chartData.forEach((val, index) => {
    const x = index * stepX;
    // Flip coordinate space so 0,0 is bottom-left
    const y = svgHeight - (val / maxVal) * svgHeight;

    if (index === 0) {
      pathD += `M ${x} ${y} `;
    } else {
      pathD += `L ${x} ${y} `;
    }
    areaD += `L ${x} ${y} `;
  });
  areaD += `L ${svgWidth} ${svgHeight} Z`;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Performance Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Aggregated database load, user sessions, and API responsiveness data.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-2xs">
          <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-2xs font-bold text-gray-600 uppercase tracking-wider">
            {isLive ? 'WS Telemetry Connected' : 'Local Fallback'}
          </span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Chart Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm lg:col-span-2 hover:shadow-md hover:border-gray-200/80 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold text-gray-600">Live API Throughput (Requests / sec)</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_#6C1D5F]" />
              <span className="text-xs font-medium text-gray-600">Production API</span>
            </div>
          </div>

          <div className="h-[250px] relative w-full overflow-visible">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6C1D5F" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6C1D5F" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="50" x2={svgWidth} y2="50" stroke="#DADCEA" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2={svgWidth} y2="100" stroke="#DADCEA" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2={svgWidth} y2="150" stroke="#DADCEA" strokeWidth="1" strokeDasharray="4 4" />

              {/* Render area fill first */}
              <path
                d={areaD}
                fill="url(#chart-grad)"
                className="transition-all duration-500 ease-in-out"
              />

              {/* Render path stroke */}
              <path
                d={pathD}
                fill="none"
                stroke="#6C1D5F"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500 ease-in-out"
              />

              {/* Data points */}
              {chartData.map((val, index) => {
                const x = index * stepX;
                const y = svgHeight - (val / maxVal) * svgHeight;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#FFFFFF"
                    stroke="#6C1D5F"
                    strokeWidth="2.5"
                    className="transition-all duration-500 ease-in-out hover:r-6 cursor-pointer"
                    title={`RPS: ${val}`}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Breakdown side-card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-gray-200/80 transition-all duration-300">
          <div>
            <span className="text-sm font-semibold text-gray-600 block mb-6">System Status</span>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-600">API Gateway</span>
                <span className="text-success font-semibold">99.98% uptime</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-600">Auth Service</span>
                <span className="text-success font-semibold">Optimal ({latency}ms)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Database Cluster</span>
                <span className="text-warning font-semibold">Active Connected</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSimulateSpike}
            className="w-full mt-6 py-2.5 bg-warning hover:bg-[#E65A00] text-white text-xs font-semibold rounded-md transition-colors shadow-sm cursor-pointer select-none"
          >
            Simulate Spike
          </button>
        </div>
      </div>
    </div>
  );
}
