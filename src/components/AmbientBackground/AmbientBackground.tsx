import { useEffect, useRef } from 'react'
import styles from './AmbientBackground.module.css'

/** Canvas-based gradient mesh that pulses like a digital heartbeat */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Orb definitions: [xFrac, yFrac, radius, hue, saturation]
    const orbs = [
      { xF: 0.15, yF: 0.25, r: 0.42, h: 265, s: 70 },
      { xF: 0.82, yF: 0.15, r: 0.38, h: 196, s: 65 },
      { xF: 0.50, yF: 0.85, r: 0.44, h: 248, s: 60 },
      { xF: 0.88, yF: 0.72, r: 0.30, h: 280, s: 55 },
      { xF: 0.10, yF: 0.80, r: 0.28, h: 210, s: 50 },
    ]

    const draw = () => {
      t += 0.003
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      // Deep background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, W, H)

      orbs.forEach((orb, i) => {
        // Gentle drift + heartbeat pulse
        const pulse  = 1 + 0.06 * Math.sin(t * 1.4 + i * 1.1)
        const driftX = 0.04 * Math.sin(t * 0.7  + i * 0.9)
        const driftY = 0.04 * Math.cos(t * 0.55 + i * 1.3)
        const cx = (orb.xF + driftX) * W
        const cy = (orb.yF + driftY) * H
        const radius = orb.r * Math.min(W, H) * pulse

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0,   `hsla(${orb.h}, ${orb.s}%, 25%, 0.22)`)
        grad.addColorStop(0.5, `hsla(${orb.h}, ${orb.s}%, 18%, 0.10)`)
        grad.addColorStop(1,   `hsla(${orb.h}, ${orb.s}%, 10%, 0)`)

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })

      // Subtle scanline grain overlay
      const scanOpacity = 0.018
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = `rgba(0,0,0,${scanOpacity})`
        ctx.fillRect(0, y, W, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
