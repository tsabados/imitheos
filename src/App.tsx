import AmbientBackground from '@/components/AmbientBackground'
import CustomCursor      from '@/components/CustomCursor'
import HeroSection       from '@/components/HeroSection'
import NarrativeSection  from '@/components/NarrativeSection'
import TimelineSection   from '@/components/TimelineSection'
import Footer            from '@/components/Footer'
import styles            from './App.module.css'

export default function App() {
  return (
    <>
      {/* Fixed, full-viewport ambient canvas */}
      <AmbientBackground />

      {/* Custom mouse cursor */}
      <CustomCursor />

      {/* Page content */}
      <main className={styles.main}>
        <HeroSection />
        <NarrativeSection />
        <TimelineSection />
        <Footer />
      </main>
    </>
  )
}
