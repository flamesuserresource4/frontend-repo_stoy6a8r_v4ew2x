import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DonateGrid from './components/DonateGrid'
import HowItWorks from './components/HowItWorks'
import CartPanel from './components/CartPanel'
import Checkout from './components/Checkout'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([]) // {id, name, price, color, icon, quantity}

  const itemsCount = useMemo(() => cart.reduce((a, i) => a + i.quantity, 0), [cart])

  function addToCart(item) {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id)
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  function setQuantity(id, qty) {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <div className="min-h-screen bg-[#0b0a09] text-amber-50">
      <Navbar onOpenCart={() => setCartOpen(true)} itemsCount={itemsCount} />
      <Hero />
      <main className="relative z-10">
        <DonateGrid onAddToCart={addToCart} />
        <HowItWorks />
        <Checkout cart={cart} onClearCart={clearCart} />
        <footer id="contacts" className="py-16 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 text-amber-200/70 text-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© {new Date().getFullYear()} AutoDonate. Все права защищены.</p>
              <p className="text-amber-200/60">Поддержка: admin@example.com</p>
            </div>
          </div>
        </footer>
      </main>

      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        setQuantity={setQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  )
}

export default App
