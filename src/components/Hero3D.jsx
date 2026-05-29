import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// Helper function to generate procedural planet textures using Canvas
function createPlanetTexture(type) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  if (type === 'sun') {
    ctx.fillStyle = '#ff9900'
    ctx.fillRect(0, 0, 1024, 512)
    // Sun spots/flares
    for(let i=0; i<800; i++) {
      ctx.fillStyle = `rgba(255, 200, 0, ${Math.random()})`
      ctx.beginPath()
      ctx.arc(Math.random()*1024, Math.random()*512, Math.random()*20, 0, Math.PI*2)
      ctx.fill()
    }
  } else if (type === 'earth') {
    ctx.fillStyle = '#0a2342' // Deep blue ocean
    ctx.fillRect(0, 0, 1024, 512)
    ctx.fillStyle = '#2d5a27' // Green landmasses
    for(let i=0; i<300; i++) {
       const x = Math.random() * 1024
       const y = Math.random() * 512
       const r = Math.random() * 60 + 10
       ctx.beginPath()
       ctx.arc(x, y, r, 0, Math.PI * 2)
       ctx.fill()
    }
    // Clouds layer
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    for(let i=0; i<400; i++) {
       ctx.beginPath()
       ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 30, 0, Math.PI * 2)
       ctx.fill()
    }
  } else if (type === 'mars') {
    ctx.fillStyle = '#c1440e' // Mars red
    ctx.fillRect(0, 0, 1024, 512)
    ctx.fillStyle = '#8b2e05' // Dark craters/valleys
    for(let i=0; i<400; i++) {
       ctx.beginPath()
       ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 40 + 5, 0, Math.PI * 2)
       ctx.fill()
    }
  } else if (type === 'jupiter') {
    for (let y = 0; y < 512; y++) {
      const v = Math.sin(y * 0.05) * Math.cos(y * 0.02)
      const r = Math.floor(180 + v * 30)
      const g = Math.floor(140 + v * 20)
      const b = Math.floor(100 + v * 10)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(0, y, 1024, 1)
      
      // Giant storms
      if (Math.random() > 0.97) {
         ctx.fillStyle = `rgba(140, 70, 40, 0.5)`
         ctx.beginPath()
         ctx.ellipse(Math.random()*1024, y, Math.random()*50+20, Math.random()*20+5, 0, 0, Math.PI*2)
         ctx.fill()
      }
    }
  } else if (type === 'saturn') {
    for (let y = 0; y < 512; y++) {
      const v = Math.sin(y * 0.1)
      const r = Math.floor(210 + v * 20)
      const g = Math.floor(190 + v * 20)
      const b = Math.floor(140 + v * 10)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(0, y, 1024, 1)
    }
  } else if (type === 'venus') {
    for (let y = 0; y < 512; y++) {
      const v = Math.sin(y * 0.03) + Math.cos(y * 0.01)
      const r = Math.floor(230 + v * 15)
      const g = Math.floor(180 + v * 15)
      const b = Math.floor(130 + v * 10)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(0, y, 1024, 1)
    }
  } else if (type === 'mercury') {
    ctx.fillStyle = '#888888'
    ctx.fillRect(0, 0, 1024, 512)
    ctx.fillStyle = '#555555' // Lunar craters
    for(let i=0; i<600; i++) {
       ctx.beginPath()
       ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 15 + 2, 0, Math.PI * 2)
       ctx.fill()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function Sun() {
  const mesh = useRef()
  const texture = useMemo(() => createPlanetTexture('sun'), [])
  useFrame((state) => {
    mesh.current.rotation.y += 0.002
  })
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshBasicMaterial map={texture} color="#ffcc00" />
      {/* Increased light intensity and distance so planets are clearly visible */}
      <pointLight intensity={3.5} distance={200} decay={1.2} color="#fff5cc" />
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
    </mesh>
  )
}

function Planet({ radius, distance, speed, type, ring }) {
  const group = useRef()
  const mesh = useRef()
  const texture = useMemo(() => createPlanetTexture(type), [type])
  
  useFrame((state) => {
    // Orbit rotation around the sun
    group.current.rotation.y += speed
    // Self rotation of the planet
    mesh.current.rotation.y += speed * 2
  })

  return (
    <group ref={group}>
      <group position={[distance, 0, 0]}>
        <mesh ref={mesh}>
          <sphereGeometry args={[radius, 32, 32]} />
          {/* Using meshStandardMaterial with texture */}
          <meshStandardMaterial map={texture} roughness={0.8} metalness={0.1} />
        </mesh>
        {/* Planet ring if it has one (like Saturn) */}
        {ring && (
          <mesh rotation={[Math.PI / 2 + 0.2, 0, 0]}>
            <ringGeometry args={[radius * 1.5, radius * 2.5, 64]} />
            <meshBasicMaterial color={ring} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
      
      {/* Removed orbit path line per request */}
    </group>
  )
}

function Astronaut() {
  const group = useRef()
  const repulsion = useRef(new THREE.Vector3(0,0,0))
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const baseX = Math.sin(t * 0.2) * 8
    const baseY = Math.cos(t * 0.3) * 5 + 3
    const baseZ = Math.cos(t * 0.2) * 8
    
    // Pointer repulsion
    const pointerX = state.pointer.x * 20
    const pointerY = state.pointer.y * 20
    const dx = baseX - pointerX
    const dy = baseY - pointerY
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    let targetRepulsionX = 0
    let targetRepulsionY = 0
    if (dist < 8) {
       const force = (8 - dist) * 0.8
       targetRepulsionX = (dx / dist) * force
       targetRepulsionY = (dy / dist) * force
    }
    
    repulsion.current.x += (targetRepulsionX - repulsion.current.x) * 0.02
    repulsion.current.y += (targetRepulsionY - repulsion.current.y) * 0.02

    group.current.position.x = baseX + repulsion.current.x
    group.current.position.y = baseY + repulsion.current.y
    group.current.position.z = baseZ
    
    group.current.rotation.x = t * 0.5 + repulsion.current.y * 0.2
    group.current.rotation.y = t * 0.3 + repulsion.current.x * 0.2
    group.current.rotation.z = t * 0.2
  })

  return (
    <group ref={group} scale={0.5}>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.8, 0.25]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 1, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#dddddd" />
      </mesh>
      <mesh position={[0.5, 0.1, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.12, 0.5, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.5, 0.1, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.12, 0.5, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.2, -0.8, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.15, 0.6, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.2, -0.8, 0]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.15, 0.6, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function Rocket() {
  const group = useRef()
  const innerGroup = useRef()
  const repulsion = useRef(new THREE.Vector3(0,0,0))

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const baseX = Math.cos(t * 0.4) * 12
    const baseZ = Math.sin(t * 0.4) * 12
    const baseY = Math.sin(t * 1.2) * 3
    
    // Pointer repulsion
    const pointerX = state.pointer.x * 20
    const pointerY = state.pointer.y * 20
    const dx = baseX - pointerX
    const dy = baseY - pointerY
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    let targetRepulsionX = 0
    let targetRepulsionY = 0
    let targetRepulsionZ = 0
    
    if (dist < 10) {
       const force = (10 - dist) * 0.8
       targetRepulsionX = (dx / dist) * force
       targetRepulsionY = (dy / dist) * force
       targetRepulsionZ = force * 0.5 // Push back in depth
    }
    
    repulsion.current.x += (targetRepulsionX - repulsion.current.x) * 0.02
    repulsion.current.y += (targetRepulsionY - repulsion.current.y) * 0.02
    repulsion.current.z += (targetRepulsionZ - repulsion.current.z) * 0.02

    group.current.position.x = baseX + repulsion.current.x
    group.current.position.y = baseY + repulsion.current.y
    group.current.position.z = baseZ + repulsion.current.z
    
    const target = new THREE.Vector3(
      Math.cos((t + 0.1) * 0.4) * 12 + repulsion.current.x,
      Math.sin((t + 0.1) * 1.2) * 3 + repulsion.current.y,
      Math.sin((t + 0.1) * 0.4) * 12 + repulsion.current.z
    )
    group.current.lookAt(target)
    innerGroup.current.rotation.y += 0.1 // Spin along local Y
  })

  return (
    <group ref={group}>
      <group ref={innerGroup} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <coneGeometry args={[0.2, 0.3, 16]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>
        <mesh position={[0.25, -0.4, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.1, 0.3, 0.05]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[-0.25, -0.4, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.1, 0.3, 0.05]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, -0.4, 0.25]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, -0.4, -0.25]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, 0.2, 0.18]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#88ccff" />
        </mesh>
        <mesh position={[0, 0.2, 0.15]}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <coneGeometry args={[0.15, 0.5, 16]} />
          <meshBasicMaterial color="#ff7a17" />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <coneGeometry args={[0.08, 0.3, 16]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      </group>
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 15, 25], fov: 60 }}
      eventSource={document.body}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Stronger ambient light to ensure planets don't look completely black on the dark side */}
      <ambientLight intensity={0.6} color="#ffffff" />
      {/* Directional light to give some highlights from above */}
      <directionalLight position={[10, 20, 15]} intensity={0.8} color="#ffffff" />
      
      {/* Universe stars background */}
      <Stars radius={150} depth={50} count={7000} factor={4} saturation={1} fade speed={1} />
      
      {/* Solar System Group tilted slightly for better viewing angle */}
      <group rotation={[0.15, 0, -0.05]}>
        <Sun />
        {/* Mercury */}
        <Planet radius={0.3} distance={4.5} speed={0.015} type="mercury" />
        {/* Venus */}
        <Planet radius={0.5} distance={7} speed={0.012} type="venus" />
        {/* Earth */}
        <Planet radius={0.6} distance={10} speed={0.01} type="earth" />
        {/* Mars */}
        <Planet radius={0.4} distance={13} speed={0.008} type="mars" />
        {/* Jupiter */}
        <Planet radius={1.4} distance={18} speed={0.004} type="jupiter" />
        {/* Saturn */}
        <Planet radius={1.1} distance={23} speed={0.003} type="saturn" ring="#e3d599" />
        <Astronaut />
        <Rocket />
      </group>
    </Canvas>
  )
}
