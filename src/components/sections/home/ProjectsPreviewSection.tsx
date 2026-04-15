'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { electricCardVariants } from '@/lib/animations'

const projectsZh = [
  {
    id: '01',
    name: 'AI对话数据标注',
    desc: '大规模LLM对话数据标注与质量审核，涉及多轮对话、指令跟随、安全性评估。',
    tags: ['LLM', 'RLHF', '质量审核'],
    result: '50,000+ 样本 · 98.5% 合格率',
    color: '#FFD900',
  },
  {
    id: '02',
    name: '标注规范文档体系',
    desc: '从零构建AI标注团队规范文档，包含任务说明书、质检标准、边界案例指南。',
    tags: ['文档编写', '规范制定', '团队培训'],
    result: '20+ 标注员采用 · 歧义减少30%',
    color: '#FF2D78',
  },
  {
    id: '03',
    name: '多模态数据流水线',
    desc: '设计并执行图文对数据收集、清洗、分类和标注全流程，保障模型训练数据质量。',
    tags: ['多模态', '数据清洗', '图文标注'],
    result: '10,000+ 图文对 · 96% 通过率',
    color: '#0AEFFF',
  },
]

const projectsEn = [
  {
    id: '01',
    name: 'AI Dialogue Annotation',
    desc: 'Large-scale LLM dialogue annotation and QA covering multi-turn conversations, instruction following, and safety evaluation.',
    tags: ['LLM', 'RLHF', 'QA'],
    result: '50,000+ samples · 98.5% acceptance',
    color: '#FFD900',
  },
  {
    id: '02',
    name: 'Annotation Guidelines System',
    desc: 'Built annotation documentation from scratch: task specs, QA standards, and edge case guides.',
    tags: ['Docs', 'Standards', 'Training'],
    result: '20+ annotators · 30% less ambiguity',
    color: '#FF2D78',
  },
  {
    id: '03',
    name: 'Multimodal Data Pipeline',
    desc: 'Designed full pipeline for image-text pair collection, cleaning, classification, and annotation.',
    tags: ['Multimodal', 'Data Cleaning', 'Image'],
    result: '10,000+ pairs · 96% QA pass rate',
    color: '#0AEFFF',
  },
]

export default function ProjectsPreviewSection({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const projects = isZh ? projectsZh : projectsEn

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        className="mb-12 flex items-end justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="cyber-label text-cyber-pink mb-2">
            {isZh ? '// 项目 · PROJECTS' : '// PROJECTS'}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
            {isZh ? '执行过的任务' : 'Mission Log'}
          </h2>
        </div>
        <Link href={`/${locale}/projects`}>
          <motion.span
            className="text-sm text-cyber-pink/80 hover:text-cyber-pink border-b border-cyber-pink/30 hover:border-cyber-pink transition-colors cursor-pointer"
            whileHover={{ x: 3 }}
          >
            {isZh ? '查看全部 →' : 'View All →'}
          </motion.span>
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="relative border border-persona-purple/40 bg-persona-purple/10 p-6 overflow-hidden cursor-default"
            style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
            variants={electricCardVariants}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover="hover"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-4 right-4 h-0.5" style={{ background: project.color }} />

            {/* ID */}
            <div className="cyber-label mb-3" style={{ color: project.color, opacity: 0.6 }}>
              TASK_{project.id}
            </div>

            <h3 className="text-white font-black text-lg mb-2" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
              {project.name}
            </h3>

            <p className="text-white/60 text-sm mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
              {project.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 border cyber-label"
                  style={{ borderColor: `${project.color}50`, color: project.color }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Result */}
            <div className="text-xs text-white/50 cyber-label flex items-center gap-1">
              <span style={{ color: project.color }}>◆</span>
              {project.result}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
