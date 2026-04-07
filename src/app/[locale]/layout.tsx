import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import CircuitBackground from '@/components/layout/CircuitBackground'
import PageTransition from '@/components/layout/PageTransition'
import '../globals.css'

const locales = ['zh', 'en'] as const

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? 'Guoli | AI训练师 · 数据标注专家'
      : 'Guoli | AI Trainer · Data Annotation Expert',
    description: isZh
      ? '个人作品集网站，展示AI训练、数据标注领域的专业经验与项目成果'
      : 'Personal portfolio showcasing AI training and data annotation expertise',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  // Required for static export with next-intl
  setRequestLocale(locale)

  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body className="bg-persona-dark min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <CircuitBackground />
          <Navigation currentLocale={locale} />
          <main className="pt-14 relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
