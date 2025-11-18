import { motion } from 'framer-motion'
import { Crown, Gem, Star } from 'lucide-react'

const iconMap = { Crown, Gem, Star }

export default function DonateCard({ item, onBuy }) {
  const Icon = iconMap[item.icon] || Star
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-2xl border ${item.popular ? 'border-cyan-400/50' : 'border-white/10'} bg-white/5 backdrop-blur-md p-6`}
      style={{ boxShadow: item.popular ? '0 10px 50px -12px rgba(34,211,238,0.35)' : undefined }}
    >
      {item.popular && (
        <span className="absolute -top-3 right-4 rounded-full bg-cyan-400 text-slate-900 text-xs font-bold px-2 py-1 shadow">
          Популярный
        </span>
      )}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-xl" style={{ background: `${item.color}22`, color: item.color }}>
          <Icon size={20} />
        </div>
        <h3 className="text-xl font-bold text-white">{item.name}</h3>
      </div>
      <p className="mt-3 text-sm text-slate-300/90">{item.description}</p>

      <ul className="mt-4 space-y-2 text-sm text-slate-200/90">
        {item.perks?.map((perk, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color }} />
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <div className="text-3xl font-extrabold tracking-tight text-white">{item.price}₽</div>
          <div className="text-xs text-slate-400">Единовременно</div>
        </div>
        <button
          onClick={() => onBuy(item)}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 font-semibold text-slate-900 shadow-md shadow-cyan-500/30 hover:shadow-lg transition-all"
        >
          Купить
        </button>
      </div>
    </motion.div>
  )
}
