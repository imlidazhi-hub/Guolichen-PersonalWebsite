'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPathname = useRef<string | null>(null)
  const isNavigation = prevPathname.current !== null && prevPathname.current !== pathname
  prevPathname.current = pathname

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isNavigation ? { opacity: 0, clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)' } : false}
        animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        exit={{ opacity: 0, clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
