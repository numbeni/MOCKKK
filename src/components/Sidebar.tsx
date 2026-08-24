import { GameCategory } from '@/data/games';
import { Gamepad2, ShoppingBag, Settings, Ticket, X, LockKeyhole } from 'lucide-react';

interface SidebarProps {
  activeSection: GameCategory;
  onSelectSection: (section: GameCategory) => void;
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'all' as GameCategory, label: 'بازی‌ها', icon: <Gamepad2 className="h-5 w-5" />, enabled: true },
  { id: 'orders' as GameCategory, label: 'سفارش‌ها', icon: <ShoppingBag className="h-5 w-5" />, enabled: false },
  { id: 'settings' as GameCategory, label: 'تنظیمات', icon: <Settings className="h-5 w-5" />, enabled: false },
  { id: 'tickets' as GameCategory, label: 'تیکتینگ', icon: <Ticket className="h-5 w-5" />, enabled: false },
];

export default function Sidebar({ activeSection, onSelectSection, open, onClose }: SidebarProps) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-ink-950/70 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden />}
      <aside className={`fixed inset-y-0 right-0 z-40 flex w-72 flex-col border-l border-azure-400/10 bg-ink-900/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-azure-500 to-azure-700 shadow-glow">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-white">گیم‌پنل</h1>
              <p className="text-[11px] text-azure-100/50">مدیریت فروشگاه بازی</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-azure-100/60 hover:bg-ink-700 hover:text-white lg:hidden" aria-label="بستن منو"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 px-3 py-2">
          <p className="px-3 pb-3 pt-3 text-[11px] font-semibold uppercase tracking-wider text-azure-100/40">منوی اصلی</p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  disabled={!item.enabled}
                  onClick={() => { if (item.enabled) { onSelectSection(item.id); onClose(); } }}
                  className={`nav-link w-full ${activeSection === item.id ? 'nav-link-active' : ''} ${!item.enabled ? 'cursor-not-allowed opacity-40' : ''}`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="flex-1 text-right">{item.label}</span>
                  {!item.enabled && <LockKeyhole className="h-3.5 w-3.5 text-azure-100/40" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="m-3 rounded-2xl border border-azure-400/15 bg-gradient-to-br from-azure-700/40 to-ink-800/60 p-4">
          <p className="text-sm font-bold text-white">راهنمای پنل</p>
          <p className="mt-1 text-xs leading-5 text-azure-100/60">سفارش‌ها، تنظیمات و تیکتینگ به‌زودی فعال می‌شوند.</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-700"><div className="h-full w-1/4 rounded-full bg-accent-cyan" /></div>
          <p className="mt-2 text-[10px] text-azure-100/50">پیشرفت توسعه ۲۵٪</p>
        </div>
      </aside>
    </>
  );
}
