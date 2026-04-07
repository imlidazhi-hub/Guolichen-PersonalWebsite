'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import ClipCard from '@/components/ui/ClipCard'
import { slideInFromLeft } from '@/lib/animations'

interface ExperienceItem {
  period: string
  title: string
  company: string
  desc: string
  tags: string[]
}

const experienceZh: ExperienceItem[] = [
  {
    period: '2023 - 至今',
    title: 'AI数据标注专家',
    company: '（待填写）',
    desc: '负责大型语言模型训练数据的标注、质量审核与规则文档编写。',
    tags: ['AI标注', '数据处理', '质量管控', 'RLHF'],
  },
  {
    period: '2021 - 2023',
    title: '数据处理专员',
    company: '（待填写）',
    desc: '处理多模态数据集，制定标注规范与审核标准。',
    tags: ['多模态数据', '规则制定', '团队协作'],
  },
]

const experienceEn: ExperienceItem[] = [
  {
    period: '2023 - Present',
    title: 'AI Data Annotation Expert',
    company: '(TBD)',
    desc: 'Responsible for annotating LLM training data, quality review, and writing annotation guidelines.',
    tags: ['AI Annotation', 'Data Processing', 'QA', 'RLHF'],
  },
  {
    period: '2021 - 2023',
    title: 'Data Processing Specialist',
    company: '(TBD)',
    desc: 'Processed multimodal datasets and established annotation standards.',
    tags: ['Multimodal Data', 'Standards', 'Teamwork'],
  },
]

export default function TimelineSection({ locale }: { locale: string }) {
  const t = useTranslations('resume')
  const experience = locale === 'zh' ? experienceZh : experienceEn

  return (
    <div>
      <h3 className="text-persona-gold font-black text-xl mb-6 flex items-center gap-3">
        <span className="w-8 h-0.5 bg-persona-gold inline-block" />
        {t('experience')}
      </h3>
      <div className="space-y-4">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <ClipCard className="border-l-4 border-l-persona-gold/60">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.company}</p>
                </div>
                <span className="clip-persona bg-persona-gold/10 text-persona-gold text-xs font-mono px-2 py-1 whitespace-nowrap">
                  {item.period}
                </span>
              </div>
              <p className="text-white/80 text-sm mb-3">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="clip-persona bg-cyber-teal/10 text-cyber-teal text-xs px-2 py-0.5 border border-cyber-teal/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ClipCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
