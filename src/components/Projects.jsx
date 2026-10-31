import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { projects } from '../data/portfolio'
import { ArrowRight, CloseIcon, GitHubIcon } from './Icons'
import { projectVisuals } from './ProjectVisuals'

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Portal to <body> so the modal sits above the fixed navbar
  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border bg-white border-gray-200 text-gray-900 dark:bg-dark-900 dark:border-white/10 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{project.icon}</span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-500/20 dark:text-primary-300 dark:border-primary-500/30">
            {project.badge}
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold mb-1 pr-10">{project.title}</h3>
        <p className="text-sm font-semibold mb-4 text-primary-600 dark:text-accent-cyan">{project.subtitle}</p>
        <p className="text-sm sm:text-base leading-relaxed mb-6 text-gray-600 dark:text-white/70">{project.tagline}</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {project.facts.map((f) => (
            <div key={f.label} className="p-3 rounded-2xl border text-center bg-gray-50 border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.08]">
              <div className="text-base sm:text-lg font-bold font-display gradient-text">{f.value}</div>
              <div className="text-[10px] sm:text-[11px] font-mono uppercase text-gray-500 dark:text-white/40">{f.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-mono uppercase tracking-wider mb-4 text-primary-600 dark:text-primary-400">What I Built</h4>
          <div className="space-y-3">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                <p className="text-sm leading-relaxed text-gray-700 dark:text-white/80">{h}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider mb-3 text-gray-400 dark:text-white/40">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-xl border bg-gray-100 border-gray-300 text-gray-800 dark:bg-white/[0.05] dark:border-white/10 dark:text-white/80">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-white/[0.08]">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="magnetic-btn">
            <GitHubIcon />
            <span>View on GitHub</span>
          </a>
          <button onClick={onClose} className="ghost-btn text-xs !py-2.5 !px-5">
            Close Details
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function ProjectPanel({ project, index, onOpen }) {
  const Visual = projectVisuals[project.id]
  return (
    <article className="glass-card group shrink-0 w-full lg:w-[min(1080px,80vw)] lg:h-[min(calc(100vh-190px),600px)] grid lg:grid-cols-[1.15fr_1fr] overflow-hidden">
      <div className={`relative overflow-hidden min-h-[360px] sm:min-h-[400px] lg:min-h-0 bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_65%)]" />
        {Visual && <Visual />}
      </div>

      <div className="relative z-[2] p-6 sm:p-8 flex flex-col">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-white/45">
          <span>
            #{String(index + 1).padStart(2, '0')} — {project.badge}
          </span>
          <span className="text-2xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">{project.icon}</span>
        </div>

        <h3 className="manifesto-line mt-4 text-4xl sm:text-5xl text-gray-900 dark:text-white">{project.title}</h3>
        <p className="mt-1 text-sm font-semibold text-primary-600 dark:text-accent-cyan">{project.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-white/70">{project.description}</p>
        <p className="mt-3 flex gap-2.5 text-sm [@media(max-height:820px)]:hidden leading-relaxed text-gray-600 dark:text-white/70">
          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-accent-cyan" />
          {project.highlights[1]}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md border bg-gray-100 border-gray-200 text-gray-700 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-white/65">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex flex-wrap items-center gap-3 border-t border-dashed border-gray-300 dark:border-white/15">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="magnetic-btn !py-3 !px-5 text-xs">
            <GitHubIcon />
            <span>Source Code</span>
          </a>
          <button onClick={() => onOpen(project)} className="ghost-btn !py-3 !px-5 text-xs">
            <span>Project Details</span>
            <ArrowRight />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [active, setActive] = useState(0)
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Desktop: pin the section and translate the track sideways as the page scrolls
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    if (!wide) {
      section.style.height = ''
      track.style.transform = ''
      return
    }

    let distance = 0
    let frame = 0
    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth)
      section.style.height = `${distance + window.innerHeight}px`
    }
    const update = () => {
      frame = 0
      const r = section.getBoundingClientRect()
      const span = section.offsetHeight - window.innerHeight
      const p = span > 0 ? Math.min(Math.max(-r.top / span, 0), 1) : 0
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`
      setActive(Math.min(projects.length - 1, Math.round(p * (projects.length - 1))))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      section.style.height = ''
      track.style.transform = ''
    }
  }, [wide])

  return (
    <section id="projects" ref={sectionRef} className="relative">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center py-24 lg:py-0 lg:pt-16">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 mb-8 lg:mb-5 flex flex-wrap items-end justify-between gap-4 reveal-up">
          <div>
            <span className="eyebrow">// Selected Work</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-gray-900 dark:text-white">
              Featured <span className="gradient-text heading-highlight">Projects</span>
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-4 font-mono text-xs text-gray-500 dark:text-white/50">
            <span className="text-gray-900 dark:text-white text-base font-semibold">{String(active + 1).padStart(2, '0')}</span>
            <span className="relative w-32 h-[2px] rounded-full bg-gray-300 dark:bg-white/15 overflow-hidden">
              <span ref={progressRef} className="absolute inset-0 origin-left bg-gradient-to-r from-primary-500 to-accent-cyan" style={{ transform: 'scaleX(0)' }} />
            </span>
            <span>{String(projects.length).padStart(2, '0')}</span>
            <span className="ml-2 uppercase tracking-wider">Scroll →</span>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 px-6 lg:w-max lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[10vw] will-change-transform"
        >
          {projects.map((p, i) => (
            <div key={p.id} className="reveal-up" data-delay={wide ? 0 : 100}>
              <ProjectPanel project={p} index={i} onOpen={setSelected} />
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
