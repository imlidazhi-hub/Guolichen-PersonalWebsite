'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: string
  thumb?: string
}

interface LightboxProps {
  item: GalleryItem | null
  onClose: () => void
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    if (!item) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
        >
          <motion.div
            className="max-w-4xl max-h-[90vh] relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt}
                className="max-w-full max-h-[85vh] object-contain border border-persona-gold/40"
              />
            ) : (
              <video
                src={item.src}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] border border-persona-gold/40"
              />
            )}
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/60 hover:text-persona-gold text-2xl font-bold transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
