'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import GlitchText from '@/components/ui/GlitchText'
import TypewriterText from '@/components/ui/TypewriterText'
import PersonaButton from '@/components/ui/PersonaButton'
import NPCRingbell from '@/components/npc/NPCRingbell'
import { slideInFromLeft, slideInFromRight } from '@/lib/animations'

interface HeroSectionProps {
  locale: string
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home')

  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-persona-dark via-persona-purple/10 to-persona-dark" />
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-persona-purple/5"
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-persona-gold/5"
        style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 100%)' }}
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: text */}
        <motion.div
          className="flex-1 text-left"
          variants={slideInFromLeft}
          initial="hidden"
          animate="visible"
        >
          <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-4">
            <span className="text-cyber-teal text-sm font-bold tracking-widest uppercase">
              AI Trainer · Data Annotation
            </span>
          </div>

          <div className="mb-4">
            <GlitchText text={t('title')} className="text-5xl md:text-7xl block mb-2" />
          </div>

          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            <TypewriterText text={t('subtitle')} />
          </p>

          <PersonaButton href={`/${locale}/projects`} variant="gold">
            {t('cta')} →
          </PersonaButton>
        </motion.div>

        {/* Right: avatar + NPC */}
        <motion.div
          className="flex-shrink-0 relative"
          variants={slideInFromRight}
          initial="hidden"
          animate="visible"
        >
          {/* Avatar placeholder */}
          <div
            className="w-64 h-72 md:w-80 md:h-96 border-2 border-persona-gold/40 flex items-center justify-center bg-persona-purple/10 relative overflow-hidden"
            style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/hero-avatar.png"
              alt={locale === 'zh' ? '个人卡通形象' : 'Personal avatar'}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-persona-gold/40">
              <div className="text-5xl mb-2">◇</div>
              <div className="text-sm">{locale === 'zh' ? '角色形象' : 'Avatar'}</div>
              <div className="text-xs">{locale === 'zh' ? '待AI生成' : 'AI art pending'}</div>
            </div>
          </div>

          {/* Ringbell NPC — bottom right corner */}
          <div className="absolute -bottom-8 -right-8">
            <NPCRingbell locale={locale} size={90} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
