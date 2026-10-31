import { useState } from 'react'
import { profile } from '../data/portfolio'
import { CheckIcon, CopyIcon, MailIcon, PhoneIcon, SendIcon, WhatsAppIcon } from './Icons'
import SectionHeader from './SectionHeader'
import SocialLinks from './SocialLinks'

const emptyForm = { name: '', email: '', subject: '', message: '' }
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`

const rowClass =
  'p-4 rounded-xl border flex items-center justify-between gap-3 group transition-all duration-300 hover:scale-[1.01] bg-gray-50 border-gray-200 hover:border-primary-400 dark:bg-white/[0.02] dark:border-white/[0.08] dark:hover:border-primary-500/50 dark:hover:bg-white/[0.04]'

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [copied, setCopied] = useState(false)
  // idle | sending | sent | activation | error
  const [status, setStatus] = useState('idle')
  const [honey, setHoney] = useState('')

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
    `${form.message}\n\n— ${form.name} (${form.email})`,
  )}`

  // Delivered to the inbox through FormSubmit (no backend needed)
  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _replyto: form.email,
          _subject: `Portfolio message: ${form.subject}`,
          subject: form.subject,
          message: form.message,
          _template: 'table',
          _captcha: 'false',
          _honey: honey,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && String(data.success) === 'true') {
        setStatus('sent')
        setForm(emptyForm)
      } else if (/activat/i.test(data.message || '')) {
        setStatus('activation')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  return (
    <section id="contact" className="py-24 relative overflow-hidden">

      {copied && (
        <div className="toast flex items-center gap-2">
          <CheckIcon />
          <span>Email copied to clipboard!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Build Something"
          highlight="Intelligent"
          after=" Together"
          subtitle="Have an AI/ML role, internship or project in mind? I'm just a message away."
        />

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 glass-card p-8 reveal-left" data-delay="100">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-green-600 dark:text-green-400">Open to AI/ML Opportunities</span>
            </div>
            <h3 className="text-2xl font-display font-bold mb-3 text-gray-900 dark:text-white">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-600 dark:text-white/60">{profile.tagline}</p>

            <div className="space-y-4 mb-8">
              <div className={rowClass}>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 min-w-0 flex-1" title="Send an email">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 dark:text-primary-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MailIcon />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-gray-400 dark:text-white/40">Email</div>
                    <span className="text-xs sm:text-sm font-semibold truncate block text-gray-900 dark:text-white">{profile.email}</span>
                  </div>
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg transition-colors flex-shrink-0 bg-gray-200/70 hover:bg-gray-300/70 dark:bg-white/10 dark:hover:bg-white/20"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  <CopyIcon className="w-4 h-4 text-primary-600 dark:text-primary-300" />
                </button>
              </div>

              <a href={profile.phoneHref} className={rowClass} title="Call">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 text-cyan-600 dark:text-accent-cyan flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <PhoneIcon />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-gray-400 dark:text-white/40">Phone</div>
                    <span className="text-xs sm:text-sm font-semibold block text-gray-900 dark:text-white">{profile.phone}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold text-cyan-600 dark:text-accent-cyan group-hover:translate-x-1 transition-transform">Call →</span>
              </a>

              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className={rowClass} title="Chat on WhatsApp">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-gray-400 dark:text-white/40">WhatsApp</div>
                    <span className="text-xs sm:text-sm font-semibold block text-gray-900 dark:text-white">{profile.phone}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform">Chat →</span>
              </a>
            </div>

            <span className="text-xs font-mono uppercase tracking-wider block mb-3 text-gray-500 dark:text-white/50">Developer Profiles</span>
            <SocialLinks size="w-12 h-12" />
          </div>

          <div className="lg:col-span-7 glass-card p-8 sm:p-10 reveal-right" data-delay="200">
            {status === 'sent' ? (
              <div className="pop-in flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-6 shadow-xl shadow-emerald-500/20">
                  <CheckIcon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-3 text-gray-900 dark:text-white">Message sent!</h3>
                <p className="text-sm max-w-sm leading-relaxed mb-8 text-gray-600 dark:text-white/70">
                  Thanks for reaching out — your message is on its way to my inbox and I'll reply by email.
                </p>
                <button onClick={() => setStatus('idle')} className="magnetic-btn">
                  <span>Send another message</span>
                  <SendIcon />
                </button>
              </div>
            ) : (
              <>
            <h3 className="text-2xl font-display font-bold mb-2 text-gray-900 dark:text-white">Send Me a Message</h3>
            <p className="text-sm mb-6 text-gray-600 dark:text-white/60">Fill out the form and your message goes straight to my inbox.</p>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Honeypot: hidden from people, bots fill it and get filtered out */}
              <input
                type="text"
                name="_honey"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="block text-xs font-mono uppercase mb-2 text-gray-600 dark:text-white/70">Your Name</span>
                  <input type="text" required placeholder="e.g. Priya Sharma" value={form.name} onChange={update('name')} className="form-input" />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono uppercase mb-2 text-gray-600 dark:text-white/70">Your Email</span>
                  <input type="email" required placeholder="e.g. priya@company.com" value={form.email} onChange={update('email')} className="form-input" />
                </label>
              </div>
              <label className="block">
                <span className="block text-xs font-mono uppercase mb-2 text-gray-600 dark:text-white/70">Subject</span>
                <input type="text" required placeholder="e.g. AI/ML Internship Opportunity" value={form.subject} onChange={update('subject')} className="form-input" />
              </label>
              <label className="block">
                <span className="block text-xs font-mono uppercase mb-2 text-gray-600 dark:text-white/70">Message</span>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about the role, team or project..."
                  value={form.message}
                  onChange={update('message')}
                  className="form-input resize-none"
                />
              </label>
              {status === 'activation' && (
                <p role="alert" className="pop-in text-sm rounded-xl p-4 border bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-400/10 dark:border-amber-400/30 dark:text-amber-200">
                  The contact form is waiting for a one-time activation by the site owner, so this message wasn't delivered yet. Please{' '}
                  <a href={mailtoFallback} className="underline font-semibold">
                    email me directly
                  </a>{' '}
                  instead.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="pop-in text-sm rounded-xl p-4 border bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-400/10 dark:border-rose-400/30 dark:text-rose-200">
                  Something went wrong sending your message. Please try again, or{' '}
                  <a href={mailtoFallback} className="underline font-semibold">
                    email me directly
                  </a>
                  .
                </p>
              )}
              <button type="submit" disabled={status === 'sending'} className="w-full magnetic-btn justify-center !py-4">
                {status === 'sending' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <SendIcon />
                  </>
                )}
              </button>
            </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
