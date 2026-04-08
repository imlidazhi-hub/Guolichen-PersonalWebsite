import { setRequestLocale, getTranslations } from 'next-intl/server'
import GlitchText from '@/components/ui/GlitchText'
import NPCRingbell from '@/components/npc/NPCRingbell'
import NPCDuoduo from '@/components/npc/NPCDuoduo'
import NPCXiaoke from '@/components/npc/NPCXiaoke'
import NPCBeer from '@/components/npc/NPCBeer'
import ContactInfo from '@/components/sections/contact/ContactInfo'

// Replace with real contact info before deploying
const CONTACT = {
  email: 'guoli.ai.work@gmail.com',
  wechat: 'guoli_ai_trainer',
  github: 'https://github.com/guolichen',
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-3">
          <span className="text-cyber-teal text-xs font-bold tracking-widest uppercase">
            CONTACT · 联系
          </span>
        </div>
        <GlitchText text={t('title')} className="text-4xl md:text-5xl block" />
      </div>

      <div className="flex justify-center gap-8 mb-8 flex-wrap">
        <NPCRingbell locale={locale} size={70} />
        <NPCDuoduo locale={locale} size={70} />
        <NPCXiaoke locale={locale} size={70} />
        <NPCBeer locale={locale} size={70} />
      </div>

      <p className="text-white/50 text-center text-sm mb-10">{t('npcLine')}</p>

      <ContactInfo
        email={CONTACT.email}
        wechat={CONTACT.wechat}
        github={CONTACT.github}
      />
    </div>
  )
}
