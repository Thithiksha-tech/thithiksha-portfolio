import { coursework, softSkills, stackGroups } from '../data/portfolio'
import SectionHeader from './SectionHeader'

function TagGroup({ title, items }) {
  return (
    <div className="glass-card p-6 reveal-up">
      <h3 className="text-xs font-mono uppercase tracking-wider mb-4 text-primary-600 dark:text-primary-400">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 bg-gray-100 border-gray-200 text-gray-700 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-white/75"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Technical Skills"
          title="What I"
          highlight="Work With"
          subtitle="Languages, frameworks, databases and ML techniques — and the projects where I used them."
        />

        <div className="border-t border-dashed border-gray-300 dark:border-white/15">
          {stackGroups.map((g, i) => (
            <div
              key={g.title}
              className="stack-row group grid grid-cols-[3rem_1fr] md:grid-cols-[4.5rem_1fr_1.1fr] gap-x-4 gap-y-3 items-center px-3 md:px-5 py-6 md:py-7 border-b border-dashed border-gray-300 dark:border-white/15 reveal-up"
              data-delay={i * 80}
            >
              <span className="manifesto-line text-3xl md:text-4xl text-gray-300 dark:text-white/20 transition-all duration-500 group-hover:text-primary-500 dark:group-hover:text-accent-cyan group-hover:scale-110 origin-left">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="manifesto-line text-3xl md:text-4xl text-gray-900 dark:text-white transition-transform duration-500 group-hover:translate-x-2">
                  {g.title}
                </h3>
                <p className="mt-1.5 font-mono text-xs leading-relaxed max-w-md text-gray-500 dark:text-white/50">{g.desc}</p>
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-wrap md:justify-end gap-2">
                {g.tags.map((t, j) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full border transition-all duration-300 group-hover:-translate-y-0.5 border-gray-300 text-gray-700 group-hover:border-primary-400 group-hover:text-primary-700 dark:border-white/15 dark:text-white/70 dark:group-hover:border-accent-cyan/60 dark:group-hover:text-white"
                    style={{ transitionDelay: `${j * 40}ms` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <TagGroup title="Relevant Coursework" items={coursework} />
          <TagGroup title="Soft Skills" items={softSkills} />
        </div>
      </div>
    </section>
  )
}
