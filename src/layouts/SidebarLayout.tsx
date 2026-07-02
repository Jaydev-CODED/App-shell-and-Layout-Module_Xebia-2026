import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const links = [
  { to: '/settings/configuration', label: 'General' },
  { to: '/settings/academic-rules', label: 'Academic Rules' },
  { to: '/settings/attendance-rules', label: 'Attendance Rules' },
  { to: '/settings/notifications', label: 'Notifications' },
  { to: '/settings/system-preferences', label: 'System Preferences' },
  { to: '/settings/feature-flags', label: 'Feature Flags' },
  { to: '/settings/branding', label: 'Branding' },
]

const routeMap: Record<string, string> = {
  '/settings/configuration': 'General',
  '/settings/academic-rules': 'Academic Rules',
  '/settings/attendance-rules': 'Attendance Rules',
  '/settings/notifications': 'Notifications',
  '/settings/system-preferences': 'System Preferences',
  '/settings/feature-flags': 'Feature Flags',
  '/settings/branding': 'Branding',
}

export function SidebarLayout() {
  const location = useLocation()
  const currentLabel = routeMap[location.pathname] ?? 'Settings'

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li className="text-[#80737f]">Configuration</li>
          <li>
            <ChevronRight className="h-3.5 w-3.5 text-[#80737f]" strokeWidth={1.5} />
          </li>
          <li className="font-medium text-[#1a1c1e]">{currentLabel}</li>
        </ol>
      </nav>

      {/* Two-column layout */}
      <div className="flex gap-6 items-start">
        {/* Left sub-nav */}
        <aside
          className="hidden lg:block shrink-0 rounded-xl bg-white py-4"
          style={{
            width: '200px',
            border: '1px solid #e9e9ec',
          }}
        >
          <p
            className="mb-2 px-4 text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: '#80737f', letterSpacing: '0.12em' }}
          >
            Configuration
          </p>
          <nav className="space-y-0.5 px-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#f3e8f5] text-[#5c1d67]'
                      : 'text-[#4e434e] hover:bg-[#f3f3f6] hover:text-[#1a1c1e]',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Page content */}
        <section className="min-w-0 flex-1">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
