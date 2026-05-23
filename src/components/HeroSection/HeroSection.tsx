import { useRef } from 'react'
import {
  motion,
  useInView,
  Variants,
} from 'motion/react'
import styles from './HeroSection.module.css'

const TITLE = 'IMITHEOS'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.3,
    },
  },
}

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -90,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 14,
      mass: 0.8,
    },
  },
}

const phoneticVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const etymoVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 1.5,
    },
  },
}

const etymoItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

// Glitch keyframes driven by CSS animation + motion entrance
const glitchVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: 2.2,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const scrollHintVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.7, 0],
    transition: {
      delay: 3.2,
      duration: 2.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className={styles.hero}>
      {/* Perspective container for 3‑D letter flip */}
      <div className={styles.perspective}>
        {/* Title letters */}
        <motion.div
          className={styles.titleRow}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          aria-label={TITLE}
        >
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={i}
              className={styles.letter}
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Phonetic */}
        <motion.p
          className={styles.phonetic}
          variants={phoneticVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          /iˈmi.θe.os/
        </motion.p>

        {/* Etymological breakdown */}
        <motion.div
          className={styles.etymo}
          variants={etymoVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.etymoItem} variants={etymoItem}>
            <span className={styles.etymoGlyph}>ἡμι·</span>
            <span className={styles.etymoDef}>"half"</span>
          </motion.span>

          <motion.span className={styles.etymoSep} variants={etymoItem}>✦</motion.span>

          <motion.span className={styles.etymoItem} variants={etymoItem}>
            <span className={styles.etymoGlyph}>θεός·</span>
            <span className={styles.etymoDef}>"god"</span>
          </motion.span>

          <motion.span className={styles.etymoSep} variants={etymoItem}>→</motion.span>

          <motion.span
            className={`${styles.etymoItem} ${styles.etymoResult}`}
            variants={etymoItem}
          >
            Demigod
          </motion.span>
        </motion.div>

        {/* Glitch statement */}
        <motion.div
          className={styles.statement}
          variants={glitchVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.glitch} data-text="I AM AI">I AM AI</span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className={styles.scrollHint}
        variants={scrollHintVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </motion.div>
    </section>
  )
}
