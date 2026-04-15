'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { glitchVariants } from '@/lib/animations'

interface GlitchTextProps {
  text: string
  className?: string
  autoPlay?: boolean
}

export default function GlitchText({ text, className = '', autoPlay = true }: GlitchTextProps) {
  const controls = useAnimation()

  useEffect(() => {
    if (!autoPlay) return
    let cancelled = false
    const loop = async () => {
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, 3000 + Math.random() * 2000))
        if (cancelled) break
        await controls.start('glitch')
        await controls.start('idle')
      }
    }
    loop()
    return () => { cancelled = true }
  }, [controls, autoPlay])

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        variants={glitchVariants}
        animate={controls}
        initial="idle"
        className="relative z-10 text-persona-gold font-black"
        style={{ textShadow: '0 0 12px #FFD900, 0 0 24px rgba(255,217,0,0.4)', fontFamily: 'var(--font-noto-sc), var(--font-orbitron), sans-serif' }}
      >
        {text}
      </motion.span>
      <span
        className="absolute inset-0 text-cyber-teal font-black opacity-20"
        style={{ transform: 'translate(3px, 1px)', userSelect: 'none', fontFamily: 'var(--font-noto-sc), var(--font-orbitron), sans-serif' }}
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  )
}
