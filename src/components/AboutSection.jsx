import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function CyclingRole() {
  const roles = ["Multi-Platform Developer", "Registered Nurse", "AI Server Engineer", "Graphic Designer"]
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout
    const currentRole = roles[index]
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length - 1))
        if (text.length <= 1) {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % roles.length)
        }
      }, 30)
    } else {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length + 1))
        if (text.length === currentRole.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2500)
        }
      }, 80)
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, index])

  return (
    <>
      <span className="string">"{text}"</span>
      <span className="typed-cursor" style={{ display: 'inline-block', width: '8px', height: '1.2em', background: 'var(--accent)', verticalAlign: 'middle', marginLeft: '4px', animation: 'blink 1s step-end infinite' }} />
    </>
  )
}


export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const lines = [
    { type: 'comment', text: '// ═══════════════════════════════════════' },
    { type: 'comment', text: '// PROFILE — asrulefen.config.js' },
    { type: 'comment', text: '// ═══════════════════════════════════════' },
    { type: 'empty' },
    { type: 'code', content: [
      { t: 'const ', c: 'keyword' }, { t: 'developer', c: 'variable' },
      { t: ' = ', c: '' }, { t: '{', c: 'bracket' }
    ]},
    { type: 'code', content: [
      { t: '  name: ', c: '' }, { t: '"Asrulefen"', c: 'string' }, { t: ',', c: '' }
    ]},
    { type: 'code', content: [
      { t: '  origin: ', c: '' }, { t: '"Tuban, Jawa Timur, Indonesia"', c: 'string' }, { t: ',', c: '' }
    ]},
    { type: 'cycling-role' },
    { type: 'empty' },
    { type: 'comment', text: '  // Education' },
    { type: 'code', content: [
      { t: '  education: ', c: '' }, { t: '[', c: 'bracket' }
    ]},
    { type: 'code', content: [
      { t: '    ', c: '' }, { t: '"SMKN 1 Tuban — Teknik Komputer Jaringan (2020)"', c: 'string' }, { t: ',', c: '' }
    ]},
    { type: 'code', content: [
      { t: '    ', c: '' }, { t: '"S1 Keperawatan — IIKNU Tuban"', c: 'string' }
    ]},
    { type: 'code', content: [{ t: '  ]', c: 'bracket' }, { t: ',', c: '' }] },
    { type: 'empty' },
    { type: 'comment', text: '  // What I do' },
    { type: 'code', content: [
      { t: '  roles: ', c: '' }, { t: '[', c: 'bracket' },
      { t: '"Web Apps Developer"', c: 'string' }, { t: ', ', c: '' },
      { t: '"AI Server Engineer"', c: 'string' }, { t: ', ', c: '' },
      { t: '"Graphic Designer"', c: 'string' },
      { t: ']', c: 'bracket' }, { t: ',', c: '' }
    ]},
    { type: 'empty' },
    { type: 'comment', text: '  // Medical Background (Registered Nurse)' },
    { type: 'code', content: [
      { t: '  vitalSigns: ', c: '' }, { t: '{ ', c: 'bracket' }, { t: 'heartRate: ', c: 'variable' }, { t: '"100% Passion 💓", ', c: 'string' }, { t: 'empathy: ', c: 'variable' }, { t: '"Maximum 🏥"', c: 'string' }, { t: ' },', c: 'bracket' }
    ]},
    { type: 'empty' },
    { type: 'comment', text: '  // The story' },
    { type: 'code', content: [
      { t: '  bio: ', c: '' }, { t: '"Seorang developer, desainer, dan perawat dari Tuban"', c: 'string' }
    ]},
    { type: 'code', content: [
      { t: '       ', c: '' }, { t: '"+ yang menggabungkan presisi medis dengan logika coding."', c: 'string' }
    ]},
    { type: 'code', content: [
      { t: '       ', c: '' }, { t: '"+ Meracik solusi digital dari frontend web apps, AI integration,"', c: 'string' }
    ]},
    { type: 'code', content: [
      { t: '       ', c: '' }, { t: '"+ hingga Android & Desktop application."', c: 'string' }, { t: ',', c: '' }
    ]},
    { type: 'empty' },
    { type: 'code', content: [
      { t: '  motto: ', c: '' }, { t: '"Code it. Design it. Ship it. 🚀"', c: 'string' }
    ]},
    { type: 'code', content: [{ t: '}', c: 'bracket' }, { t: ';', c: '' }] },
  ]



  return (
    <section className="section" id="about" data-section="about" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">// ABOUT ME</p>
        <h2 className="section-title">Know the Developer</h2>
        <p className="section-desc">
          Perjalanan dari Tuban menuju dunia digital — antara jaringan komputer, keperawatan, dan passion membangun sesuatu yang berdampak.
        </p>
      </motion.div>

      <motion.div
        className="terminal"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="terminal-header">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
          <span className="terminal-title">asrulefen.config.js</span>
        </div>
        <div className="terminal-body">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
              style={{ minHeight: '1.6em' }}
            >
              {line.type === 'empty' && <br />}
              {line.type === 'comment' && <span className="comment">{line.text}</span>}
              {line.type === 'cycling-role' && (
                <>
                  <span>  currentRole: </span>
                  <CyclingRole />
                  <span>,</span>
                </>
              )}
              {line.type === 'code' && line.content.map((part, j) => (
                <span key={j} className={part.c}>{part.t}</span>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="stats-row"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        {[
          { n: '10+', l: 'Projects Built' },
          { n: '5+', l: 'Years Experience' },
          { n: '4', l: 'Platforms' },
          { n: '∞', l: 'Lines of Code' }
        ].map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-number">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
