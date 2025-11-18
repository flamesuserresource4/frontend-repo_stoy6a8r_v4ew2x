import { motion } from 'framer-motion'
import { ShieldCheck, Zap, CreditCard } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { icon: Zap, title: 'Моментальная покупка', text: 'Выбираете донат, вводите ник и оплачиваете за пару кликов.' },
    { icon: CreditCard, title: 'Безопасная оплата', text: 'Оплата через проверенные платежные сервисы.' },
    { icon: ShieldCheck, title: 'Автовыдача', text: 'После оплаты привилегия автоматически выдается на сервере.' },
  ]

  return (
    <section id="how" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Как это работает</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-900">
                <s.icon size={18} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
