import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  RotateCcw,
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { useTranslation } from '../utils/i18n';

interface KhatamScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const KhatamScreen: React.FC<KhatamScreenProps> = ({ onNavigate, lang }) => {
  const { t } = useTranslation(lang);
  const totalPages = 604;
  
  // Local state persisted in localStorage
  const [targetDays, setTargetDays] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const saved = localStorage.getItem('khatam_current_page');
    return saved ? parseInt(saved, 10) : 48;
  });
  const [completedDays, setCompletedDays] = useState<number>(3);
  const [streakDays, setStreakDays] = useState<number>(4);

  useEffect(() => {
    localStorage.setItem('khatam_current_page', currentPage.toString());
  }, [currentPage]);

  const dailyRequiredPages = Math.ceil(totalPages / targetDays);
  const progressPercent = Math.min(100, Math.round((currentPage / totalPages) * 100));
  const remainingPages = Math.max(0, totalPages - currentPage);
  const estimatedDaysLeft = Math.ceil(remainingPages / (dailyRequiredPages || 1));

  const addPages = (count: number) => {
    setCurrentPage(prev => Math.min(totalPages, prev + count));
  };

  const removePages = (count: number) => {
    setCurrentPage(prev => Math.max(0, prev - count));
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-12 select-none font-arabic">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A2E] via-[#07111E] to-[#040810] pointer-events-none" />
      <div className="absolute top-10 right-10 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full px-3.5 pt-1.5">
        
        {/* Top Header */}
        <div className="flex items-center justify-between py-1.5 border-b border-[#D4AF37]/20">
          <button 
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold font-quran gold-text">
              {lang === 'ug' ? 'قۇرئان خاتىمە قىلىش پىلانى' : lang === 'ar' ? 'متابعة ختمة القرآن' : lang === 'tr' ? 'Hatim Takip Programı' : 'Quran Khatam Tracker'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'كۈندىلىك ئوقۇش ۋە ئىلگىرىلەش' : lang === 'ar' ? 'الورد اليومي والهدف' : 'Daily Goal & Progress'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>

        {/* Progress Circular Hero Card */}
        <div className="my-3 p-4 rounded-3xl bg-[#09182A]/90 border-2 border-[#D4AF37]/50 shadow-[0_0_25px_rgba(212,175,55,0.15)] relative overflow-hidden backdrop-blur-md">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#D4AF37] font-bold block mb-0.5">
                {lang === 'ug' ? 'ئومۇمىي خاتىمە نىسبىتى' : lang === 'ar' ? 'نسبة الإنجاز الكلي' : 'Overall Completion'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold font-mono text-white">%{progressPercent}</span>
                <span className="text-xs text-gray-400">({currentPage} / {totalPages} بەت)</span>
              </div>
            </div>

            {/* Circular Mini Visual */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#D4AF37] transition-all duration-500"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <Sparkles className="w-5 h-5 text-[#FFEAA7] absolute" />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
            <div className="bg-[#06101B] p-2 rounded-xl border border-white/5">
              <span className="text-[10px] text-gray-400 block">{lang === 'ug' ? 'كۈندىلىك ۋىرد' : 'Daily Goal'}</span>
              <span className="text-sm font-bold text-[#FFEAA7] font-mono">{dailyRequiredPages} بەت</span>
            </div>
            <div className="bg-[#06101B] p-2 rounded-xl border border-white/5">
              <span className="text-[10px] text-gray-400 block">{lang === 'ug' ? 'قالغان بەت' : 'Remaining'}</span>
              <span className="text-sm font-bold text-[#93C5FD] font-mono">{remainingPages}</span>
            </div>
            <div className="bg-[#06101B] p-2 rounded-xl border border-white/5">
              <span className="text-[10px] text-gray-400 block">{lang === 'ug' ? 'تەخمىنىي كۈن' : 'Days Left'}</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">{estimatedDaysLeft} كۈن</span>
            </div>
          </div>
        </div>

        {/* Page Adjuster Controls */}
        <div className="bg-[#0A1B2D]/90 border border-[#D4AF37]/35 rounded-2xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-200">
              {lang === 'ug' ? 'ئوقۇغان بېتىڭىزنى خاتىرىلەش:' : 'Log Today\'s Completed Pages:'}
            </span>
            <span className="text-xs text-[#D4AF37] font-mono font-bold">بەت: {currentPage}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => removePages(5)}
              className="px-2.5 py-1.5 rounded-xl bg-[#071320] border border-white/10 text-xs text-gray-300 hover:text-white"
            >
              -5 بەت
            </button>
            <button 
              onClick={() => removePages(1)}
              className="w-10 h-10 rounded-xl bg-[#071320] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white"
            >
              <Minus className="w-4 h-4" />
            </button>

            <button 
              onClick={() => addPages(1)}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FFEAA7] text-black font-bold flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Plus className="w-6 h-6" />
            </button>

            <button 
              onClick={() => addPages(5)}
              className="px-2.5 py-1.5 rounded-xl bg-[#071320] border border-white/10 text-xs text-gray-300 hover:text-white"
            >
              +5 بەت
            </button>
            <button 
              onClick={() => addPages(20)}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-xs text-emerald-300 font-bold hover:bg-emerald-900"
            >
              +1 پارە (20)
            </button>
          </div>
        </div>

        {/* Goal Preset Selectors */}
        <div className="flex-1 overflow-y-auto bg-[#071524]/80 border border-white/10 rounded-2xl p-3">
          <span className="text-xs font-bold text-[#D4AF37] block mb-2">
            {lang === 'ug' ? 'خاتىمە قىلىش مۇددىتىنى تاللاڭ:' : 'Select Khatam Target Duration:'}
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[15, 30, 60].map(days => (
              <button
                key={days}
                onClick={() => setTargetDays(days)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  targetDays === days 
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFEAA7] font-bold shadow-md' 
                    : 'bg-[#06101B] border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-sm font-bold font-mono">{days} كۈن</div>
                <div className="text-[10px] text-gray-400">
                  {Math.ceil(604 / days)} بەت / كۈن
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-[#06101B] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <div className="text-xs font-bold text-gray-200">
                  {lang === 'ug' ? 'ئۈزلۈكسىز ئوقۇش نەتىجىسى:' : 'Reading Streak:'}
                </div>
                <div className="text-[10px] text-emerald-400">
                  {streakDays} كۈن ئۇدا ئوقۇلدى 🔥
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('quran-reader')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black text-xs font-bold shadow-sm"
            >
              {lang === 'ug' ? 'داۋاملىق ئوقۇش' : 'Read Now'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
