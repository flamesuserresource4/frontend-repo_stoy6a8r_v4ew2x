import { Menu, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl px-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30" />
            <span className="text-white font-semibold tracking-tight">AutoDonate</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#donates" className="hover:text-white transition-colors">Донаты</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contacts" className="hover:text-white transition-colors">Контакты</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#donates" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md shadow-cyan-500/30 hover:shadow-lg transition-shadow">
              <ShoppingCart size={18} />
              Купить донат
            </a>
            <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/80">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
