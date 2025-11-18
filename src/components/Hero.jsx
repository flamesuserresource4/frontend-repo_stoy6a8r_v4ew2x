import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/50 to-slate-950 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
            Автодонат для Minecraft
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Красивый магазин доната с мгновенной оплатой
          </h1>
          <p className="mt-4 text-slate-300 text-lg">
            Принимайте платежи, выдавайте привилегии и радуйте игроков. Современный дизайн, плавные анимации и удобный UX.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#donates" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-900 shadow-md shadow-cyan-500/30 hover:shadow-lg transition-all">
              Смотреть донаты
            </a>
            <a href="#how" className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-white/80 hover:text-white hover:border-white/20 transition-colors">
              Как это работает
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
