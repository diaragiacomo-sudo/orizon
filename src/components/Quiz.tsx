import { useState } from 'react';
import { quizQuestions } from '../data';
import { Trophy, ArrowRight, RefreshCw } from 'lucide-react';

export function Quiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Prevent double answering
    setSelectedOption(index);
    
    if (index === quizQuestions[currentQuestionIdx].correctOptionIndex) {
      setScore(score + 100);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
  };

  const question = quizQuestions[currentQuestionIdx];

  return (
    <div className="w-full max-w-[580px] py-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="text-amber-500" size={32} />
        <h1 className="text-3xl font-black tracking-tighter text-slate-900">Orizon Quiz</h1>
      </div>

      {showResults ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
            <Trophy className="text-white" size={48} />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Quiz Completato!</h2>
          <p className="text-slate-500 text-lg mb-8">Hai totalizzato <span className="font-bold text-amber-500">{score}</span> punti XP</p>
          
          <button 
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-3 rounded-full transition-colors"
          >
            <RefreshCw size={20} />
            <span>Rigioca</span>
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Domanda {currentQuestionIdx + 1} di {quizQuestions.length}</span>
            <span>Punteggio: <span className="text-amber-500">{score}</span></span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-tight">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let btnClass = "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 font-medium ";
              
              if (selectedOption === null) {
                btnClass += "bg-slate-50 border-slate-100 text-slate-700 hover:bg-white hover:border-indigo-500 hover:shadow-sm";
              } else if (index === question.correctOptionIndex) {
                btnClass += "bg-emerald-50 border-emerald-500 text-emerald-700";
              } else if (index === selectedOption) {
                btnClass += "bg-rose-50 border-rose-500 text-rose-700";
              } else {
                btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={selectedOption !== null}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-indigo-200"
              >
                <span>{currentQuestionIdx < quizQuestions.length - 1 ? 'Prossima Domanda' : 'Vedi Risultati'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
