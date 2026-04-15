'use client'
import { motion } from 'framer-motion'
import { electricHoverVariants } from '@/lib/animations'

interface PersonaButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'gold' | 'purple' | 'teal'
  className?: string
}

const variantStyles = {
  gold: 'bg-persona-gold text-persona-dark',
  purple: 'bg-persona-purple text-white',
  teal: 'border border-cyber-teal text-cyber-teal hover:bg-cyber-teal/20',
}

export default function PersonaButton({
  children,
  onClick,
  href,
  variant = 'gold',
  className = '',
}: PersonaButtonProps) {
  const cls = `cyber-electric clip-persona pl-7 pr-6 py-2.5 font-black text-sm tracking-widest transition-colors ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        variants={electricHoverVariants}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.95, x: 0 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cls}
      variants={electricHoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.95, x: 0 }}
    >
      {children}
    </motion.button>
  )
}
