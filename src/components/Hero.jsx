import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { ArrowRight, EyeIcon } from './Icons'
import SocialLinks from './SocialLinks'

const enter = (delay) => ({
  animation: `slideUp 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
  opacity: 0,
})

function useTypewriter(words) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let t
    if (deleting) {
      t =
        text.length > 0
          ? setTimeout(() => setText(word.slice(0, text.length - 1)), 40)
          : setTimeout(() => {
              setDeleting(false)
              setIndex((i) => (i + 1) % words.length)
            }, 200)
    } else {
      t =
        text.length < word.length
          ? setTimeout(() => setText(word.slice(0, text.length + 1)), 80)
          : setTimeout(() => setDeleting(true), 2000)
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words])

  return text
}

// Each letter flips up into place, then bounces individually on hover
function AnimatedWord({ text, delay, className, letterClass = '' }) {
  return (
    <span className={`block ${className}`} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span key={i} className="letter-wrap" style={{ animationDelay: `${delay + i * 0.05}s` }}>
          <span className={`letter ${letterClass}`}>{ch}</span>
        </span>
      ))}
    </span>
  )
}

// Counts up from 0 to a stat like "220" or "8.69"
function CountUp({ value, duration = 1600, startDelay = 900 }) {
  const target = parseFloat(value)
  const decimals = (value.split('.')[1] || '').length
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target)
      return
    }
    let frame
    let start
    const tick = (now) => {
      start ??= now
      const t = Math.min((now - start) / duration, 1)
      setCurrent(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => (frame = requestAnimationFrame(tick)), startDelay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [target, duration, startDelay])

  return current.toFixed(decimals)
}

// Own component so each typed character re-renders only this text, not the whole hero
function TypedRole() {
  return useTypewriter(profile.roles)
}

export default function Hero() {
  const tiltRef = useRef(null)

  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const rx = ((y - r.height / 2) / (r.height / 2)) * -10
      const ry = ((x - r.width / 2) / (r.width / 2)) * 10
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`
    }
    const onLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden hero-gradient-bg">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col order-2 lg:order-1">
            <div className="flex flex-wrap gap-3 mb-8" style={enter(0.2)}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium bg-green-100 border border-green-300 text-green-700 dark:bg-green-500/10 dark:border-green-500/25 dark:text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Seeking AI/ML Opportunities
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium bg-gray-100 border border-gray-200 text-gray-600 dark:bg-white/5 dark:border-white/10 dark:text-white/60">
                🎓 B.E. CSE · 2024 – 2028
              </span>
            </div>

            <h1
              className="font-display font-black tracking-[-0.04em] leading-[0.95] mb-6 select-none"
              style={{ perspective: '600px' }}
              aria-label={`${profile.firstName} ${profile.lastName}`}
            >
              <AnimatedWord
                text={profile.firstName}
                delay={0.3}
                className="text-5xl sm:text-6xl lg:text-7xl text-gray-900 dark:text-white"
              />
              <AnimatedWord
                text={profile.lastName}
                delay={0.3 + profile.firstName.length * 0.05}
                className="text-5xl sm:text-6xl lg:text-7xl pb-2"
                letterClass="gradient-text"
              />
            </h1>

            <div className="mb-8" style={enter(0.45)}>
              <p className="text-base lg:text-lg mb-4 max-w-lg text-balance text-gray-600 dark:text-white/60">{profile.tagline}</p>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-gray-200 shadow-sm dark:shadow-none dark:bg-white/[0.05] dark:border-white/10">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="font-mono text-sm text-primary-600 dark:text-primary-300 min-h-[1.25rem]">
                  <TypedRole />
                  <span className="animate-pulse ml-0.5 text-primary-400">|</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-10" style={enter(0.6)}>
              <a href="#projects" className="magnetic-btn">
                <span>Explore Work</span>
                <ArrowRight />
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="ghost-btn group">
                <EyeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>View Resume</span>
              </a>
              <div className="sm:ml-2">
                <SocialLinks />
              </div>
            </div>

            <div className="flex items-center gap-10" style={enter(0.75)}>
              {profile.stats.map((s) => (
                <div key={s.label} className="group flex flex-col cursor-default">
                  <span className="text-2xl sm:text-3xl font-display font-black tracking-tight text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-primary-500 dark:group-hover:text-primary-300">
                    <CountUp value={s.value} />
                  </span>
                  <span className="text-xs font-medium mt-1 text-gray-500 dark:text-white/40">{s.label}</span>
                  <span className="mt-2 h-[2px] w-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2" style={enter(0.4)}>
            <div className="relative">
              <div className="absolute inset-[-20px] rounded-full animate-glow-pulse" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35), rgba(6,182,212,0.15) 45%, transparent 70%)' }} />
              <div className="absolute inset-[-10px] rounded-full border-2 border-primary-500/10 animate-spin-slow" />
              <div className="absolute inset-[-30px] animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-500 shadow-glow-sm" />
              </div>
              <div className="absolute inset-[-30px] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-cyan shadow-glow-cyan" />
              </div>
              <div
                ref={tiltRef}
                className="group relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden tilt-card p-[4px]"
                style={{ transition: 'transform 0.15s ease-out' }}
              >
                <div className="absolute inset-[-50%] photo-ring" />
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={profile.photo}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    className="w-full h-full object-cover object-[50%_25%] scale-[1.35] origin-[50%_35%] transition-transform duration-700 group-hover:scale-[1.45]"
                    loading="eager"
                  />
                </div>
              </div>

              {profile.heroChips.map((chip, i) => (
                <span
                  key={chip.label}
                  className={`hidden sm:inline-flex absolute ${chip.position} z-20 items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold float-chip border shadow-lg bg-white/95 border-gray-200 text-gray-800 dark:bg-dark-900/90 dark:border-white/10 dark:text-white/90 dark:shadow-glow-sm transition-transform duration-300 hover:!scale-110`}
                  style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${4.5 + i * 0.6}s` }}
                >
                  <span className="text-base">{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3" style={{ animation: 'fadeIn 1s 1.5s forwards', opacity: 0 }}>
        <span className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-white/30">Scroll</span>
        <div className="scroll-indicator" />
      </div>
    </section>
  )
}
