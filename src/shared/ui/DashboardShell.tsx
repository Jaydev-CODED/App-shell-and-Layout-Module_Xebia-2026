import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { TopNavbar } from './TopNavbar'

export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className={collapsed ? 'w-full lg:w-20' : 'w-full lg:w-72'}>
          <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        </div>

        <div className="flex min-h-screen flex-1 flex-col">
          <TopNavbar />
          <main className="flex-1 p-3 sm:p-6 lg:p-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
