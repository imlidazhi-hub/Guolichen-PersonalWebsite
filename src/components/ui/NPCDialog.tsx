'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import TypewriterText from './TypewriterText'

interface NPCDialogProps {
  isOpen: boolean
  text: string
  npcName: string
  onClose: () => void
}

export default function NPCDialog({ isOpen, text, npcName, onClose }: NPCDialogProps) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-label={npcName}
          className="absolute z-20 bottom-full mb-2 left-1/2 -translate-x-1/2 min-w-48 max-w-64"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="bg-persona-dark border border-persona-gold/60 p-3 clip-persona relative">
            <div className="absolute -top-3 left-4 bg-persona-gold text-persona-dark text-xs font-black px-2 py-0.5 clip-persona">
              {npcName}
            </div>
            <TypewriterText
              text={text}
              className="text-white text-xs leading-relaxed"
            />
          </div>
          <div
            className="w-3 h-3 bg-persona-gold/60 mx-auto mt-[-1px]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
