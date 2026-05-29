import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../data/projects'
import ProjectModal from './ProjectModal'
import ProjectPreview from './ProjectPreviews'

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <section className="section" id="projects" data-section="projects" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">// PORTFOLIO</p>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-desc">
          Koleksi proyek yang sudah saya bangun — dari web apps, mobile, desktop, hingga AI bots.
        </p>
      </motion.div>

      <motion.div
        className="projects-filter"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        {categories.map(c => (
          <button
            key={c.id}
            className={`filter-btn ${filter === c.id ? 'active' : ''}`}
            onClick={() => setFilter(c.id)}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </motion.div>

      <motion.div className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelected(project)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="project-preview" style={{
                background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)`
              }}>
                <ProjectPreview id={project.id} color={project.color} />
                <div className="project-preview-overlay" />
              </div>
              <div className="project-info">
                <div className="project-tag">{project.category.toUpperCase()}</div>
                <div className="project-name">{project.title}</div>
                <div className="project-desc">{project.subtitle}</div>
                <div className="project-tech">
                  {project.tech.slice(0, 4).map(t => (
                    <span className="tech-badge" key={t}>{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="tech-badge">+{project.tech.length - 4}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
