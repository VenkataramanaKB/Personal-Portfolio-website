'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useWindowSize } from '@/app/hooks/useWindowSize'
import ScrollReveal from '../ScrollReveal'
import { usePathname } from 'next/navigation'

interface Project {
  id: number
  title: string
  image: string
  longDesc: string
  skills: string[]
  link: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    image: "/projects/ecommerce.jpg",
    longDesc: "A comprehensive e-commerce platform built with Next.js and Node.js...",
    skills: ["Next.js", "Node.js", "MongoDB", "Stripe", "TailwindCSS"],
    link: "https://github.com/yourusername/project"
  },
  {
    id: 2,
    title: "Social Media App",
    image: "/projects/social.jpg",
    longDesc: "A modern social media application with real-time messaging...",
    skills: ["React", "Firebase", "Socket.io", "TailwindCSS"],
    link: "https://github.com/yourusername/project"
  },
  {
    id: 3,
    title: "Portfolio Website",
    image: "/projects/portfolio.jpg",
    longDesc: "An interactive portfolio website showcasing projects...",
    skills: ["Next.js", "GSAP", "TailwindCSS", "Framer Motion"],
    link: "https://github.com/yourusername/project"
  },
  {
    id: 4,
    title: "Task Management",
    image: "/projects/tasks.jpg",
    longDesc: "A task management system with team collaboration features...",
    skills: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    link: "https://github.com/yourusername/project"
  },
  {
    id: 5,
    title: "AI Chat Application",
    image: "/projects/chat.jpg",
    longDesc: "An AI-powered chat application using OpenAI's GPT model...",
    skills: ["Python", "FastAPI", "OpenAI", "React"],
    link: "https://github.com/yourusername/project"
  }
]

export default function Projects() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { width } = useWindowSize()
  const isLargeScreen = width ? width >= 1024 : false  // lg breakpoint is 1024px
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const modalBgRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (hoveredProject && previewRef.current) {
      gsap.fromTo(previewRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.2 }
      )
    }
  }, [hoveredProject])

  useEffect(() => {
    if (selectedProject) {
      // Open modal animation
      document.body.style.overflow = 'hidden'
      gsap.to(modalBgRef.current, {
        opacity: 1,
        duration: 0.3,
        display: 'block'
      })
      gsap.fromTo(detailsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
    } else {
      // Close modal animation
      document.body.style.overflow = 'auto'
      gsap.to(detailsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.2
      })
      gsap.to(modalBgRef.current, {
        opacity: 0,
        duration: 0.2,
        delay: 0.1,
        display: 'none'
      })
    }
  }, [selectedProject])

  const handleProjectHover = (project: Project | null) => {
    if (isLargeScreen) {
      setHoveredProject(project)
    }
  }

  return (
    <section 
      className={`relative min-h-[100dvh] ${
        isHomePage ? 'pt-0' : 'pt-32 md:pt-48'
      } pb-20 md:pb-32 px-4`} 
      id="projects"
    >
      {/* Gradient Background - Move this to the top but behind content */}
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

      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal width="100%">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 md:mb-20 text-center">
            Projects
          </h2>
        </ScrollReveal>
        
        {/* Project Cards */}
        <div className="flex flex-col gap-4 mb-20 md:mb-32">
          {projects.map((project) => (
            <ScrollReveal key={project.id} width="100%">
              <div
                className="relative"
              >
                <div
                  onMouseEnter={() => handleProjectHover(project)}
                  onMouseLeave={() => handleProjectHover(null)}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative h-24 md:h-28 bg-[#1E1E1E] rounded-xl overflow-hidden cursor-pointer 
                    ${isLargeScreen ? 'hover:bg-[#2D2D2D]' : ''} transition-all duration-300 flex items-center`}
                >
                  {/* Image */}
                  <div className="relative h-full aspect-square">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Title and Tech Stack */}
                  <div className="flex-1 px-4 md:px-6">
                    <h3 className={`text-lg md:text-xl font-bold text-white 
                      ${isLargeScreen ? 'group-hover:text-[#39ff14]' : ''} 
                      transition-colors mb-1 md:mb-2 line-clamp-1`}
                    >
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {project.skills.slice(0, isLargeScreen ? 3 : 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs bg-black/30 text-gray-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > (isLargeScreen ? 3 : 2) && (
                        <span className="px-2 py-1 text-xs text-gray-400">
                          +{project.skills.length - (isLargeScreen ? 3 : 2)} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className={`ml-auto mr-3 md:mr-6 
                    ${isLargeScreen ? 'opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0' : 'opacity-100'} 
                    transition-all duration-300`}
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-[#39ff14]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Preview Popup - Only show on large screens */}
                {isLargeScreen && hoveredProject?.id === project.id && (
                  <div
                    ref={previewRef}
                    className="absolute left-full ml-4 top-0 w-64 bg-[#1E1E1E] rounded-xl overflow-hidden shadow-xl"
                    style={{ opacity: 0 }}
                  >
                    <div className="relative h-36">
                      <Image
                        src={hoveredProject.image}
                        alt={hoveredProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {hoveredProject.longDesc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Modal Overlay */}
        <div
          ref={modalBgRef}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden"
          style={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <div className="min-h-screen px-4 py-10 md:py-0 flex items-center justify-center modal-scroll">
            {selectedProject && (
              <div
                ref={detailsRef}
                className="w-full max-w-2xl bg-[#1E1E1E] rounded-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative h-48 md:h-64">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black rounded-full text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm md:text-base">
                    {selectedProject.longDesc}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-base md:text-lg font-semibold text-white mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs md:text-sm bg-gray-800 text-gray-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 text-sm font-bold bg-[#39ff14] text-black rounded-full hover:bg-[#39ff14]/90 transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 