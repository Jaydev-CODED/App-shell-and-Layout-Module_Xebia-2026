import { Bell, Grid3x3, Search, UserCircle2 } from 'lucide-react'

export function TopNavbar() {
  return (
    <header
      className="flex items-center justify-between bg-white px-6 py-3"
      style={{ borderBottom: '1px solid #e9e9ec', minHeight: '56px' }}
    >
      {/* Left: Portal Label */}
      <p className="text-base font-semibold text-[#1a1c1e]" style={{ fontFamily: 'Inter, sans-serif' }}>
        UMS Portal
      </p>

      {/* Center: Search */}
      <label
        className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#80737f] cursor-text"
        style={{
          background: '#f3f3f6',
          border: '1px solid #e9e9ec',
          minWidth: '260px',
        }}
      >
        <Search className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        <input
          type="search"
          placeholder="Search UMS Portal..."
          className="w-full border-none bg-transparent outline-none text-sm text-[#1a1c1e] placeholder:text-[#80737f]"
        />
      </label>

      {/* Right: Icons */}
      <div className="flex items-center gap-1">
        <button
          aria-label="Notifications"
          className="rounded-lg p-2 text-[#4e434e] hover:bg-[#f3f3f6] hover:text-[#1a1c1e] transition-all"
        >
          <Bell className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <button
          aria-label="Apps"
          className="rounded-lg p-2 text-[#4e434e] hover:bg-[#f3f3f6] hover:text-[#1a1c1e] transition-all"
        >
          <Grid3x3 className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <button
          aria-label="Profile"
          className="rounded-lg p-2 text-[#4e434e] hover:bg-[#f3f3f6] hover:text-[#1a1c1e] transition-all"
        >
          <UserCircle2 className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  )
}
