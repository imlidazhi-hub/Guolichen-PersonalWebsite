'use client'
import NPCBase from './NPCBase'
import { NPC_LINES } from '@/lib/constants'

interface NPCDuoduoProps {
  locale: string
  size?: number
  className?: string
}

export default function NPCDuoduo({ locale, size = 100, className }: NPCDuoduoProps) {
  const lines = locale === 'zh' ? NPC_LINES.duoduo.zh : NPC_LINES.duoduo.en
  return (
    <NPCBase
      name={locale === 'zh' ? '角多多' : 'Duoduo'}
      imageSrc="/assets/npc/duoduo.png"
      imageAlt={locale === 'zh' ? '角多多 - 简历页NPC' : 'Duoduo - Resume page NPC'}
      lines={lines}
      size={size}
      className={className}
    />
  )
}
