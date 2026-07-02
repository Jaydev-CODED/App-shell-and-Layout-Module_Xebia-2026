import { Save } from 'lucide-react'

type SaveButtonProps = {
  label?: string
  loading?: boolean
  className?: string
}

export function SaveButton({ label = 'Save Changes', loading = false, className = '' }: SaveButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      style={{ background: '#5c1d67', fontFamily: 'Inter, sans-serif' }}
    >
      <Save className="h-4 w-4" strokeWidth={1.5} />
      {loading ? 'Saving...' : label}
    </button>
  )
}
