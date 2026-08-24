import { useMemo, useState } from 'react';
import { Bell, ChevronLeft, ChevronRight, Gamepad2, Menu, Search, SlidersHorizontal, X } from 'lucide-react';
import { alphabet, games, Game, GameCategory, GamePlatform, platforms } from '@/data/games';
import Sidebar from '@/components/Sidebar';
import GameCard from '@/components/GameCard';

const PAGE_SIZE = 6;

export default function App() {
  const [activeSection, setActiveSection] = useState<GameCategory>('all');
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState('همه');
  const [platform, setPlatform] = useState<GamePlatform | 'همه'>('همه');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [menuGameId, setMenuGameId] = useState<string | null>(null);
  const [gameList, setGameList] = useState<Game[]>(games);

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('en');
    return gameList.filter((game) => {
      const matchesQuery = !normalizedQuery || game.title.toLocaleLowerCase('en').includes(normalizedQuery);
      const matchesLetter = letter === 'PIN' ? game.pinned : letter === '0-9' ? /^\d/.test(game.title) : letter === 'همه' ? true : game.title.toLocaleUpperCase('en').startsWith(letter);
      const matchesPlatform = platform === 'همه' || game.platform === platform;
      return matchesQuery && matchesLetter && matchesPlatform;
    });
  }, [gameList, letter, platform, query]);

  const pageCount = Math.max(1, Math.ceil(filteredGames.length / PAGE_SIZE));
  const visibleGames = filteredGames.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateQuery(value: string) { setQuery(value); setPage(1); }
  function updateLetter(value: string) { setLetter(value); setPage(1); }
  function updatePlatform(value: GamePlatform | 'همه') { setPlatform(value); setPage(1); }
  function toggleActive(game: Game) { setGameList((list) => list.map((item) => item.id === game.id ? { ...item, active: !item.active } : item)); }
  function togglePinned(game: Game) { setGameList((list) => list.map((item) => item.id === game.id ? { ...item, pinned: !item.pinned } : item)); }
  function deleteGame(game: Game) { setGameList((list) => list.filter((item) => item.id !== game.id)); }
  function openMenu(game: Game) { setMenuGameId((current) => current === game.id ? null : game.id); }

  return (
    <div className="flex min-h-screen bg-ink-950 text-white" onClick={() => setMenuGameId(null)}>
      <Sidebar activeSection={activeSection} onSelectSection={setActiveSection} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-azure-400/10 bg-ink-950/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="icon-button lg:hidden" aria-label="باز کردن منو"><Menu className="h-5 w-5" /></button>
              <div className="hidden sm:block"><p className="text-xs text-azure-100/45">مدیریت فروشگاه</p><h2 className="text-base font-extrabold text-white">بازی‌ها</h2></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden w-64 md:block"><Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-azure-100/40" /><input value={query} onChange={(e) => updateQuery(e.target.value)} placeholder="جستجو در بازی‌ها..." className="field w-full pr-10" /></div>
              <button className="icon-button relative" aria-label="اعلان‌ها"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-cyan" /></button>
              <div className="hidden items-center gap-2 border-r border-azure-400/10 pr-3 sm:flex"><div className="avatar">ر</div><div className="leading-tight"><p className="text-xs font-bold">رضا احمدی</p><p className="text-[10px] text-azure-100/45">مدیر سیستم</p></div></div>
            </div>
          </div>
          <div className="px-4 pb-3 sm:hidden"><div className="relative"><Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-azure-100/40" /><input value={query} onChange={(e) => updateQuery(e.target.value)} placeholder="جستجو در بازی‌ها..." className="field w-full pr-10" /></div></div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-7 sm:py-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div><p className="mb-2 text-sm text-azure-100/50">خانه / مدیریت</p><h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">بازی‌ها</h1><p className="mt-2 text-sm text-azure-100/55">بازی‌های فروشگاه خود را مدیریت و مشاهده کنید.</p></div>
              <div className="flex items-center gap-2 rounded-xl border border-azure-400/10 bg-ink-800/60 px-3 py-2 text-xs text-azure-100/70"><span className="h-2 w-2 rounded-full bg-emerald-400" />{gameList.filter((game) => game.active).length} بازی فعال از {gameList.length}</div>
            </div>

            <section className="panel mb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-azure-400/10 px-4 py-4 sm:px-5"><div><h3 className="text-sm font-bold">فهرست بازی‌ها</h3><p className="mt-1 text-xs text-azure-100/45">{filteredGames.length} نتیجه مطابق فیلترهای شما</p></div><button className="icon-button" aria-label="فیلترهای بیشتر"><SlidersHorizontal className="h-4 w-4" /></button></div>
              <div className="overflow-x-auto px-4 py-3 sm:px-5"><div className="flex min-w-max items-center gap-1.5" dir="ltr"><span className="ml-2 text-xs text-azure-100/45" dir="rtl">حروف:</span>{alphabet.map((item) => <button key={item} onClick={() => updateLetter(item)} className={`alphabet-button ${letter === item ? 'alphabet-active' : ''}`}>{item}</button>)}</div></div>
              <div className="flex flex-wrap items-center gap-2 border-t border-azure-400/10 px-4 py-3 sm:px-5"><span className="ml-1 text-xs text-azure-100/45">پلتفرم:</span><button onClick={() => updatePlatform('همه')} className={`filter-pill ${platform === 'همه' ? 'filter-pill-active' : ''}`}>همه</button>{platforms.map((item) => <button key={item} onClick={() => updatePlatform(item)} className={`filter-pill ${platform === item ? 'filter-pill-active' : ''}`}>{item}</button>)}</div>
            </section>

            {visibleGames.length ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{visibleGames.map((game) => <GameCard key={game.id} game={game} menuOpen={menuGameId === game.id} onOpen={setSelectedGame} onMenu={openMenu} onToggleActive={toggleActive} onTogglePinned={togglePinned} onDelete={deleteGame} />)}</div> : <EmptyState onReset={() => { updateQuery(''); updateLetter('همه'); updatePlatform('همه'); }} />}

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-azure-100/45">نمایش {visibleGames.length} از {filteredGames.length} بازی</p><div className="flex items-center gap-2"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="pagination-arrow" aria-label="صفحه قبل"><ChevronRight className="h-4 w-4" /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => setPage(number)} className={`pagination-number ${page === number ? 'pagination-active' : ''}`}>{number}</button>)}<button onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} className="pagination-arrow" aria-label="صفحه بعد"><ChevronLeft className="h-4 w-4" /></button></div></div>
          </div>
        </main>
      </div>
      {selectedGame && <ProductPage game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) { return <div className="panel flex flex-col items-center justify-center py-20 text-center"><Gamepad2 className="mb-4 h-12 w-12 text-azure-100/25" /><h3 className="font-bold">بازی‌ای پیدا نشد</h3><p className="mt-2 text-sm text-azure-100/50">فیلترها یا عبارت جستجو را تغییر دهید.</p><button onClick={onReset} className="mt-5 rounded-xl bg-azure-500 px-4 py-2 text-xs font-bold">حذف فیلترها</button></div> }

function ProductPage({ game, onClose }: { game: Game; onClose: () => void }) { return <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-950/95 p-4 backdrop-blur-md sm:p-8"><div className="mx-auto max-w-4xl"><button onClick={onClose} className="mb-5 flex items-center gap-2 text-sm text-azure-100/65 hover:text-white"><ChevronRight className="h-4 w-4" />بازگشت به فهرست بازی‌ها</button><div className="panel overflow-hidden"><div className="relative h-64 sm:h-80"><img src={game.cover} alt={game.title} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" /><button onClick={onClose} className="icon-button absolute left-4 top-4"><X className="h-5 w-5" /></button><div className="absolute bottom-5 right-6"><div className="flex gap-2"><span className="badge badge-platform">{game.platform}</span><span className={`badge ${game.active ? 'badge-active' : 'badge-inactive'}`}>{game.active ? 'فعال' : 'غیرفعال'}</span>{game.pinned && <span className="badge bg-amber-400 text-amber-950">PIN</span>}</div><h1 className="mt-3 text-3xl font-extrabold" dir="ltr">{game.title}</h1></div></div><div className="grid gap-8 p-6 sm:grid-cols-[1fr_260px] sm:p-8"><div><h2 className="text-lg font-bold">درباره بازی</h2><p className="mt-3 text-sm leading-8 text-azure-100/65">{game.title} یک عنوان از بازی‌های فروشگاه است. این صفحه به‌عنوان صفحه محصول بازی، اطلاعات کامل عنوان، پلتفرم، وضعیت انتشار و تعداد اکانت‌های آن را در اختیار شما قرار می‌دهد.</p></div><div className="space-y-3"><Info label="پلتفرم" value={game.platform} /><Info label="وضعیت" value={game.active ? 'فعال' : 'غیرفعال'} /><Info label="PIN" value={game.pinned ? 'بله' : 'خیر'} /><Info label="تعداد اکانت‌ها" value={String(game.accountCount)} /></div></div></div></div></div> }
function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-azure-400/10 bg-ink-800/60 p-3"><p className="text-[11px] text-azure-100/45">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div> }
