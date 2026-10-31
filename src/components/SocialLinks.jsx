import { socials } from '../data/portfolio'
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from './Icons'

const links = [
  { name: 'GitHub', url: socials.github, Icon: GitHubIcon },
  { name: 'LinkedIn', url: socials.linkedin, Icon: LinkedInIcon },
  { name: 'LeetCode', url: socials.leetcode, Icon: LeetCodeIcon },
]

export default function SocialLinks({ size = 'w-11 h-11' }) {
  return (
    <div className="flex items-center gap-2">
      {links.map(({ name, url, Icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${name} Profile`}
          aria-label={`${name} Profile`}
          className={`${size} rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 bg-white border-gray-200 text-gray-700 hover:text-primary-600 hover:border-primary-400 shadow-sm dark:shadow-none dark:bg-white/[0.04] dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:hover:border-primary-400`}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}
