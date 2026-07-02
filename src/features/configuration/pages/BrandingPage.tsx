import { useEffect, useState } from 'react'
import { ImagePlus, Monitor, UploadCloud, Palette } from 'lucide-react'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { PageHeader } from '../../../shared/ui/PageHeader'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { useToast } from '../../../shared/ui/ToastProvider'
import { ConfigInput } from '../../../shared/ui/ConfigInput'


export default function BrandingPage() {
  const { pushToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [universityName, setUniversityName] = useState('Northbridge University')
  const [shortName, setShortName] = useState('NBU')
  const [footerText, setFooterText] = useState('© 2026 Northbridge University. All rights reserved.')
  const [primaryColor, setPrimaryColor] = useState('#5C1D67')
  const [secondaryColor, setSecondaryColor] = useState('#E9E9EC')
  const [typographyMode, setTypographyMode] = useState<'serif' | 'sans'>('serif')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800)
    return () => window.clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl p-6" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
                <Skeleton className="h-6 w-44" />
                <Skeleton className="mt-4 h-28 w-full" />
              </div>
            ))}
          </div>
          <div className="rounded-xl p-6" style={{ border: '1px solid #e9e9ec', background: '#fff' }}>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="mt-4 h-56 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!universityName && !shortName && !footerText) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Brand Identity"
          title="Branding & Theme"
          description="Customize the portal's visual identity across all user interfaces."
        />
        <EmptyState
          icon={Palette}
          title="No Branding Data"
          description="Branding details have not been configured yet."
          actionLabel="Set Branding"
          onAction={() => pushToast('Branding setup placeholder activated.')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Brand Identity"
        title="Branding & Theme"
        description="Customize the portal's visual identity across all user interfaces."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        {/* Left column */}
        <div className="space-y-5">
          {/* Institution Identity */}
          <div className="rounded-xl bg-white p-6 space-y-5" style={{ border: '1px solid #e9e9ec' }}>
            <div className="pb-4" style={{ borderBottom: '1px solid #e9e9ec' }}>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
              >
                Institution Identity
              </h3>
            </div>

            {/* Logo upload */}
            <div>
              <p className="mb-2 text-xs font-medium" style={{ color: '#4e434e' }}>Primary Logo</p>
              <button
                type="button"
                onClick={() => pushToast('Logo upload placeholder activated.')}
                className="flex w-full flex-col items-center justify-center gap-3 rounded-xl py-10 text-center transition-all"
                style={{
                  border: '1.5px dashed #d2c2cf',
                  background: '#faf9fc',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#5c1d67'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#d2c2cf'
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: '#f3e8f5' }}
                >
                  <UploadCloud className="h-5 w-5" style={{ color: '#5c1d67' }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs" style={{ color: '#80737f' }}>SVG, PNG, JPG (Max 2MB)</p>
                </div>
              </button>
            </div>

            {/* Name fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <ConfigInput
                label="University Name"
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                helpText="Displayed in headers and major views."
              />
              <ConfigInput
                label="Short Name"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                helpText="Used in compact navigation and tabs."
              />
              <div className="md:col-span-2">
                <ConfigInput
                  label="Footer Text"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  helpText="Shown in the lower footer across the platform."
                />
              </div>
            </div>
          </div>

          {/* Brand Colors */}
          <div className="rounded-xl bg-white p-6 space-y-5" style={{ border: '1px solid #e9e9ec' }}>
            <div className="pb-4" style={{ borderBottom: '1px solid #e9e9ec' }}>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
              >
                Brand Colors
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Primary swatch */}
              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: '#4e434e' }}>Primary Color</p>
                <label
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition-all"
                  style={{ border: '1px solid #e9e9ec', background: '#f9f9fc' }}
                >
                  <span
                    className="h-9 w-9 shrink-0 rounded-md"
                    style={{ background: primaryColor, border: '1px solid rgba(0,0,0,0.08)' }}
                  />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>{primaryColor}</p>
                    <p className="text-xs" style={{ color: '#80737f' }}>Deep Velvet</p>
                  </div>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Secondary swatch */}
              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: '#4e434e' }}>Secondary Color</p>
                <label
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition-all"
                  style={{ border: '1px solid #e9e9ec', background: '#f9f9fc' }}
                >
                  <span
                    className="h-9 w-9 shrink-0 rounded-md"
                    style={{ background: secondaryColor, border: '1px solid rgba(0,0,0,0.08)' }}
                  />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>{secondaryColor}</p>
                    <p className="text-xs" style={{ color: '#80737f' }}>Light Grey</p>
                  </div>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Typography Strategy */}
          <div className="rounded-xl bg-white p-6 space-y-5" style={{ border: '1px solid #e9e9ec' }}>
            <div className="pb-4" style={{ borderBottom: '1px solid #e9e9ec' }}>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: '"Times New Roman", serif', color: '#1a1c1e' }}
              >
                Typography Strategy
              </h3>
            </div>

            <div className="space-y-3">
              {/* Serif option */}
              <label
                className="flex cursor-pointer items-start gap-3 rounded-xl px-4 py-4 transition-all"
                style={{
                  border: typographyMode === 'serif' ? '1.5px solid #5c1d67' : '1px solid #e9e9ec',
                  background: typographyMode === 'serif' ? '#faf5ff' : '#f9f9fc',
                }}
              >
                <div className="flex items-center pt-0.5">
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full"
                    style={{
                      border: typographyMode === 'serif' ? '5px solid #9a2e9d' : '1.5px solid #d2c2cf',
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>
                    Institutional Heritage (Classic Serif)
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#4e434e' }}>
                    Times New Roman headings paired with Inter UI for gravitas.
                  </p>
                </div>
                <span
                  className="h-2 w-2 shrink-0 rounded-full mt-1.5"
                  style={{ background: typographyMode === 'serif' ? '#9a2e9d' : 'transparent' }}
                />
                <input
                  type="radio"
                  name="typography"
                  value="serif"
                  checked={typographyMode === 'serif'}
                  onChange={() => setTypographyMode('serif')}
                  className="sr-only"
                />
              </label>

              {/* Sans option */}
              <label
                className="flex cursor-pointer items-start gap-3 rounded-xl px-4 py-4 transition-all"
                style={{
                  border: typographyMode === 'sans' ? '1.5px solid #5c1d67' : '1px solid #e9e9ec',
                  background: typographyMode === 'sans' ? '#faf5ff' : '#f9f9fc',
                }}
              >
                <div className="flex items-center pt-0.5">
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full"
                    style={{
                      border: typographyMode === 'sans' ? '5px solid #9a2e9d' : '1.5px solid #d2c2cf',
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#1a1c1e' }}>
                    Modern Enterprise (Sans-Serif)
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#4e434e' }}>
                    Clean, utilitarian sans-serif stack for high-density data.
                  </p>
                </div>
                <input
                  type="radio"
                  name="typography"
                  value="sans"
                  checked={typographyMode === 'sans'}
                  onChange={() => setTypographyMode('sans')}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right column: Live Preview */}
        <div className="xl:sticky xl:top-6 xl:self-start">
          <div
            className="rounded-xl bg-white p-5"
            style={{ border: '1px solid #e9e9ec' }}
          >
            {/* Preview header */}
            <p
              className="mb-4 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: '#80737f', letterSpacing: '0.14em' }}
            >
              Live Preview
            </p>

            {/* Simulated shell */}
            <div
              className="overflow-hidden rounded-xl"
              style={{ border: '1px solid #e9e9ec', background: '#f9f9fc' }}
            >
              {/* Mini topbar */}
              <div
                className="flex items-center gap-2 px-3 py-2"
                style={{ background: '#fff', borderBottom: '1px solid #e9e9ec' }}
              >
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold text-white"
                  style={{ background: primaryColor }}
                >
                  {shortName.slice(0, 1)}
                </div>
                <span className="text-[11px] font-semibold" style={{ color: '#1a1c1e' }}>
                  {universityName}
                </span>
                <div className="ml-auto h-3 w-3 rounded-full" style={{ background: '#e9e9ec' }} />
              </div>

              {/* Mini body */}
              <div className="flex gap-2 p-3">
                {/* Mini sidebar */}
                <div className="flex w-20 flex-col gap-1.5 shrink-0">
                  <div className="h-2 w-full rounded" style={{ background: '#e9e9ec' }} />
                  <div
                    className="h-2 w-full rounded"
                    style={{ background: primaryColor, opacity: 0.8 }}
                  />
                  <div className="h-2 w-3/4 rounded" style={{ background: '#e9e9ec' }} />
                  <div className="h-2 w-5/6 rounded" style={{ background: '#e9e9ec' }} />
                </div>

                {/* Mini content */}
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-2/3 rounded" style={{ background: '#e9e9ec' }} />
                  <div className="h-2 w-1/2 rounded" style={{ background: '#d2c2cf' }} />

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div
                      className="h-8 rounded-md"
                      style={{ background: primaryColor, opacity: 0.9 }}
                    />
                    <div className="h-8 rounded-md" style={{ background: secondaryColor, border: '1px solid #e9e9ec' }} />
                  </div>

                  <div className="rounded-md p-2 mt-2" style={{ background: '#fff', border: '1px solid #e9e9ec' }}>
                    <div className="flex justify-around items-end gap-1 h-10">
                      {['#6C3FA1', '#8B5CC7', '#B39CE3', '#D3C7F2'].map((c, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{ background: c, height: `${40 + i * 15}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview footer info */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Monitor className="h-3.5 w-3.5" style={{ color: '#80737f' }} strokeWidth={1.5} />
                <span className="text-xs" style={{ color: '#4e434e' }}>
                  {typographyMode === 'serif' ? 'Times New Roman / Inter' : 'Inter / Inter'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ImagePlus className="h-3.5 w-3.5" style={{ color: '#80737f' }} strokeWidth={1.5} />
                <span className="text-xs" style={{ color: '#4e434e' }}>{shortName} — {universityName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish action bar */}
      <div
        className="flex justify-end rounded-xl px-5 py-4"
        style={{ border: '1px solid #e9e9ec', background: '#f9f9fc' }}
      >
        <button
          type="button"
          onClick={() => pushToast('Branding published successfully.')}
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: '#5c1d67' }}
        >
          <UploadCloud className="h-4 w-4" strokeWidth={1.5} />
          Publish Branding
        </button>
      </div>
    </div>
  )
}
