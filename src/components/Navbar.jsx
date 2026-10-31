import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/portfolio'
import { ArrowRight, CloseIcon } from './Icons'

export default function Navbar({ theme, toggleTheme }) {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 50)
      let current = 'hero'
      for (const { id } of navItems) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) current = id
      }
      setActive(current)
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
          scrolled
            ? 'py-3 backdrop-blur-2xl border-b shadow-lg shadow-black/5 bg-gray-50/85 border-gray-200/60 dark:bg-dark-950/80 dark:border-white/[0.06]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shadow-glow-sm transition-all duration-500 group-hover:shadow-glow group-hover:rotate-[360deg] group-hover:scale-110">
              <span className="text-white font-display font-bold text-sm">{profile.initials}</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight hidden sm:block text-gray-900 dark:text-white">
              {profile.firstName} <span className="gradient-text">{profile.lastName}</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={`nav-link ${active === item.id ? 'active' : ''}`}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="theme-toggle-track" aria-label="Toggle theme">
              <div className="theme-toggle-thumb" />
              <span className="absolute left-[6px] top-1/2 -translate-y-1/2 text-xs">{theme === 'dark' ? '' : '🌙'}</span>
              <span className="absolute right-[6px] top-1/2 -translate-y-1/2 text-xs">{theme === 'dark' ? '☀️' : ''}</span>
            </button>
            <a href="#contact" className="hidden sm:inline-flex magnetic-btn text-xs">
              <span>Let's Connect</span>
              <ArrowRight />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center glass"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className="w-5 h-0.5 rounded-full bg-gray-900 dark:bg-white" />
                <span className="w-5 h-0.5 rounded-full bg-gray-900 dark:bg-white" />
                <span className="w-5 h-0.5 rounded-full bg-gray-900 dark:bg-white" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-nav-overlay">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center text-gray-900 dark:text-white"
            aria-label="Close menu"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center gap-2">
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="mobile-nav-link"
                style={{ animation: `slideUp 0.5s ${i * 0.08}s cubic-bezier(0.22, 1, 0.36, 1) forwards`, opacity: 0 }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
