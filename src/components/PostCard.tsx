import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';

export function PostCard({ post }: { post: Post }) {
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} min fa`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h fa`;
    return `${Math.floor(hours / 24)} g fa`;
  };

  return (
    <div className="w-full max-w-[580px] bg-white rounded-3xl overflow-hidden p-5 shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full bg-slate-100" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">{post.author.name}</h3>
              {post.author.badges?.includes('Ufficiale') && (
                <span className="bg-indigo-50 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                  Ufficiale
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400">@{post.author.username} • {timeAgo(post.createdAt)}</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed text-slate-700 mb-4 whitespace-pre-wrap">{post.content}</p>
      
      {post.image && (
        <div className="mb-4 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
          <img src={post.image} alt="Post content" className="w-full object-cover max-h-96" />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-slate-400 py-2 border-b border-slate-100 mb-2 mt-4">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
             <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] border border-white text-white"><Heart size={10} className="fill-current" /></span>
          </div>
          <span className="ml-1 font-medium">{post.likes} Mi piace</span>
        </div>
        <div className="flex gap-3">
          <span>{post.comments.length} commenti</span>
          <span>{post.shares} condivisioni</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-1 gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 py-2 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-colors">
          <Heart size={18} />
          <span>Mi piace</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 py-2 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-colors">
          <MessageCircle size={18} />
          <span>Commenta</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 py-2 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-colors">
          <Share2 size={18} />
          <span>Condividi</span>
        </button>
      </div>

      {/* Comments section if exists */}
      {post.comments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
          {post.comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1 bg-slate-50 rounded-2xl rounded-tl-none p-3 border border-slate-100">
                <p className="font-bold text-slate-900 text-xs">{comment.author.name}</p>
                <p className="text-sm text-slate-700 leading-relaxed mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
