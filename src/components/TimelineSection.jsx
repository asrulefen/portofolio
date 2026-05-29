import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timeline } from '../data/timeline'

export default function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="section" id="timeline" data-section="timeline" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">// JOURNEY</p>
        <h2 className="section-title">My Timeline</h2>
        <p className="section-desc">
          Perjalanan dari siswa SMK di Tuban hingga menjadi multi-platform developer.
        </p>
      </motion.div>

      <div className="timeline">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <div className="timeline-dot">{item.icon}</div>
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-title">{item.title}</div>
            <div className="timeline-sub">{item.subtitle}</div>
            <div className="timeline-desc">{item.description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
