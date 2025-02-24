'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../ScrollReveal'
import { usePathname } from 'next/navigation'

export default function Contact() {
  const pathname = usePathname()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const socialLinks = [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/venkataramanakb',
      color: '#333',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      description: "Check out my open source projects and contributions"
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/venkataramanakb/',
      color: '#0077B5',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      description: "Connect with me professionally and explore my work experience"
    },
    {
      id: 'twitter',
      label: 'X (Twitter)',
      href: 'https://x.com/encryptedvenkat',
      color: '#1DA1F2',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      description: "Follow me for tech insights and updates"
    }
  ]

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
    <section className={`relative ${
      pathname === '/' ? 'min-h-fit pt-0 pb-40' : 'min-h-[100dvh] pt-32 md:pt-48 pb-20 md:pb-32'
    } px-4`} id="contact">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-black z-0"
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

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal width="100%">
          <h2 className="text-4xl font-bold text-white mb-24 text-center">
            Let's Connect
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 place-items-center">
          {socialLinks.map((link) => (
            <ScrollReveal key={link.id}>
              <div
                className="relative w-[300px]"
                onMouseEnter={() => setHoveredCard(link.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-[#1E1E1E] rounded-xl p-8 min-h-[200px] transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] flex items-center">
                    <div className="flex flex-col items-center text-center space-y-4 w-full">
                      <motion.div
                        animate={{
                          rotate: hoveredCard === link.id ? 360 : 0
                        }}
                        transition={{ duration: 0.6 }}
                        className="text-gray-400 hover:text-[#39ff14] transition-colors"
                      >
                        {link.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold text-white">{link.label}</h3>
                      <p className="text-gray-400 text-sm">{link.description}</p>
                    </div>
                  </div>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
} 