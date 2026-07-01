import { useEffect, useState } from 'react'
import { ImagePlus, MoonStar, Sparkles, UploadCloud, Palette } from 'lucide-react'
import { ColorInput } from '../../../shared/ui/ColorInput'
import { ConfigInput } from '../../../shared/ui/ConfigInput'
import { FormSection } from '../../../shared/ui/FormSection'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { PageHeader } from '../../../shared/ui/PageHeader'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { useToast } from '../../../shared/ui/ToastProvider'

export default function BrandingPage() {
  const { pushToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [universityName, setUniversityName] = useState('Northbridge University')
  const [shortName, setShortName] = useState('NBU')
  const [footerText, setFooterText] = useState('© 2026 Northbridge University. All rights reserved.')
  const [primaryColor, setPrimaryColor] = useState('#0f172a')
  const [secondaryColor, setSecondaryColor] = useState('#2563eb')
  const [darkMode, setDarkMode] = useState(false)

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

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Skeleton className="h-6 w-44" />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full md:col-span-2" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="mt-4 h-28 w-full" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
          title="Branding Configuration"
          description="Customize the institution brand, visual palette, and preferred theme experience."
        />
        <EmptyState
          icon={Palette}
          title="No Branding Data"
          description="Branding details have not been configured yet. Add a logo, colors, and identity copy to get started."
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
        title="Branding Configuration"
        description="Customize the institution brand, visual palette, and preferred theme experience."
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <FormSection className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">University Identity</h3>
              <p className="text-sm text-slate-500">Shape the name, short label, and footer text that appear across the portal.</p>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <ConfigInput
                label="University Name"
                value={universityName}
                onChange={(event) => setUniversityName(event.target.value)}
                helpText="Displayed in headers and major views."
              />

              <ConfigInput
                label="University Short Name"
                value={shortName}
                onChange={(event) => setShortName(event.target.value)}
                helpText="Used in compact navigation and tabs."
              />

              <div className="md:col-span-2">
                <ConfigInput
                  label="Footer Text"
                  value={footerText}
                  onChange={(event) => setFooterText(event.target.value)}
                  helpText="Shown in the lower footer across the platform."
                />
              </div>
            </div>
          </FormSection>

          <FormSection className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Visual Branding</h3>
              <p className="text-sm text-slate-500">Upload your logo and define the colors that represent the institution.</p>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <label className="block space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">University Logo Preview</span>
                <div
                  className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-8 text-center transition hover:border-slate-400"
                  onClick={() => pushToast('Logo upload placeholder activated.')}
                >
                  <div>
                    <UploadCloud className="mx-auto h-8 w-8 text-slate-400" />
                    <p className="mt-2 text-sm font-medium text-slate-700">Upload university logo</p>
                    <p className="text-xs text-slate-500">PNG, JPG, or SVG up to 2MB</p>
                  </div>
                  <input type="file" className="hidden" />
                </div>
              </label>

              <ColorInput label="Primary Color" value={primaryColor} onChange={setPrimaryColor} />
              <ColorInput label="Secondary Color" value={secondaryColor} onChange={setSecondaryColor} />
            </div>
          </FormSection>

          <FormSection className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Experience Settings</h3>
              <p className="text-sm text-slate-500">Adjust interface behavior for light and dark appearances.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-slate-900 p-2 text-white">
                    <MoonStar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Dark Mode Toggle</p>
                    <p className="text-sm text-slate-500">Enable dark interfaces for the admin experience.</p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={darkMode}
                  onClick={() => {
                    setDarkMode((value) => !value)
                    pushToast('Dark mode preference updated.')
                  }}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                    darkMode ? 'bg-slate-900' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </FormSection>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            <Sparkles className="h-4 w-4" />
            Live Preview
          </div>

          <div
            className="mt-5 rounded-3xl border border-slate-200 p-4"
            style={{ background: darkMode ? '#0f172a' : '#f8fafc' }}
          >
            <div className="rounded-2xl border border-white/20 p-4" style={{ background: primaryColor, color: '#ffffff' }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Campus Portal</p>
                  <h3 className="mt-2 text-xl font-semibold">{universityName}</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                  <ImagePlus className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-800">{shortName}</span>
                <span className="text-slate-500">{footerText}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <div className="h-10 flex-1 rounded-xl" style={{ background: secondaryColor }} />
                <div className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
