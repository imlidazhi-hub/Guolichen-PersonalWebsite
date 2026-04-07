import { setRequestLocale } from 'next-intl/server'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-persona-gold text-xl">Coming soon...</p>
    </div>
  )
}
