import { useState, useEffect } from 'react';
import { Book, Plus, Calendar, Image as ImageIcon } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
}

export function Diary() {
  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('orizon_diary');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'm1',
        title: 'Il mio primo giorno in montagna',
        content: 'Un\'esperienza indimenticabile tra le cime innevate. L\'aria fresca e il silenzio assoluto mi hanno ricaricato completamente.',
        date: new Date(Date.now() - 86400000 * 3).toISOString(),
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'
      }
    ];
  });
  
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    localStorage.setItem('orizon_diary', JSON.stringify(memories));
  }, [memories]);

  const handleSave = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    
    const newMemory: Memory = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop' // Placeholder per le nuove memorie
    };
    
    setMemories([newMemory, ...memories]);
    setShowCreate(false);
    setNewTitle('');
    setNewContent('');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  if (showCreate) {
    return (
      <div className="w-full max-w-[580px] py-8 mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Book className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Nuovo Ricordo</h1>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Titolo</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                placeholder="Es. Un viaggio speciale" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">I tuoi pensieri</label>
              <textarea 
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" 
                rows={6} 
                placeholder="Scrivi qui i tuoi ricordi..."
              ></textarea>
            </div>

            <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:border-indigo-500 hover:text-indigo-600 transition-all text-slate-500 justify-center border-dashed">
              <ImageIcon size={20} />
              <span className="font-bold text-sm">Aggiungi Foto</span>
            </div>

            <div className="pt-4 flex gap-3">
              <button 
                onClick={() => setShowCreate(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-3 rounded-full transition-colors"
              >
                Annulla
              </button>
              <button 
                onClick={handleSave}
                disabled={!newTitle.trim() || !newContent.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-indigo-200 disabled:shadow-none"
              >
                Salva Ricordo
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
          <Book className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Il mio Diario</h1>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-full transition-colors shadow-md shadow-indigo-200"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Nuovo Ricordo</span>
        </button>
      </div>

      {memories.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500 shadow-sm">
          <Book size={48} className="mx-auto mb-4 text-slate-300" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Nessun ricordo ancora</h2>
          <p>Inizia a scrivere il tuo diario aggiungendo il tuo primo ricordo speciale.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {memories.map(memory => (
            <div key={memory.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
              {memory.image && (
                <div className="md:w-1/3 h-48 md:h-auto relative bg-slate-100">
                  <img src={memory.image} alt={memory.title} className="w-full h-full object-cover absolute inset-0" />
                </div>
              )}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <Calendar size={14} />
                  <span>{formatDate(memory.date)}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">{memory.title}</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{memory.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
