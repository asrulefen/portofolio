import { motion } from 'framer-motion'
import ProjectPreview from './ProjectPreviews'

function FileTreeNode({ node, depth = 0 }) {
  const isDir = node.type === 'dir'
  return (
    <>
      <div style={{ paddingLeft: depth * 16 }}>
        <span className={isDir ? 'dir' : 'file'}>
          {isDir ? '📁 ' : '📄 '}{node.name}
        </span>
      </div>
      {isDir && node.children?.map((child, i) => (
        <FileTreeNode key={i} node={child} depth={depth + 1} />
      ))}
    </>
  )
}

export default function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header-container">
          <div className="modal-cover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`, padding: '0', overflow: 'hidden' }}>
            <ProjectPreview id={project.id} color={project.color} isModal={true} />
          </div>
          <div className="modal-header">
            <div>
              <div className="modal-icon">{project.icon}</div>
              <h3 className="modal-title">{project.title}</h3>
              <p className="modal-subtitle">{project.subtitle}</p>
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-desc">{project.description}</p>

          <h4 className="modal-section-title">⚡ Tech Stack</h4>
          <div className="modal-tech-list">
            {project.tech.map(t => (
              <span className="modal-tech-badge" key={t}>{t}</span>
            ))}
          </div>

          <h4 className="modal-section-title">✨ Key Features</h4>
          <ul className="modal-features">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          {project.fileTree && (
            <>
              <h4 className="modal-section-title">📂 Project Structure</h4>
              <div className="file-tree">
                {project.fileTree.map((node, i) => (
                  <FileTreeNode key={i} node={node} />
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
