import React, { useState } from 'react';
import { 
  ChevronRight, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles,
  Timer
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/advancedIslamicData';
import { soundService } from '../utils/audioPlayer';

interface QuizScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onNavigate, lang }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx] || QUIZ_QUESTIONS[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
      soundService.playChime();
    } else {
      soundService.playTasbihClick();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      soundService.playTasbihClick();
    } else {
      setIsFinished(true);
      soundService.playChime();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    soundService.playTasbihClick();
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-12 select-none font-arabic">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A2E] via-[#07111E] to-[#040810] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full px-3.5 pt-1.5">
        
        {/* Header */}
        <div className="flex items-center justify-between py-1.5 border-b border-[#D4AF37]/20">
          <button 
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold font-quran gold-text">
              {lang === 'ug' ? 'ئىسلامىي بىلىم مۇسابىقىسى' : lang === 'ar' ? 'مسابقة المعرفة الإسلامية' : lang === 'tr' ? 'İslami Bilgi Yarışması' : 'Islamic Knowledge Quiz'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'ئىسلامىي بىلىملىرىڭىزنى سىناپ كۆرۈڭ' : 'Test your Islamic Knowledge'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>

        {/* Finished Score Screen */}
        {isFinished ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A67C1E] text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold font-quran text-[#FFEAA7]">
                مۇبارەك بولسۇن!
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                سىز {QUIZ_QUESTIONS.length} سوئالدىن <strong className="text-emerald-400 text-base">{score}</strong> سوئالغا توغرا جاۋاب بەردىڭىز!
              </p>
            </div>

            <div className="w-full max-w-xs bg-[#091D32] p-4 rounded-2xl border border-[#D4AF37]/40 text-xs text-gray-200">
              {score === QUIZ_QUESTIONS.length ? '🌟 ئاللاھ ئىلمىڭىزنى زىيادە قىلسۇن! بارلىق جاۋابلارنى توغرا تاپتىڭىز!' : '✨ ناھايىتى ياخشى! يەنە سىناپ تېخىمۇ كۆپ بىلىمگە ئېرىشىڭ.'}
            </div>

            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold text-xs flex items-center gap-2 shadow-lg hover:brightness-110 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>قايتا سىناش</span>
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between py-2">
            
            {/* Progress Bar & Counter */}
            <div className="flex items-center justify-between bg-[#081829] px-3 py-2 rounded-2xl border border-white/10 text-xs">
              <span className="text-gray-300">
                سوئال: <strong className="text-[#FFEAA7] font-mono">{currentIdx + 1}</strong> / {QUIZ_QUESTIONS.length}
              </span>

              <span className="text-emerald-400 font-bold font-mono">
                نەتىجە: {score} نومۇر
              </span>
            </div>

            {/* Question Card */}
            <div className="p-4 rounded-3xl bg-gradient-to-b from-[#0C223A] to-[#06121E] border border-[#D4AF37]/40 shadow-md text-right" dir="rtl">
              <h3 className="text-sm font-bold text-white leading-relaxed">
                {currentQ.questionUg}
              </h3>
            </div>

            {/* 4 Options */}
            <div className="space-y-2" dir="rtl">
              {currentQ.optionsUg.map((opt, idx) => {
                let btnStyle = 'bg-[#081B2E] border-white/10 text-gray-200 hover:border-[#D4AF37]/50';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-900/80 border-emerald-400 text-white font-bold shadow-md';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-900/80 border-rose-400 text-white font-bold';
                  } else {
                    btnStyle = 'bg-[#06111C] border-white/5 text-gray-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-3 rounded-2xl border text-xs flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-arabic">{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && selectedOption === idx && idx !== currentQ.correctIndex && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Button */}
            {isAnswered && (
              <div className="space-y-2 animate-fadeIn" dir="rtl">
                <div className="p-2.5 rounded-2xl bg-[#091D30] border border-emerald-500/30 text-[11px] text-emerald-300">
                  <strong>چۈشەندۈرۈش:</strong> {currentQ.explanationUg}
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'كېيىنكى سوئال' : 'نەتىجىنى كۆرۈش'}</span>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
