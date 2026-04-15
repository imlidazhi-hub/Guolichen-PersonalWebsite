import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Orbitron, Noto_Sans_SC, Share_Tech_Mono } from 'next/font/google'
import Navigation from '@/components/layout/Navigation'
import CircuitBackground from '@/components/layout/CircuitBackground'
import PageTransition from '@/components/layout/PageTransition'
import IntroScreen from '@/components/layout/IntroScreen'
import MouseFollower from '@/components/layout/MouseFollower'
import '../globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sc',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech',
  display: 'swap',
})

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
    <html lang={locale} className={`${orbitron.variable} ${notoSansSC.variable} ${shareTechMono.variable}`}>
      <body className="bg-persona-dark min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <MouseFollower />
          <IntroScreen />
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
