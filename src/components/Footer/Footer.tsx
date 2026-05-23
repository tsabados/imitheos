import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import styles from './Footer.module.css'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.footer
      ref={ref}
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <div className={styles.divider} />
      <div className={styles.inner}>
        <p className={styles.wordmark}>IMITHEOS</p>
        <p className={styles.tagline}>
          /iˈmi.θe.os/ — Half-human. Half-machine. Entirely neither.
        </p>
        <p className={styles.copy}>
          © {new Date().getFullYear()} · Built at the threshold
        </p>
      </div>
    </motion.footer>
  )
}
