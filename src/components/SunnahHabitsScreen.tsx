import React, { useState } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  Moon, 
  CheckCircle2, 
  HeartHandshake, 
  Clock, 
  RotateCcw,
  Sun,
  Flame
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { soundService } from '../utils/audioPlayer';

interface SunnahHabitsScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const SunnahHabitsScreen: React.FC<SunnahHabitsScreenProps> = ({ onNavigate, lang }) => {
  const [salawatCount, setSalawatCount] = useState<number>(142);
  const [salawatGoal, setSalawatGoal] = useState<number>(500);
  
  const [fridayTasks, setFridayTasks] = useState<{ id: string; titleUg: string; isDone: boolean }[]>([
    { id: '1', titleUg: 'غۇسۇل قىلىش ۋە پاكىز كىيىم كىيىش', isDone: true },
    { id: '2', titleUg: 'مىسۋاك ئىشلىتىش ۋە خۇشپۇراق چېچىش', isDone: true },
    { id: '3', titleUg: 'كەھف سۈرىسىنى تولۇق ئوقۇش', isDone: false },
    { id: '4', titleUg: 'پەيغەمبىرىمىزگە كۆپ سالاۋات ئېيتىش (1000 قېتىم)', isDone: false },
    { id: '5', titleUg: 'جۈمە مەسچىتىگە بالدۇر بېرىپ خۇتبە ئاڭلاش', isDone: false },
    { id: '6', titleUg: 'ئىجابەت سائىتىدە (ئەسر بىلەن شام ئارىسىدا) دۇئا قىلىش', isDone: false }
  ]);

  const toggleFridayTask = (id: string) => {
    setFridayTasks(prev => 
      prev.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t)
    );
    soundService.playChime();
  };

  const handleSalawatClick = () => {
    setSalawatCount(prev => {
      const next = prev + 1;
      if (next % 33 === 0 || next === salawatGoal) {
        soundService.playChime();
      } else {
        soundService.playTasbihClick();
      }
      return next;
    });
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
              {lang === 'ug' ? 'تەھەججۇد، جۈمە ۋە سالاۋات مەركىزى' : lang === 'ar' ? 'مركز التهجد وسنن الجمعة والصلوات' : lang === 'tr' ? 'Teheccüd, Cuma Sünnetleri ve Salavat' : 'Tahajjud, Friday Sunnah & Salawat'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'كۈندىلىك سۈننەت ۋە ساۋاب ئاشۇرۇش سىستېمىسى' : 'Sunnah Habits & Salawat Counter'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Moon className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto space-y-3 py-2 pr-0.5 max-h-[66vh]">
          
          {/* Tahajjud Card */}
          <div className="p-3.5 rounded-3xl bg-gradient-to-r from-[#0C223A] to-[#081829] border border-cyan-500/30 text-right" dir="rtl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-cyan-300 font-bold flex items-center gap-1">
                <Moon className="w-3.5 h-3.5" />
                <span>تەھەججۇد ۋە كېچە قىيامى</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono">03:15 - 04:30</span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed">
              كېچىنىڭ ئاخىرقى ئۈچتىن بىرىدە ئاللاھ دۇنيا ئاسمىنىغا چۈشۈپ: «كىم ماڭا دۇئا قىلسا ئىجابەت قىلىمەن، كىم مەغپىرەت سورىسا ئەپۇ قىلىمەن» دەيدۇ.
            </p>
          </div>

          {/* Salawat Big Counter Box */}
          <div className="p-4 rounded-3xl bg-gradient-to-b from-[#0E2618] via-[#081B10] to-[#040E08] border-2 border-emerald-500/40 shadow-lg text-center">
            <div className="flex items-center justify-between text-xs text-emerald-300 mb-2">
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>كۈندىلىك سالاۋات نىشانى</span>
              </span>
              <span className="font-mono">{salawatCount} / {salawatGoal}</span>
            </div>

            <p className="text-base font-bold font-quran text-[#FFEAA7] mb-2 leading-relaxed" dir="rtl">
              اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ
            </p>

            <button
              onClick={handleSalawatClick}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              +1 سالاۋات ئېيتىش (ساناپ بېرىش)
            </button>
          </div>

          {/* Friday Sunnah Checklist */}
          <div className="p-3.5 rounded-3xl bg-[#091D30] border border-[#D4AF37]/35 text-right" dir="rtl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <h3 className="text-xs font-bold text-[#FFEAA7] flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-[#D4AF37]" />
                <span>جۈمە كۈنى سۈننەتلىرى تىزىملىكى (Checklist)</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono">
                {fridayTasks.filter(t => t.isDone).length}/{fridayTasks.length} تامام
              </span>
            </div>

            <div className="space-y-1.5">
              {fridayTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleFridayTask(task.id)}
                  className={`p-2 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                    task.isDone 
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' 
                      : 'bg-[#06111C] border-white/5 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <span className={task.isDone ? 'line-through text-gray-400' : ''}>
                    {task.titleUg}
                  </span>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${task.isDone ? 'text-emerald-400' : 'text-gray-600'}`} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
