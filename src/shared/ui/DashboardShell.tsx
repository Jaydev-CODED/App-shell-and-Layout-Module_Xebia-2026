import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { TopNavbar } from './TopNavbar'

export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#f9f9fc' }}>
      <div className="flex min-h-screen">
        {/* Fixed Sidebar */}
        <div
          className="hidden lg:flex flex-col shrink-0 sticky top-0 h-screen"
          style={{ width: collapsed ? '72px' : '240px', transition: 'width 200ms ease' }}
        >
          <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-h-screen min-w-0">
          <TopNavbar />
          <main className="flex-1 p-6 lg:p-8" style={{ maxWidth: '1440px', width: '100%' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
