import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { ProtectedLayout } from '../layouts/ProtectedLayout'
import { SidebarLayout } from '../layouts/SidebarLayout'

const Dashboard = lazy(() => import('../features/dashboard/Dashboard'))
const Analytics = lazy(() => import('../features/analytics/Analytics'))
const Projects = lazy(() => import('../features/projects/Projects'))
const Reports = lazy(() => import('../features/reports/Reports'))

const ConfigurationPage = lazy(() => import('../features/configuration/pages/ConfigurationPage'))
const AcademicRulesPage = lazy(() => import('../features/configuration/pages/AcademicRulesPage'))
const AttendanceRulesPage = lazy(() => import('../features/configuration/pages/AttendanceRulesPage'))
const FeatureFlagsPage = lazy(() => import('../features/configuration/pages/FeatureFlagsPage'))
const BrandingPage = lazy(() => import('../features/configuration/pages/BrandingPage'))
const NotificationSettingsPage = lazy(() => import('../features/configuration/pages/NotificationSettingsPage'))
const SystemPreferencesPage = lazy(() => import('../features/configuration/pages/SystemPreferencesPage'))

import AuditLogPage from '../features/audit/AuditLogPage';
import AuditDetailPage from '../features/audit/AuditDetailPage';
import ExportAuditLogsPage from '../features/audit/ExportAuditLogsPage';
import ComplianceReportsPage from '../features/audit/ComplianceReportsPage';
import ActivityTimelinePage from '../features/audit/ActivityTimelinePage';

function PageLoader({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: (
              <PageLoader>
                <Dashboard />
              </PageLoader>
            ),
          },
          {
            path: 'analytics',
            element: (
              <PageLoader>
                <Analytics />
              </PageLoader>
            ),
          },
          {
            path: 'projects',
            element: (
              <PageLoader>
                <Projects />
              </PageLoader>
            ),
          },
          {
            path: 'reports',
            element: (
              <PageLoader>
                <Reports onNotify={() => {}} />
              </PageLoader>
            ),
          },
          { path: 'audit', element: <AuditLogPage /> },
          { path: 'audit-detail/:id', element: <AuditDetailPage /> },
          { path: 'export', element: <ExportAuditLogsPage /> },
          { path: 'compliance', element: <ComplianceReportsPage /> },
          { path: 'activity', element: <ActivityTimelinePage /> },
          {
            path: 'settings',
            element: <SidebarLayout />,
            children: [
              {
                path: 'configuration',
                element: (
                  <PageLoader>
                    <ConfigurationPage />
                  </PageLoader>
                ),
              },
              {
                path: 'academic-rules',
                element: (
                  <PageLoader>
                    <AcademicRulesPage />
                  </PageLoader>
                ),
              },
              {
                path: 'attendance-rules',
                element: (
                  <PageLoader>
                    <AttendanceRulesPage />
                  </PageLoader>
                ),
              },
              {
                path: 'notifications',
                element: (
                  <PageLoader>
                    <NotificationSettingsPage />
                  </PageLoader>
                ),
              },
              {
                path: 'system-preferences',
                element: (
                  <PageLoader>
                    <SystemPreferencesPage />
                  </PageLoader>
                ),
              },
              {
                path: 'feature-flags',
                element: (
                  <PageLoader>
                    <FeatureFlagsPage />
                  </PageLoader>
                ),
              },
              {
                path: 'branding',
                element: (
                  <PageLoader>
                    <BrandingPage />
                  </PageLoader>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
])
