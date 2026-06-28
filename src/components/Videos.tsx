import { Play, Heart, MessageCircle } from 'lucide-react';

export function Videos() {
  const videos = [
    {
      id: 'v1',
      title: 'Dietro le quinte: Esplorando le montagne rocciose',
      thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop',
      views: '1.2M',
      timeAgo: '2 giorni fa',
    },
    {
      id: 'v2',
      title: 'Tutorial: Come migliorare la tua fotografia urbana in 5 minuti',
      thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop',
      views: '840K',
      timeAgo: '1 settimana fa',
    },
    {
      id: 'v3',
      title: 'Vlog: Una settimana da nomade digitale a Bali',
      thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
      views: '2.5M',
      timeAgo: '1 mese fa',
    },
    {
      id: 'v4',
      title: 'Recensione Completa: Nuova Fotocamera Mirrorless Pro',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
      views: '450K',
      timeAgo: '2 mesi fa',
    }
  ];

  return (
    <div className="w-full max-w-4xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 mb-2">Video & Reels</h1>
        <p className="text-slate-500 font-medium">Guarda i videoclip ufficiali e i contenuti esclusivi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden group cursor-pointer shadow-sm">
            <div className="relative h-48 sm:h-64 bg-slate-100 overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-indigo-600 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play size={24} className="ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center justify-between mt-4 text-xs font-semibold text-slate-500">
                <span>{video.views} visualizzazioni &middot; {video.timeAgo}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Heart size={16} /> 12K</span>
                  <span className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><MessageCircle size={16} /> 420</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
