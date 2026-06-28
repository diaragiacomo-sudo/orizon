import { useState, useRef, useEffect } from 'react';
import { MapPin, Link as LinkIcon, Calendar, Briefcase, Camera, X } from 'lucide-react';
import { currentUser as initialUser } from '../data';

interface ProfileProps {
  onNavigate?: (tab: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('orizon_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    localStorage.setItem('orizon_user', JSON.stringify(user));
  }, [user]);

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Errore accesso fotocamera:", err);
      alert("Impossibile accedere alla fotocamera.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setEditAvatar(dataUrl);
        stopCamera();
      }
    }
  };

  const handleSave = () => {
    setUser({
      ...user,
      name: editName,
      bio: editBio,
      avatar: editAvatar,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="w-full max-w-[580px] py-6 pb-20">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-black text-slate-900">Modifica Profilo</h1>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Avatar Edit */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img src={editAvatar} alt="Anteprima" className="w-32 h-32 rounded-full object-cover border-4 border-slate-100" />
                <button 
                  onClick={startCamera}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                >
                  <Camera size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium">Tocca l'icona per scattare una foto</p>
            </div>

            {/* Camera Modal */}
            {isCameraOpen && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-4 w-full max-w-sm flex flex-col items-center">
                  <div className="w-full flex justify-end mb-2">
                    <button onClick={stopCamera} className="text-slate-500 hover:text-slate-800"><X size={24} /></button>
                  </div>
                  <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl bg-black mb-4 aspect-square object-cover" />
                  <canvas ref={canvasRef} className="hidden" />
                  <button 
                    onClick={capturePhoto}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-full transition-colors"
                  >
                    Scatta Foto
                  </button>
                </div>
              </div>
            )}

            {/* Name Edit */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Nome Visualizzato</label>
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Bio Edit */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Biografia</label>
              <textarea 
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4 flex gap-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-3 rounded-full transition-colors"
              >
                Annulla
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-indigo-200"
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[580px] py-6 pb-20">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-48 md:h-64 w-full bg-slate-200 relative">
          {user.cover && (
            <img src={user.cover} alt="Cover" className="w-full h-full object-cover" />
          )}
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6 relative">
          <div className="flex justify-between items-end -mt-16 mb-4 relative z-10">
            <div className="relative p-1 bg-white rounded-full">
              <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-sm" />
            </div>
            <button 
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-bold px-5 py-2 rounded-full transition-colors"
              onClick={() => {
                setEditName(user.name);
                setEditBio(user.bio);
                setEditAvatar(user.avatar);
                setIsEditing(true);
              }}
            >
              Modifica Profilo
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              {user.name}
            </h1>
            <p className="text-slate-500 font-medium text-sm">@{user.username}</p>
          </div>

          <div className="mt-4 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
            <p>{user.bio}</p>
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
              <a href="https://orizon.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">orizon.app</a>
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
            {user.badges?.map((badge: string) => (
              <span key={badge} className="bg-indigo-50 text-indigo-600 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                {badge}
              </span>
            ))}
            <span className="bg-amber-50 text-amber-600 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
              Liv. {user.level}
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
