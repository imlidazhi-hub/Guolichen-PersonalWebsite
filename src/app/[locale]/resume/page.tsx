import { setRequestLocale, getTranslations } from 'next-intl/server'
import GlitchText from '@/components/ui/GlitchText'
import PersonaButton from '@/components/ui/PersonaButton'
import NPCDuoduo from '@/components/npc/NPCDuoduo'
import TimelineSection from '@/components/sections/resume/TimelineSection'
import SkillRadarClient from '@/components/sections/resume/SkillRadarClient'

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('resume')

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 gap-4">
        <div>
          <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-3">
            <span className="text-cyber-teal text-xs font-bold tracking-widest uppercase">
              RESUME · 简历
            </span>
          </div>
          <GlitchText text={t('title')} className="text-4xl md:text-5xl block" />
        </div>
        <NPCDuoduo locale={locale} size={90} />
      </div>

      {/* PDF Download buttons */}
      <div className="mb-10 flex flex-wrap gap-4">
        <PersonaButton href="/assets/resume-zh.pdf" variant="gold">
          📄 {t('download')} (中文)
        </PersonaButton>
        <PersonaButton href="/assets/resume-en.pdf" variant="purple">
          📄 {t('download')} (EN)
        </PersonaButton>
      </div>

      {/* Main content grid */}
      <div className="grid md:grid-cols-2 gap-10">
        <TimelineSection locale={locale} />
        <SkillRadarClient locale={locale} />
      </div>
    </div>
  )
}
