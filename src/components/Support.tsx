import { HelpCircle, Mail, MessageCircle, FileText } from 'lucide-react';

export function Support() {
  return (
    <div className="w-full max-w-[580px] py-8">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="text-indigo-600" size={32} />
        <h1 className="text-3xl font-black tracking-tighter text-slate-900">Supporto</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Come possiamo aiutarti?</h2>
        <p className="text-slate-500 mb-6">Trova le risposte alle tue domande o contattaci direttamente.</p>

        <div className="relative mb-8">
          <input 
            type="text" 
            placeholder="Cerca un problema (es. 'cambio password')"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:shadow-sm cursor-pointer transition-all group">
            <FileText className="text-slate-400 group-hover:text-indigo-600 mb-3" size={24} />
            <h3 className="font-bold text-slate-900 mb-1">FAQ</h3>
            <p className="text-xs text-slate-500">Domande frequenti degli utenti</p>
          </div>
          <div className="p-4 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:shadow-sm cursor-pointer transition-all group">
            <MessageCircle className="text-slate-400 group-hover:text-indigo-600 mb-3" size={24} />
            <h3 className="font-bold text-slate-900 mb-1">Chat in tempo reale</h3>
            <p className="text-xs text-slate-500">Parla con un nostro operatore</p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 md:p-8 text-center shadow-sm">
        <Mail className="text-indigo-600 mx-auto mb-3" size={32} />
        <h2 className="text-lg font-bold text-slate-900 mb-2">Non hai trovato quello che cerchi?</h2>
        <p className="text-sm text-slate-600 mb-6">Inviaci un'email e ti risponderemo entro 24 ore.</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-indigo-200">
          Contattaci
        </button>
      </div>
    </div>
  );
}
