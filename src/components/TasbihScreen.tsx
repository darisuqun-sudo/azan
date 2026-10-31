import React, { useState } from 'react';
import { 
  ChevronRight, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sliders 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../utils/audioPlayer';
import { ActiveScreen, Language } from '../types';

interface TasbihScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang?: Language;
}

const PRESET_DHIKR = [
  { 
    ar: 'سُبْحَانَ اللَّهِ', 
    ug: 'سۇبھاناللاھ (ئاللاھ بارلىق كەمچىلىكلەردىن پاكتۇر)', 
    en: 'SubhanAllah (Glory be to Allah)',
    tr: 'Sübhanallah (Allah her türlü eksiklikten münezzehtir)',
    target: 33 
  },
  { 
    ar: 'الْحَمْدُ لِلَّهِ', 
    ug: 'ئەلھەمدۇلىللاھ (جىمى ھەمدۇسانا ئاللاھقا خاستۇر)', 
    en: 'Alhamdulillah (All praise is due to Allah)',
    tr: 'Elhamdülillah (Bütün övgüler Allah\'a aittir)',
    target: 33 
  },
  { 
    ar: 'اللَّهُ أَكْبَرُ', 
    ug: 'ئاللاھۇ ئەكبەر (ئاللاھ ئەڭ ئۇلۇغتۇر)', 
    en: 'Allahu Akbar (Allah is the Greatest)',
    tr: 'Allahu Ekber (Allah en büyüktür)',
    target: 33 
  },
  { 
    ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', 
    ug: 'لاھىلاھە ئىللەللاھ (ئاللاھتىن باشقا ھەقىقىي ئىلاھ يوق)', 
    en: 'La ilaha illallah (None has the right to be worshipped but Allah)',
    tr: 'Lâ ilâhe illallah (Allah\'tan başka ilah yoktur)',
    target: 100 
  },
  { 
    ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', 
    ug: 'ئەستەغفىرۇللاھ (ئاللاھتىن مەغپىرەت تىلەيمەن)', 
    en: 'Astaghfirullah wa atubu ilayh (I seek forgiveness of Allah and turn to Him)',
    tr: 'Estağfirullah ve etûbü ileyh (Allah\'tan af diler ve O\'na tövbe ederim)',
    target: 100 
  },
  { 
    ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', 
    ug: 'پەيغەمبەر ئەلەيھىسسالامغا دۇرۇت سالام', 
    en: 'Allahumma salli \'ala Muhammad (O Allah, send blessings upon Muhammad)',
    tr: 'Allahümme salli ala Muhammed (Allah\'ım, Muhammed\'e salat eyle)',
    target: 100 
  }
];

export const TasbihScreen: React.FC<TasbihScreenProps> = ({ 
  onNavigate,
  lang = 'ug' 
}) => {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDhikrIndex, setSelectedDhikrIndex] = useState(0);
  const [target, setTarget] = useState(33);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentDhikr = PRESET_DHIKR[selectedDhikrIndex];

  const handleTap = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setTotalCount(prev => prev + 1);

    if (soundEnabled) {
      soundService.playTasbihClick();
    }

    // Check if target reached
    if (nextCount % target === 0) {
      soundService.playChime();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#16A34A', '#FFEAA7']
      });
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const dhikrMeaning = lang === 'ug' ? currentDhikr.ug :
                       lang === 'ar' ? currentDhikr.ar :
                       lang === 'tr' ? currentDhikr.tr :
                       currentDhikr.en;

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-16 font-arabic select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#D4AF37]/20 bg-[#09182A]">
        <button 
          onClick={() => onNavigate('home')}
          className="w-9 h-9 rounded-full bg-[#0E2138] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C378] active:scale-95 transition-transform"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-bold font-quran gold-text">
            {lang === 'ug' ? 'ئېلېكترونلۇق تەسبيھ' : lang === 'ar' ? 'السبحة الإلكترونية' : lang === 'tr' ? 'Dijital Tesbih' : 'Digital Tasbih'}
          </h2>
          <span className="text-[11px] text-gray-400">
            {lang === 'ug' ? 'زىكىر ۋە تەسبىھ تارتىش' : lang === 'ar' ? 'الأذكار والتسبيح اليومي' : lang === 'tr' ? 'Günlük Zikirler' : 'Daily Dhikr & Tasbih'}
          </span>
        </div>

        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-9 h-9 rounded-full bg-[#0E2138] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C378] active:scale-95 transition-transform"
          title="ئاۋاز"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D4AF37]" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
        </button>
      </div>

      {/* Main Interactive Tasbih Counter */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">
        
        {/* Active Dhikr Card */}
        <div className="w-full max-w-xs text-center p-3 rounded-2xl bg-[#0A1A2E] border border-[#D4AF37]/30 shadow-lg mb-4">
          <h3 className="text-2xl font-bold font-quran text-[#FFEAA7] mb-1">
            {currentDhikr.ar}
          </h3>
          <p className="text-xs text-[#93C5FD] leading-relaxed">
            {dhikrMeaning}
          </p>
        </div>

        {/* Big Circular Touch Tasbih Button */}
        <div 
          onClick={handleTap}
          className="relative w-64 h-64 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 group select-none shadow-[0_0_40px_rgba(212,175,55,0.2)]"
        >
          {/* Outer Golden Geometric Bead Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/50" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#D4AF37]/30" />
          
          {/* Inner metallic dome background */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-b from-[#1C3B5E] via-[#0E2238] to-[#071322] shadow-inner" />

          {/* Center Digital Display */}
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs text-[#D4AF37] font-medium tracking-widest uppercase">
              {lang === 'ug' ? 'نۆۋەتتىكى سانى' : lang === 'ar' ? 'العدد الحالي' : lang === 'tr' ? 'Mevcut Sayaç' : 'Current Count'}
            </span>
            <span className="text-6xl font-extrabold font-mono text-white my-1 drop-shadow-md">
              {count}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#4ADE80] font-bold">
              <span>{lang === 'ug' ? 'نىشان:' : lang === 'ar' ? 'الهدف:' : lang === 'tr' ? 'Hedef:' : 'Target:'} {target}</span>
              <span>•</span>
              <span>{lang === 'ug' ? 'دەۋرى:' : lang === 'ar' ? 'الدورة:' : lang === 'tr' ? 'Devir:' : 'Lap:'} {Math.floor(count / target)}</span>
            </div>
            <span className="text-[11px] text-gray-400 mt-2 bg-[#050F1A] px-3 py-1 rounded-full border border-white/10">
              {lang === 'ug' ? 'باسسىڭىز سانىلىدۇ (تەسبىھ)' : lang === 'ar' ? 'اضغط للتسبيح' : lang === 'tr' ? 'Çekmek için dokunun' : 'Tap to Count'}
            </span>
          </div>
        </div>

        {/* Stats & Quick Actions */}
        <div className="flex items-center justify-between w-full max-w-xs mt-4 px-2">
          <div className="text-center">
            <span className="text-[10px] text-gray-400 block">
              {lang === 'ug' ? 'ئومۇمىي سانى' : lang === 'ar' ? 'المجموع الكلي' : lang === 'tr' ? 'Toplam' : 'Total'}
            </span>
            <span className="text-base font-bold font-mono text-[#D4AF37]">{totalCount}</span>
          </div>

          <button 
            onClick={handleReset}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#0E2034] border border-[#D4AF37]/30 text-xs text-[#E5C378] hover:bg-white/10 cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'ug' ? 'قايتا نۆللەش' : lang === 'ar' ? 'تصفير' : lang === 'tr' ? 'Sıfırla' : 'Reset'}</span>
          </button>

          <div className="text-center">
            <span className="text-[10px] text-gray-400 block">
              {lang === 'ug' ? 'نىشان' : lang === 'ar' ? 'الهدف' : lang === 'tr' ? 'Hedef' : 'Target'}
            </span>
            <span className="text-base font-bold font-mono text-[#4ADE80]">{target}</span>
          </div>
        </div>

      </div>

      {/* Preset Dhikr Selector */}
      <div className="px-4 py-2 bg-[#09182A] border-t border-[#D4AF37]/20">
        <span className="text-[11px] text-[#D4AF37] font-bold block mb-1.5">
          {lang === 'ug' ? 'زىكىر تاللاش:' : lang === 'ar' ? 'اختر الذكر:' : lang === 'tr' ? 'Zikir Seçimi:' : 'Select Dhikr:'}
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PRESET_DHIKR.map((d, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedDhikrIndex(i);
                setTarget(d.target);
                setCount(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer ${
                selectedDhikrIndex === i 
                  ? 'bg-[#D4AF37] text-black font-bold' 
                  : 'bg-[#0E2034] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              {d.ar} ({d.target})
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
