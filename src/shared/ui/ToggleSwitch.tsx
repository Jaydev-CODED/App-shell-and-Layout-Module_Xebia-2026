type ToggleSwitchProps = {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
}

export function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 shadow-sm">
      <div className="pr-4">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
          checked ? 'bg-slate-900' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  )
}
