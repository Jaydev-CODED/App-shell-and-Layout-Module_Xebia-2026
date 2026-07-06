import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuditLogs } from './api/auditQueries';
import type { AuditLog } from './types';

export default function ActivityTimelinePage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'FAILURE'>('ALL');
  const [filterDate, setFilterDate] = useState<string>('');
  
  // Fetch latest 25 logs for the timeline
  const { data, isLoading } = useAuditLogs({
    search: '',
    startDate: filterDate,
    endDate: filterDate,
    action: 'ALL',
    resourceType: 'ALL',
    status: filterStatus,
    page: 1,
    limit: 25,
  });

  const logs = data?.data || [];

  // Group logs by date
  const groupedLogs: Record<string, AuditLog[]> = {};
  
  logs.forEach((log: AuditLog) => {
    const d = new Date(log.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateKey = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
    
    if (d.toDateString() === today.toDateString()) {
      dateKey = `TODAY, ${dateKey}`;
    } else if (d.toDateString() === yesterday.toDateString()) {
      dateKey = `YESTERDAY, ${dateKey}`;
    }

    if (!groupedLogs[dateKey]) groupedLogs[dateKey] = [];
    groupedLogs[dateKey].push(log);
  });

  const getActionConfig = (action: string) => {
    switch (action) {
      case 'CREATE': return { color: 'bg-green-100 text-green-600', icon: 'add_circle' };
      case 'UPDATE': return { color: 'bg-orange-100 text-orange-600', icon: 'edit' };
      case 'DELETE': return { color: 'bg-error border-error text-white', icon: 'delete' };
      case 'FAILED_LOGIN': return { color: 'bg-error border-error text-white', icon: 'warning' };
      case 'LOGIN': 
      case 'LOGOUT': return { color: 'bg-blue-100 text-blue-600', icon: 'login' };
      case 'EXPORT': return { color: 'bg-purple-100 text-purple-600', icon: 'download' };
      default: return { color: 'bg-gray-100 text-gray-600', icon: 'history' };
    }
  };

  return (
    <div className="p-6 text-on-background min-h-screen bg-background">
      <div className="mb-8">
        <h1 className="font-headline-lg text-primary mb-2">Activity Timeline</h1>
        <p className="font-body-md text-text-secondary flex items-center gap-2">
          Viewing chronological system activity for all modules
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Column - Timeline */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <span className="material-symbols-outlined animate-spin text-primary" style={{ fontSize: 32 }}>refresh</span>
            </div>
          ) : (
            Object.entries(groupedLogs).map(([dateStr, dayLogs]) => (
              <div key={dateStr} className="mb-10">
                <h3 className="font-label-md text-text-secondary mb-6 tracking-widest uppercase">{dateStr}</h3>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-outline-variant">
                  
                  {dayLogs.map((log) => {
                    const config = getActionConfig(log.action);
                    const timeStr = new Date(log.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                    return (
                      <div key={log.id} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group hover:is-active cursor-pointer" onClick={() => navigate(`/audit-detail/${log.id}`)}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 border-4 border-background ${config.color}`}>
                          <span className="material-symbols-outlined text-sm">{config.icon}</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] surface-card p-5 rounded-xl border border-outline-variant shadow-sm bg-surface ml-4 md:ml-0 md:group-even:text-right md:group-odd:text-left transition-all hover:border-primary/30 hover:shadow-md">
                          <div className="flex items-center justify-between md:group-even:flex-row-reverse mb-2">
                            <h4 className="font-headline-sm text-on-surface">{log.action} {log.resourceType}</h4>
                            <span className="font-label-sm text-text-secondary">{timeStr}</span>
                          </div>
                          <p className="font-body-sm text-on-surface-variant">{log.description}</p>
                          <div className="mt-3 flex items-center gap-2 md:group-even:justify-end">
                            <span className="font-label-sm text-text-secondary">By: {log.actor.name}</span>
                            {log.status === 'FAILURE' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-error/10 text-error uppercase">Failed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Sidebar - Context */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="surface-card p-6 rounded-xl border border-outline-variant shadow-sm bg-surface sticky top-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-outline-variant">
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center text-xl font-bold">
                <span className="material-symbols-outlined">shield</span>
              </div>
              <div>
                <h2 className="font-headline-md text-on-surface">System Context</h2>
                <p className="font-label-sm text-text-secondary">Live Audit Stream</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <div className="font-label-sm text-text-secondary mb-1">Total Logs Displayed</div>
                <div className="font-body-md text-on-surface font-mono bg-surface-container-low px-2 py-1 rounded inline-block">{logs.length}</div>
              </div>
              <div>
                <div className="font-label-sm text-text-secondary mb-1">Status</div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                  Monitoring Active
                </span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/audit')}
              className="w-full bg-surface text-primary border border-outline-variant hover:bg-primary-container hover:text-on-primary-container font-label-md py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">list_alt</span>
              View Full Audit Table
            </button>

            <div className="mt-8 pt-6 border-t border-outline-variant">
              <h3 className="font-label-md text-on-surface mb-3">Quick Filters</h3>
              
              <div className="mb-4">
                <label className="font-label-sm text-text-secondary block mb-1">Select Date</label>
                <input 
                  type="date" 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-surface-card rounded-lg font-body-sm text-on-background focus:border-primary-container focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <span 
                  onClick={() => setFilterStatus('ALL')} 
                  className={`px-3 py-1 rounded-full font-label-sm cursor-pointer border transition-colors ${filterStatus === 'ALL' ? 'bg-primary text-white border-primary' : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:bg-primary hover:text-white'}`}>
                  All Activity
                </span>
                <span 
                  onClick={() => setFilterStatus('FAILURE')} 
                  className={`px-3 py-1 rounded-full font-label-sm cursor-pointer border ${filterStatus === 'FAILURE' ? 'bg-error/20 text-error border-error' : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:bg-surface-container-high'}`}>
                  Security Alerts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
