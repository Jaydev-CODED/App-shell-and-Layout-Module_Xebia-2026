import { NavLink } from 'react-router-dom'
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  Settings2,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'

type SidebarItem = {
  label: string
  to: string
  icon: LucideIcon
  children?: Array<{ label: string; to: string }>
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'University', to: '/university', icon: Building2 },
  { label: 'Students', to: '/students', icon: GraduationCap },
  { label: 'Faculty', to: '/faculty', icon: Users },
  {
    label: 'Settings',
    to: '/settings/configuration',
    icon: Settings2,
    children: [
      { label: 'Configuration', to: '/settings/configuration' },
      { label: 'Academic Rules', to: '/settings/academic-rules' },
      { label: 'Attendance Rules', to: '/settings/attendance-rules' },
      { label: 'Feature Flags', to: '/settings/feature-flags' },
      { label: 'Branding', to: '/settings/branding' },
    ],
  },
]

type AppSidebarProps = {
  collapsed: boolean
  onToggle: () => void
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside className="flex h-full flex-col border-b border-slate-200 bg-slate-950 text-slate-100 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
        {!collapsed ? (
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-slate-400 uppercase">
              Admin
            </p>
            <p className="text-base font-semibold text-white">University Portal</p>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
        )}

        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg border border-slate-800 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition hover:-translate-y-0.5',
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>

              {!collapsed && item.children && (
                <div className="ml-8 mt-1 space-y-1 border-l border-slate-800 pl-3">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        [
                          'block rounded-lg px-2 py-1.5 text-sm transition hover:text-slate-100',
                          isActive
                            ? 'text-white'
                            : 'text-slate-400 hover:text-slate-100',
                        ].join(' ')
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
