import React, { useState, useEffect } from 'react';
import { reportsService } from '../services/api';

export default function Reports({ onNotify }) {
  const [selectedReport, setSelectedReport] = useState('Telemetry Summary');
  const [status, setStatus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState([]);

  // 1. Fetch reports history on mount
  const loadReports = async () => {
    try {
      const data = await reportsService.getReports();
      setReports(data);
    } catch (err) {
      console.warn('[Reports] Failed to load historical reports from API.');
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  // 2. Poll report generation status until COMPLETED or FAILED
  const pollReportStatus = (reportId) => {
    const interval = setInterval(async () => {
      try {
        const data = await reportsService.getStatus(reportId);
        if (data.status === 'COMPLETED') {
          clearInterval(interval);
          setStatus('Report ready! Added to available downloads.');
          setIsGenerating(false);
          loadReports(); // Refresh history list
          
          if (typeof onNotify === 'function') {
            onNotify(`Custom "${selectedReport}" compiled successfully.`);
          }
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
          setStatus('Report compilation failed.');
          setIsGenerating(false);
        } else {
          setStatus(`Status: compiling (${data.status.toLowerCase()})...`);
        }
      } catch (err) {
        clearInterval(interval);
        setIsGenerating(false);
        setStatus('Error retrieving status.');
      }
    }, 1000);
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setStatus('Sending job to async queue...');

    try {
      // PDF or CSV format based on selections
      const format = selectedReport.includes('Latency') ? 'CSV' : 'PDF';
      const enqueued = await reportsService.generateReport(selectedReport, format);
      
      setStatus('Enqueued in BullMQ. Compiling in background...');
      pollReportStatus(enqueued.reportId);
    } catch (err) {
      console.error('[Reports] Error submitting report job:', err);
      setIsGenerating(false);
      setStatus('Failed to queue report compilation.');
    }
  };

  const handleDownload = (reportId) => {
    // Open download link in new tab / triggers download stream
    const url = reportsService.getDownloadUrl(reportId);
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Reports</h1>
        <p className="text-sm text-gray-600 mt-1">Generate, schedule, and download analytical data reports.</p>
      </div>

      {/* Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Downloads */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm lg:col-span-2 hover:shadow-md transition-shadow duration-300">
          <span className="text-sm font-semibold text-gray-600 block mb-4">Available Downloads</span>
          
          <div className="flex flex-col gap-4">
            {reports.length === 0 ? (
              <div className="text-center py-8 text-gray-400 italic text-xs bg-gray-50 border border-dashed border-gray-200 rounded-md">
                No reports compiled yet. Run a custom report on the right panel.
              </div>
            ) : (
              reports.map((report) => (
                <div 
                  key={report.id} 
                  className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-md hover:border-gray-200/80 transition-colors"
                >
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">{report.title}</h4>
                    <p className="text-2xs text-gray-600 mt-0.5">
                      {report.type} | {report.fileSizeKb ? `${report.fileSizeKb} KB` : 'Processing'} | {report.status}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDownload(report.id)}
                    disabled={report.status !== 'COMPLETED'}
                    className="px-4 py-2 bg-primary hover:bg-primaryDark text-white text-xs font-semibold rounded-md transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Download
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Run Custom Report */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
          <div>
            <span className="text-sm font-semibold text-gray-600 block mb-4">Run Custom Report</span>
            
            <div className="flex flex-col gap-3">
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-white border border-gray-200 rounded-md py-2 px-3 text-xs text-gray-600 focus:outline-none focus:border-primary disabled:opacity-50 transition-colors"
              >
                <option value="Telemetry Summary">Telemetry Summary (PDF)</option>
                <option value="Security Audits">Security Audits (PDF)</option>
                <option value="Route Latency Stats">Route Latency Stats (CSV)</option>
              </select>
              
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full py-2.5 bg-warning hover:bg-[#E65A00] text-white text-xs font-semibold rounded-md shadow-sm disabled:opacity-50 select-none cursor-pointer transition-colors"
              >
                {isGenerating ? 'Generating...' : 'Generate Now'}
              </button>
            </div>
          </div>

          {status && (
            <div className={`mt-4 text-center text-xs font-semibold ${isGenerating ? 'text-gray-600 animate-pulse' : 'text-success'}`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
