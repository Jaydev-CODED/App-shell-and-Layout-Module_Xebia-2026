type ToggleSwitchProps = {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
}

export function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <label
      className="flex items-center justify-between rounded-lg px-4 py-3.5 cursor-pointer transition-all"
      style={{
        border: '1px solid #e9e9ec',
        background: '#f9f9fc',
      }}
    >
      <div className="pr-4">
        <p className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>
          {label}
        </p>
        {description && (
          <p className="mt-0.5 text-sm" style={{ color: '#80737f' }}>
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-all duration-200"
        style={{ background: checked ? '#9a2e9d' : '#d2c2cf' }}
      >
        <span
          className="inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ transform: checked ? 'translateX(22px)' : 'translateX(4px)' }}
        />
      </button>
    </label>
  )
}
