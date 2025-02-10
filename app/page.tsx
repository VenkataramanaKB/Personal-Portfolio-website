import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      {/* Other content */}
    </main>
  )
}