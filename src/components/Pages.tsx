import { useState, useEffect } from 'react';
import { LayoutList, Plus } from 'lucide-react';

interface Page {
  id: string;
  name: string;
  category: string;
  followers: string;
  cover: string;
  avatar: string;
  bio?: string;
}

const initialPages: Page[] = [
  { id: 'p1', name: 'Orizon News', category: 'Notizie e Media', followers: '150K', cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=500&auto=format&fit=crop', avatar: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=150&auto=format&fit=crop' },
  { id: 'p2', name: 'Tech Radar', category: 'Tecnologia', followers: '85K', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop', avatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=150&auto=format&fit=crop' }
];

export function Pages() {
  const [showCreate, setShowCreate] = useState(false);

  const [pages, setPages] = useState<Page[]>(() => {
    const saved = localStorage.getItem('orizon_pages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialPages;
      }
    }
    return initialPages;
  });

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newBio, setNewBio] = useState('');

  useEffect(() => {
    localStorage.setItem('orizon_pages', JSON.stringify(pages));
  }, [pages]);

  const handleCreate = () => {
    if (!newName.trim()) return;

    const newPage: Page = {
      id: Date.now().toString(),
      name: newName,
      category: newCategory || 'Pagina',
      followers: '0',
      bio: newBio,
      cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=500&auto=format&fit=crop', // Placeholder
      avatar: 'https://images.unsplash.com/photo-1531297172864-45d2479dc8b2?q=80&w=150&auto=format&fit=crop' // Placeholder
    };

    setPages([newPage, ...pages]);
    setShowCreate(false);
    setNewName('');
    setNewCategory('');
    setNewBio('');
  };

  if (showCreate) {
    return (
      <div className="w-full max-w-[580px] py-8 mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <LayoutList className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Crea una Pagina</h1>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Nome della Pagina</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                placeholder="Es. La Mia Azienda" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Categoria</label>
              <input 
                type="text" 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                placeholder="Es. Creatore digitale, Brand, ecc." 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Biografia</label>
              <textarea 
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" 
                rows={3} 
                placeholder="Descrivi brevemente la tua pagina"
              ></textarea>
            </div>

            <div className="pt-4 flex gap-3">
              <button 
                onClick={() => setShowCreate(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-3 rounded-full transition-colors"
              >
                Annulla
              </button>
              <button 
                onClick={handleCreate}
                disabled={!newName.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-indigo-200 disabled:shadow-none"
              >
                Crea Pagina
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] py-8 px-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <LayoutList className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Pagine</h1>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-full transition-colors shadow-md shadow-indigo-200"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Crea Pagina</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map(page => (
          <div key={page.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            <div className="h-24 bg-slate-100 relative">
              <img src={page.cover} alt={page.name} className="w-full h-full object-cover" />
              <div className="absolute -bottom-6 left-4 p-1 bg-white rounded-full">
                <img src={page.avatar} alt={page.name} className="w-12 h-12 rounded-full object-cover border border-slate-100" />
              </div>
            </div>
            <div className="p-5 pt-8 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-0.5">{page.name}</h3>
              <p className="text-xs font-semibold text-slate-500 mb-2">{page.category} &middot; {page.followers} follower</p>
              
              {page.bio && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{page.bio}</p>
              )}

              <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                <button className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-2 rounded-xl transition-colors text-sm" onClick={() => alert('Segui ora questa pagina!')}>
                  Segui
                </button>
                <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2 rounded-xl transition-colors text-sm" onClick={() => alert('Visita la pagina!')}>
                  Visita
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
