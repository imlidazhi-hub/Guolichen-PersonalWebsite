'use client'
import { motion } from 'framer-motion'
import { cardHoverVariants } from '@/lib/animations'

export interface Project {
  name: string
  desc: string
  tags: string[]
  link?: string
  result?: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="bg-persona-purple/10 border border-persona-purple/40 p-5 relative overflow-hidden"
      style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
    >
      {/* Gold top accent */}
      <div className="absolute top-0 left-4 right-4 h-0.5 bg-persona-gold/60" />

      <h3 className="text-persona-gold font-black text-lg mb-2 flex items-center gap-2">
        <span className="text-persona-purple/80">▶</span>
        {project.name}
      </h3>

      <p className="text-white/75 text-sm mb-3 leading-relaxed">{project.desc}</p>

      {project.result && (
        <p className="text-cyber-teal text-xs mb-3 flex items-center gap-1">
          <span>◆</span> {project.result}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 border border-persona-gold/40 text-persona-gold/80"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-cyber-teal hover:text-persona-gold transition-colors underline"
        >
          {/* Link text handled by locale — keep generic */}
          View →
        </a>
      )}
    </motion.div>
  )
}
