'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import NPCDialog from '@/components/ui/NPCDialog'
import { npcIdleVariants } from '@/lib/animations'

interface NPCBaseProps {
  name: string
  imageSrc: string
  imageAlt: string
  lines: string[]
  className?: string
  size?: number
}

export default function NPCBase({
  name,
  imageSrc,
  imageAlt,
  lines,
  className = '',
  size = 80,
}: NPCBaseProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)

  const handleClick = () => {
    if (isOpen) {
      const next = (lineIndex + 1) % lines.length
      if (next === 0) {
        setIsOpen(false)
        setLineIndex(0)
      } else {
        setLineIndex(next)
      }
    } else {
      setIsOpen(true)
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <NPCDialog
        isOpen={isOpen}
        text={lines[lineIndex]}
        npcName={name}
        onClose={() => { setIsOpen(false); setLineIndex(0) }}
      />
      <motion.div
        variants={npcIdleVariants}
        animate="idle"
        onClick={handleClick}
        className="cursor-pointer"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-contain drop-shadow-lg"
          onError={(e) => {
            // Show placeholder when image not found
            const target = e.currentTarget
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent && !parent.querySelector('.npc-placeholder')) {
              const placeholder = document.createElement('div')
              placeholder.className = 'npc-placeholder w-full h-full flex items-center justify-center text-persona-gold/60 text-4xl'
              placeholder.textContent = '◇'
              parent.appendChild(placeholder)
            }
          }}
        />
      </motion.div>
    </div>
  )
}
