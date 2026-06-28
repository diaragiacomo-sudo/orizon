import { Home, User, MessageSquare, Bell, Video, Gamepad2, Users, LayoutList, Settings, Flame, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ currentTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Feed' },
    { id: 'profile', icon: User, label: 'Profilo' },
    { id: 'messages', icon: MessageSquare, label: 'Messaggi' },
    { id: 'notifications', icon: Bell, label: 'Notifiche' },
    { id: 'videos', icon: Video, label: 'Video & Reels' },
    { id: 'quiz', icon: Flame, label: 'Quiz' },
    { id: 'games', icon: Gamepad2, label: 'Giochi' },
    { id: 'groups', icon: Users, label: 'Gruppi' },
    { id: 'pages', icon: LayoutList, label: 'Pagine' },
    { id: 'support', icon: HelpCircle, label: 'Supporto' },
    { id: 'settings', icon: Settings, label: 'Impostazioni' },
  ];

  return (
    <div className="w-64 flex flex-col h-full bg-white border-r border-slate-200 text-slate-600">
      <div className="p-6">
        <h1 className="text-2xl font-black tracking-tighter text-indigo-600">
          Orizon
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200",
                "hover:bg-slate-50 text-slate-600 cursor-pointer group",
                isActive ? "bg-indigo-50 text-indigo-600 font-bold" : "font-medium"
              )}
            >
              <Icon size={18} className={cn("transition-transform group-hover:scale-110", isActive ? "scale-110" : "")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="bg-indigo-600 rounded-2xl p-4 text-white">
          <p className="text-[10px] uppercase tracking-wider text-white/80 font-bold mb-1">Prossimo Concerto</p>
          <p className="text-sm font-black">Milano, San Siro</p>
          <p className="text-xs text-indigo-200 mt-1 font-medium">Tra 60 giorni</p>
        </div>
      </div>
    </div>
  );
}
