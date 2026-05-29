import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple Audio Synthesizer for Retro Sounds
class SoundManager {
  constructor() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.ctx.destination);
      this.isReady = true;
    } catch (e) {
      this.isReady = false;
    }
    
    this.bgm = new Audio('/musik-game.mp3');
    this.bgm.loop = true;
    this.bgm.volume = 0;
    this.fadeInterval = null;
  }

  playBGM() {
    this.bgm.play().catch(e => console.log('BGM play blocked:', e));
    this.fadeBGM(0.4, 1000); // Fade in to 0.4 volume over 1s
  }

  pauseBGM() {
    this.fadeBGM(0, 1000, () => {
      this.bgm.pause();
    });
  }

  fadeBGM(targetVolume, durationMs, callback) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const startVolume = this.bgm.volume;
    const steps = 20;
    const stepTime = durationMs / steps;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;
    
    this.fadeInterval = setInterval(() => {
      currentStep++;
      let newVol = startVolume + (volumeStep * currentStep);
      newVol = Math.max(0, Math.min(1, newVol));
      this.bgm.volume = newVol;
      
      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
        this.bgm.volume = targetVolume;
        if (callback) callback();
      }
    }, stepTime);
  }

  resume() {
    if (this.isReady && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playLaser() {
    if (!this.isReady) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playEnemyLaser() {
    if (!this.isReady) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playExplosion(isPlayer = false) {
    if (!this.isReady) return;
    const bufferSize = this.ctx.sampleRate * (isPlayer ? 1.0 : 0.4);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isPlayer ? 500 : 1000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + (isPlayer ? 1.0 : 0.4));
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(isPlayer ? 0.8 : 0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + (isPlayer ? 1.0 : 0.4));
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start();
  }

  playPowerup() {
    if (!this.isReady) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(1200, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
}

export default function SpaceShooter() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const images = useRef({});
  
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showPauseUI, setShowPauseUI] = useState(false);
  
  // Audio manager instance
  const soundManager = useRef(null);
  const isPaused = useRef(false);
  
  // Load Highscore and Images
  useEffect(() => {
    const saved = localStorage.getItem('spaceShooterHighscore');
    if (saved) setHighScore(parseInt(saved));

    const loadImg = (key, src) => {
      const img = new Image();
      img.src = src;
      images.current[key] = img;
    };
    loadImg('player', '/pesawat/pesawat kita.png');
    loadImg('enemy1', '/pesawat/musuh 1.png');
    loadImg('enemy2', '/pesawat/musuh 2.png');
    loadImg('enemy3', '/pesawat/musuh 3.png');
    loadImg('enemy4', '/pesawat/musuh 4.png');
    loadImg('enemy5', '/pesawat/musuh 5.png');
    loadImg('enemy6', '/pesawat/musuh 6.png');
  }, []);

  const startGame = () => {
    if (!soundManager.current) {
      soundManager.current = new SoundManager();
    }
    soundManager.current.resume();
    soundManager.current.playBGM();
    setScore(0);
    isPaused.current = false;
    setShowPauseUI(false);
    setGameState('PLAYING');

    // Auto-scroll to fit game exactly below navbar
    setTimeout(() => {
      if (containerRef.current) {
        const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  // IntersectionObserver for auto-pause
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (gameState === 'PLAYING') {
          if (!entry.isIntersecting) {
            isPaused.current = true;
            setShowPauseUI(true);
            if (soundManager.current) {
               soundManager.current.pauseBGM();
               if (soundManager.current.ctx.state === 'running') {
                 soundManager.current.ctx.suspend();
               }
            }
          } else {
            isPaused.current = false;
            setShowPauseUI(false);
            if (soundManager.current) {
               soundManager.current.resume();
               soundManager.current.playBGM();
            }
          }
        }
      });
    }, { threshold: 0.1 }); // Trigger when less than 10% is visible
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [gameState]);

  // Background Animation for START and GAMEOVER screens
  useEffect(() => {
    if (gameState === 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = performance.now();

    const parent = containerRef.current;
    const resizeCanvas = () => {
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let stars = Array.from({length: 100}).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 2 + 0.5
    }));
    
    let dummyEnemies = [];
    let dummyBullets = [];
    let dummyParticles = [];
    let spawnTimer = 0;
    
    let dummyPlayer = {
      x: canvas.width / 2,
      y: canvas.height - 80,
      fireCooldown: 0,
      direction: 1
    };

    const drawImageCenter = (ctx, img, x, y, width, height, rotation = 0) => {
      if (img && img.complete && img.naturalWidth !== 0) {
        if (rotation !== 0) {
          ctx.save(); ctx.translate(x, y); ctx.rotate(rotation);
          ctx.drawImage(img, -width/2, -height/2, width, height); ctx.restore();
        } else {
          ctx.drawImage(img, x - width/2, y - height/2, width, height);
        }
      }
    };

    const update = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      if (!dt || dt > 0.1) {
        animationFrameId = requestAnimationFrame(update);
        return; 
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
        ctx.globalAlpha = s.size / 2;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });
      ctx.globalAlpha = 1.0;

      // Spawn Dummy Enemies
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        dummyEnemies.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -40,
          speed: 100 + Math.random() * 100,
          wiggleSpeed: 50 + Math.random() * 100,
          imgKey: `enemy${Math.floor(Math.random() * 6) + 1}`,
          id: Math.random() * 1000
        });
        spawnTimer = 0.8; // spawn rapidly for attract mode
      }

      // Update Dummy Player
      dummyPlayer.y = canvas.height - 80; // Keep attached to bottom on resize
      dummyPlayer.x += 200 * dt * dummyPlayer.direction;
      if (dummyPlayer.x < 40) { dummyPlayer.x = 40; dummyPlayer.direction = 1; }
      if (dummyPlayer.x > canvas.width - 40) { dummyPlayer.x = canvas.width - 40; dummyPlayer.direction = -1; }
      if (Math.random() < 0.01) dummyPlayer.direction *= -1; // random turn
      
      dummyPlayer.fireCooldown -= dt;
      if (dummyPlayer.fireCooldown <= 0) {
         dummyBullets.push({ x: dummyPlayer.x - 10, y: dummyPlayer.y - 30, vy: -700 });
         dummyBullets.push({ x: dummyPlayer.x + 10, y: dummyPlayer.y - 30, vy: -700 });
         dummyPlayer.fireCooldown = 0.2;
      }
      
      drawImageCenter(ctx, images.current['player'], dummyPlayer.x, dummyPlayer.y, 60, 60);

      // Update Dummy Bullets
      for (let i = dummyBullets.length - 1; i >= 0; i--) {
        let b = dummyBullets[i];
        b.y += b.vy * dt;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(b.x - 2, b.y - 8, 4, 16);
        if (b.y < -50) dummyBullets.splice(i, 1);
      }

      // Update & Draw Dummy Enemies with Collision
      for (let i = dummyEnemies.length - 1; i >= 0; i--) {
         let e = dummyEnemies[i];
         e.y += e.speed * dt;
         e.x += Math.sin(time/300 + e.id) * e.wiggleSpeed * dt;
         
         let hit = false;
         for (let j = dummyBullets.length - 1; j >= 0; j--) {
           let b = dummyBullets[j];
           if (Math.abs(b.x - e.x) < 25 && Math.abs(b.y - e.y) < 25) {
             dummyBullets.splice(j, 1);
             hit = true;
             break;
           }
         }

         if (hit) {
           for(let p=0; p<8; p++) {
             dummyParticles.push({
               x: e.x, y: e.y,
               vx: (Math.random()-0.5)*300, vy: (Math.random()-0.5)*300,
               life: 1.0, color: '#ef4444'
             });
           }
           dummyEnemies.splice(i, 1);
           continue;
         }

         drawImageCenter(ctx, images.current[e.imgKey], e.x, e.y, 40, 40, Math.PI);
         if (e.y > canvas.height + 50) dummyEnemies.splice(i, 1);
      }

      // Update Dummy Particles
      for (let i = dummyParticles.length - 1; i >= 0; i--) {
        let p = dummyParticles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 2;
        if (p.life <= 0) {
          dummyParticles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameState]);

  // Main Game Loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = performance.now();

    const parent = containerRef.current;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    // Game Entities
    const player = {
      x: canvas.width / 2,
      y: canvas.height - 80,
      w: 60, h: 60, // size for our ship image
      weaponType: 1, // 1 to 10
      fireCooldown: 0,
      targetX: canvas.width / 2,
      targetY: canvas.height - 80,
      isExploding: false
    };

    const resizeCanvas = () => {
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        player.y = Math.min(player.y, canvas.height - 60);
        player.x = Math.min(player.x, canvas.width - 40);
      }
    };
    window.addEventListener('resize', resizeCanvas);

    let bullets = [];
    let enemyBullets = [];
    let enemies = [];
    let particles = [];
    let powerups = [];
    let stars = Array.from({length: 100}).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 2 + 0.5
    }));

    let currentScore = 0;
    let enemySpawnTimer = 0;
    let globalTime = 0; // For sine waves

    // Input Handling
    const handleMove = (x, y) => {
      const rect = canvas.getBoundingClientRect();
      player.targetX = x - rect.left;
      player.targetY = y - rect.top;
    };
    
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      e.preventDefault(); 
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchstart', onTouchMove, { passive: false });

    // Drawing Helpers
    const drawImageCenter = (ctx, img, x, y, width, height, rotation = 0) => {
      if (img && img.complete && img.naturalWidth !== 0) {
        if (rotation !== 0) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotation);
          ctx.drawImage(img, -width/2, -height/2, width, height);
          ctx.restore();
        } else {
          ctx.drawImage(img, x - width/2, y - height/2, width, height);
        }
      } else {
        // Fallback if image fails to load
        ctx.fillStyle = '#ff00ff';
        ctx.fillRect(x - width/2, y - height/2, width, height);
      }
    };

    const createExplosion = (x, y, color, count) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1.0,
          color,
          size: Math.random() * 4 + 2
        });
      }
    };

    const triggerGameOver = () => {
       player.isExploding = true;
       soundManager.current?.playExplosion(true);
       soundManager.current?.pauseBGM();
       createExplosion(player.x, player.y, '#00ff88', 30);
       createExplosion(player.x, player.y, '#ff7a17', 50);
       
       setTimeout(() => {
         setScore(currentScore);
         setGameState('GAMEOVER');
         setHighScore(prev => {
           const nw = Math.max(prev, currentScore);
           localStorage.setItem('spaceShooterHighscore', nw);
           return nw;
         });
       }, 1500);
    };

    // Main Game Loop
    const update = (time) => {
      if (isPaused.current) {
        lastTime = time; // keep time updated so dt doesn't explode when unpaused
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      const dt = (time - lastTime) / 1000;
      lastTime = time;
      
      if (!dt || dt > 0.1) {
        animationFrameId = requestAnimationFrame(update);
        return; 
      }
      globalTime += dt;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
        ctx.globalAlpha = s.size / 2;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });
      ctx.globalAlpha = 1.0;

      if (!player.isExploding) {
        // Smooth follow pointer
        player.x += (player.targetX - player.x) * 12 * dt;
        player.y += (player.targetY - player.y) * 12 * dt;

        // Auto Fire Weapons (10 Types)
        player.fireCooldown -= dt;
        if (player.fireCooldown <= 0) {
          soundManager.current?.playLaser();
          let baseCooldown = 0.2;
          
          switch(player.weaponType) {
            case 1: // Single
              bullets.push({ x: player.x, y: player.y - 30, vx: 0, vy: -700, color: '#ffffff' });
              break;
            case 2: // Double
              bullets.push({ x: player.x - 15, y: player.y - 20, vx: 0, vy: -700, color: '#ffffff' });
              bullets.push({ x: player.x + 15, y: player.y - 20, vx: 0, vy: -700, color: '#ffffff' });
              break;
            case 3: // Triple Spread
              bullets.push({ x: player.x, y: player.y - 30, vx: 0, vy: -700, color: '#ffffff' });
              bullets.push({ x: player.x - 15, y: player.y - 20, vx: -150, vy: -650, color: '#ffffff' });
              bullets.push({ x: player.x + 15, y: player.y - 20, vx: 150, vy: -650, color: '#ffffff' });
              break;
            case 4: // Quad Spread
              bullets.push({ x: player.x - 10, y: player.y - 20, vx: -50, vy: -680, color: '#ffffff' });
              bullets.push({ x: player.x + 10, y: player.y - 20, vx: 50, vy: -680, color: '#ffffff' });
              bullets.push({ x: player.x - 20, y: player.y - 15, vx: -200, vy: -600, color: '#ffffff' });
              bullets.push({ x: player.x + 20, y: player.y - 15, vx: 200, vy: -600, color: '#ffffff' });
              break;
            case 5: // Minigun
              bullets.push({ x: player.x + (Math.random()*20-10), y: player.y - 30, vx: (Math.random()*60-30), vy: -800, color: '#ffffff' });
              baseCooldown = 0.06;
              break;
            case 6: // Side & Front
              bullets.push({ x: player.x, y: player.y - 30, vx: 0, vy: -700, color: '#ffffff' });
              bullets.push({ x: player.x - 30, y: player.y, vx: -500, vy: 0, color: '#ffffff' });
              bullets.push({ x: player.x + 30, y: player.y, vx: 500, vy: 0, color: '#ffffff' });
              break;
            case 7: // Backward & Forward
              bullets.push({ x: player.x, y: player.y - 30, vx: 0, vy: -700, color: '#ffffff' });
              bullets.push({ x: player.x - 20, y: player.y + 20, vx: -150, vy: 500, color: '#ffffff' });
              bullets.push({ x: player.x + 20, y: player.y + 20, vx: 150, vy: 500, color: '#ffffff' });
              break;
            case 8: // Shotgun Burst
              for(let i=0; i<6; i++) {
                 bullets.push({ x: player.x, y: player.y - 30, vx: (Math.random()-0.5)*400, vy: -500 - Math.random()*200, color: '#ffffff' });
              }
              baseCooldown = 0.5;
              break;
            case 9: // Death Blossom Circle
              for(let i=0; i<8; i++) {
                 const angle = (Math.PI*2/8) * i;
                 bullets.push({ x: player.x, y: player.y, vx: Math.cos(angle)*400, vy: Math.sin(angle)*400, color: '#ffffff' });
              }
              baseCooldown = 0.6;
              break;
            case 10: // Laser Stream
              bullets.push({ x: player.x - 8, y: player.y - 30, vx: 0, vy: -900, color: '#ffffff' });
              bullets.push({ x: player.x + 8, y: player.y - 30, vx: 0, vy: -900, color: '#ffffff' });
              baseCooldown = 0.03;
              break;
            default:
              bullets.push({ x: player.x, y: player.y - 30, vx: 0, vy: -700, color: '#ffffff' });
          }
          player.fireCooldown = baseCooldown;
        }
        
        // Draw Player Ship
        drawImageCenter(ctx, images.current['player'], player.x, player.y, player.w, player.h);
      }

      // Update Player Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        let b = bullets[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - 2, b.y - 8, 4, 16);
        if (b.y < -50 || b.y > canvas.height + 50 || b.x < -50 || b.x > canvas.width + 50) bullets.splice(i, 1);
      }

      // Update Enemy Bullets
      for (let i = enemyBullets.length - 1; i >= 0; i--) {
        let eb = enemyBullets[i];
        eb.x += eb.vx * dt;
        eb.y += eb.vy * dt;
        ctx.fillStyle = eb.color;
        ctx.beginPath();
        ctx.arc(eb.x, eb.y, 4, 0, Math.PI*2);
        ctx.fill();
        
        // Check player hit
        if (!player.isExploding && Math.abs(eb.x - player.x) < player.w/3 && Math.abs(eb.y - player.y) < player.h/3) {
           triggerGameOver();
           enemyBullets.splice(i, 1);
        } else if (eb.y > canvas.height + 50) {
           enemyBullets.splice(i, 1);
        }
      }

      // Spawn Enemies
      enemySpawnTimer -= dt;
      if (enemySpawnTimer <= 0 && !player.isExploding) {
        const typeIndex = Math.floor(Math.random() * 6) + 1; // 1 to 6
        const imgKey = `enemy${typeIndex}`;
        
        enemies.push({
          id: Math.random() * 1000,
          x: Math.random() * (canvas.width - 40) + 20,
          y: -40,
          imgKey,
          w: 40, h: 40, // Smaller than player (60x60)
          hp: typeIndex > 3 ? 3 : 1, // Higher index enemies are tougher
          speed: 100 + Math.random() * 80,
          wiggleSpeed: 50 + Math.random() * 100, // Horizontal sine speed
          scoreVal: typeIndex * 10,
          fireCooldown: Math.random() * 2 + 1 // Shoots every 1-3 seconds
        });
        
        enemySpawnTimer = Math.max(0.3, 1.2 - (currentScore * 0.0005));
      }

      // Update Enemies & Collision
      for (let i = enemies.length - 1; i >= 0; i--) {
        let e = enemies[i];
        
        // Movement: Down + ZigZag
        e.y += e.speed * dt;
        e.x += Math.sin(globalTime * 2 + e.id) * e.wiggleSpeed * dt;
        
        // Bounds check for X
        if (e.x < 20) e.x = 20;
        if (e.x > canvas.width - 20) e.x = canvas.width - 20;

        // Enemy Shooting
        e.fireCooldown -= dt;
        if (e.fireCooldown <= 0) {
           enemyBullets.push({ x: e.x, y: e.y + 20, vx: 0, vy: e.speed + 200, color: '#ff2222' });
           soundManager.current?.playEnemyLaser();
           e.fireCooldown = Math.random() * 2 + 1.5;
        }

        // Rotate enemy by 180 degrees (Math.PI) as requested
        drawImageCenter(ctx, images.current[e.imgKey], e.x, e.y, e.w, e.h, Math.PI);

        // Check bullet hit
        for (let j = bullets.length - 1; j >= 0; j--) {
          let b = bullets[j];
          // We don't just check vy < 0 because weapons shoot everywhere
          if (Math.abs(b.x - e.x) < e.w/2 + 5 && Math.abs(b.y - e.y) < e.h/2 + 5) {
            e.hp--;
            bullets.splice(j, 1);
            createExplosion(b.x, b.y, '#ffffff', 5);
            break;
          }
        }

        // Check player crash
        if (!player.isExploding && Math.abs(player.x - e.x) < (e.w+player.w)/3 && Math.abs(player.y - e.y) < (e.h+player.h)/3) {
           triggerGameOver();
        }

        if (e.hp <= 0) {
          soundManager.current?.playExplosion();
          createExplosion(e.x, e.y, '#ef4444', 20);
          currentScore += e.scoreVal;
          setScore(currentScore); 
          
          // Drop random weapon powerup (15% chance)
          if (Math.random() < 0.15) {
            const randomWeapon = Math.floor(Math.random() * 10) + 1;
            powerups.push({ x: e.x, y: e.y, vy: 80, type: randomWeapon });
          }
          
          enemies.splice(i, 1);
        } else if (e.y > canvas.height + 50) {
          enemies.splice(i, 1);
        }
      }

      // Update Powerups
      for (let i = powerups.length - 1; i >= 0; i--) {
        let p = powerups[i];
        p.y += p.vy * dt;
        
        // Save state for spinning object
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(globalTime * 2); // Spin effect
        
        // Glowing aura
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsl(${(globalTime * 200) % 360}, 100%, 60%)`;
        
        // Draw sharp diamond/crystal shape
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(12, 0);
        ctx.lineTo(0, 16);
        ctx.lineTo(-12, 0);
        ctx.closePath();
        
        // Fill with dynamic color and white border
        ctx.fillStyle = `hsl(${(globalTime * 300) % 360}, 100%, 50%)`;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        
        ctx.restore();

        // Draw 'W' text that stays upright
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 14px var(--font-mono)';
        // Tiny dark outline for text readability
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#000000';
        ctx.fillText('W', p.x, p.y);
        ctx.shadowBlur = 0; // reset shadow

        if (!player.isExploding && Math.abs(player.x - p.x) < 30 && Math.abs(player.y - p.y) < 30) {
          soundManager.current?.playPowerup();
          player.weaponType = p.type;
          currentScore += 100;
          powerups.splice(i, 1);
          createExplosion(p.x, p.y, '#00ff88', 20);
        } else if (p.y > canvas.height + 50) {
          powerups.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 1.5;
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // Draw UI Score
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.font = '16px var(--font-mono)';
      ctx.fillText(`SCORE: ${currentScore}`, 20, 30);
      
      ctx.fillStyle = '#00ff88';
      ctx.fillText(`WEAPON: TYPE ${player.weaponType}`, 20, 55);

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchMove);
    };
  }, [gameState]);

  return (
    <section id="space-shooter" data-section="game" style={{ padding: '0', margin: '0', position: 'relative' }}>
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '100vh',
          minHeight: '600px',
          background: 'linear-gradient(180deg, #050505 0%, #1a0b2e 30%, #1a0b2e 70%, #050505 100%)',
          position: 'relative',
          overflow: 'hidden',
          touchAction: gameState === 'PLAYING' ? 'none' : 'auto' // Allow scroll when not playing
        }}
      >
        <canvas 
          ref={canvasRef}
          style={{ 
            display: 'block', 
            width: '100%', 
            height: '100%',
            cursor: gameState === 'PLAYING' ? 'crosshair' : 'default'
          }}
        />

        <AnimatePresence>
          {gameState === 'START' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
                textAlign: 'center', padding: '20px'
              }}
            >
              <h3 style={{ fontSize: 'clamp(24px, 8vw, 40px)', marginBottom: '8px', fontFamily: 'var(--font-cyber)', color: 'var(--accent)' }}>
                COSMIC DEFENDER
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', marginBottom: '24px', color: 'var(--body)' }}>
                High Score: {highScore}
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-pill filled" 
                onClick={startGame}
                style={{ fontSize: '16px', padding: '16px 32px' }}
              >
                START MISSION
              </motion.button>
            </motion.div>
          )}

          {gameState === 'GAMEOVER' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(239, 68, 68, 0.1)', backdropFilter: 'blur(8px)',
                textAlign: 'center', padding: '20px'
              }}
            >
              <h3 style={{ fontSize: 'clamp(28px, 10vw, 48px)', marginBottom: '8px', fontFamily: 'var(--font-cyber)', color: '#ef4444', lineHeight: 1.2 }}>
                MISSION<br/>FAILED
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', margin: '16px 0 8px' }}>
                SCORE: <span style={{ color: 'var(--accent)' }}>{score}</span>
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', marginBottom: '32px', color: 'var(--mute)' }}>
                HIGH SCORE: {highScore}
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-pill filled" 
                onClick={startGame}
              >
                TRY AGAIN
              </motion.button>
            </motion.div>
          )}

          {gameState === 'PLAYING' && showPauseUI && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)',
                zIndex: 20
              }}
            >
              <h3 style={{ fontSize: '32px', color: '#fff', fontFamily: 'var(--font-cyber)', letterSpacing: '4px' }}>PAUSED</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
