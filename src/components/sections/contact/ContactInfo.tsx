'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { slideInFromLeft } from '@/lib/animations'

interface ContactInfoProps {
  email?: string
  wechat?: string
  github?: string
  linkedin?: string
}

interface ContactItem {
  key: string
  label: string
  value: string
  icon: string
}

export default function ContactInfo({ email, wechat, github, linkedin }: ContactInfoProps) {
  const t = useTranslations('contact')
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Clipboard not available in some environments
    }
  }

  const items: ContactItem[] = [
    { key: 'email', label: t('email'), value: email ?? '', icon: '📧' },
    { key: 'wechat', label: t('wechat'), value: wechat ?? '', icon: '💬' },
  ].filter((item) => item.value)

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.div
          key={item.key}
          className="flex items-center gap-4 p-4 border border-persona-purple/40 bg-persona-purple/10"
          style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
          variants={slideInFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={i}
        >
          <span className="text-2xl flex-shrink-0">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-white/50 text-xs mb-0.5">{item.label}</div>
            <div className="text-white font-mono truncate">{item.value}</div>
          </div>
          <motion.button
            type="button"
            onClick={() => handleCopy(item.value, item.key)}
            className="clip-persona px-3 py-1.5 text-xs font-bold border border-persona-gold/60 text-persona-gold hover:bg-persona-gold/20 transition-colors min-w-16 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied === item.key ? t('copied') : t('copy')}
          </motion.button>
        </motion.div>
      ))}

      {(github || linkedin) && (
        <div className="flex flex-wrap gap-3 mt-6">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-persona px-4 py-2 border border-persona-purple/60 text-white/70 hover:text-white hover:border-persona-purple text-sm transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-persona px-4 py-2 border border-cyber-teal/60 text-cyber-teal/70 hover:text-cyber-teal text-sm transition-colors"
            >
              LinkedIn ↗
            </a>
          )}
        </div>
      )}
    </div>
  )
}
