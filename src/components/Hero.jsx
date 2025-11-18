import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a09]/60 via-[#0b0a09]/80 to-[#0b0a09] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/10 bg-white/5 px-3 py-1 text-xs text-amber-100">
            Автодонат для Minecraft
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-amber-50">
            Янтарный магазин доната с плавными анимациями
          </h1>
          <p className="mt-4 text-amber-100/80 text-lg">
            Выбирайте товары, добавляйте в корзину и оформляйте покупку с промокодом. Современный UI, гладкие переходы и шустрая работа.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#donates" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-3 font-semibold text-[#0b0a09] shadow-md shadow-amber-500/30 hover:shadow-lg transition-all">
              Смотреть товары
            </a>
            <a href="#how" className="inline-flex items-center justify-center rounded-xl border border-amber-200/10 px-5 py-3 text-amber-100 hover:text-amber-50 hover:border-amber-200/20 transition-colors">
              Как это работает
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
