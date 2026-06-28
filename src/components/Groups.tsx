import { useState, useEffect } from 'react';
import { Users, Plus } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  members: string;
  privacy: string;
  cover: string;
  description?: string;
}

const initialGroups: Group[] = [
  { id: 'g1', name: 'Sviluppatori Web Italia', members: '12.5K', privacy: 'Pubblico', cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop' },
  { id: 'g2', name: 'Fotografia Digitale', members: '8.2K', privacy: 'Privato', cover: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop' }
];

export function Groups() {
  const [showCreate, setShowCreate] = useState(false);

  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem('orizon_groups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialGroups;
      }
    }
    return initialGroups;
  });

  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrivacy, setNewPrivacy] = useState('Pubblico');

  useEffect(() => {
    localStorage.setItem('orizon_groups', JSON.stringify(groups));
  }, [groups]);

  const handleCreate = () => {
    if (!newName.trim()) return;

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newName,
      members: '1',
      privacy: newPrivacy.split(' ')[0], // Estrae 'Pubblico' o 'Privato'
      description: newDesc,
      cover: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=500&auto=format&fit=crop' // Placeholder cover
    };

    setGroups([newGroup, ...groups]);
    setShowCreate(false);
    setNewName('');
    setNewDesc('');
    setNewPrivacy('Pubblico');
  };

  if (showCreate) {
    return (
      <div className="w-full max-w-[580px] py-8 mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Users className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Crea un nuovo Gruppo</h1>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Nome del gruppo</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                placeholder="Es. Amici della Montagna" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Descrizione</label>
              <textarea 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" 
                rows={3} 
                placeholder="Di cosa tratta questo gruppo?"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Privacy</label>
              <select 
                value={newPrivacy}
                onChange={(e) => setNewPrivacy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="Pubblico">Pubblico (Tutti possono vedere chi è membro e cosa viene pubblicato)</option>
                <option value="Privato">Privato (Solo i membri possono vedere chi fa parte del gruppo e i post)</option>
              </select>
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
                Crea Gruppo
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
          <Users className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Gruppi</h1>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-full transition-colors shadow-md shadow-indigo-200"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Crea Gruppo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map(group => (
          <div key={group.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden group shadow-sm flex flex-col">
            <div className="h-32 bg-slate-100 relative">
              <img src={group.cover} alt={group.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-1">{group.name}</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4">{group.privacy} &middot; {group.members} membri</p>
              
              {group.description && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{group.description}</p>
              )}

              <div className="mt-auto pt-4 border-t border-slate-100">
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2 rounded-xl transition-colors text-sm" onClick={() => alert('Entrato nel gruppo!')}>
                  Visita Gruppo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
