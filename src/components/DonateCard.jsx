import { motion } from 'framer-motion'
import { Crown, Gem, Star } from 'lucide-react'

const iconMap = { Crown, Gem, Star }

export default function DonateCard({ item, onAdd }) {
  const Icon = iconMap[item.icon] || Star
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-2xl border ${item.popular ? 'border-amber-400/50' : 'border-amber-200/10'} bg-[#14110f]/70 backdrop-blur-md p-6`}
      style={{ boxShadow: item.popular ? '0 10px 50px -12px rgba(245,158,11,0.35)' : undefined }}
    >
      {item.popular && (
        <span className="absolute -top-3 right-4 rounded-full bg-amber-400 text-[#0b0a09] text-xs font-bold px-2 py-1 shadow">
          Популярный
        </span>
      )}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-xl" style={{ background: `#f59e0b22`, color: item.color || '#f59e0b' }}>
          <Icon size={20} />
        </div>
        <h3 className="text-xl font-bold text-amber-50">{item.name}</h3>
      </div>
      <p className="mt-3 text-sm text-amber-100/70">{item.description}</p>

      <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
        {item.perks?.map((perk, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <div className="text-3xl font-extrabold tracking-tight text-amber-50">{item.price}₽</div>
          <div className="text-xs text-amber-200/60">Единовременно</div>
        </div>
        <button
          onClick={() => onAdd(item)}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2 font-semibold text-[#0b0a09] shadow-md shadow-amber-500/30 hover:shadow-lg transition-all"
        >
          В корзину
        </button>
      </div>
    </motion.div>
  )
}
