'use client'

import { useState, useEffect } from 'react'

const bootMessages = [
  "Initializing portfolio system...",
  "Running security checks...",
  "[ WARNING ] You're about to experience something cool!",
  "Loading creative modules...",
  "Injecting caffeine into system...",
  "Compiling awesome projects...",
  "[ ALERT ] Preparing to blow your mind...",
  "Starting awesomeness engine...",
  "Portfolio launch in 3... 2... 1..."
]

export default function Loader({ onLoadComplete }: { onLoadComplete: () => void }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 50)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentMessage >= bootMessages.length) {
      onLoadComplete()
      return
    }

    const message = bootMessages[currentMessage]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setCurrentText(message.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setCurrentMessage(prev => prev + 1)
        setCurrentText('')
      }
    }, 1)

    return () => clearInterval(typeInterval)
  }, [currentMessage, onLoadComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 font-mono flex items-center justify-center">
      <div className="max-w-3xl w-full p-8">
        <div className="text-[#39ff14] text-sm md:text-base space-y-2">
          <div className="mb-6 text-center">
            <p className="text-xl md:text-2xl text-[#39ff14] mb-2">Welcome to my digital space!</p>
            <p className="text-gray-400 text-sm">System boot in progress...</p>
          </div>
          
          {bootMessages.slice(0, currentMessage).map((message, index) => (
            <div key={index} className="mb-2">
              {message.includes("WARNING") || message.includes("ALERT") ? (
                <span className="text-yellow-500 mr-2">[!]</span>
              ) : (
                <span className="text-gray-500 mr-2">[~]</span>
              )}
              <span className={message.includes("WARNING") || message.includes("ALERT") ? 
                "text-yellow-500" : "text-[#39ff14]"}>
                {message}
              </span>
            </div>
          ))}
          <div className="mb-2">
            <span className="text-gray-500 mr-2">{'[>]'}</span>
            {currentText}
            {showCursor && <span className="opacity-100">_</span>}
          </div>
        </div>
      </div>
    </div>
  )
} 