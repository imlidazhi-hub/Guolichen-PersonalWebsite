'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox, { GalleryItem } from './Lightbox'
import { cardHoverVariants } from '@/lib/animations'

interface GalleryProps {
  items: GalleryItem[]
  locale?: string
}

export default function Gallery({ items, locale = 'zh' }: GalleryProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-white/30">
        <div className="text-5xl mb-4">◇</div>
        <p className="text-sm">
          {locale === 'zh' ? '作品上传中，敬请期待…' : 'Coming soon — works being uploaded'}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="aspect-square overflow-hidden cursor-pointer relative group"
            style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            onClick={() => setSelected(item)}
          >
            {item.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumb || item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                muted
                preload="metadata"
              />
            )}
            <div className="absolute inset-0 bg-persona-gold/0 group-hover:bg-persona-gold/10 transition-colors flex items-center justify-center">
              {item.type === 'video' && (
                <span className="text-3xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  ▶
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </>
  )
}
