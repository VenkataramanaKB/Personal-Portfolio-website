'use client'

import { useEffect } from 'react'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'

export default function Home() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}