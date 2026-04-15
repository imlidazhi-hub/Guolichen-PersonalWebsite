'use client'
import { useEffect, useRef, useState } from 'react'

export default function MouseFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let dotX = 0, dotY = 0
    let glowX = 0, glowY = 0
    let mouseX = 0, mouseY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const loop = () => {
      // Dot: snappy follow
      dotX += (mouseX - dotX) * 0.55
      dotY += (mouseY - dotY) * 0.55
      // Glow: lazy follow
      glowX += (mouseX - glowX) * 0.09
      glowY += (mouseY - glowY) * 0.09

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <>
      {/* Outer glow — lazy, large */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        style={{
          width: 320,
          height: 320,
          marginLeft: -160,
          marginTop: -160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,200,0.07) 0%, rgba(157,115,248,0.03) 50%, transparent 70%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />

      {/* Inner ring — snappy */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[1000]"
        style={{
          width: 24,
          height: 24,
          marginLeft: -12,
          marginTop: -12,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,240,200,0.75)',
          boxShadow: '0 0 8px rgba(0,240,200,0.5), inset 0 0 4px rgba(0,240,200,0.15)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      >
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 4,
            height: 4,
            marginLeft: -2,
            marginTop: -2,
            borderRadius: '50%',
            background: '#E8B84B',
            boxShadow: '0 0 6px rgba(232,184,75,0.8)',
          }}
        />
      </div>
    </>
  )
}
