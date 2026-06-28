import { Gamepad2, Play, Trophy } from 'lucide-react';

export function Games() {
  const games = [
    { id: 'g1', title: 'Sudoku Pro', category: 'Puzzle', players: '12K', cover: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=500&auto=format&fit=crop' },
    { id: 'g2', title: 'Snake Classico', category: 'Arcade', players: '8.5K', cover: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=500&auto=format&fit=crop' },
    { id: 'g3', title: 'Scacchi Online', category: 'Strategia', players: '24K', cover: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=500&auto=format&fit=crop' },
    { id: 'g4', title: 'Memory Challenge', category: 'Puzzle', players: '5.2K', cover: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=500&auto=format&fit=crop' },
    { id: 'g5', title: 'Trivia Master', category: 'Quiz', players: '15K', cover: 'https://images.unsplash.com/photo-1573486145949-182147241fa6?q=80&w=500&auto=format&fit=crop' },
    { id: 'g6', title: 'Solitario', category: 'Carte', players: '32K', cover: 'https://images.unsplash.com/photo-1511255569424-d2e53fa6c5ab?q=80&w=500&auto=format&fit=crop' },
  ];

  return (
    <div className="w-full max-w-[800px] py-8 px-4 mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Gamepad2 className="text-indigo-600" size={32} />
        <h1 className="text-3xl font-black tracking-tighter text-slate-900">Area Giochi</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all">
            <div className="h-32 bg-slate-100 relative overflow-hidden">
              <img src={game.cover} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-indigo-600 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play size={20} className="ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 mb-1">{game.title}</h3>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="bg-slate-100 px-2 py-1 rounded-lg">{game.category}</span>
                <span className="flex items-center gap-1"><Trophy size={14} className="text-amber-500" /> {game.players}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
