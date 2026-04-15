'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function playIntroSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()

    // Sharp metallic descending zing (like CP2077 logo hit)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(900, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.18)
    gain.gain.setValueAtTime(0.45, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
    osc.start()
    osc.stop(ctx.currentTime + 0.22)

    // Electric noise burst
    const bufferSize = Math.floor(ctx.sampleRate * 0.12)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 1200
    bp.Q.value = 0.8
    const noiseGain = ctx.createGain()
    noise.connect(bp)
    bp.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noiseGain.gain.setValueAtTime(0.25, ctx.currentTime)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    noise.start()
  } catch {
    // Audio not available
  }
}

export default function IntroScreen() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('glc_intro_seen')) {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    playIntroSound()
    setExiting(true)
    setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('glc_intro_seen', '1')
    }, 700)
  }

  // Auto-dismiss after 10s
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => dismiss(), 10000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black cursor-pointer select-none overflow-hidden"
        onClick={dismiss}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px)',
            zIndex: 1,
          }}
        />

        {/* Moving scan sweep */}
        <motion.div
          className="absolute left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(255,217,0,0.04) 50%, transparent)',
            zIndex: 2,
          }}
          initial={{ top: '-10%' }}
          animate={{ top: '110%' }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />

        {/* Logo block */}
        <div className="relative z-10 flex flex-col items-center gap-6">

          {/* Chromatic ghost (red offset) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center gap-6 pointer-events-none"
            style={{ transform: 'translate(4px, 0px)', opacity: 0.25, color: '#FF2D78', filter: 'blur(1px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0.15, 0.3, 0.2] }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-4xl md:text-6xl font-black" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
              果粒尘的世界
            </span>
          </motion.div>

          {/* Chromatic ghost (blue offset) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center gap-6 pointer-events-none"
            style={{ transform: 'translate(-3px, 0px)', opacity: 0.2, color: '#0AEFFF', filter: 'blur(1px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0.1, 0.22] }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-4xl md:text-6xl font-black" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>
              果粒尘的世界
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            className="text-cyber-pink text-2xl"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
            initial={{ opacity: 0, scale: 3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            ◈
          </motion.div>

          {/* Main name */}
          <motion.h1
            className="text-4xl md:text-6xl font-black text-persona-gold relative"
            style={{
              fontFamily: 'var(--font-noto-sc), sans-serif',
              textShadow: '0 0 20px #FFD900, 0 0 60px rgba(255,217,0,0.4)',
            }}
            initial={{ opacity: 0, scaleX: 0.6, filter: 'blur(8px)' }}
            animate={exiting
              ? { opacity: 0, scaleX: 2, filter: 'blur(20px)', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }
              : { opacity: 1, scaleX: 1, filter: 'blur(0px)' }
            }
            transition={{ duration: 0.35, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            果粒尘的世界
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="cyber-label text-white/60 tracking-[0.3em] text-xs md:text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={exiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.55 }}
          >
            AI TRAINER · DATA ANNOTATION EXPERT
          </motion.p>

          {/* Horizontal rule */}
          <motion.div
            className="w-64 md:w-96 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #FF2D78, #FFD900, #0AEFFF, transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={exiting ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          />

          {/* Click prompt */}
          <motion.div
            className="cyber-label text-white/40 text-xs tracking-[0.4em]"
            initial={{ opacity: 0 }}
            animate={exiting ? { opacity: 0 } : { opacity: [0, 1, 0.3, 1] }}
            transition={{
              delay: 1.2,
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            [ CLICK ANYWHERE TO ENTER ]
          </motion.div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyber-pink/50 pointer-events-none" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyber-blue/50 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyber-blue/50 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyber-pink/50 pointer-events-none" />

        {/* Flash on exit */}
        {exiting && (
          <motion.div
            className="absolute inset-0 bg-persona-gold pointer-events-none"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
