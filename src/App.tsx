/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Home, User, Video, Flame, HelpCircle } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import { Quiz } from './components/Quiz';
import { Videos } from './components/Videos';
import { Support } from './components/Support';
import { Games } from './components/Games';
import { Groups } from './components/Groups';
import { Pages } from './components/Pages';
import { cn } from './lib/utils';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Feed />;
      case 'profile':
        return <Profile />;
      case 'quiz':
        return <Quiz />;
      case 'videos':
        return <Videos />;
      case 'support':
        return <Support />;
      case 'games':
        return <Games />;
      case 'groups':
        return <Groups />;
      case 'pages':
        return <Pages />;
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 h-full w-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">In arrivo!</h2>
            <p>Questa sezione è in fase di sviluppo.</p>
          </div>
        );
    }
  };

  const mobileMenu = [
    { id: 'home', icon: Home, label: 'Feed' },
    { id: 'videos', icon: Video, label: 'Video' },
    { id: 'quiz', icon: Flame, label: 'Quiz' },
    { id: 'profile', icon: User, label: 'Profilo' },
  ];

  return (
    <div className="flex h-[100dvh] bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth px-4 pb-20 md:pb-0 flex flex-col items-center">
        {renderContent()}
      </main>

      <RightSidebar />

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
        <div className="flex justify-around items-center p-2">
          {mobileMenu.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-all duration-200",
                  isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-900"
                )}
              >
                <Icon size={24} className={cn("transition-transform", isActive ? "scale-110" : "")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}


