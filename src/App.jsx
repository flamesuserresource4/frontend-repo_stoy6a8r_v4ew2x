import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DonateGrid from './components/DonateGrid'
import HowItWorks from './components/HowItWorks'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <main className="relative z-10">
        <DonateGrid />
        <HowItWorks />
        <footer id="contacts" className="py-16 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 text-slate-300 text-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© {new Date().getFullYear()} AutoDonate. Все права защищены.</p>
              <p className="text-slate-400">Поддержка: admin@example.com</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App