import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Rust: '#dea584',
  Go: '#00add8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
}

const SPINNER_FRAMES = ['/', '|', '\\', '-']

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [spinnerIdx, setSpinnerIdx] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinnerIdx(i => (i + 1) % SPINNER_FRAMES.length)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetch('https://api.github.com/users/gabrielgacovicaj08/repos?sort=updated&per_page=12')
      .then(res => {
        if (!res.ok) throw new Error('Failed')
        return res.json() as Promise<Repo[]>
      })
      .then(data => {
        setRepos(data.filter(r => !r.fork))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (loading || error || !ref.current) return
    const cards = gsap.utils.toArray<HTMLElement>('.project-card')
    if (cards.length === 0) return
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          once: true,
        },
      },
    )
  }, [loading, error])

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <h2 className="section-heading glitch">// projects</h2>

      {loading && (
        <div className="projects-loading">
          <span className="projects-spinner">[ {SPINNER_FRAMES[spinnerIdx]} ] loading repos...</span>
        </div>
      )}

      {error && !loading && (
        <div className="projects-error">
          {'>'} ERROR: failed to fetch repositories
        </div>
      )}

      {!loading && !error && (
        <div className="projects-grid">
          {repos.map(repo => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-card-name">{repo.name}</div>
              <div className="project-card-desc">
                {repo.description ?? <em>No description available</em>}
              </div>
              <div className="project-card-meta">
                {repo.language && (
                  <span className="project-lang">
                    <span
                      className="project-lang-dot"
                      style={{ background: LANG_COLORS[repo.language] ?? '#aaa' }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="project-stat">★ {repo.stargazers_count}</span>
                <span className="project-stat">⑂ {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
