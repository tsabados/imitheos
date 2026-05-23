import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Outer ring — very smooth lag
  const x = useSpring(rawX, { stiffness: 80,  damping: 18, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 80,  damping: 18, mass: 0.6 })

  // Inner dot — snappy
  const dotX = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.3 })
  const dotY = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.3 })

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a, button, [role="button"], [data-cursor-hover]')
      ) setHovered(true)
    }
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a, button, [role="button"], [data-cursor-hover]')
      ) setHovered(false)
    }

    const onDown = () => setClicked(true)
    const onUp   = () => setClicked(false)

    window.addEventListener('mousemove',  move)
    window.addEventListener('mouseover',  onMouseOver)
    window.addEventListener('mouseout',   onMouseOut)
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)

    return () => {
      window.removeEventListener('mousemove',  move)
      window.removeEventListener('mouseover',  onMouseOver)
      window.removeEventListener('mouseout',   onMouseOut)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
    }
  }, [rawX, rawY])

  return (
    <>
      {/* Outer glowing ring */}
      <motion.div
        className={styles.ring}
        style={{ x, y }}
        animate={{
          scale: clicked ? 0.7 : hovered ? 1.6 : 1,
          opacity: hovered ? 1 : 0.65,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      />

      {/* Inner dot */}
      <motion.div
        className={styles.dot}
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: clicked ? 0.4 : hovered ? 0 : 1,
          opacity: hovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
    </>
  )
}
