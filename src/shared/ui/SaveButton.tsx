import { Save } from 'lucide-react'

type SaveButtonProps = {
  label?: string
  loading?: boolean
  className?: string
}

export function SaveButton({ label = 'Save', loading = false, className = '' }: SaveButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      <Save className="h-4 w-4" />
      {loading ? 'Saving...' : label}
    </button>
  )
}
