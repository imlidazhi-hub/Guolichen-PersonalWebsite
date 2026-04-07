'use client'
import dynamic from 'next/dynamic'

const SkillRadar = dynamic(() => import('./SkillRadar'), { ssr: false })

export default function SkillRadarClient({ locale }: { locale: string }) {
  return <SkillRadar locale={locale} />
}
