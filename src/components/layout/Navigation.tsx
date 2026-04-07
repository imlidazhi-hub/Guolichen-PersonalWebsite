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
          className={`clip-persona px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
            isActive
              ? 'bg-persona-gold text-persona-dark'
              : 'bg-persona-purple/30 text-white hover:bg-persona-purple/60'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t(k)}
        </motion.div>
      </Link>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-persona-dark/90 backdrop-blur-sm border-b border-persona-purple/30">
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
          className="clip-persona px-3 py-1.5 text-xs font-bold border border-cyber-teal text-cyber-teal hover:bg-cyber-teal/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tCommon('switchLang')}
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
