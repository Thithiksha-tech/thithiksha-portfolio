import { useEffect, useRef } from 'react'

const HOVER_TARGETS = 'a, button, input, textarea, [role="button"], .glass-card'

export function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('custom-cursor-active')
    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let frame = 0

    // Ring eases toward the pointer; the loop stops once it has caught up
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2
      pos.y += (target.y - pos.y) * 0.2
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      if (!frame) frame = requestAnimationFrame(tick)
    }
    // Event delegation, so elements rendered later get the hover effect too
    const onOver = (e) => {
      const hovering = !!e.target.closest?.(HOVER_TARGETS)
      dot.classList.toggle('hovering', hovering)
      ring.classList.toggle('hovering', hovering)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(frame)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" style={{ transform: 'translate3d(-100px, -100px, 0)' }} />
      <div ref={ringRef} className="cursor-ring hidden md:block" style={{ transform: 'translate3d(-100px, -100px, 0)' }} />
    </>
  )
}

const LINK_DISTANCE = 120

export function Particles({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    const dark = theme === 'dark'
    let frame = 0
    let mouse = { x: -1000, y: -1000 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    const onMouse = (e) => {
      mouse = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse, { passive: true })

    const count = Math.min(45, Math.floor(window.innerWidth / 28))
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }))
    const maxSq = LINK_DISTANCE * LINK_DISTANCE

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // All dots in one path, all links in one path: two draw calls per frame
      ctx.beginPath()
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dSq = dx * dx + dy * dy
        if (dSq < 14400 && dSq > 0) {
          const d = Math.sqrt(dSq)
          const f = (120 - d) / 120
          p.x += (dx / d) * f * 2
          p.y += (dy / d) * f * 2
        }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.moveTo(p.x + p.size, p.y)
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      }
      ctx.fillStyle = dark ? 'rgba(129, 140, 248, 0.45)' : 'rgba(99, 102, 241, 0.25)'
      ctx.fill()

      ctx.beginPath()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          if (dx * dx + dy * dy < maxSq) {
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
          }
        }
      }
      ctx.strokeStyle = dark ? 'rgba(99, 102, 241, 0.09)' : 'rgba(99, 102, 241, 0.06)'
      ctx.lineWidth = 0.6
      ctx.stroke()

      frame = requestAnimationFrame(draw)
    }
    // Stop drawing while the tab is hidden
    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [theme])

  return <canvas ref={canvasRef} id="particle-canvas" />
}

export function ReadingProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <div ref={barRef} className="reading-progress" style={{ transform: 'scaleX(0)' }} />
}

// Pointer-driven hover effects, wired once via event delegation:
// spotlight on .glass-card, 3D tilt on [data-tilt], magnetic pull on .magnetic-btn
export function useHoverEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return

    let tiltEl = null
    let magnetEl = null
    const release = (el) => {
      if (!el) return
      el.style.transition = ''
      el.style.transform = ''
    }

    let frame = 0
    let last = null

    // At most once per frame; all layout reads happen before any style writes
    const apply = () => {
      frame = 0
      if (!last) return
      const { x, y, target } = last

      const card = target?.closest('.glass-card') || null
      const tilt = target?.closest('[data-tilt]') || null
      const magnet = target?.closest('.magnetic-btn') || null
      const cardRect = card?.getBoundingClientRect()
      const tiltRect = tilt?.getBoundingClientRect()
      const magnetRect = magnet?.getBoundingClientRect()

      if (card) {
        card.style.setProperty('--mx', `${x - cardRect.left}px`)
        card.style.setProperty('--my', `${y - cardRect.top}px`)
      }

      if (tiltEl !== tilt) release(tiltEl)
      tiltEl = tilt
      if (tilt) {
        const px = (x - tiltRect.left) / tiltRect.width - 0.5
        const py = (y - tiltRect.top) / tiltRect.height - 0.5
        tilt.style.transition = 'transform 0.12s ease-out'
        tilt.style.transform = `perspective(1000px) rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-6px)`
      }

      if (magnetEl !== magnet) release(magnetEl)
      magnetEl = magnet
      if (magnet) {
        const dx = x - (magnetRect.left + magnetRect.width / 2)
        const dy = y - (magnetRect.top + magnetRect.height / 2)
        magnet.style.transition = 'transform 0.15s ease-out'
        magnet.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.3).toFixed(1)}px)`
      }
    }
    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY, target: e.target instanceof Element ? e.target : null }
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      last = null
      release(tiltEl)
      release(magnetEl)
      tiltEl = magnetEl = null
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])
}

export function Loader({ name, exiting }) {
  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-white dark:bg-dark-950 ${exiting ? 'loader-exit' : ''}`}
    >
      <div className="absolute inset-0 hero-gradient-bg" />
      <div className="relative flex flex-col items-center gap-7">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-primary-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-full p-[3px] overflow-hidden">
            <div className="absolute inset-[-50%] photo-ring" />
            <div className="relative w-full h-full rounded-full bg-white dark:bg-dark-950 flex items-center justify-center">
              <span className="font-display font-black text-2xl gradient-text">TA</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[2px]">
          {name.split('').map((ch, i) => (
            <span
              key={i}
              className={`${exiting ? 'inline-block' : 'loader-letter'} text-3xl font-display font-black tracking-wider text-gray-900 dark:text-white`}
              style={exiting ? undefined : { animationDelay: `${0.15 + i * 0.07}s` }}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>
        <div className="w-48 h-[3px] rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
          <div className={`${exiting ? '' : 'loader-bar'} h-full w-full bg-gradient-to-r from-primary-500 via-accent-cyan to-accent-violet`} />
        </div>
      </div>
    </div>
  )
}
