import { achievements } from '../data/portfolio'
import { ExternalIcon } from './Icons'
import SectionHeader from './SectionHeader'

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Milestones"
          title="Achievements &"
          highlight="Experience"
          subtitle="Internship, hackathons, competitive programming and leadership."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <div key={a.title} className="glass-card p-7 group flex flex-col reveal-scale" data-delay={(i % 3) * 120} data-tilt>
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${a.color}`} />
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12 bg-gray-50 border border-gray-200 dark:bg-white/[0.06] dark:border-white/10 dark:shadow-glow-sm">
                  {a.icon}
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border bg-primary-50 border-primary-200 text-primary-700 dark:bg-white/[0.05] dark:border-white/10 dark:text-accent-cyan">
                  {a.stat}
                </span>
              </div>
              <span className="text-xs font-mono uppercase tracking-wider block mb-2 text-primary-600 dark:text-primary-400">{a.category}</span>
              <h3 className="text-xl font-display font-bold mb-3 text-gray-900 dark:text-white">{a.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-white/70">{a.description}</p>
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  View Profile <ExternalIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
