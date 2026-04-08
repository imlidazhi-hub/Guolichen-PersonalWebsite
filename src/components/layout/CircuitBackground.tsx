'use client'
import { useEffect, useRef } from 'react'

interface Line {
  x: number
  y: number
  dx: number
  dy: number
  len: number
  alpha: number
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const count = window.innerWidth < 768 ? 15 : 30
    const lines: Line[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() > 0.5 ? 1 : -1) * 0.5,
      dy: (Math.random() > 0.5 ? 1 : -1) * 0.5,
      len: 60 + Math.random() * 100,
      alpha: 0.1 + Math.random() * 0.3,
    }))

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      lines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x + line.dx * line.len, line.y + line.dy * line.len)
        ctx.strokeStyle = `rgba(0, 206, 209, ${line.alpha})`
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(line.x, line.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 217, 0, ${line.alpha * 1.5})`
        ctx.fill()

        line.x += line.dx
        line.y += line.dy
        if (line.x < 0 || line.x > canvas.width) line.dx *= -1
        if (line.y < 0 || line.y > canvas.height) line.dy *= -1
      })
      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      aria-hidden="true"
    />
  )
}
