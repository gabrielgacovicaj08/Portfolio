import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import BootOverlay from './components/BootOverlay'
import CustomCursor from './components/CustomCursor'

function App() {
  useEffect(() => {
    const headings = gsap.utils.toArray<HTMLElement>('.section-heading')
    headings.forEach(heading => {
      gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          once: true,
        },
      }).fromTo(
        heading,
        { opacity: 0, skewX: -6, textShadow: '4px 0 #00ff41, -4px 0 #d4a017' },
        { opacity: 1, skewX: 0, textShadow: 'none', duration: 0.5, ease: 'power2.out' },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <BootOverlay />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
