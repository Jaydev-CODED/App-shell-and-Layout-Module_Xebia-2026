import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuditLogDetail } from './api/auditQueries';
import type { AuditLog } from './types';

// ============================================================
// Helpers
// ============================================================

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

const formatShortTime = (dateString: string) =>
  new Date(dateString).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

const ACTION_COLORS: Record<string, string> = {
  CREATE: 'bg-success/15 text-success',
  UPDATE: 'bg-warning/15 text-warning',
  DELETE: 'bg-error/15 text-error',
  LOGIN: 'bg-chart-1/15 text-chart-1',
  LOGOUT: 'bg-outline/15 text-outline',
  EXPORT: 'bg-secondary/15 text-secondary',
  FAILED_LOGIN: 'bg-error/15 text-error',
};

const MODULE_ICONS: Record<string, string> = {
  Student: 'school',
  Course: 'menu_book',
  Department: 'apartment',
  Timetable: 'calendar_month',
  User: 'person',
  Authentication: 'lock',
};

/**
 * Build diff rows from before / after metadata objects.
 * Returns an array of { field, oldValue, newValue, changed } items.
 */
function buildDiffRows(
  before: Record<string, unknown> | undefined,
  after: Record<string, unknown> | undefined,
) {
  const allKeys = new Set<string>();
  if (before) Object.keys(before).forEach((k) => allKeys.add(k));
  if (after) Object.keys(after).forEach((k) => allKeys.add(k));

  return Array.from(allKeys).map((field) => {
    const oldValue = before?.[field];
    const newValue = after?.[field];
    const changed = JSON.stringify(oldValue) !== JSON.stringify(newValue);
    return { field, oldValue, newValue, changed };
  });
}

/**
 * Generate a set of mock "related activity" entries for the actor.
 * In a real app this would come from an API call.
 */
function generateRelatedActivity(log: AuditLog) {
  const ts = new Date(log.timestamp);
  return [
    {
      id: log.id,
      timestamp: log.timestamp,
      title: `${log.action} – ${log.resourceType}`,
      description: log.description,
      isCurrent: true,
    },
    {
      id: `${log.id}-rel-1`,
      timestamp: new Date(ts.getTime() - 25 * 60_000).toISOString(),
      title: 'Viewed dashboard',
      description: `${log.actor.name} accessed the main dashboard.`,
      isCurrent: false,
    },
    {
      id: `${log.id}-rel-2`,
      timestamp: new Date(ts.getTime() - 90 * 60_000).toISOString(),
      title: 'Logged in',
      description: `Session started from ${log.ipAddress}.`,
      isCurrent: false,
    },
  ];
}

// ============================================================
// Skeleton Loader
// ============================================================

const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-surface-container-high ${className}`} />
);

const LoadingSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-slide-up-fade">
    {/* Breadcrumb */}
    <SkeletonBlock className="h-4 w-48" />
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <SkeletonBlock className="h-9 w-72" />
        <SkeletonBlock className="h-4 w-56" />
      </div>
      <div className="flex gap-3">
        <SkeletonBlock className="h-10 w-32 rounded-xl" />
        <SkeletonBlock className="h-10 w-32 rounded-xl" />
      </div>
    </div>
    {/* Grid */}
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <div className="xl:col-span-8 space-y-6">
        <SkeletonBlock className="h-48 rounded-2xl" />
        <SkeletonBlock className="h-64 rounded-2xl" />
      </div>
      <div className="xl:col-span-4 space-y-6">
        <SkeletonBlock className="h-60 rounded-2xl" />
        <SkeletonBlock className="h-52 rounded-2xl" />
      </div>
    </div>
  </div>
);

// ============================================================
// Error State
// ============================================================

const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-slide-up-fade">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 mb-6">
      <span className="material-symbols-outlined text-error" style={{ fontSize: 32 }}>
        error
      </span>
    </div>
    <h2 className="font-headline-md text-on-surface mb-2">Unable to load event</h2>
    <p className="font-body-md text-text-secondary max-w-md mx-auto mb-6">{message}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md hover:bg-primary-hover transition-colors cursor-pointer"
    >
      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
        refresh
      </span>
      Retry
    </button>
  </div>
);

// ============================================================
// AuditDetailPage
// ============================================================

export const AuditDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: log, isLoading, isError, refetch } = useAuditLogDetail(id ?? null);

  // ------ Loading ------
  if (isLoading) return <LoadingSkeleton />;

  // ------ Error ------
  if (isError || !log) {
    return (
      <ErrorState
        message="The requested audit event could not be found or the service is unavailable."
        onRetry={() => refetch()}
      />
    );
  }

  const hasDiff = !!(log.metadata?.before || log.metadata?.after);
  const diffRows = hasDiff
    ? buildDiffRows(log.metadata?.before, log.metadata?.after)
    : [];
  const relatedActivity = generateRelatedActivity(log);

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(log, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_event_${log.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ------ Render ------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-slide-up-fade">
      {/* ====== Breadcrumb ====== */}
      <nav className="flex items-center gap-2 font-body-sm text-text-secondary">
        <Link
          to="/audit"
          className="inline-flex items-center gap-1 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            arrow_back
          </span>
          Audit Logs
        </Link>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
          chevron_right
        </span>
        <span className="text-on-surface font-label-sm">Event Detail</span>
      </nav>

      {/* ====== Page Header ====== */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left – Title & timestamp */}
        <div className="space-y-1">
          <h1 className="font-headline-lg text-on-surface">
            Event: {log.resourceType} {log.action.charAt(0) + log.action.slice(1).toLowerCase()}
          </h1>
          <div className="flex items-center gap-2 font-body-sm text-text-secondary">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              calendar_today
            </span>
            {formatDate(log.timestamp)}
            <span
              className={`ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm ${
                log.status === 'SUCCESS'
                  ? 'bg-success/10 text-success'
                  : 'bg-error/10 text-error'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  log.status === 'SUCCESS' ? 'bg-success' : 'bg-error'
                }`}
              />
              {log.status === 'SUCCESS' ? 'Success' : 'Failure'}
            </span>
          </div>
        </div>

        {/* Right – Action buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface font-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              download
            </span>
            Export JSON
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-md hover:bg-primary-hover transition-colors cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              flag
            </span>
            Flag Event
          </button>
        </div>
      </div>

      {/* ====== Main Grid ====== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* ——— Left Column ——— */}
        <div className="xl:col-span-8 space-y-6">
          {/* --- Event Summary Card --- */}
          <div className="interactive-card rounded-2xl bg-background p-6">
            <h2 className="font-headline-sm text-on-surface pb-4 border-b border-surface-card flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>
                summarize
              </span>
              Event Summary
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
              {/* Module */}
              <div>
                <div className="font-label-sm text-text-secondary uppercase tracking-wider mb-1.5">
                  Module
                </div>
                <div className="flex items-center gap-2 font-label-md text-on-surface">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: 20 }}
                  >
                    {MODULE_ICONS[log.resourceType] ?? 'category'}
                  </span>
                  {log.resourceType}
                </div>
              </div>

              {/* Action Type */}
              <div>
                <div className="font-label-sm text-text-secondary uppercase tracking-wider mb-1.5">
                  Action Type
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-sm ${
                    ACTION_COLORS[log.action] ?? 'bg-outline/10 text-outline'
                  }`}
                >
                  {log.action}
                </span>
              </div>

              {/* Actor */}
              <div>
                <div className="font-label-sm text-text-secondary uppercase tracking-wider mb-1.5">
                  Actor
                </div>
                <div className="font-label-md text-on-surface">{log.actor.name}</div>
                <div className="font-body-sm text-text-secondary">{log.actor.id}</div>
              </div>

              {/* Request ID */}
              <div>
                <div className="font-label-sm text-text-secondary uppercase tracking-wider mb-1.5">
                  Request ID
                </div>
                <div className="font-mono text-sm text-on-surface-variant break-all">
                  {log.id}
                </div>
              </div>
            </div>
          </div>

          {/* --- Data Modification Card --- */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-surface-card">
              <h2 className="font-headline-sm text-on-surface flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: 22 }}
                >
                  compare_arrows
                </span>
                Data Modification
              </h2>
              {hasDiff && (
                <div className="flex items-center gap-4 font-label-sm text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-error/15 border border-error/30" />
                    Old Value
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-success/15 border border-success/30" />
                    New Value
                  </span>
                </div>
              )}
            </div>

            {hasDiff ? (
              <div className="mt-4 overflow-x-auto rounded-xl border border-surface-card">
                <table className="w-full text-left font-body-sm">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-surface-card">
                      <th className="px-4 py-3 font-label-sm text-text-secondary uppercase tracking-wider">
                        Field
                      </th>
                      <th className="px-4 py-3 font-label-sm text-text-secondary uppercase tracking-wider">
                        Previous State
                      </th>
                      <th className="px-4 py-3 font-label-sm text-text-secondary uppercase tracking-wider">
                        New State
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-card">
                    {diffRows.map((row) => (
                      <tr key={row.field} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-4 py-3 font-label-md text-on-surface">
                          {row.field}
                        </td>
                        <td className="px-4 py-3">
                          {row.changed ? (
                            <span className="diff-removed inline-block px-2 py-0.5 rounded font-mono text-xs line-through">
                              {row.oldValue !== undefined
                                ? String(row.oldValue)
                                : '—'}
                            </span>
                          ) : (
                            <span className="font-mono text-xs text-on-surface-variant">
                              {row.oldValue !== undefined
                                ? String(row.oldValue)
                                : '—'}
                              <span className="ml-1.5 text-text-secondary font-label-sm">
                                (unchanged)
                              </span>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {row.changed ? (
                            <span className="diff-added inline-block px-2 py-0.5 rounded font-mono text-xs font-semibold">
                              {row.newValue !== undefined
                                ? String(row.newValue)
                                : '—'}
                            </span>
                          ) : (
                            <span className="font-mono text-xs text-on-surface-variant">
                              {row.newValue !== undefined
                                ? String(row.newValue)
                                : '—'}
                              <span className="ml-1.5 text-text-secondary font-label-sm">
                                (unchanged)
                              </span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* No before/after – render raw metadata JSON */
              <div className="mt-4">
                <pre className="p-4 bg-surface-container-low text-on-surface-variant text-xs rounded-xl overflow-x-auto font-mono max-h-80 border border-surface-card">
                  {JSON.stringify(log.metadata ?? {}, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* ——— Right Column ——— */}
        <div className="xl:col-span-4 space-y-6">
          {/* --- System Metadata Card --- */}
          <div className="interactive-card rounded-2xl bg-background p-6">
            <h2 className="font-headline-sm text-on-surface pb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>
                terminal
              </span>
              System Metadata
            </h2>

            <div className="divide-y divide-surface-variant">
              {/* IP Address */}
              <div className="py-4 first:pt-0">
                <div className="font-label-sm text-text-secondary uppercase tracking-wider mb-1">
                  IP Address
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-on-surface">{log.ipAddress}</span>
                  {log.ipAddress.startsWith('192.168.') || log.ipAddress.startsWith('10.') ? (
                    <span className="px-2 py-0.5 rounded-full bg-warning/15 text-warning font-label-sm">
                      INTERNAL
                    </span>
                  ) : null}
                </div>
              </div>

              {/* User Agent */}
              <div className="py-4">
                <div className="font-label-sm text-text-secondary uppercase tracking-wider mb-1">
                  User Agent
                </div>
                <p className="font-body-sm text-on-surface-variant break-words leading-relaxed">
                  {log.userAgent}
                </p>
              </div>

              {/* API Endpoint */}
              <div className="py-4">
                <div className="font-label-sm text-text-secondary uppercase tracking-wider mb-1">
                  API Endpoint
                </div>
                <div className="font-mono text-sm text-on-surface-variant">
                  /api/v1/{log.resourceType.toLowerCase()}s
                  {log.resourceId ? `/${log.resourceId}` : ''}
                </div>
              </div>
            </div>
          </div>

          {/* --- Related Activity Timeline --- */}
          <div className="interactive-card rounded-2xl bg-background p-6">
            <h2 className="font-headline-sm text-on-surface mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>
                timeline
              </span>
              Related Activity
            </h2>
            <p className="font-body-sm text-text-secondary mb-5">
              Recent actions by {log.actor.name}
            </p>

            {/* Timeline */}
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[9px] top-1 bottom-1 border-l-2 border-surface-container-high" />

              <div className="space-y-5">
                {relatedActivity.map((entry) => (
                  <div key={entry.id} className="relative">
                    {/* Dot */}
                    <span
                      className={`absolute -left-6 top-1 w-[18px] h-[18px] rounded-full bg-background border-2 ${
                        entry.isCurrent
                          ? 'border-primary'
                          : 'border-outline-variant'
                      }`}
                    />

                    {/* Content */}
                    <div>
                      <div className="font-label-sm text-text-secondary">
                        {formatShortTime(entry.timestamp)}
                      </div>
                      <div className="font-label-md text-on-surface mt-0.5">
                        {entry.title}
                      </div>
                      <p className="font-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View full history link */}
            <button
              onClick={() => navigate('/activity')}
              className="mt-5 inline-flex items-center gap-1 font-label-sm text-primary hover:text-primary-hover transition-colors cursor-pointer"
            >
              View full user history
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDetailPage;
