import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'

export default function CartPanel({ open, onClose, cart, setQuantity, removeFromCart }) {
  const subtotal = cart.reduce((a, i) => a + i.price * i.quantity, 0)
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-[#14110f] border-l border-amber-200/10 shadow-2xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-amber-200/10">
            <h3 className="text-lg font-semibold text-amber-50">Корзина</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-amber-200">
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {cart.length === 0 && <p className="text-amber-200/70">Корзина пустая</p>}
            {cart.map((item) => (
              <div key={item.id} className="flex items-start gap-4 rounded-xl border border-amber-200/10 p-4">
                <div className="h-10 w-10 rounded-xl" style={{ background: `#f59e0b22` }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-amber-50">{item.name}</div>
                      <div className="text-xs text-amber-200/70">{item.price}₽ / шт.</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-amber-200/60 hover:text-amber-50">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2">
                    <button onClick={() => setQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-lg border border-amber-200/10">-</button>
                    <span className="min-w-[2ch] text-center">{item.quantity}</span>
                    <button onClick={() => setQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-lg border border-amber-200/10">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-amber-200/10">
            <div className="flex items-center justify-between text-amber-200/80">
              <span>Сумма</span>
              <span className="font-semibold text-amber-50">{subtotal}₽</span>
            </div>
            <a href="#checkout" onClick={onClose} className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-3 font-semibold text-[#0b0a09] shadow-md shadow-amber-500/30 hover:shadow-lg transition-all">
              Перейти к оформлению
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
