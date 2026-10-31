import { useEffect, useRef } from 'react'
import { manifesto } from '../data/portfolio'

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

// Pinned section: while it is stuck to the viewport, scroll progress drives each line
// from in front of the screen (huge, close to the viewer) back into place, one after another.
export default function Manifesto() {
  const sectionRef = useRef(null)
  const lineRefs = useRef([])
  const markRefs = useRef([])
  const footerRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const r = section.getBoundingClientRect()
      const vh = window.innerHeight
      // Start a little before the section pins, finish when it unpins
      const lead = vh * 0.6
      const p = reduced ? 1 : clamp01((lead - r.top) / (r.height - vh + lead))
      // Final stretch: the whole block sinks a little further into the screen
      const sink = clamp01((p - 0.86) / 0.14)

      lineRefs.current.forEach((el, i) => {
        if (!el) return
        const t = easeOut(clamp01((p - i * 0.13) / 0.4))
        const z = (1 - t) * 760 - sink * 160
        const rotateX = (1 - t) * 22
        const y = (1 - t) * (i - 1) * 90
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rotateX.toFixed(2)}deg)`
        el.style.opacity = clamp01(t * 3).toFixed(3)
        markRefs.current[i]?.classList.toggle('on', t > 0.82)
      })

      const f = footerRef.current
      if (f) {
        const ft = easeOut(clamp01((p - 0.6) / 0.2))
        f.style.opacity = ft.toFixed(3)
        f.style.transform = `translate3d(0, ${((1 - ft) * 40).toFixed(1)}px, ${(-sink * 160).toFixed(1)}px)`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} id="manifesto" className="relative h-[230vh] lg:h-[260vh]">
      <div className="manifesto-stage sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="manifesto-scene max-w-7xl w-full mx-auto px-6 lg:px-8">
          <span className="eyebrow">// Manifesto</span>

          <h2 className="mt-4" aria-label={manifesto.lines.map((l) => `${l.lead} ${l.mark}`).join(' ')}>
            {manifesto.lines.map((line, i) => (
              <span
                key={line.mark}
                ref={(el) => (lineRefs.current[i] = el)}
                className="manifesto-line manifesto-fly block text-[13vw] sm:text-7xl lg:text-8xl xl:text-[8.5rem] text-gray-900 dark:text-white"
                aria-hidden="true"
              >
                {line.lead}{' '}
                <span ref={(el) => (markRefs.current[i] = el)} className="manifesto-mark" style={{ '--mark': line.color }}>
                  {line.mark}
                </span>
              </span>
            ))}
          </h2>

          <div ref={footerRef} className="mt-12 grid md:grid-cols-12 gap-8 items-end" style={{ opacity: 0 }}>
            <p className="md:col-span-6 font-mono text-sm leading-relaxed text-gray-600 dark:text-white/60">{manifesto.body}</p>
            <div className="md:col-span-6 flex flex-wrap md:justify-end gap-2">
              {manifesto.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 hover:-translate-y-1 border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white dark:border-white/15 dark:text-white/70 dark:hover:bg-white dark:hover:text-dark-950"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
