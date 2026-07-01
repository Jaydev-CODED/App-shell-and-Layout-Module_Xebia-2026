import { Bell, Search, UserCircle2 } from 'lucide-react'

export function TopNavbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Operations Center</p>
        <h1 className="text-xl font-semibold text-slate-900">Welcome back</h1>
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 sm:flex">
          <Search className="h-4 w-4" />
          <input
            type="search"
            placeholder="Search"
            className="w-32 border-none bg-transparent outline-none"
          />
        </label>

        <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
          <UserCircle2 className="h-5 w-5 text-slate-600" />
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
