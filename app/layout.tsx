'use client'

import { useState, useEffect } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-black`}
      >
        {isLoading ? (
          <Loader onLoadComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  )
}
