export default function SectionHeader({ eyebrow, title, highlight, after = '', subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14 reveal-up">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
        {title} <span className="gradient-text heading-highlight">{highlight}</span>
        {after}
      </h2>
      {subtitle && <p className="text-base sm:text-lg text-gray-600 dark:text-white/60">{subtitle}</p>}
    </div>
  )
}
