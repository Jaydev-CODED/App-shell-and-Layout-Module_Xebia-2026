import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function ComplianceReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const today = new Date();
  
  const formatDate = (daysAgo: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const handleDownload = (reportName: string) => {
    const blob = new Blob([`Mock Data for ${reportName}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.replace(/\s+/g, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleRunReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-6 text-on-background min-h-screen bg-background relative">
      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg animate-slide-up-fade font-label-md">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            check_circle
          </span>
          <span>Compliance report successfully generated!</span>
        </div>
      )}

      <div className="mb-6">
        <div className="text-text-secondary font-label-md mb-2 flex items-center gap-1">
          <Link to="/audit" className="cursor-pointer hover:text-primary">Audit Logs</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span>Reports</span>
        </div>
        <h1 className="font-headline-lg text-primary flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">summarize</span>
          Compliance Reports
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Column */}
        <div className="flex-1 space-y-6">
          {/* Report Configuration Card */}
          <div className="surface-card p-6 rounded-xl outline outline-1 outline-outline-variant shadow-sm bg-surface">
            <h2 className="font-headline-md mb-6 text-on-surface">Report Configuration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-2">Target Modules</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-md px-3 py-2.5 text-on-surface focus:outline-none focus:border-primary appearance-none">
                  <option>All Modules</option>
                  <option>Academic Records</option>
                  <option>Financials</option>
                </select>
              </div>
              
              <div>
                <label className="block font-label-md text-on-surface-variant mb-2">Target Users/Roles</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-md px-3 py-2.5 text-on-surface focus:outline-none focus:border-primary appearance-none">
                  <option>All Roles</option>
                  <option>Admins</option>
                  <option>Instructors</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant mb-2">Event Types</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-md px-3 py-2.5 text-on-surface focus:outline-none focus:border-primary appearance-none">
                  <option>Critical & High Severity</option>
                  <option>All Events</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant mb-2">Date Range</label>
                <div className="flex items-center gap-2">
                  <input type="date" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-3 py-2.5 text-on-surface focus:outline-none focus:border-primary" />
                  <span className="text-text-secondary text-sm">to</span>
                  <input type="date" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-3 py-2.5 text-on-surface focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleRunReport}
                disabled={isGenerating}
                className="bg-primary-container text-on-primary-container hover:bg-primary-hover px-6 py-2.5 rounded-lg font-label-md flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">
                  {isGenerating ? 'hourglass_empty' : 'play_arrow'}
                </span>
                {isGenerating ? 'Running...' : 'Run Report'}
              </button>
              <button className="bg-surface text-on-surface border border-surface-card hover:bg-surface-container-low px-6 py-2.5 rounded-lg font-label-md flex items-center gap-2 transition-colors outline outline-1 outline-outline-variant">
                <span className="material-symbols-outlined text-sm">save</span>
                Save as Template
              </button>
            </div>
          </div>

          {/* Saved Reports */}
          <div className="surface-card rounded-xl outline outline-1 outline-outline-variant overflow-hidden bg-surface">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low">
              <h2 className="font-headline-md text-on-surface">Saved Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface border-b border-outline-variant">
                    <th className="py-3 px-6 font-label-sm text-text-secondary">REPORT NAME</th>
                    <th className="py-3 px-6 font-label-sm text-text-secondary">FREQUENCY</th>
                    <th className="py-3 px-6 font-label-sm text-text-secondary">LAST GENERATED</th>
                    <th className="py-3 px-6 font-label-sm text-text-secondary text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container-low transition-colors bg-surface">
                    <td className="py-4 px-6 font-body-md text-on-surface font-medium">Monthly FERPA Compliance</td>
                    <td className="py-4 px-6">
                      <span className="bg-surface-container-high px-2.5 py-1 rounded-full text-xs font-label-sm text-on-surface-variant border border-outline-variant">Monthly</span>
                    </td>
                    <td className="py-4 px-6 font-body-sm text-text-secondary">{formatDate(30)}</td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => handleDownload('Monthly FERPA Compliance')} className="text-primary hover:text-primary-hover p-1 cursor-pointer">
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors bg-surface">
                    <td className="py-4 px-6 font-body-md text-on-surface font-medium">Failed Authentication Attempts</td>
                    <td className="py-4 px-6">
                      <span className="bg-surface-container-high px-2.5 py-1 rounded-full text-xs font-label-sm text-on-surface-variant border border-outline-variant">Weekly</span>
                    </td>
                    <td className="py-4 px-6 font-body-sm text-text-secondary">{formatDate(7)}</td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => handleDownload('Failed Authentication Attempts')} className="text-primary hover:text-primary-hover p-1 cursor-pointer">
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors bg-surface">
                    <td className="py-4 px-6 font-body-md text-on-surface font-medium">Grade Modifications Audit</td>
                    <td className="py-4 px-6">
                      <span className="bg-surface-container-high px-2.5 py-1 rounded-full text-xs font-label-sm text-on-surface-variant border border-outline-variant">On Demand</span>
                    </td>
                    <td className="py-4 px-6 font-body-sm text-text-secondary">{formatDate(45)}</td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => handleDownload('Grade Modifications Audit')} className="text-primary hover:text-primary-hover p-1 cursor-pointer">
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recent Activity */}
        <div className="w-full lg:w-80">
          <div className="surface-card p-6 rounded-xl outline outline-1 outline-outline-variant shadow-sm bg-surface h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-on-surface">Recent Report Activity</h2>
            </div>
            
            <div className="relative border-l border-outline-variant ml-3 space-y-6">
              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-success"></div>
                <div className="font-label-md text-on-surface">Weekly Admin Audit</div>
                <div className="font-body-sm text-text-secondary mt-1">Generated by System</div>
                <div className="font-label-sm text-text-secondary mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Today, 08:00 AM
                </div>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-success"></div>
                <div className="font-label-md text-on-surface">FERPA Report Q3</div>
                <div className="font-body-sm text-text-secondary mt-1">Generated by Jane Doe</div>
                <div className="font-label-sm text-text-secondary mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Yesterday, 14:30 PM
                </div>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-error"></div>
                <div className="font-label-md text-on-surface">Custom Access Log</div>
                <div className="font-body-sm text-text-secondary mt-1">Failed to generate</div>
                <div className="font-label-sm text-text-secondary mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {formatDate(2)}, 11:15 AM
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant">
              <a href="#" className="text-primary hover:text-primary-hover font-label-md flex items-center justify-center gap-1">
                View All History
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
