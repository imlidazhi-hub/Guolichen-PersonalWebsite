import { Variants } from 'framer-motion'

export const slideInFromLeft: Variants = {
  hidden: { x: -80, opacity: 0, skewX: -5 },
  visible: {
    x: 0,
    opacity: 1,
    skewX: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const slideInFromRight: Variants = {
  hidden: { x: 80, opacity: 0, skewX: 5 },
  visible: {
    x: 0,
    opacity: 1,
    skewX: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const personaPageTransition: Variants = {
  initial: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0 },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    opacity: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
}

export const glitchVariants: Variants = {
  idle: { x: 0, skewX: 0, opacity: 1 },
  glitch: {
    x: [0, -3, 3, -2, 0],
    skewX: [0, -5, 5, -3, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: { duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] },
  },
}

export const npcIdleVariants: Variants = {
  idle: {
    y: [0, -6, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const cardHoverVariants: Variants = {
  rest: { scale: 1, boxShadow: '0 0 0px rgba(255,217,0,0)' },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 20px rgba(255,217,0,0.4)',
    transition: { duration: 0.2 },
  },
}

// Electric jitter: micro horizontal shake simulating current vibration
export const electricHoverVariants: Variants = {
  rest: { x: 0, scale: 1 },
  hover: {
    x: [0, -1.5, 1.5, -1, 1, 0],
    scale: 1.05,
    transition: {
      x: { duration: 0.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' },
      scale: { duration: 0.1 },
    },
  },
}

export const electricCardVariants: Variants = {
  rest: { scale: 1, x: 0 },
  hover: {
    scale: 1.02,
    x: [0, -1, 1, -0.5, 0.5, 0],
    transition: {
      x: { duration: 0.3, repeat: Infinity, repeatType: 'loop', ease: 'linear' },
      scale: { duration: 0.15 },
    },
  },
}

export const typewriterContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

export const typewriterChar: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
}
