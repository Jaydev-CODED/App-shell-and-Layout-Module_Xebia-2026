import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  UserCheck,
  BarChart3,
  Settings2,
  HelpCircle,
  LogOut,
  Plus,
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
  { label: 'Academic Affairs', to: '/university', icon: BookOpen },
  { label: 'Student Registry', to: '/students', icon: UserCheck },
  { label: 'Faculty Management', to: '/faculty', icon: Users },
  { label: 'Financial Audit', to: '/financial', icon: BarChart3 },
  {
    label: 'System Settings',
    to: '/settings/configuration',
    icon: Settings2,
    children: [
      { label: 'Configuration', to: '/settings/configuration' },
      { label: 'Academic Rules', to: '/settings/academic-rules' },
      { label: 'Attendance Rules', to: '/settings/attendance-rules' },
      { label: 'Notifications', to: '/settings/notifications' },
      { label: 'System Preferences', to: '/settings/system-preferences' },
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
    <aside
      className="flex h-full flex-col bg-white text-[#1a1c1e]"
      style={{ borderRight: '1px solid #e9e9ec' }}
    >
      {/* ── Brand Header ── */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: '1px solid #e9e9ec' }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold"
          style={{ background: '#5c1d67' }}
        >
          AG
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="truncate text-sm font-bold text-[#1a1c1e]">Academy Global</p>
            <p className="truncate text-xs text-[#4e434e]">Institutional Oversight</p>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="ml-auto rounded-md p-1 text-[#80737f] hover:bg-[#f3f3f6] hover:text-[#1a1c1e]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {collapsed
              ? <path d="M9 18l6-6-6-6" />
              : <path d="M15 18l-6-6 6-6" />}
          </svg>
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {sidebarItems.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => [
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#f3e8f5] text-[#5c1d67]'
                    : 'text-[#4e434e] hover:bg-[#f3f3f6] hover:text-[#1a1c1e]',
                ].join(' ')}
                style={({ isActive }) => isActive ? { borderLeft: '3px solid #5c1d67', paddingLeft: '9px' } : { borderLeft: '3px solid transparent', paddingLeft: '9px' }}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>

              {!collapsed && item.children && (
                <div className="ml-8 mt-0.5 mb-1 space-y-0.5" style={{ paddingLeft: '12px', borderLeft: '1px solid #e9e9ec' }}>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) => [
                        'block rounded-md px-2 py-1.5 text-sm transition-all',
                        isActive
                          ? 'font-semibold text-[#5c1d67]'
                          : 'text-[#80737f] hover:text-[#1a1c1e]',
                      ].join(' ')}
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

      {/* ── Bottom Section ── */}
      <div className="px-3 pb-4 space-y-1" style={{ borderTop: '1px solid #e9e9ec', paddingTop: '12px' }}>
        {!collapsed && (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: '#5c1d67' }}
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Report
          </button>
        )}
        {collapsed && (
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-lg py-2.5 text-white transition-all hover:opacity-90"
            style={{ background: '#5c1d67' }}
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
          </button>
        )}

        <NavLink
          to="/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#4e434e] hover:bg-[#f3f3f6] hover:text-[#1a1c1e] transition-all"
          style={{ borderLeft: '3px solid transparent', paddingLeft: '9px' }}
        >
          <HelpCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>Help Center</span>}
        </NavLink>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#e5484d] hover:bg-[#fff0f0] transition-all"
          style={{ borderLeft: '3px solid transparent', paddingLeft: '9px' }}
        >
          <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
