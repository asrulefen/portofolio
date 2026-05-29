import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    class Particle {
      constructor(x, y, isExplosion = false) {
        this.x = x
        this.y = y
        this.size = Math.random() * (isExplosion ? 3 : 2) + 1
        
        const angle = Math.random() * Math.PI * 2
        const speed = isExplosion ? (Math.random() * 6 + 2) : (Math.random() * 2)
        
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        
        // Add gravity effect for explosions
        this.gravity = isExplosion ? 0.1 : 0.02
        
        this.life = 1
        this.decay = isExplosion ? (Math.random() * 0.02 + 0.015) : (Math.random() * 0.05 + 0.02)
        
        const colors = ['#ff7a17', '#7c3aed', '#00ff88', '#a0c3ec', '#ffffff']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }
      
      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += this.gravity // Gravity pulling down
        this.life -= this.decay
      }
      
      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = Math.max(0, this.life)
        ctx.fill()
      }
    }

    const createParticles = (x, y, amount, isExplosion) => {
      for (let i = 0; i < amount; i++) {
        particles.push(new Particle(x, y, isExplosion))
      }
    }

    const onMove = (e) => {
      let x = e.clientX || (e.touches && e.touches[0].clientX)
      let y = e.clientY || (e.touches && e.touches[0].clientY)
      if (x && y) {
        pointer.x = x
        pointer.y = y
        // Add firework trail
        createParticles(x, y, 2, false)
      }
    }

    const onClick = (e) => {
      let x = e.clientX || (e.touches && e.touches[0].clientX) || pointer.x
      let y = e.clientY || (e.touches && e.touches[0].clientY) || pointer.y
      // Add explosion
      createParticles(x, y, 40, true)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('click', onClick)
    window.addEventListener('touchstart', onClick, { passive: true })

    let raf
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.update()
        p.draw(ctx)
        if (p.life <= 0) {
          particles.splice(i, 1)
        }
      }
      
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(animate)
    }
    
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('touchstart', onClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999
      }}
    />
  )
}
