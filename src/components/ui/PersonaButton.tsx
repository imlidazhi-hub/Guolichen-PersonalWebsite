'use client'
import { motion } from 'framer-motion'

interface PersonaButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'gold' | 'purple' | 'teal'
  className?: string
}

const variantStyles = {
  gold: 'bg-persona-gold text-persona-dark hover:brightness-110',
  purple: 'bg-persona-purple text-white hover:brightness-110',
  teal: 'border border-cyber-teal text-cyber-teal hover:bg-cyber-teal/20',
}

export default function PersonaButton({
  children,
  onClick,
  href,
  variant = 'gold',
  className = '',
}: PersonaButtonProps) {
  const cls = `clip-persona px-6 py-2.5 font-black text-sm tracking-wider transition-all ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
