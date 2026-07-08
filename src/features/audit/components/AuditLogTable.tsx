import React from 'react';
import type { AuditLog, AuditLogFilters } from '../types';

interface AuditLogTableProps {
  data: AuditLog[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  filters: AuditLogFilters;
  onFilterChange: (filters: AuditLogFilters) => void;
  onRowClick: (id: string) => void;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.[0] ?? '?').toUpperCase();
};

const getActionBadge = (action: string): string => {
  switch (action) {
    case 'UPDATE':
      return 'bg-success/10 text-success';
    case 'DELETE':
    case 'FAILED_LOGIN':
      return 'bg-error/10 text-error';
    case 'CREATE':
      return 'bg-primary-container/10 text-primary-container';
    case 'LOGIN':
    case 'LOGOUT':
      return 'bg-surface-variant text-on-surface-variant';
    default:
      return 'bg-surface-variant text-on-surface-variant';
  }
};

const formatTimestamp = (dateString: string): string => {
  const d = new Date(dateString);
  const month = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${month} ${day}, ${hours}:${minutes}:${seconds}`;
};

export const AuditLogTable: React.FC<AuditLogTableProps> = ({
  data,
  total,
  totalPages,
  isLoading,
  filters,
  onFilterChange,
  onRowClick,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onFilterChange({ ...filters, page: newPage });
    }
  };

  const startEntry = (filters.page - 1) * filters.limit + 1;
  const endEntry = Math.min(filters.page * filters.limit, total);

  return (
    <div className="bg-surface border border-surface-card rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-surface-card">
              <th className="px-6 py-4 font-label-sm text-text-secondary uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 font-label-sm text-text-secondary uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-4 font-label-sm text-text-secondary uppercase tracking-wider">
                Module
              </th>
              <th className="px-6 py-4 font-label-sm text-text-secondary uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 font-label-sm text-text-secondary uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-4 font-label-sm text-text-secondary uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-card/50">
            {isLoading ? (
              /* Skeleton loading rows */
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container-high" />
                      <div>
                        <div className="h-4 bg-surface-container-high rounded w-24 mb-1.5" />
                        <div className="h-3 bg-surface-container-high rounded w-16" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-surface-container-high rounded w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-surface-container-high rounded w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-surface-container-high rounded w-48" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-surface-container-high rounded w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-surface-container-high rounded w-28" />
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-4 border border-surface-card">
                      <span className="material-symbols-outlined text-text-secondary">
                        search_off
                      </span>
                    </div>
                    <h3 className="font-label-md text-on-surface mb-1">No logs found</h3>
                    <p className="font-body-sm text-text-secondary">
                      We couldn't find any audit logs matching your current filter criteria. Try
                      adjusting your filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => onRowClick(log.id)}
                  className="hover:bg-surface-container-lowest transition-colors cursor-pointer group"
                >
                  {/* USER — avatar initials + name + id */}
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center font-label-md shrink-0">
                        {getInitials(log.actor.name)}
                      </div>
                      <div>
                        <div className="font-label-md text-on-surface">
                          {log.actor.name}
                        </div>
                        <div className="font-body-sm text-text-secondary">
                          {log.actor.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ACTION — colored badge */}
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md font-label-sm ${getActionBadge(log.action)}`}
                    >
                      {log.action}
                    </span>
                  </td>

                  {/* MODULE */}
                  <td className="px-6 py-3.5 font-body-md text-on-surface whitespace-nowrap">
                    {log.resourceType}
                  </td>

                  {/* DESCRIPTION */}
                  <td className="px-6 py-3.5">
                    <span className="font-body-md text-text-secondary truncate max-w-xs block group-hover:text-primary transition-colors">
                      {log.description}
                    </span>
                  </td>

                  {/* IP ADDRESS */}
                  <td className="px-6 py-3.5 text-text-secondary font-mono text-xs whitespace-nowrap">
                    {log.ipAddress}
                  </td>

                  {/* TIMESTAMP */}
                  <td className="px-6 py-3.5 text-text-secondary font-body-sm whitespace-nowrap">
                    {formatTimestamp(log.timestamp)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && data.length > 0 && (
        <div className="border-t border-surface-card px-6 py-4 flex items-center justify-between">
          {/* Left: entry count */}
          <div className="font-body-sm text-text-secondary">
            Showing{' '}
            <span className="font-semibold text-on-surface">{startEntry}</span> to{' '}
            <span className="font-semibold text-on-surface">{endEntry}</span> of{' '}
            <span className="font-semibold text-on-surface">{total}</span> entries
          </div>

          {/* Right: pagination buttons */}
          <div className="flex items-center gap-1.5">
            {/* Previous */}
            <button
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
              className="p-2 border border-surface-card rounded-lg text-text-secondary hover:bg-surface-container-low transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                chevron_left
              </span>
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              let pageNum = index + 1;
              if (filters.page > 3 && totalPages > 5) {
                pageNum = filters.page - 3 + index;
                if (pageNum + (4 - index) > totalPages) {
                  pageNum = totalPages - 4 + index;
                }
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1.5 font-label-sm rounded-lg transition-all cursor-pointer ${
                    filters.page === pageNum
                      ? 'bg-primary-container text-on-primary-container'
                      : 'border border-surface-card text-text-secondary hover:bg-surface-container-low'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === totalPages}
              className="p-2 border border-surface-card rounded-lg text-text-secondary hover:bg-surface-container-low transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                chevron_right
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogTable;
