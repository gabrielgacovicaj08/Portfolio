import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const lines = [
  { label: 'name', value: 'Gabriel Gacovicaj' },
  { label: 'role', value: 'Full-Stack Developer' },
  { label: 'bio', value: 'Passionate about building fast, accessible web apps that users love.' },
  { label: 'interests', value: 'Open source, CLI tools, system design, and dark themes.' },
  { label: 'fun_fact', value: 'I can type faster in a terminal than most people click.' },
]

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about-section" ref={ref}>
      <h2 className="section-heading glitch">// about</h2>

      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="terminal-window">
          <div className="terminal-topbar">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green-dot" />
            <span className="terminal-title">~/about/gabriel.txt</span>
          </div>
          <div className="terminal-body">
            <p className="terminal-cmd">$ cat gabriel.txt</p>
            {lines.map((line) => (
              <p key={line.label} className="terminal-line">
                <span className="terminal-arrow">&gt;</span>{' '}
                <span className="terminal-key">{line.label}:</span>{' '}
                {line.value}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
