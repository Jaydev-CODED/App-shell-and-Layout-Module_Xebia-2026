import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ExportAuditLogsPage() {
  const [selectedModules, setSelectedModules] = useState<string[]>(['Academic Records']);
  const [selectedActions, setSelectedActions] = useState<string[]>(['CREATE', 'UPDATE', 'DELETE']);
  const [fileFormat, setFileFormat] = useState<string>('CSV');
  const [emailNotify, setEmailNotify] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const handleDownload = (jobId: string) => {
    const blob = new Blob([`Mock Data for ${jobId}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jobId.toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const toggleModule = (module: string) => {
    setSelectedModules(prev => prev.includes(module) ? prev.filter(m => m !== module) : [...prev, module]);
  };

  const toggleAction = (action: string) => {
    setSelectedActions(prev => prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]);
  };

  return (
    <div className="p-6 text-on-background min-h-screen bg-background relative">
      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg animate-slide-up-fade font-label-md">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            check_circle
          </span>
          <span>Export generation started successfully!</span>
        </div>
      )}

      <div className="mb-6">
        <div className="text-text-secondary font-label-md mb-2 flex items-center gap-1">
          <Link to="/audit" className="cursor-pointer hover:text-primary">Audit Logs</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span>Export</span>
        </div>
        <h1 className="font-headline-lg text-primary">Export Logs</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Main Column - Data Filters */}
        <div className="flex-1 space-y-6">
          <div className="surface-card p-6 rounded-xl outline outline-1 outline-outline-variant shadow-sm bg-surface">
            <h2 className="font-headline-md mb-4 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">filter_alt</span>
              DATA FILTERS
            </h2>
            
            <div className="space-y-6">
              {/* Date Range */}
              <div>
                <label className="block font-label-md text-on-surface-variant mb-2">Date Range</label>
                <div className="flex gap-4">
                  <input type="date" className="flex-1 bg-surface-container-low border border-outline-variant rounded-md px-3 py-2 text-on-surface focus:outline-none focus:border-primary" defaultValue="2023-10-01" />
                  <input type="date" className="flex-1 bg-surface-container-low border border-outline-variant rounded-md px-3 py-2 text-on-surface focus:outline-none focus:border-primary" defaultValue="2023-10-31" />
                </div>
              </div>

              {/* Target Modules */}
              <div>
                <label className="block font-label-md text-on-surface-variant mb-2">Target Modules</label>
                <div className="space-y-2">
                  {['Academic Records', 'Financial Transactions', 'User Authentication Logs', 'System Configuration Changes'].map(module => (
                    <label key={module} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedModules.includes(module)}
                        onChange={() => toggleModule(module)}
                        className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                      />
                      <span className="font-body-md text-on-surface">{module}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Types */}
              <div>
                <label className="block font-label-md text-on-surface-variant mb-2">Action Types</label>
                <div className="flex flex-wrap gap-2">
                  {['CREATE', 'UPDATE', 'DELETE', 'READ', 'AUTH'].map(action => {
                    const isSelected = selectedActions.includes(action);
                    return (
                      <button
                        key={action}
                        onClick={() => toggleAction(action)}
                        className={`px-4 py-1.5 rounded-full font-label-md transition-colors ${
                          isSelected 
                            ? 'bg-primary-container text-on-primary-container border border-primary' 
                            : 'bg-surface-container-low text-on-surface-variant border border-outline-variant hover:bg-surface-container-high'
                        }`}
                      >
                        {action}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Output Configuration */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="surface-card p-6 rounded-xl outline outline-1 outline-outline-variant shadow-sm bg-surface">
            <h2 className="font-headline-md mb-4 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings</span>
              OUTPUT CONFIGURATION
            </h2>

            <div className="space-y-6">
              {/* File Format */}
              <div>
                <label className="block font-label-md text-on-surface-variant mb-3">File Format</label>
                <div className="space-y-3">
                  {[
                    { id: 'CSV', label: 'CSV', desc: 'Data Analysis', icon: 'table' },
                    { id: 'PDF', label: 'PDF', desc: 'Executive Summary', icon: 'picture_as_pdf' },
                    { id: 'JSON', label: 'JSON', desc: 'System Import', icon: 'code' },
                  ].map(format => (
                    <label 
                      key={format.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${
                        fileFormat === format.id 
                          ? 'border-primary bg-primary-container bg-opacity-10' 
                          : 'border-outline-variant hover:bg-surface-container-low'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="format" 
                        value={format.id}
                        checked={fileFormat === format.id}
                        onChange={(e) => setFileFormat(e.target.value)}
                        className="mt-1 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-label-md text-on-surface">
                          <span className="material-symbols-outlined text-sm">{format.icon}</span>
                          {format.label}
                        </div>
                        <div className="text-sm text-text-secondary">{format.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Email Notification */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailNotify}
                  onChange={(e) => setEmailNotify(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                />
                <span className="font-body-md text-on-surface">Email notification when ready</span>
              </label>

              {/* Estimated Size */}
              <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
                  <span className="material-symbols-outlined text-sm">database</span>
                  Estimated Size
                </div>
                <div className="font-headline-sm text-on-surface">~4.2 MB</div>
              </div>

              {/* Generate CTA */}
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-label-md py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">{isGenerating ? 'hourglass_empty' : 'download'}</span>
                {isGenerating ? 'Generating...' : 'Generate Export'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export History */}
      <div className="surface-card rounded-xl outline outline-1 outline-outline-variant overflow-hidden bg-surface">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h2 className="font-headline-md text-on-surface">Export History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="py-3 px-6 font-label-sm text-text-secondary">JOB ID</th>
                <th className="py-3 px-6 font-label-sm text-text-secondary">DATE REQUESTED</th>
                <th className="py-3 px-6 font-label-sm text-text-secondary">FORMAT</th>
                <th className="py-3 px-6 font-label-sm text-text-secondary">RECORDS</th>
                <th className="py-3 px-6 font-label-sm text-text-secondary">STATUS</th>
                <th className="py-3 px-6 font-label-sm text-text-secondary">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-4 px-6 font-body-sm text-on-surface">EXP-20231024-01</td>
                <td className="py-4 px-6 font-body-sm text-text-secondary">Oct 24, 2023 10:30 AM</td>
                <td className="py-4 px-6 font-body-sm"><span className="bg-surface-container-high px-2 py-1 rounded text-xs font-label-sm">CSV</span></td>
                <td className="py-4 px-6 font-body-sm text-on-surface-variant">1,245</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning text-white">
                    <span className="material-symbols-outlined text-[12px]">sync</span>
                    In Progress
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-text-secondary hover:text-primary transition-colors disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-4 px-6 font-body-sm text-on-surface">EXP-20231023-42</td>
                <td className="py-4 px-6 font-body-sm text-text-secondary">Oct 23, 2023 04:15 PM</td>
                <td className="py-4 px-6 font-body-sm"><span className="bg-surface-container-high px-2 py-1 rounded text-xs font-label-sm">PDF</span></td>
                <td className="py-4 px-6 font-body-sm text-on-surface-variant">856</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                    <span className="material-symbols-outlined text-[12px]">check_circle</span>
                    Ready
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => handleDownload('EXP-20231023-42')} className="text-primary hover:text-primary-hover transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-4 px-6 font-body-sm text-on-surface">EXP-20231015-18</td>
                <td className="py-4 px-6 font-body-sm text-text-secondary">Oct 15, 2023 09:00 AM</td>
                <td className="py-4 px-6 font-body-sm"><span className="bg-surface-container-high px-2 py-1 rounded text-xs font-label-sm">JSON</span></td>
                <td className="py-4 px-6 font-body-sm text-on-surface-variant">5,432</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-variant text-on-surface-variant">
                    <span className="material-symbols-outlined text-[12px]">timer_off</span>
                    Expired
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-text-secondary hover:text-primary transition-colors disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
