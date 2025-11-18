import { useEffect, useState } from 'react'
import DonateCard from './DonateCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function DonateGrid() {
  const [items, setItems] = useState([])
  const [player, setPlayer] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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

  async function handleBuy(item) {
    if (!player) {
      setMessage('Введите никнейм игрока')
      return
    }
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player, rank_id: item.id })
      })
      const data = await res.json()
      if (data?.id) {
        // Simulate payment instantly
        const payRes = await fetch(`${API_BASE}/api/orders/${data.id}/pay`, { method: 'POST' })
        const payData = await payRes.json()
        if (payData.status === 'paid') {
          setMessage(`Оплата успешна! Выдан ранг ${item.name} для ${player}.`)
        } else {
          setMessage('Платеж не удался, попробуйте позже')
        }
      } else {
        setMessage('Ошибка создания заказа')
      }
    } catch (e) {
      setMessage('Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="donates" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Выберите донат</h2>
          <div className="flex items-center gap-3">
            <input
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              placeholder="Никнейм игрока"
              className="h-11 w-56 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
            <span className="text-xs text-slate-400">Ник нужен для выдачи привилегии</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <DonateCard key={item.id} item={item} onBuy={handleBuy} />
          ))}
        </div>

        {message && (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            {message}
          </div>
        )}
      </div>

      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-[1] opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[100px]" />
      </div>
    </section>
  )
}
