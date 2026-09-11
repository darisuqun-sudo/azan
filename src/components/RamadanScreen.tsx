import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Moon, 
  Sun, 
  Clock, 
  Sparkles, 
  Heart, 
  Volume2, 
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Flame,
  Award
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { RAMADAN_DUAS } from '../data/extraIslamicData';
import { soundService } from '../utils/audioPlayer';

interface RamadanScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const RamadanScreen: React.FC<RamadanScreenProps> = ({ onNavigate, lang }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'hub' | 'tracker' | 'taraweeh'>('hub');
  const [fastedDays, setFastedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ramadan_fasted_days');
      return saved ? JSON.parse(saved) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    } catch {
      return [1, 2, 3, 4, 5];
    }
  });

  // Time remaining to Iftar countdown simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59, hours: prev.hours };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDay = (day: number) => {
    soundService.playTasbihClick();
    setFastedDays(prev => {
      const updated = prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
      localStorage.setItem('ramadan_fasted_days', JSON.stringify(updated));
      return updated;
    });
  };

  const copyDua = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    soundService.playTasbihClick();
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-14 select-none font-arabic">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C1B2E] via-[#07111E] to-[#040810] pointer-events-none" />
      <div className="absolute top-10 left-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

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
              {lang === 'ug' ? 'رامىزان ۋە روزا مەركىزى' : 'مركز رمضان ومواقيت الإفطار'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'سەھەرلىك، ئىپتار، 30 كۈنلۈك تەقىپ ۋە تەراۋىھ' : 'Ramadan & Fasting Tracker'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Moon className="w-4 h-4" />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="my-2 flex gap-1 bg-[#09192C] p-1 rounded-2xl border border-white/10" dir="rtl">
          <button
            onClick={() => { setActiveTab('hub'); soundService.playTasbihClick(); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'hub' ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            🌙 ئىپتار ۋە دۇئالار
          </button>
          <button
            onClick={() => { setActiveTab('tracker'); soundService.playTasbihClick(); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tracker' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            📅 30 كۈنلۈك روزا
          </button>
          <button
            onClick={() => { setActiveTab('taraweeh'); soundService.playTasbihClick(); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'taraweeh' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            ✨ تەراۋىھ ۋە قەدر
          </button>
        </div>

        {/* Tab 1: Iftar Hub */}
        {activeTab === 'hub' && (
          <div className="flex-1 overflow-y-auto space-y-3 max-h-[66vh] pb-4">
            {/* Iftar Countdown Hero */}
            <div className="p-4 rounded-3xl bg-gradient-to-b from-[#091E33] to-[#061423] border-2 border-[#D4AF37]/55 shadow-2xl relative overflow-hidden backdrop-blur-md text-center">
              
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#D4AF37] font-bold mb-1">
                <Clock className="w-4 h-4 text-[#FFEAA7]" />
                <span>بۈگۈنكى ئىپتارغىچە قالغان ۋاقىت:</span>
              </div>

              <div className="flex items-center justify-center gap-3 my-2 font-mono">
                <div className="bg-[#050D18] border border-white/15 px-3 py-1.5 rounded-2xl">
                  <span className="text-3xl font-extrabold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 block">سائەت</span>
                </div>
                <span className="text-2xl font-bold text-[#D4AF37] animate-pulse">:</span>
                <div className="bg-[#050D18] border border-white/15 px-3 py-1.5 rounded-2xl">
                  <span className="text-3xl font-extrabold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 block">مىنۇت</span>
                </div>
                <span className="text-2xl font-bold text-[#D4AF37] animate-pulse">:</span>
                <div className="bg-[#050D18] border border-white/15 px-3 py-1.5 rounded-2xl">
                  <span className="text-3xl font-extrabold text-[#FFEAA7]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 block">سېكۇنت</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-emerald-400" />
                  سەھەرلىك تۈگەش: <strong className="text-white font-mono">04:38</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  ئىپتار ۋاقتى: <strong className="text-white font-mono">18:42</strong>
                </span>
              </div>
            </div>

            {/* Iftar Dua Card */}
            <div className="p-3.5 rounded-3xl bg-[#09182A] border border-[#D4AF37]/35 shadow-sm text-right" dir="rtl">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="text-xs font-bold text-[#FFEAA7] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>ئىپتار دۇئاسى (روزا ئاچقاندا)</span>
                </span>
                <button 
                  onClick={() => copyDua(RAMADAN_DUAS.iftarAr, 'iftar')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  {copied === 'iftar' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              
              <p className="font-quran text-base text-[#FFDF88] my-2 leading-relaxed text-right" dir="rtl">
                «{RAMADAN_DUAS.iftarAr}»
              </p>
              <p className="text-[11px] text-gray-300 leading-relaxed bg-[#06101B] p-2.5 rounded-xl border border-white/5" dir="rtl">
                {RAMADAN_DUAS.iftarUg}
              </p>
            </div>

            {/* Suhoor Intention */}
            <div className="p-3.5 rounded-3xl bg-[#09182A] border border-[#D4AF37]/35 shadow-sm text-right" dir="rtl">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="text-xs font-bold text-[#FFEAA7] flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>روزا تۇتۇش نىيىتى (سەھەرلىكتە)</span>
                </span>
                <button 
                  onClick={() => copyDua(RAMADAN_DUAS.suhoorIntentionAr, 'suhoor')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  {copied === 'suhoor' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <p className="font-quran text-base text-[#FFDF88] my-2 leading-relaxed text-right" dir="rtl">
                «{RAMADAN_DUAS.suhoorIntentionAr}»
              </p>
              <p className="text-[11px] text-gray-300 leading-relaxed bg-[#06101B] p-2.5 rounded-xl border border-white/5" dir="rtl">
                {RAMADAN_DUAS.suhoorIntentionUg}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: 30 Days Fasting Tracker */}
        {activeTab === 'tracker' && (
          <div className="flex-1 overflow-y-auto space-y-3 max-h-[66vh] pb-4 text-right" dir="rtl">
            <div className="p-3.5 rounded-3xl bg-[#0A241F] border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-300 block">رامىزان روزىسى ئورۇندىلىشى:</span>
                <span className="text-xs text-gray-300 font-mono">
                  {fastedDays.length} / 30 كۈن تاماملىنىپ بولدى (%{Math.round((fastedDays.length / 30) * 100)})
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-black font-bold text-xs font-mono">
                {30 - fastedDays.length} كۈن قالدى
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                const isFasted = fastedDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`h-11 rounded-2xl flex flex-col items-center justify-center font-mono text-xs border transition-all cursor-pointer ${
                      isFasted 
                        ? 'bg-gradient-to-b from-emerald-600 to-teal-700 border-emerald-400 text-white shadow-md' 
                        : 'bg-[#09182A] border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    <span className="font-bold text-xs">{day}</span>
                    <span className="text-[9px]">{isFasted ? '✓' : '○'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Taraweeh & Laylatul Qadr */}
        {activeTab === 'taraweeh' && (
          <div className="flex-1 overflow-y-auto space-y-3 max-h-[66vh] pb-4 text-right" dir="rtl">
            {/* Laylatul Qadr Dua */}
            <div className="p-4 rounded-3xl bg-[#170E2D] border-2 border-purple-500/40 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>قەدر كېچىسى دۇئاسى (لەيلەتۇل قەدر)</span>
                </span>
                <button 
                  onClick={() => copyDua('اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي', 'qadr')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  {copied === 'qadr' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <p className="font-quran text-base sm:text-lg text-[#FFEAA7] my-2 leading-loose text-center">
                «اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي»
              </p>
              <p className="text-xs text-purple-200/90 leading-relaxed bg-[#0C061B] p-2.5 rounded-xl border border-white/5">
                <strong className="text-[#FFDF88]">ئۇيغۇرچە مەنىسى: </strong>
                ئى ئاللاھ! شەك-شۈبھىسىزكى سەن ئەپۇ قىلغۇچىسەن، كەڭ قورساق سېخىيسەن، ئەپۇ قىلىشنى ياخشى كۆرىسەن، مېنى ئەپۇ قىلغايسەن!
              </p>
            </div>

            {/* Taraweeh Guidelines */}
            <div className="p-4 rounded-3xl bg-[#09182A] border border-white/10">
              <h3 className="text-xs font-bold text-[#FFDF88] mb-2">
                🕌 تەراۋىھ نامىزىنىڭ قائىدە-سۈننىتى:
              </h3>
              <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>رامىزان كېچىلىرىدە خۇپتەن نامىزىنىڭ پەرز ۋە سۈننىتىدىن كېيىن ئوقۇلىدۇ.</li>
                <li>ھەر 2 رەكئەتتە ياكى 4 رەكئەتتە بىر سالام بېرىلىپ، جەمئىي 8 ياكى 20 رەكئەت ئوقۇلىدۇ.</li>
                <li>ھەر تۆت رەكئەتتە بىر تەسبىھ-زىكىر ئوقۇپ ئارام ئېلىش سۈننەتتۇر.</li>
                <li>تەراۋىھ نامىزى پۈتكەندىن كېيىن ئەڭ ئاخىرىدا 3 رەكئەت ۋىتىر نامىزى ئوقۇلىدۇ.</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
