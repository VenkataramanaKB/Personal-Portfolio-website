'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  width?: "fit-content" | "100%"
}

export default function ScrollReveal({ children, width = "fit-content" }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} style={{ width }} className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </div>
  )
} 