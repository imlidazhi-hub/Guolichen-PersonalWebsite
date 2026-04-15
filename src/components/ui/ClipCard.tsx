'use client'
import { motion } from 'framer-motion'
import { electricCardVariants } from '@/lib/animations'

interface ClipCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function ClipCard({ children, className = '', onClick }: ClipCardProps) {
  return (
    <motion.div
      className={`cyber-electric clip-persona bg-persona-purple/20 border border-persona-purple/40 p-4 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      variants={electricCardVariants}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
