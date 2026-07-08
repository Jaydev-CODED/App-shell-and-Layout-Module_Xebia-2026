type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: '#9a2e9d', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}
      >
        {eyebrow}
      </p>
      <h1
        className="text-3xl font-bold"
        style={{
          fontFamily: '"Times New Roman", Georgia, serif',
          color: '#1a1c1e',
          lineHeight: '1.2',
          fontSize: 'clamp(24px, 3vw, 32px)',
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="max-w-2xl text-sm leading-6"
          style={{ color: '#555555', fontFamily: 'Inter, sans-serif' }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
