import { Routes, Route } from 'react-router-dom';
import AuditLogPage from '../features/audit/AuditLogPage';
import AuditDetailPage from '../features/audit/AuditDetailPage';
import ExportAuditLogsPage from '../features/audit/ExportAuditLogsPage';
import ComplianceReportsPage from '../features/audit/ComplianceReportsPage';
import ActivityTimelinePage from '../features/audit/ActivityTimelinePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8"><h1 className="font-headline-lg text-primary">Dashboard</h1><p className="mt-4 text-text-secondary">Dashboard module is currently under construction.</p></div>} />
      <Route path="/academic" element={<div className="p-8"><h1 className="font-headline-lg text-primary">Academic</h1><p className="mt-4 text-text-secondary">Academic module is currently under construction.</p></div>} />
      <Route path="/finance" element={<div className="p-8"><h1 className="font-headline-lg text-primary">Finance</h1><p className="mt-4 text-text-secondary">Finance module is currently under construction.</p></div>} />
      <Route path="/research" element={<div className="p-8"><h1 className="font-headline-lg text-primary">Research</h1><p className="mt-4 text-text-secondary">Research module is currently under construction.</p></div>} />
      <Route path="/faculty" element={<div className="p-8"><h1 className="font-headline-lg text-primary">Faculty</h1><p className="mt-4 text-text-secondary">Faculty module is currently under construction.</p></div>} />
      <Route path="/audit" element={<AuditLogPage />} />
      <Route path="/audit-detail/:id" element={<AuditDetailPage />} />
      <Route path="/export" element={<ExportAuditLogsPage />} />
      <Route path="/compliance" element={<ComplianceReportsPage />} />
      <Route path="/activity" element={<ActivityTimelinePage />} />
    </Routes>
  );
}
