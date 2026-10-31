import { useEffect, useRef } from 'react'

// Orbit diameter (px), orbit period (s), planet size (px)
const ORBITS = [
  { name: 'mercury', size: 200, period: 22, planet: 9 },
  { name: 'venus', size: 310, period: 34, planet: 14 },
  { name: 'earth', size: 440, period: 50, planet: 16 },
  { name: 'mars', size: 580, period: 68, planet: 12 },
  { name: 'jupiter', size: 780, period: 100, planet: 34 },
  { name: 'saturn', size: 1000, period: 140, planet: 26, ringed: true },
]

// Planets that drift past at different speeds as the page scrolls.
// x: horizontal position, speed: parallax factor, offset: starting point in the loop
const FLOATERS = [
  { kind: 'jupiter', size: 140, x: '-3%', speed: 0.32, offset: 0.1 },
  { kind: 'ice', size: 64, x: '90%', speed: 0.55, offset: 0.5 },
  { kind: 'rose', size: 40, x: '7%', speed: 0.8, offset: 0.85 },
  { kind: 'violet', size: 96, x: '84%', speed: 0.42, offset: 1.25, ringed: true },
  { kind: 'moon', size: 30, x: '52%', speed: 1, offset: 0.35 },
]

function Planet({ kind, size, ringed }) {
  return (
    <span
      className={`planet planet-${kind} ${ringed ? 'planet-ringed' : ''}`}
      style={{ width: size, height: size, fontSize: size / 4 }}
    />
  )
}

export default function SpaceBackground() {
  const floaterRefs = useRef([])
  const solarRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let maxScroll = 1
    const measure = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }

    const update = () => {
      frame = 0
      const y = window.scrollY
      // Scoped to the solar system: setting these on <html> would restyle the whole page every frame
      const solar = solarRef.current
      if (solar) {
        solar.style.setProperty('--scroll-y', y.toFixed(0))
        solar.style.setProperty('--scroll-progress', Math.min(1, y / maxScroll).toFixed(4))
      }

      // Wrap each planet through a band slightly taller than the viewport
      const band = window.innerHeight + 400
      floaterRefs.current.forEach((el, i) => {
        if (!el) return
        const f = FLOATERS[i]
        const travel = reduced ? 0 : y * f.speed
        const pos = (((f.offset * band - travel) % band) + band) % band - 200
        const tilt = Math.sin(travel / 260 + i) * 14 // gentle wobble instead of a full spin
        el.style.transform = `translate3d(0, ${pos.toFixed(1)}px, 0) rotate(${tilt.toFixed(1)}deg)`
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    // Page height changes (pinned sections, images) — re-measure without reading layout on every scroll
    const resizeObserver = new ResizeObserver(() => {
      measure()
      onScroll()
    })
    resizeObserver.observe(document.body)

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div aria-hidden="true">
      <div ref={solarRef} className="solar-system">
        <div className="solar-tilt">
          <div className="sun" />
          {ORBITS.map((o, i) => {
            const timing = { animationDuration: `${o.period}s`, animationDelay: `-${(i * 7.3) % o.period}s` }
            return (
              <div
                key={o.name}
                className="orbit"
                style={{ width: o.size, height: o.size, marginLeft: -o.size / 2, marginTop: -o.size / 2, ...timing }}
              >
                <div className="orbit-planet" style={timing}>
                  <Planet kind={o.name} size={o.planet} ringed={o.ringed} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {FLOATERS.map((f, i) => (
        <div key={f.kind} ref={(el) => (floaterRefs.current[i] = el)} className="floating-planet" style={{ left: f.x }}>
          <Planet kind={f.kind} size={f.size} ringed={f.ringed} />
        </div>
      ))}

      <span className="shooting-star" style={{ top: '12%', left: '78%' }} />
      <span className="shooting-star" style={{ top: '30%', left: '95%', animationDelay: '5.5s', animationDuration: '14s' }} />
    </div>
  )
}
