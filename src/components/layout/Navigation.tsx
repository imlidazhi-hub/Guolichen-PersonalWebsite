'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { electricHoverVariants } from '@/lib/animations'

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
          className={`cyber-electric relative px-5 py-2 text-sm font-bold cursor-pointer ${
            isActive
              ? 'bg-persona-gold text-persona-dark'
              : 'bg-persona-purple/30 text-white'
          }`}
          style={{ skewX: -8 } as React.CSSProperties}
          variants={electricHoverVariants}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.95, x: 0 }}
        >
          <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>
            {t(k)}
          </span>
        </motion.div>
      </Link>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-persona-dark/90 backdrop-blur-sm border-b border-persona-purple/30" style={{ boxShadow: '0 1px 0 rgba(255,45,120,0.3), 0 2px 12px rgba(10,239,255,0.08)' }}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Desktop nav */}
        <div className="hidden md:flex gap-1">
          {navKeys.map((k) => (
            <NavLink key={k} k={k} />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-persona-gold font-bold text-xl"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* Language switch */}
        <motion.button
          onClick={switchLocale}
          className="cyber-electric relative px-4 py-1.5 text-xs font-bold border border-cyber-teal text-cyber-teal transition-colors"
          style={{ skewX: -8 } as React.CSSProperties}
          variants={electricHoverVariants}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.95, x: 0 }}
        >
          <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>
            {tCommon('switchLang')}
          </span>
        </motion.button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-persona-purple/30 bg-persona-dark/95 px-4 py-3 flex flex-col gap-2"
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
