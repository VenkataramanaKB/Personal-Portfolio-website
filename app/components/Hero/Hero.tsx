'use client'

import { useEffect, useState } from 'react'

const Hero = () => {
  const [time, setTime] = useState<string>('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateIndianTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      const indianTime = new Date().toLocaleTimeString('en-US', options)
      setTime(indianTime)
    }

    updateIndianTime()
    const timeInterval = setInterval(updateIndianTime, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Top Bar with Hello World and Time */}
      <div className="absolute top-20 w-full">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center">
          <p className="text-white/70 text-sm font-medium">Oh, Hello World!</p>
          <div className="text-white/70 text-sm font-medium flex items-center gap-2">
            <span>🇮🇳</span>
            <span>{time} IST</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Hi, I'm K B Venkataramana
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4">
          A passionate developer crafting digital experiences with code
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 text-[#39ff14] border border-[#39ff14] rounded-md 
            hover:bg-[#39ff14] hover:text-black transition-all duration-300 
            hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]">
            View My Work
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
        <svg 
          className="w-6 h-6 text-gray-400" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      <div 
        className="absolute inset-0 bg-black"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(57, 255, 20, 0.08), transparent 10%)`
        }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#333333 1px, transparent 1px), linear-gradient(to right, #333333 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
          }}
        />
      </div>
    </section>
  )
}

export default Hero 