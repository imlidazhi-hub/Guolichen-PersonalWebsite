'use client'
import NPCBase from './NPCBase'
import { NPC_LINES } from '@/lib/constants'

interface NPCRingbellProps {
  locale: string
  size?: number
  className?: string
}

export default function NPCRingbell({ locale, size = 100, className }: NPCRingbellProps) {
  const lines = locale === 'zh' ? NPC_LINES.ringbell.zh : NPC_LINES.ringbell.en
  return (
    <NPCBase
      name={locale === 'zh' ? '铃布' : 'Ringbell'}
      imageSrc="/assets/npc/ringbell.png"
      imageAlt={locale === 'zh' ? '铃布 - 首页导航NPC' : 'Ringbell - Home page NPC'}
      lines={lines}
      size={size}
      className={className}
    />
  )
}
