'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface NavigationProps {
  currentLocale: string
}

const navKeys = ['home', 'resume', 'projects', 'portfolio', 'contact'] as const
type NavKey = typeof navKeys[number]

const navPaths: Record<NavKey, string> = {
  home: '/',
  resume: '/resume',
  projects: '/projects',
  portfolio: '/portfolio',
  contact: '/contact',
}

// Icons per nav item
const navIcons: Record<NavKey, string> = {
  home: '⌂',
  resume: '◈',
  projects: '◆',
  portfolio: '◉',
  contact: '✉',
}

export default function Navigation({ currentLocale }: NavigationProps) {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const switchLocale = () => {
    const newLocale = currentLocale === 'zh' ? 'en' : 'zh'
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setMobileOpen(false)
  }

  const NavLink = ({ k }: { k: NavKey }) => {
    const href = `/${currentLocale}${navPaths[k]}`
    const isActive =
      pathname === href ||
      (k === 'home' && (pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`))
    return (
      <Link href={href} onClick={() => setMobileOpen(false)}>
        <motion.div
          className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-bold cursor-pointer select-none transition-colors ${
            isActive
              ? 'text-persona-gold'
              : 'text-white/70 hover:text-white'
          }`}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}
        >
          <span className={`text-xs ${isActive ? 'text-persona-gold' : 'text-cyber-pink/70'}`}>
            {navIcons[k]}
          </span>
          <span>{t(k)}</span>
          {/* Active indicator bar */}
          <motion.span
            className="absolute bottom-0 left-2 right-2 h-0.5 bg-persona-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
          {/* Hover indicator */}
          {!isActive && (
            <motion.span
              className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyber-pink/60"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </motion.div>
      </Link>
    )
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-persona-dark/95 backdrop-blur-md"
      style={{ borderBottom: '1px solid rgba(0,240,200,0.12)', boxShadow: '0 0 24px rgba(0,240,200,0.04), 0 1px 0 rgba(0,240,200,0.15)' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <Link href={`/${currentLocale}/`}>
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ x: 2 }}
          >
            <span className="text-cyber-pink text-lg font-black" style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>◈</span>
            <span className="text-white font-black text-base tracking-wider" style={{ fontFamily: 'var(--font-noto-sc), sans-serif' }}>果粒尘</span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navKeys.map((k) => (
            <NavLink key={k} k={k} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language switch */}
          <motion.button
            onClick={switchLocale}
            className="px-3 py-1.5 text-xs font-bold border border-cyber-teal/60 text-cyber-teal hover:bg-cyber-teal/10 hover:border-cyber-teal transition-colors"
            style={{ fontFamily: 'var(--font-share-tech), monospace', letterSpacing: '0.1em' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tCommon('switchLang')}
          </motion.button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-persona-gold font-bold text-xl"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-persona-purple/30 bg-persona-dark/98 px-4 py-4 flex flex-col gap-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {navKeys.map((k) => (
              <NavLink key={k} k={k} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
