'use client'
import NPCBase from './NPCBase'
import { NPC_LINES } from '@/lib/constants'

interface NPCXiaokeProps {
  locale: string
  size?: number
  className?: string
}

export default function NPCXiaoke({ locale, size = 100, className }: NPCXiaokeProps) {
  const lines = locale === 'zh' ? NPC_LINES.xiaoke.zh : NPC_LINES.xiaoke.en
  return (
    <NPCBase
      name={locale === 'zh' ? '小可' : 'Xiaoke'}
      imageSrc="/assets/npc/xiaoke.png"
      imageAlt={locale === 'zh' ? '小可 - 项目页NPC' : 'Xiaoke - Projects page NPC'}
      lines={lines}
      size={size}
      className={className}
    />
  )
}
