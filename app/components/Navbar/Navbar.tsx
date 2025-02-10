'use client'

import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'about', href: '#about' },
    { label: 'projects', href: '#projects' },
    { label: 'contact', href: '#contact' },
    { 
      label: 'linkedin', 
      href: 'https://www.linkedin.com', // Replace with your LinkedIn URL
      className: 'text-[#39ff14]' 
    }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* Brand Name */}
            <div className="flex-shrink-0">
              <a href="/" className="text-white font-bold text-2xl">
                K B Venkataramana
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'linkedin' ? '_blank' : undefined}
                    rel={item.label === 'linkedin' ? 'noopener noreferrer' : undefined}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      item.className || 'text-gray-200 hover:text-[#39ff14]'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute w-full h-0.5 bg-current transform transition-all duration-200 ease-in-out ${
                      isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-current transform transition-all duration-200 ease-in-out top-3 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-current transform transition-all duration-200 ease-in-out ${
                      isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                    }`}
                  />
                </div>
              </button>
            </div>
            {/* Bottom Line */}
            <div className="absolute bottom-0 w-full h-[1px] bg-gray-600"></div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === 'linkedin' ? '_blank' : undefined}
                rel={item.label === 'linkedin' ? 'noopener noreferrer' : undefined}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  item.className || 'text-gray-200 hover:text-[#39ff14]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar 