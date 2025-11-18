import { useEffect, useState } from 'react'
import DonateCard from './DonateCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function DonateGrid({ onAddToCart }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/ranks`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  return (
    <section id="donates" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-50">Выберите донат</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <DonateCard key={item.id} item={item} onAdd={onAddToCart} />
          ))}
        </div>
      </div>

      {/* subtle amber glow */}
      <div className="pointer-events-none absolute inset-0 -z-[1] opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
      </div>
    </section>
  )
}
