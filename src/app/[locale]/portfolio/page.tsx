import { setRequestLocale, getTranslations } from 'next-intl/server'
import GlitchText from '@/components/ui/GlitchText'
import NPCBeer from '@/components/npc/NPCBeer'
import Gallery from '@/components/sections/portfolio/Gallery'
import type { GalleryItem } from '@/components/sections/portfolio/Lightbox'

// Portfolio items — user adds their AI-generated works here
const portfolioItems: GalleryItem[] = [
  // Example (uncomment and replace with actual files):
  // { type: 'image', src: '/assets/portfolio/work1.jpg', alt: 'AI generated art 1' },
  // { type: 'video', src: '/assets/portfolio/video1.mp4', alt: 'AI generated video 1' },
]

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('portfolio')

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-12 gap-4">
        <div>
          <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-3">
            <span className="text-cyber-teal text-xs font-bold tracking-widest uppercase">
              GALLERY · 创作
            </span>
          </div>
          <GlitchText text={t('title')} className="text-4xl md:text-5xl block" />
          <p className="text-white/50 text-sm mt-2">{t('subtitle')}</p>
        </div>
        <NPCBeer locale={locale} size={90} />
      </div>

      <Gallery items={portfolioItems} locale={locale} />
    </div>
  )
}
