import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/portfolio'
import { ArrowUpIcon } from './Icons'
import SocialLinks from './SocialLinks'

const year = new Date().getFullYear()
const istFormat = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
})

export default function Footer() {
  const [time, setTime] = useState(() => istFormat.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(istFormat.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="relative z-[2] pt-16 pb-12 border-t bg-white border-gray-200 dark:bg-dark-950 dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-gray-200 dark:border-white/[0.06]">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <a href="#hero" className="flex items-center gap-3 mb-2 group">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-accent-cyan flex items-center justify-center font-display font-black text-white text-sm shadow-glow-sm group-hover:scale-105 transition-transform">
                {profile.initials}
              </span>
              <span className="text-xl font-display font-black tracking-tight text-gray-900 dark:text-white">
                {profile.firstName} <span className="gradient-text">{profile.lastName}</span>
              </span>
            </a>
            <p className="text-xs max-w-sm text-gray-500 dark:text-white/50">CSE undergraduate focused on machine learning, generative AI and full-stack development.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-xs font-mono uppercase tracking-wider transition-colors text-gray-600 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-400"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SocialLinks size="w-10 h-10" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-105 bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 dark:bg-white/[0.04] dark:border-white/10 dark:text-white dark:hover:bg-white/[0.08] dark:hover:border-primary-400"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUpIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-500 dark:text-white/50">India (IST):</span>
            <span className="font-semibold text-gray-800 dark:text-white">{time}</span>
          </div>
          <div className="text-gray-400 dark:text-white/40">
            © {year} {profile.firstName} {profile.lastName}. All rights reserved.
          </div>
          <div className="text-gray-500 dark:text-white/50">
            Built with <span className="text-red-400">♥</span> using React, Tailwind & Vite
          </div>
        </div>
      </div>
    </footer>
  )
}
