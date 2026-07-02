import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuditLogs } from './api/auditQueries';
import AuditFilters from './components/AuditFilters';
import AuditLogTable from './components/AuditLogTable';
import type { AuditLogFilters } from './types';
import { auditApi } from './api/auditApi';

export const AuditLogPage: React.FC = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<AuditLogFilters>({
    search: '',
    startDate: '',
    endDate: '',
    action: 'ALL',
    resourceType: 'ALL',
    status: 'ALL',
    page: 1,
    limit: 15,
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const { data, isLoading, isError } = useAuditLogs(filters);

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const csvContent = await auditApi.exportLogs(filters);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (error) {
      console.error('Failed to export logs:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = () => {
    navigate('/export');
  };

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full flex-1 flex flex-col gap-8">
      {/* Toast Notification */}
      {exportSuccess && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg animate-slide-up-fade font-label-md">
          <span className="material-symbols-outlined text-success" style={{ fontSize: 18 }}>
            check_circle
          </span>
          <span>Audit logs exported successfully!</span>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="font-body-sm text-text-secondary flex items-center gap-1.5">
        <span>Administration</span>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
          chevron_right
        </span>
        <span className="text-text-primary font-medium">Audit Logs</span>
      </nav>

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg text-text-primary">Audit Trail</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container rounded-lg font-label-md hover:bg-primary-hover hover:text-on-primary transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              download
            </span>
            {isExporting ? 'Exporting…' : 'Export CSV'}
          </button>

          <button
            onClick={() => navigate('/activity')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container rounded-lg font-label-md hover:bg-primary-hover hover:text-on-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>history</span>
            Timeline
          </button>

          <button
            onClick={() => navigate('/compliance')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container rounded-lg font-label-md hover:bg-primary-hover hover:text-on-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>verified_user</span>
            Reports
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container rounded-lg font-label-md hover:bg-primary-hover hover:text-on-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              settings_applications
            </span>
            Advanced Export
          </button>
        </div>
      </div>

      {/* Error State */}
      {isError ? (
        <div className="bg-error/5 border border-error/20 rounded-xl p-5 flex items-center gap-3 text-error animate-slide-up-fade">
          <span className="material-symbols-outlined">error</span>
          <div>
            <h3 className="font-label-md">Failed to load audit logs</h3>
            <p className="font-body-sm mt-0.5 opacity-90">
              There was an error communicating with the audit service. Please refresh the page.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Filters */}
          <AuditFilters
            filters={filters}
            onFilterChange={setFilters}
            onExport={handleExportCSV}
            isExporting={isExporting}
          />

          {/* Table */}
          <AuditLogTable
            data={data?.data || []}
            total={data?.total || 0}
            totalPages={data?.totalPages || 1}
            isLoading={isLoading}
            filters={filters}
            onFilterChange={setFilters}
            onRowClick={(id) => navigate(`/audit-detail/${id}`)}
          />
        </>
      )}
    </div>
  );
};

export default AuditLogPage;
