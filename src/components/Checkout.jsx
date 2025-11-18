import { useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout({ cart, onClearCart }) {
  const [player, setPlayer] = useState('')
  const [email, setEmail] = useState('')
  const [promo, setPromo] = useState('')
  const [promoInfo, setPromoInfo] = useState(null)
  const [server, setServer] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const subtotal = useMemo(() => cart.reduce((a, i) => a + i.price * i.quantity, 0), [cart])
  const total = useMemo(() => {
    if (!promoInfo?.active) return subtotal
    return Math.max(0, +(subtotal * (1 - promoInfo.discount_percent / 100)).toFixed(2))
  }, [subtotal, promoInfo])

  async function applyPromo() {
    if (!promo) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API_BASE}/api/promos/${promo}`)
      if (!res.ok) throw new Error('Promo not found')
      const data = await res.json()
      setPromoInfo(data)
    } catch {
      setPromoInfo(null)
      setMessage('Промокод не найден или неактивен')
    } finally {
      setLoading(false)
    }
  }

  async function handlePay() {
    if (!player) {
      setMessage('Введите никнейм игрока')
      return
    }
    if (cart.length === 0) {
      setMessage('Корзина пуста')
      return
    }

    setLoading(true)
    setMessage('')
    try {
      const items = cart.map(i => ({ rank_id: i.id, quantity: i.quantity }))
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player,
          items,
          email: email || undefined,
          server: server || undefined,
          promo_code: promoInfo?.active ? promo : undefined,
        })
      })
      const order = await res.json()
      if (!res.ok) throw new Error(order?.detail || 'Ошибка создания заказа')

      const payRes = await fetch(`${API_BASE}/api/orders/${order.id}/pay`, { method: 'POST' })
      const payData = await payRes.json()
      if (payData.status === 'paid') {
        setMessage('Оплата успешна! Привилегии будут выданы в ближайшее время.')
        onClearCart?.()
      } else {
        setMessage('Платеж не удался, попробуйте позже')
      }
    } catch (e) {
      setMessage(e.message || 'Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="checkout" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-amber-200/10 bg-[#14110f]/70 p-6">
          <h3 className="text-2xl font-bold text-amber-50">Оформление</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-amber-200/80">Никнейм игрока</label>
                <input value={player} onChange={(e) => setPlayer(e.target.value)} placeholder="Player123" className="mt-1 h-11 w-full rounded-xl border border-amber-200/10 bg-[#0f0e0d] px-4 text-amber-50 placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400/30" />
              </div>
              <div>
                <label className="text-sm text-amber-200/80">Email (для чека, необязательно)</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="mt-1 h-11 w-full rounded-xl border border-amber-200/10 bg-[#0f0e0d] px-4 text-amber-50 placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400/30" />
              </div>
              <div>
                <label className="text-sm text-amber-200/80">Сервер (если несколько)</label>
                <input value={server} onChange={(e) => setServer(e.target.value)} placeholder="Survival" className="mt-1 h-11 w-full rounded-xl border border-amber-200/10 bg-[#0f0e0d] px-4 text-amber-50 placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400/30" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="text-sm text-amber-200/80">Промокод</label>
                  <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="START" className="mt-1 h-11 w-full rounded-xl border border-amber-200/10 bg-[#0f0e0d] px-4 text-amber-50 placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400/30" />
                </div>
                <button onClick={applyPromo} disabled={loading} className="h-11 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-[#0b0a09] font-semibold disabled:opacity-60">Применить</button>
              </div>
              <div className="rounded-xl border border-amber-200/10 p-4 text-amber-200/80">
                <div className="flex items-center justify-between"><span>Сумма</span><span>{subtotal}₽</span></div>
                {promoInfo?.active && (
                  <div className="flex items-center justify-between text-emerald-400"><span>Скидка ({promoInfo.discount_percent}%)</span><span>-{(subtotal - total).toFixed(2)}₽</span></div>
                )}
                <div className="mt-2 flex items-center justify-between text-amber-50 font-bold text-lg"><span>Итого</span><span>{total}₽</span></div>
              </div>
              <button onClick={handlePay} disabled={loading} className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-[#0b0a09] font-semibold shadow-md shadow-amber-500/30 hover:shadow-lg transition-all disabled:opacity-60">
                {loading ? 'Обработка...' : 'Оплатить'}
              </button>
              {message && <div className="text-sm text-amber-100/80">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
