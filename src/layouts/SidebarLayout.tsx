import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Breadcrumbs } from '../shared/ui/Breadcrumbs'

const links = [
  { to: '/settings/configuration', label: 'Configuration' },
  { to: '/settings/academic-rules', label: 'Academic Rules' },
  { to: '/settings/attendance-rules', label: 'Attendance Rules' },
  { to: '/settings/feature-flags', label: 'Feature Flags' },
  { to: '/settings/branding', label: 'Branding' },
]

export function SidebarLayout() {
  const location = useLocation()

  const routeMap: Record<string, string> = {
    '/settings/configuration': 'Configuration',
    '/settings/academic-rules': 'Academic Rules',
    '/settings/attendance-rules': 'Attendance Rules',
    '/settings/feature-flags': 'Feature Flags',
    '/settings/branding': 'Branding',
  }

  const currentLabel = routeMap[location.pathname] ?? 'Settings'

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'Dashboard', to: '/' }, { label: 'Settings' }, { label: currentLabel }]} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Settings</h2>
          <nav className="flex flex-wrap gap-2 lg:flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
