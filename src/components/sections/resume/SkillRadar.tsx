'use client'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import { useTranslations } from 'next-intl'

const skillDataZh = [
  { skill: 'AI数据标注', value: 95 },
  { skill: '规则文档编写', value: 88 },
  { skill: '数据处理', value: 85 },
  { skill: '质量审核', value: 90 },
  { skill: '项目管理', value: 75 },
  { skill: '内容创作', value: 82 },
]

const skillDataEn = [
  { skill: 'AI Annotation', value: 95 },
  { skill: 'Doc Writing', value: 88 },
  { skill: 'Data Processing', value: 85 },
  { skill: 'QA Review', value: 90 },
  { skill: 'Project Mgmt', value: 75 },
  { skill: 'Content Create', value: 82 },
]

export default function SkillRadar({ locale }: { locale: string }) {
  const t = useTranslations('resume')
  const data = locale === 'zh' ? skillDataZh : skillDataEn

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-persona-gold font-black text-center mb-4 text-lg">
        {t('skills')}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(107,33,168,0.4)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: '#ffffff', fontSize: 11 }} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#FFD900"
            fill="#FFD900"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
