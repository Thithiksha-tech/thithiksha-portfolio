import { useEffect, useRef, useState } from 'react'

// Run animations only while the visual is on screen
function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return inView
}

// Step through named phases on a timer; `restart` jumps back to the first one
function usePhases(phases, active) {
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => {
      if (index + 1 >= phases.length) setCycle((c) => c + 1)
      setIndex((index + 1) % phases.length)
    }, phases[index].ms)
    return () => clearTimeout(t)
  }, [index, active, phases])
  const restart = () => {
    setIndex(0)
    setCycle((c) => c + 1)
  }
  return { phase: phases[index].name, cycle, restart }
}

const Caption = ({ children }) => (
  <span className="absolute bottom-3 right-4 z-10 font-mono text-[10px] uppercase tracking-wider text-white/50">{children}</span>
)

/* ------------------------------------------------------------------ */
/* CodeSense — AI code analysis + knowledge tracing                    */
/* ------------------------------------------------------------------ */

const tok = (cls, text) => ({ cls, text })
const CODE = [
  [tok('kw', 'def '), tok('fn', 'has_pair'), tok('', '(nums, target):')],
  [tok('', '    '), tok('kw', 'for '), tok('', 'i '), tok('kw', 'in '), tok('fn', 'range'), tok('', '(len(nums)):')],
  [tok('', '        '), tok('kw', 'for '), tok('', 'j '), tok('kw', 'in '), tok('fn', 'range'), tok('', '(i + '), tok('num', '1'), tok('', ', len(nums) - '), tok('num', '1'), tok('', '):')],
  [tok('', '            '), tok('kw', 'if '), tok('', 'nums[i] + nums[j] == target:')],
  [tok('', '                '), tok('kw', 'return '), tok('num', 'True')],
  [tok('', '    '), tok('kw', 'return '), tok('num', 'False')],
]
const BUG_LINE = 2
const TOKEN_COLORS = { kw: 'text-violet-300', fn: 'text-cyan-300', num: 'text-amber-300', '': 'text-slate-200' }

const CODESENSE_PHASES = [
  { name: 'typing', ms: 2600 },
  { name: 'scanning', ms: 1800 },
  { name: 'bug', ms: 2600 },
  { name: 'tradeoff', ms: 3200 },
]
const TOPICS = ['Arrays', 'Strings', 'Graphs', 'Dynamic Prog.']

export function CodeSenseVisual() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const { phase, cycle, restart } = usePhases(CODESENSE_PHASES, inView)
  const [lines, setLines] = useState(0)
  const [hoverLine, setHoverLine] = useState(null)

  // Type the code in line by line at the start of each cycle
  useEffect(() => {
    if (phase !== 'typing') return
    setLines(0)
    const id = setInterval(() => setLines((n) => Math.min(n + 1, CODE.length)), 380)
    return () => clearInterval(id)
  }, [phase, cycle])

  const showBug = phase === 'bug' || phase === 'tradeoff'
  // Illustrative mastery levels that shift a little each cycle (no real data)
  const mastery = TOPICS.map((_, i) => 0.3 + ((i * 0.23 + cycle * 0.11 + (showBug && i === 0 ? 0.12 : 0)) % 0.6))

  return (
    <div ref={ref} className="absolute inset-0 p-4 sm:p-6 flex flex-col gap-3">
      <div className="relative flex-1 min-h-0 rounded-xl bg-slate-950/85 border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 font-mono text-[11px] text-white/50">solution.py</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              restart()
            }}
            className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-violet-500/20 text-violet-200 border border-violet-400/30 hover:bg-violet-500/40 transition-colors"
          >
            ▶ Run analysis
          </button>
        </div>

        <div className="relative px-3 sm:px-4 py-3 font-mono text-[9.5px] sm:text-xs lg:text-[13px] leading-6 lg:leading-7 overflow-hidden">
          {CODE.map((line, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoverLine(i)}
              onMouseLeave={() => setHoverLine(null)}
              className={`flex whitespace-pre rounded transition-all duration-300 ${i < lines ? 'opacity-100' : 'opacity-0 -translate-x-2'} ${
                showBug && i === BUG_LINE ? 'bg-rose-500/20 ring-1 ring-rose-400/60' : hoverLine === i ? 'bg-white/5' : ''
              }`}
            >
              <span className="w-5 sm:w-6 shrink-0 text-right pr-2 sm:pr-3 text-white/25 select-none">{i + 1}</span>
              <span className={showBug && i === BUG_LINE ? 'underline decoration-wavy decoration-rose-400 underline-offset-4' : ''}>
                {line.map((t, j) => (
                  <span key={j} className={TOKEN_COLORS[t.cls]}>
                    {t.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
          {phase === 'scanning' && (
            <div className="code-scan absolute left-0 right-0 h-10 -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent pointer-events-none" />
          )}
        </div>

        {showBug && (
          <div key={`bug-${cycle}`} className="pop-in absolute right-3 bottom-3 max-w-[78%] sm:max-w-[60%] space-y-2">
            <div className="rounded-lg bg-slate-900/95 border border-rose-400/40 p-2.5 shadow-xl">
              <div className="font-mono text-[10px] uppercase tracking-wider text-rose-300">✨ Gemini · Logic issue · line 3</div>
              <p className="mt-1 text-[11px] leading-snug text-white/85">Inner range stops before the last element.</p>
            </div>
            {phase === 'tradeoff' && (
              <div className="pop-in rounded-lg bg-slate-900/95 border border-cyan-400/40 p-2.5 shadow-xl">
                <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">Algorithm trade-off</div>
                <p className="mt-1 text-[11px] leading-snug text-white/85">Nested loops are O(n²) — a hash set brings it to O(n).</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-xl bg-slate-950/70 border border-white/10 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">Knowledge tracing · topic mastery</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> live
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {TOPICS.map((t, i) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-[10px] text-white/60">{t}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition-[width] duration-1000 ease-out"
                  style={{ width: `${(inView ? mastery[i] : 0) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* VoiceIQ — mobile speech coach                                       */
/* ------------------------------------------------------------------ */

const VOICE_PHASES = [
  { name: 'record', ms: 4200 },
  { name: 'transcript', ms: 4200 },
  { name: 'feedback', ms: 4600 },
]
const TRANSCRIPT = 'So today I want to, um, talk about how machine learning, like, helps doctors.'
const FILLERS = ['um', 'like']
const FEEDBACK_AREAS = ['Fluency', 'Pronunciation', 'Grammar', 'Vocabulary', 'Confidence']
const BARS = Array.from({ length: 22 }, (_, i) => ({ delay: (i * 137) % 900, dur: 600 + ((i * 211) % 600) }))

function Transcript({ text }) {
  // Highlight filler words as they appear
  return text.split(/(\s+)/).map((word, i) => {
    const clean = word.replace(/[^a-z]/gi, '').toLowerCase()
    return FILLERS.includes(clean) ? (
      <span key={i} className="px-1 rounded bg-amber-300/25 text-amber-200">
        {word}
      </span>
    ) : (
      <span key={i}>{word}</span>
    )
  })
}

export function VoiceIQVisual() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const { phase, cycle, restart } = usePhases(VOICE_PHASES, inView)
  const [seconds, setSeconds] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (phase !== 'record') return
    setSeconds(0)
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [phase, cycle])

  useEffect(() => {
    if (phase !== 'transcript') return
    setChars(0)
    const id = setInterval(() => setChars((c) => Math.min(c + 2, TRANSCRIPT.length)), 45)
    return () => clearInterval(id)
  }, [phase, cycle])

  const fillerCount = TRANSCRIPT.toLowerCase()
    .split(/\W+/)
    .filter((w) => FILLERS.includes(w)).length
  const levels = [0.82, 0.68, 0.9, 0.74, 0.62] // visual only — no scores are shown

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center p-4">
      {/* Dashboard card peeking from behind the phone */}
      <div className="hidden sm:block absolute left-[8%] top-[16%] w-40 rounded-xl bg-slate-950/60 border border-white/10 p-3 -rotate-6 float-chip" style={{ animationDuration: '6s' }}>
        <div className="font-mono text-[9px] uppercase tracking-wider text-white/50 mb-2">Admin dashboard</div>
        {[0.7, 0.45, 0.85].map((w, i) => (
          <div key={i} className="h-1.5 mb-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-cyan-300/70" style={{ width: `${w * 100}%` }} />
          </div>
        ))}
        <div className="font-mono text-[9px] text-white/40 mt-2">Session history</div>
      </div>
      <span className="hidden sm:inline-flex absolute right-[7%] top-[20%] items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 text-[11px] font-semibold text-white float-chip">
        🎙️ Audio recording
      </span>
      <span className="hidden sm:inline-flex absolute right-[9%] bottom-[18%] items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 text-[11px] font-semibold text-white float-chip" style={{ animationDelay: '1.2s' }}>
        ✨ Gemini feedback
      </span>

      {/* Phone */}
      <div className="relative w-[190px] sm:w-[210px] h-[380px] sm:h-[420px] max-h-full rounded-[2.4rem] border-[7px] border-slate-900 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden float-chip" style={{ animationDuration: '7s' }}>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-slate-900 z-10" />
        <div className="h-full flex flex-col px-4 pt-10 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-display font-bold text-white">VoiceIQ</div>
              <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">Speech practice</div>
            </div>
            <div className="flex gap-1">
              {VOICE_PHASES.map((p) => (
                <span key={p.name} className={`h-1.5 rounded-full transition-all duration-500 ${phase === p.name ? 'w-4 bg-cyan-300' : 'w-1.5 bg-white/25'}`} />
              ))}
            </div>
          </div>

          {phase === 'record' && (
            <div key={`rec-${cycle}`} className="pop-in flex-1 flex flex-col items-center justify-center gap-5">
              <div className="flex items-center gap-[3px] h-14">
                {BARS.map((b, i) => (
                  <span
                    key={i}
                    className="wave-bar w-[3px] h-full rounded-full bg-gradient-to-t from-cyan-400 to-violet-400"
                    style={{ animationDelay: `${b.delay}ms`, animationDuration: `${b.dur}ms` }}
                  />
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  restart()
                }}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg"
                aria-label="Restart demo"
              >
                <span className="mic-ripple absolute inset-0 rounded-full bg-rose-500/50" />
                <span className="mic-ripple absolute inset-0 rounded-full bg-rose-500/40" style={{ animationDelay: '0.9s' }} />
                <span className="relative">🎙️</span>
              </button>
              <div className="font-mono text-xs text-white/70">
                <span className="inline-block w-2 h-2 mr-1.5 rounded-full bg-rose-500 animate-pulse" />
                Recording 00:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          )}

          {phase === 'transcript' && (
            <div key={`tr-${cycle}`} className="pop-in flex-1 flex flex-col justify-center gap-3">
              <div className="font-mono text-[9px] uppercase tracking-wider text-white/40">Transcript</div>
              <p className="text-[12px] leading-relaxed text-white/85 min-h-[6.5rem]">
                <Transcript text={TRANSCRIPT.slice(0, chars)} />
                <span className="animate-pulse text-cyan-300">|</span>
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] text-white/70">Words / min</span>
                <span className="px-2 py-1 rounded-md bg-amber-300/20 text-[10px] text-amber-200">
                  Fillers: {chars >= TRANSCRIPT.length ? fillerCount : '…'}
                </span>
              </div>
            </div>
          )}

          {phase === 'feedback' && (
            <div key={`fb-${cycle}`} className="pop-in flex-1 flex flex-col justify-center gap-2.5">
              <div className="font-mono text-[9px] uppercase tracking-wider text-white/40">AI feedback</div>
              {FEEDBACK_AREAS.map((area, i) => (
                <div key={area}>
                  <div className="text-[10px] text-white/75 mb-1">{area}</div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                      style={{ width: `${levels[i] * 100}%`, animation: `loadBar 0.9s ${i * 0.12}s cubic-bezier(0.22,1,0.36,1) both`, transformOrigin: 'left' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Caption>Tap the mic · demo</Caption>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Breast Cancer Detection — interactive KNN / logistic regression     */
/* ------------------------------------------------------------------ */

const W = 400
const H = 300
const K = 5

// Deterministic pseudo-random points so the plot is the same on every load
function seeded(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const CENTERS = [
  { x: 140, y: 190 }, // benign
  { x: 265, y: 110 }, // malignant
]
const POINTS = (() => {
  const rand = seeded(11)
  const gauss = () => Math.sqrt(-2 * Math.log(rand() || 1e-9)) * Math.cos(2 * Math.PI * rand())
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
  return CENTERS.flatMap((c, cls) =>
    Array.from({ length: 32 }, () => ({ x: clamp(c.x + gauss() * 44, 16, W - 16), y: clamp(c.y + gauss() * 40, 16, H - 16), cls })),
  )
})()
// Linear boundary: perpendicular bisector of the two class centres
const MID = { x: (CENTERS[0].x + CENTERS[1].x) / 2, y: (CENTERS[0].y + CENTERS[1].y) / 2 }
const NORMAL = { x: CENTERS[1].x - CENTERS[0].x, y: CENTERS[1].y - CENTERS[0].y }
const ALONG = { x: -NORMAL.y, y: NORMAL.x }
const far = (s) => ({ x: MID.x + ALONG.x * s, y: MID.y + ALONG.y * s })
const halfPlane = (sign) => {
  const a = far(-4)
  const b = far(4)
  const push = (p) => `${p.x + NORMAL.x * 4 * sign},${p.y + NORMAL.y * 4 * sign}`
  return `${a.x},${a.y} ${b.x},${b.y} ${push(b)} ${push(a)}`
}
const LABELS = ['Benign', 'Malignant']
const COLORS = ['#22d3ee', '#f472b6']

export function CancerVisual() {
  const ref = useRef(null)
  const svgRef = useRef(null)
  const inView = useInView(ref)
  const [query, setQuery] = useState({ x: 200, y: 150 })
  const [manual, setManual] = useState(false)

  // Auto-play: the query point wanders until the visitor takes over
  useEffect(() => {
    if (!inView || manual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame
    let lastDraw = 0
    const start = performance.now()
    const tick = (now) => {
      // ~30 fps is plenty for a slow drift and halves the SVG re-renders
      if (now - lastDraw > 32) {
        lastDraw = now
        const t = (now - start) / 1000
        setQuery({ x: 200 + 135 * Math.sin(t * 0.55), y: 150 + 95 * Math.sin(t * 0.83 + 1) })
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, manual])

  const onMove = (e) => {
    const svg = svgRef.current
    const ctm = svg?.getScreenCTM()
    if (!ctm) return
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const p = pt.matrixTransform(ctm.inverse())
    setManual(true)
    setQuery({ x: Math.max(0, Math.min(W, p.x)), y: Math.max(0, Math.min(H, p.y)) })
  }

  const neighbours = POINTS.map((p, i) => ({ i, d: Math.hypot(p.x - query.x, p.y - query.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, K)
  const nearSet = new Set(neighbours.map((n) => n.i))
  const knnVotes = neighbours.filter((n) => POINTS[n.i].cls === 1).length
  const knnClass = knnVotes > K / 2 ? 1 : 0
  const lrClass = (query.x - MID.x) * NORMAL.x + (query.y - MID.y) * NORMAL.y > 0 ? 1 : 0
  const radius = neighbours[K - 1].d

  return (
    <div ref={ref} className="absolute inset-0 p-4 sm:p-6 flex flex-col">
      <div className="flex flex-wrap gap-2 mb-3 relative z-10">
        <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-white/10 font-mono text-[10px] text-white/80">
          Logistic Regression → <b style={{ color: COLORS[lrClass] }}>{LABELS[lrClass]}</b>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-white/10 font-mono text-[10px] text-white/80">
          KNN (k={K}) → <b style={{ color: COLORS[knnClass] }}>{LABELS[knnClass]}</b>{' '}
          <span className="text-white/40">
            ({K - knnVotes}:{knnVotes})
          </span>
        </span>
      </div>

      <div className="relative flex-1 min-h-0 rounded-xl bg-slate-950/70 border border-white/10 overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onPointerMove={onMove}
          onPointerLeave={() => setManual(false)}
          role="img"
          aria-label="Interactive scatter plot: move the pointer to classify a point as benign or malignant"
        >
          {/* Grid and class regions extend past the viewBox so letterboxed space is filled too */}
          <g>
            {Array.from({ length: 21 }, (_, i) => (
              <line key={`v${i}`} x1={(i - 6) * 50} y1={-300} x2={(i - 6) * 50} y2={H + 300} stroke="rgba(255,255,255,0.05)" />
            ))}
            {Array.from({ length: 19 }, (_, i) => (
              <line key={`h${i}`} x1={-300} y1={(i - 6) * 50} x2={W + 300} y2={(i - 6) * 50} stroke="rgba(255,255,255,0.05)" />
            ))}
            <polygon points={halfPlane(-1)} fill="rgba(34,211,238,0.07)" />
            <polygon points={halfPlane(1)} fill="rgba(244,114,182,0.07)" />
            <line
              className={inView ? 'boundary-line' : ''}
              x1={far(-4).x}
              y1={far(-4).y}
              x2={far(4).x}
              y2={far(4).y}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
            />

            <circle cx={query.x} cy={query.y} r={radius} fill="none" stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" />
            {neighbours.map((n) => (
              <line key={n.i} x1={query.x} y1={query.y} x2={POINTS[n.i].x} y2={POINTS[n.i].y} stroke={COLORS[POINTS[n.i].cls]} strokeOpacity="0.6" />
            ))}
            {POINTS.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={nearSet.has(i) ? 5.5 : 3.5}
                fill={COLORS[p.cls]}
                fillOpacity={nearSet.has(i) ? 1 : 0.7}
                stroke={nearSet.has(i) ? '#fff' : 'none'}
                strokeWidth="1.5"
              />
            ))}
            <circle cx={query.x} cy={query.y} r="8" fill={COLORS[knnClass]} fillOpacity="0.3">
              <animate attributeName="r" values="8;16;8" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle cx={query.x} cy={query.y} r="6" fill="#fff" stroke={COLORS[knnClass]} strokeWidth="2.5" />
          </g>
          <text x="8" y={H - 8} fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="JetBrains Mono, monospace">
            PC1 →
          </text>
          <text x="8" y="16" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="JetBrains Mono, monospace">
            ↑ PC2
          </text>
        </svg>
      </div>

      <div className="flex items-center gap-4 mt-3 font-mono text-[10px] text-white/60">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: COLORS[0] }} /> Benign
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: COLORS[1] }} /> Malignant
        </span>
        <span className="ml-auto text-white/45">Move cursor to classify · illustrative data</span>
      </div>
    </div>
  )
}

export const projectVisuals = {
  codesense: CodeSenseVisual,
  voiceiq: VoiceIQVisual,
  'breast-cancer': CancerVisual,
}
