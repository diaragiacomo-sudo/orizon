import { MapPin, Link as LinkIcon, Calendar, Briefcase } from 'lucide-react';
import { currentUser } from '../data';

export function Profile() {
  return (
    <div className="w-full max-w-[580px] py-6 pb-20">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-48 md:h-64 w-full bg-slate-200 relative">
          {currentUser.cover && (
            <img src={currentUser.cover} alt="Cover" className="w-full h-full object-cover" />
          )}
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6 relative">
          <div className="flex justify-between items-end -mt-16 mb-4 relative z-10">
            <div className="relative p-1 bg-white rounded-full">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-sm" />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-md shadow-indigo-200">
              Modifica Profilo
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              {currentUser.name}
            </h1>
            <p className="text-slate-500 font-medium text-sm">@{currentUser.username}</p>
          </div>

          <div className="mt-4 text-slate-700 text-sm leading-relaxed">
            <p>{currentUser.bio}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span>Milano, Italia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase size={16} />
              <span>Fotografo Freelance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <LinkIcon size={16} />
              <a href="#" className="text-indigo-600 hover:underline">orizon.app</a>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>Iscritto a Marzo 2024</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 flex gap-6 pt-6 border-t border-slate-100">
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-lg">1.2K</span>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Seguiti</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-lg">8.5K</span>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Follower</span>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-6 flex gap-2">
            {currentUser.badges?.map(badge => (
              <span key={badge} className="bg-indigo-50 text-indigo-600 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                {badge}
              </span>
            ))}
            <span className="bg-amber-50 text-amber-600 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
              Liv. {currentUser.level}
            </span>
          </div>
        </div>
      </div>
      
      {/* Profilo Feed Placeholder */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 px-2">I tuoi post</h2>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500 shadow-sm">
          Nessun post da mostrare al momento.
        </div>
      </div>
    </div>
  );
}
