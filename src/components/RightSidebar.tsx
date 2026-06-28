import { trendingTags, suggestedFriends } from '../data';

interface RightSidebarProps {
  onNavigate?: (tab: string) => void;
}

export function RightSidebar({ onNavigate }: RightSidebarProps) {
  return (
    <div className="w-72 flex flex-col h-full bg-white border-l border-slate-200 py-6 px-6 overflow-y-auto hidden lg:flex gap-8">
      
      {/* Suggerimenti */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Potresti conoscere</span>
          <span className="text-[10px] text-indigo-600 font-bold cursor-pointer" onClick={() => onNavigate?.('groups')}>Vedi tutti</span>
        </div>
        <div className="space-y-4">
          {suggestedFriends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3" onClick={() => onNavigate?.('profile')} role="button">
                <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full bg-slate-200" />
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer">{friend.name}</p>
                  <p className="text-[10px] text-slate-500">@{friend.username}</p>
                </div>
              </div>
              <button 
                className="px-3 py-1 bg-slate-100 text-slate-900 rounded-lg text-[10px] font-bold hover:bg-indigo-600 hover:text-white transition-all"
                onClick={() => onNavigate?.('profile')}
              >
                Segui
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tendenze */}
      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">Tendenze per te</span>
        <div className="space-y-4">
          {trendingTags.map((tag, i) => (
            <div key={i} className="cursor-pointer group" onClick={() => onNavigate?.('home')}>
              <div className="text-[10px] text-slate-400">Trending in Italia</div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">#{tag.tag}</div>
              <div className="text-[10px] text-slate-400">{tag.posts} post</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 text-xs text-slate-400 text-center">
        <p>&copy; 2024 Orizon</p>
        <p className="mt-1 space-x-2">
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate?.('support')}>Privacy</span>
          <span>&middot;</span>
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate?.('support')}>Termini</span>
          <span>&middot;</span>
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate?.('support')}>Ads</span>
        </p>
      </div>
    </div>
  );
}
