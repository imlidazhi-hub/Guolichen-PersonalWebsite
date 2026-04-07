import { setRequestLocale, getTranslations } from 'next-intl/server'
import GlitchText from '@/components/ui/GlitchText'
import NPCXiaoke from '@/components/npc/NPCXiaoke'
import ProjectCard, { Project } from '@/components/sections/projects/ProjectCard'

const projectsZh: Project[] = [
  {
    name: 'AI对话数据标注项目',
    desc: '参与大规模LLM对话数据的标注与质量审核，涉及多轮对话、指令跟随、安全性评估等维度。',
    tags: ['数据标注', 'LLM', '质量审核', 'RLHF'],
    result: '处理50,000+对话样本，合格率98.5%',
  },
  {
    name: '标注规范文档体系建立',
    desc: '从零构建AI标注团队的规则文档体系，包含任务说明书、质检标准、边界案例判断指南。',
    tags: ['文档编写', '规范制定', '团队培训'],
    result: '文档被20+标注员采用，减少歧义30%',
  },
  {
    name: '多模态数据处理流水线',
    desc: '设计并执行图文对数据的收集、清洗、分类和标注全流程，保障数据质量符合模型训练要求。',
    tags: ['多模态', '数据清洗', '图文标注'],
    result: '处理10,000+图文对，质检通过率96%',
  },
]

const projectsEn: Project[] = [
  {
    name: 'AI Dialogue Data Annotation',
    desc: 'Participated in large-scale LLM dialogue annotation and QA, covering multi-turn conversations, instruction following, and safety evaluation.',
    tags: ['Annotation', 'LLM', 'QA', 'RLHF'],
    result: 'Processed 50,000+ samples, 98.5% acceptance rate',
  },
  {
    name: 'Annotation Guidelines System',
    desc: 'Built annotation documentation system from scratch: task specs, QA standards, and edge case guides.',
    tags: ['Documentation', 'Standards', 'Training'],
    result: 'Adopted by 20+ annotators, reduced ambiguity by 30%',
  },
  {
    name: 'Multimodal Data Pipeline',
    desc: 'Designed and executed full pipeline for image-text pair collection, cleaning, classification, and annotation.',
    tags: ['Multimodal', 'Data Cleaning', 'Image Annotation'],
    result: 'Processed 10,000+ image-text pairs, 96% QA pass rate',
  },
]

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('projects')
  const projects = locale === 'zh' ? projectsZh : projectsEn

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-12 gap-4">
        <div>
          <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-3">
            <span className="text-cyber-teal text-xs font-bold tracking-widest uppercase">
              MISSIONS · 任务记录
            </span>
          </div>
          <GlitchText text={t('title')} className="text-4xl md:text-5xl block" />
          <p className="text-white/50 text-sm mt-2">{t('subtitle')}</p>
        </div>
        <NPCXiaoke locale={locale} size={90} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </div>
  )
}
