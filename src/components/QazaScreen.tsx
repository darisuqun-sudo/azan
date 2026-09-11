import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus, 
  Calendar, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';

interface QazaScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

interface QazaItem {
  id: string;
  nameAr: string;
  nameUg: string;
  nameTr: string;
  nameEn: string;
  count: number;
}

export const QazaScreen: React.FC<QazaScreenProps> = ({ onNavigate, lang }) => {
  const [activeTab, setActiveTab] = useState<'prayers' | 'fasting'>('prayers');
  
  const [prayers, setPrayers] = useState<QazaItem[]>(() => {
    const saved = localStorage.getItem('qaza_prayers_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'fajr', nameAr: 'الفجر', nameUg: 'بامدات', nameTr: 'Sabah (İmsak)', nameEn: 'Fajr', count: 12 },
      { id: 'dhuhr', nameAr: 'الظهر', nameUg: 'پېشىن', nameTr: 'Öğle', nameEn: 'Dhuhr', count: 8 },
      { id: 'asr', nameAr: 'العصر', nameUg: 'ئەسر', nameTr: 'İkindi', nameEn: 'Asr', count: 15 },
      { id: 'maghrib', nameAr: 'المغرب', nameUg: 'شام', nameTr: 'Akşam', nameEn: 'Maghrib', count: 5 },
      { id: 'isha', nameAr: 'العشاء', nameUg: 'خۇپتەن', nameTr: 'Yatsı', nameEn: 'Isha', count: 14 },
      { id: 'witr', nameAr: 'الوتر', nameUg: 'ۋىتىر', nameTr: 'Vitir', nameEn: 'Witr', count: 10 },
    ];
  });

  const [fastingCount, setFastingCount] = useState<number>(() => {
    const saved = localStorage.getItem('qaza_fasting_data');
    return saved ? parseInt(saved, 10) : 4;
  });

  useEffect(() => {
    localStorage.setItem('qaza_prayers_data', JSON.stringify(prayers));
  }, [prayers]);

  useEffect(() => {
    localStorage.setItem('qaza_fasting_data', fastingCount.toString());
  }, [fastingCount]);

  const incrementPrayer = (id: string, delta: number) => {
    setPrayers(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, count: Math.max(0, p.count + delta) };
      }
      return p;
    }));
  };

  const totalMissedPrayers = prayers.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-12 select-none font-arabic">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09182A] via-[#07111E] to-[#040810] pointer-events-none" />

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
              {lang === 'ug' ? 'قازا ناماز ۋە روزا خاتىرىسى' : lang === 'ar' ? 'قضاء الصلوات والصيام' : lang === 'tr' ? 'Kaza Namazı ve Oruç' : 'Qaza & Fasting Tracker'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'قەرز قالغان ئىبادەتلەرنى ئادا قىلىش' : 'Track and complete missed obligations'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#06101B] p-1 rounded-2xl border border-white/10 my-2.5">
          <button
            onClick={() => setActiveTab('prayers')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'prayers' 
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang === 'ug' ? `قازا نامازلار (${totalMissedPrayers})` : `Missed Prayers (${totalMissedPrayers})`}
          </button>
          <button
            onClick={() => setActiveTab('fasting')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fasting' 
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang === 'ug' ? `قازا روزىلار (${fastingCount} كۈن)` : `Missed Fasting (${fastingCount} Days)`}
          </button>
        </div>

        {/* Content: Prayers List */}
        {activeTab === 'prayers' ? (
          <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
            {prayers.map(p => (
              <div 
                key={p.id}
                className="p-2.5 rounded-2xl bg-[#09182A]/90 border border-[#D4AF37]/25 flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="font-bold text-sm text-[#FFEAA7]">
                    {lang === 'ug' ? p.nameUg : lang === 'ar' ? p.nameAr : lang === 'tr' ? p.nameTr : p.nameEn}
                    <span className="text-[10px] text-gray-400 ml-1.5">({p.nameAr})</span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    {lang === 'ug' ? 'قازا قالغىنى:' : 'Remaining:'} <span className="font-bold text-emerald-400 font-mono">{p.count} ۋاقىت</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => incrementPrayer(p.id, -1)}
                    disabled={p.count === 0}
                    className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center disabled:opacity-30 active:scale-95"
                    title={lang === 'ug' ? 'بىر ۋاقىت قازاسىنى ئادا قىلدىم (-1)' : 'Completed 1'}
                  >
                    <Check className="w-4 h-4" />
                  </button>

                  <div className="w-10 text-center font-mono font-bold text-base text-white">
                    {p.count}
                  </div>

                  <button 
                    onClick={() => incrementPrayer(p.id, 1)}
                    className="w-8 h-8 rounded-xl bg-[#0F2236] border border-white/15 text-gray-200 flex items-center justify-center hover:text-white active:scale-95"
                    title={lang === 'ug' ? 'قازا قوشۇش (+1)' : 'Add missed (+1)'}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => incrementPrayer(p.id, 10)}
                    className="px-2 py-1 rounded-xl bg-[#0F2236] border border-white/10 text-[10px] text-[#D4AF37] font-mono hover:text-white"
                  >
                    +10
                  </button>
                </div>
              </div>
            ))}

            {/* Tip Banner */}
            <div className="p-3 rounded-2xl bg-[#061220] border border-white/10 text-[11px] text-gray-300 leading-relaxed">
              <span className="text-[#D4AF37] font-bold block mb-0.5">💡 ئىسلامىي ئەسكەرتىش:</span>
              ھەر بىر پەرز نامازدىن بۇرۇن ياكى كېيىن ئۆتۈپ كەتكەن شۇ ۋاقىتنىڭ بىر قازاسىنى ئوقۇپ بارسىڭىز، قىسقا ۋاقىت ئىچىدە بارلىق قەرز نامازلار ئادا بولۇپ تۈگەيدۇ.
            </div>
          </div>
        ) : (
          /* Content: Fasting Manager */
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="p-4 rounded-3xl bg-[#09182A]/90 border-2 border-[#D4AF37]/50 text-center shadow-lg">
              <span className="text-xs text-[#D4AF37] font-bold block mb-1">
                {lang === 'ug' ? 'قەرز قالغان ئومۇمىي روزا سانى' : 'Total Missed Fasting Days'}
              </span>
              <div className="text-5xl font-extrabold font-mono text-white my-2">
                {fastingCount} <span className="text-base text-gray-400 font-normal">كۈن</span>
              </div>

              <div className="flex items-center justify-center gap-3 mt-4">
                <button 
                  onClick={() => setFastingCount(prev => Math.max(0, prev - 1))}
                  disabled={fastingCount === 0}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-700 border border-emerald-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 disabled:opacity-30"
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'ug' ? 'بىر كۈن تۇتتۇم (-1)' : 'Completed 1 Day'}</span>
                </button>

                <button 
                  onClick={() => setFastingCount(prev => prev + 1)}
                  className="px-4 py-2.5 rounded-2xl bg-[#10253B] border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ug' ? 'قوشۇش (+1)' : 'Add 1 Day'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#061220] border border-white/10 text-xs text-gray-300 leading-relaxed mt-3">
              <span className="text-[#FFEAA7] font-bold block mb-1">🤲 روزا قەرزى ھۆكمى:</span>
              كېلەر رامىزان كەلگۈچە دۈشەنبە ۋە پەيشەنبە ياكى ھەر ئاينىڭ ئاق كۈنلىرى (13، 14، 15-كۈنلىرى) قازا روزىلارنى تۇتۇپ ئادا قىلىش سۈننەتكە ئۇيغۇندۇر.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
