import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import AuditLogPage from './features/audit/AuditLogPage';
import AuditDetailPage from './features/audit/AuditDetailPage';
import ExportAuditLogsPage from './features/audit/ExportAuditLogsPage';
import ComplianceReportsPage from './features/audit/ComplianceReportsPage';
import ActivityTimelinePage from './features/audit/ActivityTimelinePage';

const sidebarLinks = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/academic', label: 'Academic', icon: 'school' },
  { to: '/finance', label: 'Finance', icon: 'payments' },
  { to: '/research', label: 'Research', icon: 'science' },
  { to: '/faculty', label: 'Faculty', icon: 'group' },
  { to: '/audit', label: 'Audit Logs', icon: 'list_alt' },
  { to: '/export', label: 'Export Logs', icon: 'ios_share' },
  { to: '/compliance', label: 'Compliance Reports', icon: 'verified_user' },
  { to: '/activity', label: 'Activity Timeline', icon: 'history' },
];

function App() {
  const location = useLocation();

  return (
    <div className="flex w-full h-screen overflow-hidden bg-surface text-on-surface">
      {/* ===== Sidebar Navigation ===== */}
      <nav className="bg-surface-container-low fixed left-0 top-0 h-screen w-[240px] border-r border-outline-variant flex-col py-2 px-4 overflow-y-auto z-40 hidden md:flex">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 px-2 mt-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>account_balance</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-primary leading-tight">UMS Portal</h1>
            <p className="font-body-sm text-text-secondary">Ivy League Edition</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-1">
          {sidebarLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive || (link.to === '/audit' && location.pathname === '/') || (link.to === '/audit' && location.pathname.startsWith('/audit-detail'))
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: '20px',
                        fontVariationSettings: (isActive || (link.to === '/audit' && location.pathname === '/') || (link.to === '/audit' && location.pathname.startsWith('/audit-detail'))) ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      {link.icon}
                    </span>
                    <span className="font-label-md">{link.label}</span>
                  </>
                )}
              </NavLink>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 border-t border-outline-variant space-y-1">
          <button className="w-full flex items-center justify-center gap-2 py-2 mb-4 bg-primary-container text-on-primary-container rounded-lg hover:bg-primary-hover transition-colors font-label-md cursor-pointer">
            Support
          </button>
          <a href="#settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all duration-200">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
            <span className="font-label-md">Settings</span>
          </a>
          <a href="#logout" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all duration-200">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
            <span className="font-label-md">Logout</span>
          </a>
        </div>
      </nav>

      {/* ===== Main Content Area ===== */}
      <main className="flex-1 md:ml-[240px] flex flex-col h-screen overflow-hidden">
        {/* Top App Bar */}
        <header className="bg-surface w-full h-16 border-b border-outline-variant flex justify-between items-center px-4 md:px-10 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <div className="font-headline-md text-primary">Academia PMS</div>
          </div>
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative group hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" style={{ fontSize: '20px' }}>search</span>
              <input
                className="pl-10 pr-4 py-2 bg-surface-container-low border border-surface-card rounded-full font-body-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all w-64"
                placeholder="Search..."
                type="text"
              />
            </div>
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors cursor-pointer relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors cursor-pointer">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors cursor-pointer">
                <span className="material-symbols-outlined">help</span>
              </button>
            </div>
            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm border border-outline-variant overflow-hidden">
              AJ
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<AuditLogPage />} />
            <Route path="/audit" element={<AuditLogPage />} />
            <Route path="/audit-detail/:id" element={<AuditDetailPage />} />
            <Route path="/export" element={<ExportAuditLogsPage />} />
            <Route path="/compliance" element={<ComplianceReportsPage />} />
            <Route path="/activity" element={<ActivityTimelinePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
