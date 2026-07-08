/* eslint-disable react-refresh/only-export-components -- Router configuration file: lazy page imports and router export coexist by design (React Router v6 pattern) */
import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { ProtectedLayout } from '../layouts/ProtectedLayout'
import { SidebarLayout } from '../layouts/SidebarLayout'

const DashboardPage = lazy(() => import('../features/configuration/pages/DashboardPage'))
const ConfigurationPage = lazy(() => import('../features/configuration/pages/ConfigurationPage'))
const AcademicRulesPage = lazy(() => import('../features/configuration/pages/AcademicRulesPage'))
const AttendanceRulesPage = lazy(() => import('../features/configuration/pages/AttendanceRulesPage'))
const FeatureFlagsPage = lazy(() => import('../features/configuration/pages/FeatureFlagsPage'))
const BrandingPage = lazy(() => import('../features/configuration/pages/BrandingPage'))
const NotificationSettingsPage = lazy(() => import('../features/configuration/pages/NotificationSettingsPage'))
const SystemPreferencesPage = lazy(() => import('../features/configuration/pages/SystemPreferencesPage'))

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
                <DashboardPage />
              </PageLoader>
            ),
          },
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
