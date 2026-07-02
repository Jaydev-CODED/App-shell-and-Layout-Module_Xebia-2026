import React, { useEffect } from 'react';
import { X, Terminal, User, Info, Calendar } from 'lucide-react';
import { useAuditLogDetail } from '../api/auditQueries';

interface AuditDetailDrawerProps {
  logId: string | null;
  onClose: () => void;
}

export const AuditDetailDrawer: React.FC<AuditDetailDrawerProps> = ({ logId, onClose }) => {
  const { data: log, isLoading, isError } = useAuditLogDetail(logId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!logId) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-955/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel with premium slide-in-right animation */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-card border-l border-border shadow-2xl flex flex-col h-full animate-slide-in-right">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-background/50">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Event Details</h2>
                {log && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-background border border-border text-muted-foreground">
                    {log.id}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Inspect full compliance trail metadata.</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-background rounded-lg text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isLoading ? (
              <div className="space-y-4 py-8">
                <div className="h-6 bg-secondary rounded w-1/3 animate-pulse"></div>
                <div className="h-20 bg-secondary rounded w-full animate-pulse"></div>
                <div className="h-32 bg-secondary rounded w-full animate-pulse"></div>
              </div>
            ) : isError || !log ? (
              <div className="text-center py-8 text-rose-500 animate-slide-up-fade">
                <p className="font-semibold">Failed to load event details.</p>
                <p className="text-sm mt-1 text-muted-foreground">Please try again later.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-slide-up-fade">
                {/* Section 1: Overview */}
                <div className="bg-background/55 rounded-xl p-4 border border-border/50 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground font-medium">Description</div>
                      <div className="text-sm font-semibold text-foreground leading-relaxed">
                        {log.description}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {log.status === 'SUCCESS' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-success">
                          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Failure
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div>
                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Date & Time</div>
                        <div className="text-xs font-semibold text-foreground">{formatDate(log.timestamp)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div>
                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">IP Address</div>
                        <div className="text-xs font-mono font-semibold text-foreground">{log.ipAddress}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Actor Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <User className="w-4 h-4 text-primary" />
                    <span>Actor Details (Who)</span>
                  </div>
                  <div className="border border-border rounded-xl overflow-hidden divide-y divide-border/40">
                    <div className="flex px-4 py-3 text-xs">
                      <span className="w-32 text-muted-foreground font-medium">Name</span>
                      <span className="font-semibold text-foreground">{log.actor.name}</span>
                    </div>
                    <div className="flex px-4 py-3 text-xs">
                      <span className="w-32 text-muted-foreground font-medium">Email</span>
                      <span className="font-mono text-foreground">{log.actor.email}</span>
                    </div>
                    <div className="flex px-4 py-3 text-xs">
                      <span className="w-32 text-muted-foreground font-medium">Role</span>
                      <span className="font-bold text-primary">{log.actor.role}</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Target Resource */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Info className="w-4 h-4 text-primary" />
                    <span>Resource Details (What)</span>
                  </div>
                  <div className="border border-border rounded-xl overflow-hidden divide-y divide-border/40">
                    <div className="flex px-4 py-3 text-xs">
                      <span className="w-32 text-muted-foreground font-medium">Type</span>
                      <span className="font-semibold text-foreground">{log.resourceType}</span>
                    </div>
                    <div className="flex px-4 py-3 text-xs">
                      <span className="w-32 text-muted-foreground font-medium">ID</span>
                      <span className="font-mono text-foreground">{log.resourceId || 'N/A'}</span>
                    </div>
                    <div className="flex px-4 py-3 text-xs">
                      <span className="w-32 text-muted-foreground font-medium">Action</span>
                      <span className="font-semibold text-foreground uppercase">{log.action}</span>
                    </div>
                  </div>
                </div>

                {/* Section 4: Metadata Payload Changes */}
                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Terminal className="w-4 h-4 text-primary" />
                      <span>Data Payload & Metadata</span>
                    </div>
                    
                    {(log.metadata.before || log.metadata.after) ? (
                      <div className="space-y-3">
                        {log.metadata.before && (
                          <div>
                            <div className="text-[10px] text-rose-500 font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                              Previous State (Before)
                            </div>
                            <pre className="p-4 bg-slate-950 text-rose-400 text-xs rounded-xl overflow-x-auto font-mono max-h-60 shadow-inner">
                              {JSON.stringify(log.metadata.before, null, 2)}
                            </pre>
                          </div>
                        )}
                        {log.metadata.after && (
                          <div>
                            <div className="text-[10px] text-green-500 font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                              Updated State (After)
                            </div>
                            <pre className="p-4 bg-slate-950 text-green-400 text-xs rounded-xl overflow-x-auto font-mono max-h-60 shadow-inner">
                              {JSON.stringify(log.metadata.after, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    ) : (
                      <pre className="p-4 bg-slate-950 text-slate-300 text-xs rounded-xl overflow-x-auto font-mono max-h-80 shadow-inner">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    )}
                  </div>
                )}

                {/* Section 5: Device Metadata */}
                <div className="text-[10px] text-muted-foreground space-y-1 bg-background p-3 rounded-lg border border-border">
                  <div className="font-semibold uppercase tracking-wider">Device User Agent</div>
                  <div className="font-mono break-all leading-normal opacity-85">{log.userAgent}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuditDetailDrawer;
