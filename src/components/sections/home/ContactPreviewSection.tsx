'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const contactItems = [
  { icon: '📧', labelZh: '邮箱', labelEn: 'Email', value: 'guolichen@example.com', color: '#FFD900' },
  { icon: '💬', labelZh: '微信', labelEn: 'WeChat', value: 'guolichen_ai', color: '#00CED1' },
]

export default function ContactPreviewSection({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch { /* ignore */ }
  }

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="cyber-label text-cyber-blue mb-2">
          {isZh ? '// 联系 · CONTACT' : '// CONTACT'}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
          {isZh ? '一起合作吧' : "Let's Connect"}
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.labelZh}
              className="flex items-center gap-4 p-5 border border-persona-purple/40 bg-persona-purple/10"
              style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="cyber-label text-white/40 mb-0.5">
                  {isZh ? item.labelZh : item.labelEn}
                </div>
                <div className="text-white font-medium truncate" style={{ fontFamily: 'var(--font-share-tech), monospace' }}>
                  {item.value}
                </div>
              </div>
              <motion.button
                type="button"
                onClick={() => handleCopy(item.value, item.labelZh)}
                className="px-3 py-1.5 text-xs font-bold border transition-colors flex-shrink-0"
                style={{
                  borderColor: `${item.color}60`,
                  color: item.color,
                  fontFamily: 'var(--font-share-tech), monospace',
                }}
                whileHover={{ scale: 1.05, backgroundColor: `${item.color}15` }}
                whileTap={{ scale: 0.95 }}
              >
                {copied === item.labelZh ? (isZh ? '已复制！' : 'Copied!') : (isZh ? '复制' : 'Copy')}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Right side CTA */}
        <motion.div
          className="border border-cyber-blue/30 p-8 relative overflow-hidden"
          style={{
            clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)',
            background: 'linear-gradient(135deg, rgba(10,239,255,0.05), rgba(107,33,168,0.1))',
          }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyber-blue via-cyber-pink to-transparent" />
          <p className="text-white/70 text-base leading-relaxed mb-4" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
            {isZh
              ? '无论是AI数据标注合作、内容创作项目，还是只是想聊聊AI行业——都欢迎联系我。'
              : 'Whether for AI annotation collaboration, content creation, or just chatting about the AI industry — feel free to reach out.'}
          </p>
          <div className="cyber-label text-cyber-blue/60">
            {isZh ? '响应时间通常在24小时内' : 'Usually responds within 24 hours'}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
