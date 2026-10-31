import { about, education, profile } from '../data/portfolio'
import { CapIcon, EyeIcon, ExternalIcon, SendIcon } from './Icons'
import SectionHeader from './SectionHeader'

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="About Me"
          title="Aspiring AI/ML Engineer Building"
          highlight="Intelligent"
          after=" Applications"
          subtitle="Machine learning, generative AI and full-stack development — from model to interface."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 reveal-left" data-delay="100">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-primary-500 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-primary-600 dark:text-primary-300">Profile</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-gray-900 dark:text-white">
              Hello! I'm <span className="gradient-text">{profile.firstName} {profile.lastName}</span>
            </h3>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed mb-6 text-gray-600 dark:text-white/70">
                {p}
              </p>
            ))}

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {about.focus.map((f) => (
                <div
                  key={f.title}
                  className="p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm bg-gray-50 border-gray-200 hover:border-primary-300 dark:bg-white/[0.03] dark:border-white/[0.06] dark:hover:border-primary-500/30"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{f.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-white/50">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="magnetic-btn group">
                <EyeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>View Resume</span>
                <ExternalIcon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#contact" className="ghost-btn">
                <span>Get In Touch</span>
                <SendIcon />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 reveal-right" data-delay="200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-display font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                <CapIcon className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                Academic Background
              </h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-white/50">Education</span>
            </div>

            {education.map((ed) => (
              <div key={ed.badge} className="glass-card p-6 relative group overflow-hidden" data-tilt>
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${ed.accent}`} />
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/20">
                    {ed.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400 dark:text-white/40">{ed.period}</span>
                </div>
                <h4 className="text-base font-bold mb-1 leading-snug transition-colors text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-300">
                  {ed.degree}
                </h4>
                <p className="text-sm mb-3 font-medium text-gray-600 dark:text-white/70">{ed.institution}</p>
                <div className="pt-3 border-t border-gray-200 dark:border-white/[0.08]">
                  <span className="text-xs font-mono font-semibold text-cyan-600 dark:text-accent-cyan">{ed.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
