import { Game } from '@/data/games';
import { ArrowUpLeft, MoreVertical, Pencil, Pin, Power, Trash2 } from 'lucide-react';

interface GameCardProps {
  game: Game;
  menuOpen: boolean;
  onOpen: (game: Game) => void;
  onMenu: (game: Game) => void;
  onToggleActive: (game: Game) => void;
  onTogglePinned: (game: Game) => void;
  onDelete: (game: Game) => void;
}

export default function GameCard({ game, menuOpen, onOpen, onMenu, onToggleActive, onTogglePinned, onDelete }: GameCardProps) {
  function stop(event: React.MouseEvent) { event.stopPropagation(); }

  return (
    <article className="game-card group" onContextMenu={(event) => { event.preventDefault(); onMenu(game); }}>
      <div className="relative aspect-[16/9] overflow-visible rounded-t-[18px] bg-ink-700">
        <button onClick={() => onOpen(game)} className="absolute inset-0 z-0 overflow-hidden rounded-t-[18px] text-right" aria-label={`مشاهده ${game.title}`}>
          <img src={game.cover} alt={game.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/10" />
        </button>
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <span className="badge badge-platform">{game.platform}</span>
          <span className={`badge ${game.active ? 'badge-active' : 'badge-inactive'}`}><span className={`h-1.5 w-1.5 rounded-full ${game.active ? 'bg-emerald-300' : 'bg-slate-400'}`} />{game.active ? 'فعال' : 'غیرفعال'}</span>
        </div>
        {menuOpen && <GameMenu game={game} onClose={() => onMenu(game)} onToggleActive={() => onToggleActive(game)} onTogglePinned={() => onTogglePinned(game)} onDelete={() => onDelete(game)} />}
        <div className="pointer-events-none absolute bottom-3 right-3 left-3 flex items-end justify-between">
          <h3 className="text-lg font-extrabold text-white drop-shadow-lg" dir="ltr">{game.title}</h3>
          {game.pinned && <span className="badge bg-amber-400 text-amber-950">PIN</span>}
        </div>
      </div>
      <div className="px-4 py-3.5">
        <div className="mb-3 flex items-center justify-between rounded-xl border border-azure-400/10 bg-ink-900/45 px-3 py-2.5"><span className="text-xs text-azure-100/55">تعداد اکانت‌ها</span><span className="text-sm font-extrabold text-white">{game.accountCount}</span></div>
        <div className="flex items-center gap-2">
          <button onClick={(event) => { stop(event); onMenu(game); }} className="card-action-button" aria-label="گزینه‌های بازی"><MoreVertical className="h-4 w-4" /></button>
          <button onClick={(event) => { stop(event); onOpen(game); }} className="card-action-button" aria-label="ویرایش بازی"><Pencil className="h-4 w-4" /></button>
          <button onClick={(event) => { stop(event); onOpen(game); }} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-azure-600 to-sky-400 py-2.5 text-xs font-bold text-white transition hover:brightness-110">اکانت‌ها <ArrowUpLeft className="h-4 w-4" /></button>
        </div>
      </div>
    </article>
  );
}

function GameMenu({ game, onClose, onToggleActive, onTogglePinned, onDelete }: { game: Game; onClose: () => void; onToggleActive: () => void; onTogglePinned: () => void; onDelete: () => void }) {
  function action(event: React.MouseEvent, callback: () => void) { event.stopPropagation(); callback(); }
  return <div className="game-menu" onClick={(event) => event.stopPropagation()}>
    <button onClick={(event) => action(event, onClose)} className="game-menu-item"><Pencil className="h-4 w-4" />ویرایش بازی</button>
    <button onClick={(event) => action(event, () => { onToggleActive(); onClose(); })} className="game-menu-item"><Power className="h-4 w-4" />{game.active ? 'غیرفعال کردن بازی' : 'فعال کردن بازی'}</button>
    <button onClick={(event) => action(event, () => { onTogglePinned(); onClose(); })} className="game-menu-item"><Pin className="h-4 w-4" />{game.pinned ? 'حذف از PIN' : 'افزودن به PIN'}</button>
    <button onClick={(event) => action(event, () => { onDelete(); onClose(); })} className="game-menu-item game-menu-danger"><Trash2 className="h-4 w-4" />حذف بازی</button>
  </div>;
}
