import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="section" id="contact" data-section="contact" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">// CONTACT</p>
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-desc">
          Tertarik berkolaborasi? Punya project yang perlu dikerjakan? Let's talk!
        </p>
      </motion.div>

      <motion.div
        className="contact-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <div className="contact-info-card">
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div>
              <div className="contact-label">Location</div>
              <div className="contact-value">Tuban, Jawa Timur, Indonesia</div>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">🌐</div>
            <div>
              <div className="contact-label">Website</div>
              <div className="contact-value">asrulefen.com</div>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">💼</div>
            <div>
              <div className="contact-label">Available For</div>
              <div className="contact-value">Freelance & Full-time</div>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">⚡</div>
            <div>
              <div className="contact-label">Response Time</div>
              <div className="contact-value">Within 24 hours</div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          <input className="form-input" type="text" placeholder="Your Name" required />
          <input className="form-input" type="email" placeholder="Email Address" required />
          <input className="form-input" type="text" placeholder="Subject" />
          <textarea className="form-textarea" placeholder="Your message..." required />
          <button type="submit" className="btn-pill filled" style={{ alignSelf: 'flex-start' }}>
            Send Message →
          </button>
        </form>
      </motion.div>
    </section>
  )
}
