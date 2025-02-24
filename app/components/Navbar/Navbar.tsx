'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import { handleSmoothScroll } from '@/app/utils/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { 
      label: 'about', 
      href: '/about',
      homeSection: 'about'
    },
    { 
      label: 'projects', 
      href: '/projects',
      homeSection: 'projects'
    },
    { 
      label: 'contact', 
      href: '/contact',
      homeSection: 'contact'
    },
    { 
      label: 'linkedin', 
      href: 'https://www.linkedin.com',
      className: 'text-[#39ff14]',
      external: true
    }
  ]

  const handleNavigation = (item: typeof menuItems[0]) => {
    setIsMenuOpen(false)
    
    if (item.external) {
      window.open(item.href, '_blank')
      return
    }

    // Navigate to route
    router.push(item.href)
  }

  useEffect(() => {
    if (!menuRef.current || !menuItemsRef.current) return

    const menu = menuRef.current
    const items = menuItemsRef.current

    if (isMenuOpen) {
      // Open animation
      gsap.set(menu, { display: 'flex' })
      gsap.fromTo(menu, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo(items,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.2 }
      )
    } else {
      // Close animation
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menu, { display: 'none' })
        }
      })
      tl.to(items, { y: 50, opacity: 0, duration: 0.3 })
        .to(menu, { opacity: 0, duration: 0.3 }, "-=0.1")
    }
  }, [isMenuOpen])

  const handleHomeClick = () => {
    // Close mobile menu if open
    setIsMenuOpen(false)
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-black/50 backdrop-blur-sm relative">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20 relative">
            {/* Brand Name */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="text-white font-bold text-2xl"
                onClick={handleHomeClick}
              >
                K B Venkataramana
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-10">
                {menuItems.map((item) => (
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                        item.className || 'text-gray-200 hover:text-[#39ff14]'
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => handleNavigation(item)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                        pathname === item.href 
                          ? 'text-[#39ff14]' 
                          : 'text-gray-200 hover:text-[#39ff14]'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white z-50 relative"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out top-3 ${
                      isMenuOpen ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
                    }`}
                  />
                </div>
              </button>
            </div>
            {/* Bottom Line */}
            <div className="absolute bottom-0 w-full h-[1px] bg-gray-600"></div>
          </div>
        </div>

        {/* Full Screen Mobile Menu */}
        <div
          ref={menuRef}
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black/90 backdrop-blur-md hidden lg:hidden z-40 flex-col items-center justify-center"
          style={{ 
            display: 'none',
            height: '100vh',
            position: 'fixed',
            top: 0
          }}
        >
          <div 
            ref={menuItemsRef} 
            className="flex flex-col items-center space-y-8"
          >
            {menuItems.map((item) => (
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-3xl font-medium transition-colors duration-300 ${
                    item.className || 'text-gray-200 hover:text-[#39ff14]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item)}
                  className={`text-3xl font-medium transition-colors duration-300 ${
                    pathname === item.href 
                      ? 'text-[#39ff14]' 
                      : 'text-gray-200 hover:text-[#39ff14]'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar 