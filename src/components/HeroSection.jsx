import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero3D from './Hero3D'

const roles = [
  'Web Apps Developer',
  'AI Server Engineer',
  'Graphic Designer',
  'Full-Stack Developer'
]

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setRoleIndex((roleIndex + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setText(isDeleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1)
        )
      }, isDeleting ? 40 : 80)
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const photoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section className="hero" id="hero" data-section="hero" ref={containerRef}>
      <div className="hero-canvas">
        <Hero3D />
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          // WELCOME TO MY UNIVERSE
        </motion.p>

        <h1 className="hero-title">
          <span className="glitch" data-text="EVN UNIVERSE">EVN UNIVERSE</span>
        </h1>

        <p className="hero-subtitle">
          {text}<span className="typed-cursor" />
        </p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a href="#projects" className="btn-pill filled"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            View Projects
          </a>
          <a href="#contact" className="btn-pill"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-photo-container"
        style={{ x: "-50%", y: photoY, opacity: photoOpacity, scale: photoScale }}
        initial={{ x: "-50%", opacity: 0, scale: 0.5 }}
        animate={{ x: "-50%", opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 1.2 }}
      >
        <div className="hero-photo-frame">
          <img src="/foto-saya.jpg" alt="Profile" className="hero-photo" />
        </div>
      </motion.div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
