import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import TimelineSection from './components/TimelineSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScanLines from './components/ScanLines'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveSection(e.target.dataset.section)
      })
    }, { threshold: 0.3 })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])



  return (
    <>
      <CustomCursor />
      <ScanLines />
      <Navbar active={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
