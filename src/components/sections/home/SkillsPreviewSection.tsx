'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const stats = [
  { value: '50,000+', label: '标注样本', labelEn: 'Samples Annotated', color: 'text-persona-gold', border: 'border-persona-gold/40', glow: 'rgba(255,217,0,0.15)' },
  { value: '3+', label: '年经验', labelEn: 'Years Exp.', color: 'text-cyber-pink', border: 'border-cyber-pink/40', glow: 'rgba(255,45,120,0.15)' },
  { value: '98.5%', label: '数据合格率', labelEn: 'Acceptance Rate', color: 'text-cyber-blue', border: 'border-cyber-blue/40', glow: 'rgba(10,239,255,0.15)' },
  { value: '20+', label: '培训标注员', labelEn: 'Annotators Trained', color: 'text-cyber-teal', border: 'border-cyber-teal/40', glow: 'rgba(0,206,209,0.15)' },
]

const skills = [
  { name: 'LLM 对话标注', level: 95, color: '#FFD900' },
  { name: '多模态数据', level: 88, color: '#FF2D78' },
  { name: '规范文档编写', level: 92, color: '#0AEFFF' },
  { name: '质量审核 QA', level: 90, color: '#00CED1' },
  { name: 'RLHF 数据构建', level: 85, color: '#FFD900' },
  { name: '提示词工程', level: 80, color: '#FF2D78' },
]

interface SkillsPreviewSectionProps {
  locale: string
}

export default function SkillsPreviewSection({ locale }: SkillsPreviewSectionProps) {
  const isZh = locale === 'zh'

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        className="mb-12 flex items-end justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="cyber-label text-cyber-teal mb-2">
            {isZh ? '// 技能 · SKILLS' : '// SKILLS'}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
            {isZh ? '我的能力档案' : 'Skill Profile'}
          </h2>
        </div>
        <Link href={`/${locale}/resume`}>
          <motion.span
            className="text-sm text-persona-gold/80 hover:text-persona-gold border-b border-persona-gold/30 hover:border-persona-gold transition-colors cursor-pointer"
            whileHover={{ x: 3 }}
          >
            {isZh ? '查看完整简历 →' : 'Full Resume →'}
          </motion.span>
        </Link>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className={`border ${stat.border} p-5 relative overflow-hidden`}
            style={{
              clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
              boxShadow: `inset 0 0 20px ${stat.glow}`,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className={`text-3xl font-black mb-1 ${stat.color}`} style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
              {stat.value}
            </div>
            <div className="text-white/60 text-xs cyber-label">
              {isZh ? stat.label : stat.labelEn}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill bars */}
      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-white/80 font-medium" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
                {skill.name}
              </span>
              <span className="cyber-label" style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="h-2 bg-white/5 relative overflow-hidden" style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
              <motion.div
                className="h-full"
                style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.8, ease: 'easeOut' }}
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: `linear-gradient(90deg, transparent 0%, ${skill.color}40 50%, transparent 100%)`, animation: 'shimmer 2s infinite' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
