import { certifications } from '../data/portfolio'
import SectionHeader from './SectionHeader'

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeader eyebrow="Credentials" title="Certifications &" highlight="Learning" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((c, i) => (
            <div key={c.title} className="glass-card p-6 group reveal-scale" data-delay={i * 100} data-tilt>
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${c.color}`} />
              <div
                className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center text-2xl bg-gradient-to-br ${c.color} shadow-glow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]`}
              >
                {c.icon}
              </div>
              <h3 className="text-lg font-display font-bold mb-1 text-gray-900 dark:text-white">{c.title}</h3>
              <p className="text-xs font-mono text-gray-500 dark:text-white/50">{c.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
