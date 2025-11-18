import { Menu, ShoppingCart } from "lucide-react";

export default function Navbar({ onOpenCart, itemsCount = 0 }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-14 items-center justify-between rounded-2xl border border-amber-200/10 bg-[#14110f]/80 backdrop-blur-xl px-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30" />
            <span className="text-amber-50 font-semibold tracking-tight">AutoDonate</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-amber-200/80">
            <a href="#donates" className="hover:text-amber-50 transition-colors">Донаты</a>
            <a href="#faq" className="hover:text-amber-50 transition-colors">FAQ</a>
            <a href="#contacts" className="hover:text-amber-50 transition-colors">Контакты</a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={onOpenCart} className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2 text-sm font-semibold text-[#0b0a09] shadow-md shadow-amber-500/30 hover:shadow-lg transition-shadow">
              <ShoppingCart size={18} />
              Корзина
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 grid place-items-center h-5 min-w-[20px] rounded-full bg-amber-500 text-[#0b0a09] text-xs font-bold px-1">
                  {itemsCount}
                </span>
              )}
            </button>
            <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200/10 text-amber-50/80">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
