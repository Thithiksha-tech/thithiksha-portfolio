import { useEffect, useState } from 'react'
import { profile } from './data/portfolio'
import { CustomCursor, Loader, Particles, ReadingProgress, useHoverEffects } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsMarquee from './components/SkillsMarquee'
import Manifesto from './components/Manifesto'
import SpaceBackground from './components/SpaceBackground'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

const REVEAL_SELECTOR = ['.reveal-up', '.reveal-left', '.reveal-right', '.reveal-scale'].map((c) => `${c}:not(.revealed)`).join(', ')

// Fade sections in as they scroll into view; also picks up elements added later (filters)
function useScrollReveal(ready) {
  useEffect(() => {
    if (!ready) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const delay = parseInt(entry.target.dataset.delay || '0', 10)
          setTimeout(() => entry.target.classList.add('revealed'), delay)
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )
    const observeAll = () => document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => io.observe(el))
    observeAll()
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [ready])
}

// Smooth-scroll in-page anchors with an offset for the fixed navbar
function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href')
      if (!href || !href.startsWith('#') || href.length < 2) return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

export default function App() {
  const [theme, setTheme] = useState(() => (document.documentElement.classList.contains('dark') ? 'dark' : 'light'))
  // 'loading' → 'exiting' (page mounts while the loader curtain lifts) → 'done'
  const [phase, setPhase] = useState('loading')

  useScrollReveal(phase !== 'loading')
  useAnchorScroll()
  useHoverEffects()

  useEffect(() => {
    const exit = setTimeout(() => setPhase('exiting'), 1500)
    const done = setTimeout(() => setPhase('done'), 2300)
    return () => {
      clearTimeout(exit)
      clearTimeout(done)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('portfolio-theme', next)
    } catch {
      // storage unavailable (private mode) — theme still applies for this visit
    }
  }

  const loaderName = `${profile.firstName} ${profile.lastName}`.toUpperCase()
  if (phase === 'loading') return <Loader name={loaderName} />

  return (
    <div className="min-h-screen relative text-gray-900 dark:text-white transition-colors duration-500">
      {phase === 'exiting' && <Loader name={loaderName} exiting />}
      <CustomCursor />
      <SpaceBackground />
      <Particles theme={theme} />
      <ReadingProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="relative z-[2]">
        <Hero />
        <SkillsMarquee />
        <Manifesto />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
