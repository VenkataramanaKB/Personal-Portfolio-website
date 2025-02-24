'use client'

import { useEffect, useState } from 'react'
import ScrollReveal from '../ScrollReveal'
import Image from 'next/image'

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

      <div className="relative z-10 px-4 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <ScrollReveal>
            <div className="w-64 h-64 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              <Image
                src="/myphoto.png"
                alt="K B Venkataramana"
                width={500}
                height={500}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </ScrollReveal>

          <div className="flex-1 flex flex-col items-center">
            <ScrollReveal>
              <div className="mb-4 text-center">
                <p className="text-2xl md:text-3xl text-gray-400 font-light font-space-grotesk">
                  Hey there! I'm
                </p>
              </div>
              <div className="mb-6 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#39ff14] to-emerald-500 text-transparent bg-clip-text whitespace-nowrap font-space-grotesk">
                  K B Venkataramana
                </h1>
                <p className="text-xl text-gray-400 mt-4 font-space-grotesk">
                  Software Developer
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-4 text-center">
                <p className="text-xl md:text-2xl text-gray-300 font-space-grotesk">
                  Turning coffee into code and ideas into reality. 
                  <br className="hidden md:block" />
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Background */}
      <div 
        className="absolute inset-0 bg-black z-0"
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