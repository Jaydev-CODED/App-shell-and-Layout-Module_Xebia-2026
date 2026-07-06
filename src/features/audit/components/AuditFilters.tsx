import React from 'react';
import type { AuditLogFilters, AuditAction } from '../types';

interface AuditFiltersProps {
  filters: AuditLogFilters;
  onFilterChange: (filters: AuditLogFilters) => void;
  onExport: () => void;
  isExporting: boolean;
}

const ACTION_OPTIONS: (AuditAction | 'ALL')[] = [
  'ALL', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT',
];

const MODULE_OPTIONS = [
  'ALL', 'Academics', 'Finance', 'User Management', 'System',
];

const inputClasses =
  'w-full px-3 py-2.5 bg-background border border-surface-card rounded-lg font-body-md text-on-background focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none transition-all';

export const AuditFilters: React.FC<AuditFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value, page: 1 });
  };

  const handleSelectChange = (key: keyof AuditLogFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value, page: 1 });
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      startDate: '',
      endDate: '',
      action: 'ALL',
      resourceType: 'ALL',
      status: 'ALL',
      page: 1,
      limit: filters.limit,
    });
  };

  return (
    <div className="bg-surface border border-surface-card rounded-xl p-6 flex flex-wrap gap-4 items-end">
      {/* Search User */}
      <div className="flex flex-col gap-1.5 min-w-[200px] flex-1">
        <label className="font-label-sm text-text-secondary">Search User</label>
        <div className="relative">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            style={{ fontSize: 18 }}
          >
            search
          </span>
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="ID or Name..."
            className={`${inputClasses} pl-9`}
          />
        </div>
      </div>

      {/* Module */}
      <div className="flex flex-col gap-1.5 min-w-[160px]">
        <label className="font-label-sm text-text-secondary">Module</label>
        <select
          value={filters.resourceType}
          onChange={(e) => handleSelectChange('resourceType', e.target.value)}
          className={`${inputClasses} cursor-pointer`}
        >
          {MODULE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'ALL' ? 'All Modules' : opt}
            </option>
          ))}
        </select>
      </div>

      {/* Action Type */}
      <div className="flex flex-col gap-1.5 min-w-[160px]">
        <label className="font-label-sm text-text-secondary">Action Type</label>
        <select
          value={filters.action}
          onChange={(e) => handleSelectChange('action', e.target.value)}
          className={`${inputClasses} cursor-pointer`}
        >
          {ACTION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'ALL' ? 'All Actions' : opt.charAt(0) + opt.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <div className="flex flex-col gap-1.5 min-w-[280px]">
        <label className="font-label-sm text-text-secondary">Date Range</label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleSelectChange('startDate', e.target.value)}
            className={`${inputClasses} cursor-pointer`}
          />
          <span className="text-text-secondary text-sm">to</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleSelectChange('endDate', e.target.value)}
            className={`${inputClasses} cursor-pointer`}
          />
        </div>
      </div>

      {/* Filter Button */}
      <button
        onClick={handleReset}
        className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-background rounded-lg border border-surface-card hover:bg-surface-variant transition-colors font-label-md cursor-pointer"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          clear_all
        </span>
        Clear Filters
      </button>
    </div>
  );
};

export default AuditFilters;
