'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const stats = [
  { value: '50K+', labelZh: '标注样本', labelEn: 'SAMPLES' },
  { value: '98.5%', labelZh: '合格率', labelEn: 'ACCURACY' },
  { value: '3YR+', labelZh: '从业经验', labelEn: 'EXPERIENCE' },
]

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const isZh = locale === 'zh'

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4 py-10">

      {/* ── Grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,206,209,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,206,209,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-persona-dark via-transparent to-persona-dark pointer-events-none" />

      {/* ── Corner accent glows ── */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-teal/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-64 bg-cyber-pink/6 rounded-full blur-3xl pointer-events-none" />

      {/* ── Oval decorative frame ── */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: 'min(92vw, 960px)',
          height: 'min(80vh, 600px)',
          borderRadius: '50%',
          border: '1.5px solid rgba(0,206,209,0.35)',
          boxShadow: '0 0 24px rgba(0,206,209,0.15), inset 0 0 40px rgba(0,206,209,0.03)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl w-full">

        {/* Top label */}
        <motion.div
          className="flex items-center gap-3 mb-6 md:mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className="text-cyber-pink text-base animate-pulse">✦</span>
          <span
            className="cyber-label tracking-[0.35em] text-xs text-cyber-teal"
          >
            EXCLUSIVE PROFILE
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-teal/50 to-transparent" />
          {/* Nav pills */}
          <div className="hidden md:flex gap-2">
            {[
              { href: `/${locale}/resume`, label: isZh ? '简历' : 'RESUME' },
              { href: `/${locale}/projects`, label: isZh ? '项目' : 'PROJECTS' },
              { href: `/${locale}/contact`, label: isZh ? '联系' : 'CONTACT' },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  className="cyber-label text-xs px-3 py-1 border border-cyber-teal/50 text-cyber-teal hover:bg-cyber-teal/15 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 md:gap-10 items-center">

          {/* ── LEFT: Avatar card ── */}
          <motion.div
            className="md:col-span-2 flex flex-col items-center md:items-start gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {/* Personal info label */}
            <div className="cyber-label text-xs text-white/40 flex items-center gap-2">
              <span className="text-cyber-teal">•</span> Personal Information
            </div>

            {/* Avatar */}
            <div className="relative w-44 h-56 md:w-52 md:h-64">
              {/* Grid overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,206,209,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,206,209,0.08) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
              {/* Avatar frame */}
              <div
                className="w-full h-full bg-persona-purple/20 border border-cyber-teal/50 overflow-hidden relative"
                style={{
                  clipPath: 'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/hero-avatar.svg"
                  alt="avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-1 text-cyber-teal/30">
                  <span className="text-3xl">◇</span>
                  <span className="cyber-label text-xs">{isZh ? '待上传头像' : 'AVATAR'}</span>
                </div>
                {/* Scan line animation */}
                <motion.div
                  className="absolute left-0 right-0 h-8 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(0,206,209,0.12), transparent)' }}
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                />
              </div>
              {/* Corner brackets */}
              {[
                'top-0 left-0 border-t-2 border-l-2',
                'top-0 right-0 border-t-2 border-r-2',
                'bottom-0 left-0 border-b-2 border-l-2',
                'bottom-0 right-0 border-b-2 border-r-2',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-4 h-4 border-cyber-teal ${cls}`} />
              ))}
            </div>

            {/* Name box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div
                className="inline-block px-4 py-2 bg-black/70 border-2 border-white/85"
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              >
                <h1
                  className="text-3xl md:text-4xl font-black text-white tracking-wide"
                  style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}
                >
                  果粒尘
                </h1>
              </div>
              <div className="cyber-label text-white/40 text-xs mt-1.5 pl-1">
                / UID : GLCHEN_2024
              </div>
            </motion.div>

            {/* Tags row */}
            <motion.div
              className="flex flex-wrap gap-x-5 gap-y-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { key: '• VOICE', val: isZh ? '普通话 / 中文' : 'Mandarin / CN' },
                { key: '• EXP', val: isZh ? '3年+' : '3 YR+' },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <span className="cyber-label text-cyber-teal/60 text-xs">{item.key}</span>
                  <span className="text-white/80 text-xs" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>{item.val}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Data panel ── */}
          <motion.div
            className="md:col-span-3 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Large watermark name */}
            <div
              className="absolute -top-4 right-0 select-none pointer-events-none text-7xl md:text-9xl font-black leading-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(0,206,209,0.1)',
                fontFamily: 'var(--font-noto-sc), sans-serif',
              }}
              aria-hidden
            >
              果粒尘
            </div>

            {/* Scrolling marquee */}
            <div className="overflow-hidden mb-4 h-4 opacity-40">
              <motion.div
                className="cyber-label text-white/60 text-xs whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                MAY GOOD LUCK ALWAYS BE WITH YOU · AI TRAINER · DATA ANNOTATION EXPERT · CONTENT CREATOR · MAY GOOD LUCK ALWAYS BE WITH YOU · AI TRAINER · DATA ANNOTATION EXPERT · CONTENT CREATOR ·&nbsp;
              </motion.div>
            </div>

            {/* Display title */}
            <div className="mb-4 flex items-baseline gap-3">
              <span
                className="text-4xl md:text-6xl font-black text-cyber-teal leading-none"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif', textShadow: '0 0 20px rgba(0,206,209,0.6)' }}
              >
                {t('title').replace('大家好，我是', '').replace("Hi, I'm ", '')}
              </span>
              <span
                className="text-xl md:text-2xl font-black text-white/50"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                {isZh ? 'GULICHEN' : 'GULICHEN'}
              </span>
            </div>

            {/* Arrow decorations */}
            <div className="flex items-center gap-2 mb-4">
              <motion.span
                className="text-cyber-teal tracking-tighter font-black text-base"
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {'<<<<'}
              </motion.span>
              <motion.span
                className="text-persona-gold tracking-tighter font-black text-base"
                animate={{ x: [2, -2, 2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {'<<<<'}
              </motion.span>
              <div className="ml-2 cyber-label text-xs text-white/30">EXCLUSIVE PROFILES</div>
            </div>

            {/* Skills panel */}
            <motion.div
              className="relative border border-cyber-teal/25 bg-black/40 p-4 mb-5 backdrop-blur-sm"
              style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-cyber-teal/60 via-cyber-pink/40 to-transparent" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="cyber-label text-cyber-teal/60 text-xs">• SKILL</span>
                  <div className="flex gap-3 mt-1 flex-wrap" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
                    {['数据标注', 'AI训练', '内容创作'].map((s) => (
                      <span key={s} className="text-white/85 text-sm">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="cyber-label text-cyber-teal/60 text-xs">• TOOLS</span>
                  <div className="flex gap-3 mt-1 flex-wrap">
                    {['LLM', 'RLHF', '多模态'].map((s) => (
                      <span key={s} className="text-white/85 text-sm" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center border border-white/10 py-3 bg-black/20"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <div
                    className="text-2xl md:text-3xl font-black text-persona-gold"
                    style={{
                      fontFamily: 'var(--font-orbitron), sans-serif',
                      textShadow: '0 0 12px rgba(255,217,0,0.5)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="cyber-label text-white/40 text-xs mt-1">
                    {isZh ? stat.labelZh : stat.labelEn}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom loading bar */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="cyber-label text-cyber-teal/40 text-xs whitespace-nowrap">LOADING PROFILE</div>
              <div className="flex-1 h-1 bg-white/8 overflow-hidden" style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber-teal to-persona-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
                />
              </div>
              <div className="cyber-label text-persona-gold/60 text-xs">100%</div>
            </motion.div>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
