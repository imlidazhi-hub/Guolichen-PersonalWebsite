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
    company: '某AI科技公司',
    desc: '负责大型语言模型（LLM）训练数据的标注、质量审核与规则文档编写，涵盖多轮对话、指令跟随、安全性评估等维度。',
    tags: ['AI标注', 'LLM', 'RLHF', '质量管控', '规则文档'],
  },
  {
    period: '2022 - 2023',
    title: '数据处理专员',
    company: '某数据服务公司',
    desc: '处理多模态数据集（图文、语音、视频），制定标注规范与质检标准，培训新人标注员，管理数据交付流程。',
    tags: ['多模态数据', '规范制定', '团队培训', '数据交付'],
  },
  {
    period: '2020 - 2022',
    title: '内容审核专员',
    company: '某互联网平台',
    desc: '执行用户生成内容的合规审核，参与制定内容安全规则手册，积累丰富的内容分类与边界判断经验。',
    tags: ['内容审核', '合规', '规则制定', '文档写作'],
  },
]

const experienceEn: ExperienceItem[] = [
  {
    period: '2023 - Present',
    title: 'AI Data Annotation Expert',
    company: 'AI Tech Company',
    desc: 'Responsible for annotating LLM training data, quality review, and writing annotation guidelines, covering multi-turn dialogue, instruction following, and safety evaluation.',
    tags: ['AI Annotation', 'LLM', 'RLHF', 'QA', 'Documentation'],
  },
  {
    period: '2022 - 2023',
    title: 'Data Processing Specialist',
    company: 'Data Services Company',
    desc: 'Processed multimodal datasets (image-text, audio, video), established annotation standards and QA criteria, trained new annotators, and managed data delivery workflows.',
    tags: ['Multimodal Data', 'Standards', 'Training', 'Delivery'],
  },
  {
    period: '2020 - 2022',
    title: 'Content Moderation Specialist',
    company: 'Internet Platform',
    desc: 'Performed compliance review of user-generated content, contributed to content safety rulebooks, and built expertise in content classification and edge case judgment.',
    tags: ['Content Moderation', 'Compliance', 'Policy Writing', 'Documentation'],
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
