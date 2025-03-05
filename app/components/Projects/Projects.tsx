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
    title: "MedScript",
    image: "/projects/images/medscript.png",
    longDesc: "MedScript is an innovative solution designed to revolutionize medical documentation. Our product generates comprehensive medical reports from surgical conversations, ensuring accuracy, efficiency, and security in medical record-keeping.",
    skills: ["NLP", "ASR", "LLM", "MongoDB"],
    link: "https://youtu.be/tx6mPJwum8g?si=PnfyKz7KMVru2npH"
  },
  {
    id: 2,
    title: "License Lens",
    image: "/projects/images/licenselens.png",
    longDesc: "Discover software licenses in plain language. A web app that scrapes license information and explains it using AI.",
    skills: ["Flask", "BeautifulSoup", "MistralAI", "React", "TailwindCSS"],
    link: "https://github.com/VenkataramanaKB/LicenseLens"
  },
  {
    id: 3,
    title: "Attack on Titan Quotes API",
    image: "/projects/images/aot.png",
    longDesc: "A simple and lightweight API that serves inspirational and memorable quotes from the popular anime Attack on Titan, along with the respective author.",
    skills: ["Express", "Node Js", "React"],
    link: "https://attackontitanquotes.vercel.app/"
  },
  {
    id: 4,
    title: "Automated Research Summary Generator",
    image: "/projects/images/research.png",
    longDesc: "Developed a web scrapping tool which is capable of generating a scholar's Resume based on publication and citation details from Google Scholar",
    skills: ["BeautifulSoup", "Streamlit", "Python"],
    link: "https://research-summary-generator.streamlit.app/"
  },
  {
    id: 5,
    title: "Computer vision based monitoring of Underloading of Coal Wagons",
    image: "/projects/images/wagon.png",
    longDesc: "An IoT device is designed to monitor the underloading of coal wagons and promptly notify the concerned authorities and payloaders. Utilizing advanced computer vision and TensorFlow, the system ensures precise monitoring and efficient communication.",
    skills: ["OpenCV", "TensorFlow"],
    link: "https://youtu.be/yVLwRLy26nk?si=jBd3oH1Qifpe8QuD"
  },
  {
    id: 6,
    title: "Gesture-Based Home Automation",
    image: "/projects/images/homeautomation.png",
    longDesc: "It is a home automation system leverages the power of computer vision and machine learning to create an intuitive, gesture-based interface for controlling household devices. By analyzing user gestures, specific processes such as turning on or off the lights can be seamlessly automated with a quick response time.",
    skills: ["OpenCV", "Serial Communication", "MediaPipe"],
    link: "https://github.com/VenkataramanaKB/Gesture-Based-Home-Automation"
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
      className={`relative min-h-[100dvh] ${isHomePage ? 'pt-0' : 'pt-32 md:pt-48'
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