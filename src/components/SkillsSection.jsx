import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories } from '../data/skills'

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section" id="skills" data-section="skills" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">// TECH STACK</p>
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-desc">
          Teknologi dan tools yang saya kuasai — dari frontend hingga AI infrastructure.
        </p>
      </motion.div>

      <div className="skills-marquee-wrapper">
        <div className="skills-grid">
          {[...skillCategories, ...skillCategories].map((cat, ci) => (
            <motion.div
              key={`${cat.title}-${ci}`}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + (ci % skillCategories.length) * 0.1 }}
            >
              <div className="skill-card-title" style={{ color: cat.color }}>
                <span>{cat.icon}</span> {cat.title}
              </div>
              {cat.skills.map((skill) => (
                <div className="skill-item" key={`${cat.title}-${skill.name}-${ci}`}>
                  <div className="skill-name">
                    <span>{skill.name}</span>
                    <span style={{ color: cat.color }}>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{
                        width: isInView ? `${skill.level}%` : '0%',
                        background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
