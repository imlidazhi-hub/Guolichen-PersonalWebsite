'use client'
import NPCBase from './NPCBase'
import { NPC_LINES } from '@/lib/constants'

interface NPCBeerProps {
  locale: string
  size?: number
  className?: string
}

export default function NPCBeer({ locale, size = 100, className }: NPCBeerProps) {
  const lines = locale === 'zh' ? NPC_LINES.beer.zh : NPC_LINES.beer.en
  return (
    <NPCBase
      name={locale === 'zh' ? '小啤酒' : 'Beer'}
      imageSrc="/assets/npc/beer.svg"
      imageAlt={locale === 'zh' ? '小啤酒 - 作品集页NPC' : 'Beer - Portfolio page NPC'}
      lines={lines}
      size={size}
      className={className}
    />
  )
}
