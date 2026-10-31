import { skills } from '../data/portfolio'

const half = Math.ceil(skills.length / 2)
const rows = [skills.slice(0, half), skills.slice(half)]

function Track({ items, reverse }) {
  // Items are rendered twice so the -50% translate loops seamlessly
  return (
    <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
      {[...items, ...items].map((s, i) => (
        <span
          key={i}
          aria-hidden={i >= items.length}
          className="mx-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border whitespace-nowrap text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 bg-white/80 border-gray-200 text-gray-700 hover:border-primary-400 hover:text-primary-600 hover:shadow-glow-sm dark:bg-white/[0.04] dark:border-white/10 dark:text-white/75 dark:hover:text-white dark:hover:border-primary-400/60"
        >
          <span className="text-base">{s.icon}</span>
          {s.name}
        </span>
      ))}
    </div>
  )
}

export default function SkillsMarquee() {
  return (
    <section aria-label="Skills" className="relative py-10 overflow-hidden">
      <div className="marquee flex flex-col gap-4">
        <Track items={rows[0]} />
        <Track items={rows[1]} reverse />
      </div>
    </section>
  )
}
