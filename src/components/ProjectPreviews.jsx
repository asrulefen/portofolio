import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectPreview({ id, color, isModal }) {
  const containerStyle = {
    width: isModal ? '100%' : '80%',
    height: isModal ? '100%' : '75%',
    background: '#0f172a',
    borderRadius: isModal ? '12px 12px 0 0' : '6px',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    overflow: 'hidden',
    display: 'flex',
    position: 'relative'
  }

  if (id === 'websitemts') {
    return (
      <div style={containerStyle}>
        {/* Sidebar */}
        <div style={{ width: '25%', background: '#022c22', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ width: '100%', height: '14px', background: color, borderRadius: '3px', marginBottom: '8px' }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: `${85 - i * 5}%`, height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '40%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: color }} />
            </div>
          </div>
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ height: '30px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', borderLeft: `2px solid ${color}`, padding: '4px' }}>
                <div style={{ width: '50%', height: '4px', background: 'rgba(255,255,255,0.2)', marginBottom: '4px' }} />
                <div style={{ width: '30%', height: '8px', background: color }} />
              </div>
            ))}
          </div>
          {/* Chart Area */}
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '30%', height: '6px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px' }} />
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
              {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`, borderRadius: '2px 2px 0 0', opacity: 0.7 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'wabot-mts') {
    return (
      <div style={{ ...containerStyle, background: '#111b21', width: '70%', height: '85%', flexDirection: 'column' }}>
        <div style={{ height: '24px', background: '#202c33', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '8px' }}>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: color }} />
          <div style={{ width: '40%', height: '6px', background: '#e9edef', borderRadius: '2px' }} />
        </div>
        <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#0b141a', backgroundImage: 'radial-gradient(#202c33 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
          <div style={{ alignSelf: 'flex-start', background: '#202c33', padding: '6px 8px', borderRadius: '0 6px 6px 6px', width: '65%' }}>
            <div style={{ width: '100%', height: '4px', background: '#8696a0', marginBottom: '4px' }} />
            <div style={{ width: '80%', height: '4px', background: '#8696a0' }} />
          </div>
          <div style={{ alignSelf: 'flex-end', background: '#005c4b', padding: '6px 8px', borderRadius: '6px 0 6px 6px', width: '55%' }}>
            <div style={{ width: '100%', height: '4px', background: '#e9edef', marginBottom: '4px' }} />
            <div style={{ width: '60%', height: '4px', background: '#e9edef' }} />
          </div>
          <div style={{ alignSelf: 'flex-start', background: '#202c33', padding: '6px 8px', borderRadius: '0 6px 6px 6px', width: '75%' }}>
            <div style={{ width: '30%', height: '4px', background: color, marginBottom: '4px' }} />
            <div style={{ width: '100%', height: '4px', background: '#8696a0', marginBottom: '4px' }} />
            <div style={{ width: '40%', height: '4px', background: '#8696a0' }} />
          </div>
        </div>
        <div style={{ height: '24px', background: '#202c33', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
          <div style={{ width: '100%', height: '12px', background: '#2a3942', borderRadius: '12px' }} />
        </div>
      </div>
    )
  }

  if (id === 'websurat') {
    return (
      <div style={containerStyle}>
        <div style={{ width: '30%', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '80%', height: '12px', background: color, borderRadius: '3px', marginBottom: '6px' }} />
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
              <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '85%', height: '100%', background: '#f8fafc', borderRadius: '4px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ width: '40%', height: '8px', background: '#94a3b8' }} />
              <div style={{ width: '20%', height: '6px', background: '#cbd5e1' }} />
            </div>
            <div style={{ width: '100%', height: '2px', background: color, opacity: 0.5, marginBottom: '4px' }} />
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ width: `${90 - Math.random() * 20}%`, height: '4px', background: '#e2e8f0' }} />
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
              <div style={{ width: '30%', height: '20px', borderRadius: '50%', border: `2px solid ${color}`, opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'raport-tk') {
    return (
      <div style={{ ...containerStyle, flexDirection: 'column' }}>
        <div style={{ height: '24px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 10px', justifyContent: 'space-between' }}>
          <div style={{ width: '30%', height: '8px', background: color, borderRadius: '2px' }} />
          <div style={{ width: '15%', height: '12px', background: color, borderRadius: '2px', opacity: 0.8 }} />
        </div>
        <div style={{ flex: 1, padding: '10px', display: 'flex', gap: '10px' }}>
          <div style={{ flex: 2, background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: '8px' }}>
            <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.1)', marginBottom: '8px' }} />
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '4px', marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '4px' }}>
                <div style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', marginTop: '2px' }} />
                <div style={{ width: '20%', height: '6px', background: color, opacity: 0.5, marginTop: '2px' }} />
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ flex: 1, background: `linear-gradient(45deg, ${color}20, transparent)`, borderRadius: '4px', border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '24px', height: '32px', background: '#fff', borderRadius: '2px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '4px', left: '4px', width: '10px', height: '10px', background: color }} />
              </div>
            </div>
            <div style={{ height: '20px', background: color, borderRadius: '4px', opacity: 0.8 }} />
          </div>
        </div>
      </div>
    )
  }

  if (id === 'cbt-exam-browser') {
    return (
      <div style={{ ...containerStyle, width: '40%', height: '85%', borderRadius: '16px', border: '4px solid #1e293b', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', background: '#0f172a' }}>
        <div style={{ width: '30%', height: '4px', background: '#334155', borderRadius: '4px', marginBottom: '12px' }} />
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ width: '12px', height: '14px', background: color, borderRadius: '2px' }} />
        </div>
        <div style={{ width: '80%', height: '8px', background: 'rgba(255,255,255,0.8)', borderRadius: '2px', marginBottom: '8px' }} />
        <div style={{ width: '60%', height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px', marginBottom: '24px' }} />
        
        <div style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '100%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
          <div style={{ width: '100%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
          <div style={{ width: '100%', height: '24px', background: color, borderRadius: '4px', marginTop: '8px' }} />
        </div>
      </div>
    )
  }

  if (id === 'cbt-monitor') {
    return (
      <div style={{ ...containerStyle, flexDirection: 'column' }}>
        <div style={{ height: '16px', background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 8px', gap: '4px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          <div style={{ margin: '0 auto', width: '30%', height: '4px', background: '#334155' }} />
        </div>
        <div style={{ flex: 1, padding: '8px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
          <div style={{ background: '#000', borderRadius: '2px', padding: '6px', border: '1px solid #334155' }}>
            <div style={{ color: color, fontSize: '6px', fontFamily: 'monospace', lineHeight: 1.5 }}>
              &gt; Init connection...<br/>
              &gt; Server: OK<br/>
              &gt; Tokens: 142<br/>
              &gt; Wait...
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', padding: '4px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                  <div style={{ width: '4px', height: '4px', background: color, borderRadius: '50%' }} />
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Fallback generic UI for other projects
  return (
    <div style={containerStyle}>
      <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ width: '40%', height: '12px', background: color, borderRadius: '2px' }} />
        <div style={{ width: '60%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '8px', padding: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', height: '100%' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }} />
            <div style={{ background: `linear-gradient(135deg, ${color}40, transparent)`, borderRadius: '2px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
