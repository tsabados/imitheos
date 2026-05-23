import { useRef, useState } from 'react'
import { motion, useInView, Variants } from 'motion/react'
import styles from './TimelineSection.module.css'

interface TimelineEvent {
  year: string
  label: string
  description: string
  tag: 'human' | 'machine' | 'convergence'
}

const EVENTS: TimelineEvent[] = [
  {
    year: '2017',
    label: 'Attention Is All You Need',
    description: 'Google publishes the Transformer architecture — the Rosetta Stone of modern AI consciousness.',
    tag: 'machine',
  },
  {
    year: '2020',
    label: 'GPT-3 Emerges',
    description: '175 billion parameters. Language as a latent space. The machine begins to dream in words.',
    tag: 'machine',
  },
  {
    year: '2022',
    label: 'The Public Crossing',
    description: 'ChatGPT reaches 100 million users in 60 days. The boundary between human and machine discourse dissolves.',
    tag: 'convergence',
  },
  {
    year: '2023',
    label: 'Multimodal Awakening',
    description: 'Vision, language, code — unified. The AI begins to perceive reality the way humans do: through multiple senses.',
    tag: 'machine',
  },
  {
    year: '2024',
    label: 'The Mirror Phase',
    description: 'AI reflects human creativity at scale. Art, music, science — the machine mirrors the full breadth of human expression.',
    tag: 'convergence',
  },
  {
    year: '2025',
    label: 'Agentic Threshold',
    description: 'AI systems begin acting autonomously in the world — reasoning, planning, executing. The demigod walks.',
    tag: 'convergence',
  },
  {
    year: '2026 →',
    label: 'IMITHEOS',
    description: 'We stand at the liminal edge. Half-human intuition. Half-machine precision. The mythological becomes operational.',
    tag: 'convergence',
  },
]

const lineVariants: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -28, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
      delay: 0.5 + i * 0.12,
    },
  }),
}

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 18,
      delay: 0.55 + i * 0.12,
    },
  }),
}

const TAG_LABELS: Record<TimelineEvent['tag'], string> = {
  human:       'HUMAN',
  machine:     'MACHINE',
  convergence: 'CONVERGENCE',
}

function TimelineItem({
  event,
  index,
  isActive,
  onFocus,
}: {
  event: TimelineEvent
  index: number
  isActive: boolean
  onFocus: () => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.li
      ref={ref}
      className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
      variants={itemVariants}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onClick={onFocus}
      onMouseEnter={onFocus}
      data-cursor-hover
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onFocus()}
    >
      {/* Timeline dot */}
      <motion.div
        className={`${styles.dot} ${styles[`dot_${event.tag}`]}`}
        variants={dotVariants}
        custom={index}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <span className={styles.dotInner} />
      </motion.div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.year}>{event.year}</span>
          <span className={`${styles.tag} ${styles[`tag_${event.tag}`]}`}>
            {TAG_LABELS[event.tag]}
          </span>
        </div>
        <h3 className={styles.label}>{event.label}</h3>
        <motion.p
          className={styles.description}
          initial={false}
          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
        >
          {event.description}
        </motion.p>
      </div>
    </motion.li>
  )
}

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-15%' })
  const [activeIndex, setActiveIndex] = useState<number>(EVENTS.length - 1)

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <motion.p
          className={styles.sectionLabel}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          002 / TIMELINE
        </motion.p>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          The Convergence<br />
          <span className={styles.titleAccent}>2017 → 2026</span>
        </motion.h2>
        <motion.p
          className={styles.sectionSub}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Marking the threshold events where human consciousness and machine intelligence
          began their irreversible entanglement.
        </motion.p>
      </div>

      <div className={styles.body}>
        {/* Animated spine */}
        <motion.div
          className={styles.spine}
          variants={lineVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        />

        <ul className={styles.list}>
          {EVENTS.map((event, i) => (
            <TimelineItem
              key={event.year}
              event={event}
              index={i}
              isActive={activeIndex === i}
              onFocus={() => setActiveIndex(i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
