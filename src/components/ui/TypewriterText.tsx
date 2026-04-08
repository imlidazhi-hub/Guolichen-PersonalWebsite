'use client'
import { motion } from 'framer-motion'
import { typewriterContainer, typewriterChar } from '@/lib/animations'

interface TypewriterTextProps {
  text: string
  className?: string
}

export default function TypewriterText({ text, className = '' }: TypewriterTextProps) {
  return (
    <motion.span
      className={className}
      variants={typewriterContainer}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={typewriterChar}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
