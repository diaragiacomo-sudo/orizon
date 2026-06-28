import { useState } from 'react';
import { Image, Video, FileText, Smile } from 'lucide-react';
import { currentUser } from '../data';

export function PostForm({ onPost }: { onPost: (content: string) => void }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost(content);
    setContent('');
  };

  return (
    <div className="w-full max-w-[580px] bg-white rounded-3xl p-5 shadow-sm border border-slate-200 mb-6 mx-auto">
      <div className="flex gap-4 mb-4">
        <img src={currentUser.avatar} alt="You" className="w-10 h-10 rounded-full bg-slate-100" />
        <textarea
          className="flex-1 bg-slate-100 rounded-2xl px-4 py-3 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
          placeholder="A cosa stai pensando? Condividi i tuoi momenti..."
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors">
            <Image size={18} />
            <span className="text-xs font-semibold hidden sm:inline">Foto</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-rose-500 hover:bg-slate-50 rounded-xl transition-colors">
            <Video size={18} />
            <span className="text-xs font-semibold hidden sm:inline">Video</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-blue-500 hover:bg-slate-50 rounded-xl transition-colors">
            <FileText size={18} />
            <span className="text-xs font-semibold hidden sm:inline">Sondaggio</span>
          </button>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Pubblica
        </button>
      </div>
    </div>
  );
}
