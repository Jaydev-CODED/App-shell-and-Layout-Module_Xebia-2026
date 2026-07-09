import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
// @ts-ignore
import Header from '../../layouts/Header'
// @ts-ignore
import Sidebar from '../../layouts/Sidebar'
// @ts-ignore
import Footer from '../../layouts/Footer'

export function DashboardShell() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true'
  })
  const [hasNotification, setHasNotification] = useState(false)
  const location = useLocation()

  // Calculate active route id for highlighting active menu item
  const activeRouteId = location.pathname.substring(1) || 'dashboard'

  // Determine active page name for footer clock display
  const pageNames: Record<string, string> = {
    '': 'Dashboard',
    'dashboard': 'Dashboard',
    'analytics': 'Analytics',
    'projects': 'Projects',
    'reports': 'Reports',
    'settings/configuration': 'Settings',
    'audit': 'Audit Logs',
    'export': 'Export Logs',
    'compliance': 'Compliance',
    'activity': 'Activity Timeline',
  }
  const activePageName = pageNames[activeRouteId] || 'Dashboard'

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('sidebar-collapsed', String(next))
      
      // Dispatch resize event to recalculate SVG charts or responsive elements
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 200)

      return next
    })
  }

  // Handle setting notification triggers
  useEffect(() => {
    const handleNotificationEvent = () => {
      setHasNotification(true)
    }
    window.addEventListener('aura-notification', handleNotificationEvent)
    return () => window.removeEventListener('aura-notification', handleNotificationEvent)
  }, [])

  return (
    <div className="grid grid-rows-[64px_1fr] h-screen w-screen overflow-hidden text-gray-600">
      {/* Header spanning across */}
      <Header
        activeRoute={activeRouteId}
        hasNotification={hasNotification}
        onClearNotification={() => setHasNotification(false)}
      />

      {/* Main Body container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar (collapsible on desktop, hidden on mobile) */}
        <div className={`hidden md:block transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
        }`}>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
            activeRoute={activeRouteId}
          />
        </div>

        {/* Content Area + Footer */}
        <main className="flex-grow flex-1 flex flex-col justify-between overflow-y-auto bg-gray-50 min-w-0">
          <div className="flex-grow p-6 md:p-8 max-w-[1440px] w-full mx-auto animate-fade-in-up">
            <Outlet />
          </div>
          
          {/* Active status footer */}
          <Footer activePageName={activePageName} />
        </main>
      </div>
    </div>
  )
}
