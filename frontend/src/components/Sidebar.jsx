import React from 'react';
import { LayoutDashboard, LineChart, FolderKanban, FileText, Settings, ChevronLeft } from 'lucide-react';

export default function Sidebar({ isCollapsed, onToggleCollapse, activeRoute }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, path: '#/dashboard' },
    { id: 'analytics', name: 'Analytics', icon: LineChart, path: '#/analytics' },
    { id: 'projects', name: 'Projects', icon: FolderKanban, path: '#/projects' },
    { id: 'reports', name: 'Reports', icon: FileText, path: '#/reports' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '#/settings' },
  ];

  return (
    <aside
      className={`flex flex-col justify-between h-full bg-primaryDark border-r border-gray-100/10 text-white transition-all duration-300 ease-in-out select-none z-20 ${
        isCollapsed ? 'w-[72px] px-3 py-6' : 'w-[260px] px-4 py-6'
      }`}
      id="app-sidebar"
    >
      <nav className="flex flex-col gap-2" aria-label="Sidebar navigation">
        {menuItems.map((item) => {
          const isActive = activeRoute === item.id;
          const Icon = item.icon;

          return (
            <a
              key={item.id}
              href={item.path}
              className={`flex items-center gap-3 py-3 px-4 rounded-md text-sm font-medium border border-transparent transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white border-white/10 shadow-sm'
                  : 'text-gray-100/70 hover:bg-secondary hover:text-white'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </a>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3 pt-4 border-t border-gray-100/10">
        <button
          onClick={onToggleCollapse}
          className={`flex items-center gap-3 py-3 px-4 w-full bg-transparent hover:bg-white/10 text-gray-100/70 hover:text-white rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
        >
          <ChevronLeft
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
          {!isCollapsed && <span>Collapse Menu</span>}
        </button>
      </div>
    </aside>
  );
}
