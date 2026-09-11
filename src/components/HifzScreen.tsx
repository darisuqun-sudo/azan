import React, { useState } from 'react';
import { 
  ChevronRight, 
  Repeat, 
  Eye, 
  EyeOff, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { SURAHS_LIST } from '../data/quranData';
import { soundService } from '../utils/audioPlayer';

interface HifzScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const HifzScreen: React.FC<HifzScreenProps> = ({ onNavigate, lang }) => {
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(0);
  const [repeatTarget, setRepeatTarget] = useState<number>(5);
  const [currentRepeat, setCurrentRepeat] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBlindMode, setIsBlindMode] = useState<boolean>(false);
  const [memorizedAyahs, setMemorizedAyahs] = useState<number[]>([1]);

  const surahObj = SURAHS_LIST.find(s => s.number === selectedSurah) || SURAHS_LIST[0];
  const currentAyahs = surahObj.ayahs || [];
  const activeAyah = currentAyahs[activeAyahIndex] || currentAyahs[0];

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    soundService.playBeep();
  };

  const handleNextAyah = () => {
    if (activeAyahIndex < currentAyahs.length - 1) {
      setActiveAyahIndex(prev => prev + 1);
      setCurrentRepeat(1);
      soundService.playTasbihClick();
    }
  };

  const handlePrevAyah = () => {
    if (activeAyahIndex > 0) {
      setActiveAyahIndex(prev => prev - 1);
      setCurrentRepeat(1);
      soundService.playTasbihClick();
    }
  };

  const toggleMemorized = (ayahNum: number) => {
    setMemorizedAyahs(prev => 
      prev.includes(ayahNum) ? prev.filter(n => n !== ayahNum) : [...prev, ayahNum]
    );
    soundService.playChime();
  };

  const incrementRepeat = () => {
    setCurrentRepeat(prev => {
      const next = prev + 1;
      if (next >= repeatTarget) {
        soundService.playChime();
      } else {
        soundService.playTasbihClick();
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-12 select-none font-arabic">
      
      {/* Background Glow */}
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
              {lang === 'ug' ? 'قۇرئان يادلاش ياردەمچىسى' : lang === 'ar' ? 'مساعد حفظ القرآن الكريم' : lang === 'tr' ? 'Kur\'an Ezber Yardımcısı' : 'Quran Memorization Assistant'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'تەكرار تىڭشاش ۋە يوشۇرۇپ سىناش ھالىتى' : 'Audio Loop & Blind Recall Mode'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Top Surah Selector Pill */}
        <div className="my-2 flex items-center justify-between bg-[#091B2E] p-2 rounded-2xl border border-[#D4AF37]/30">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-white">
              {selectedSurah === 1 ? '1. سۈرە فاتىھە' : '2. سۈرە بەقەرە'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => { setSelectedSurah(1); setActiveAyahIndex(0); }}
              className={`px-2 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedSurah === 1 ? 'bg-[#D4AF37] text-black' : 'bg-[#06101B] text-gray-300'
              }`}
            >
              فاتىھە
            </button>
            <button
              onClick={() => { setSelectedSurah(2); setActiveAyahIndex(0); }}
              className={`px-2 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedSurah === 2 ? 'bg-[#D4AF37] text-black' : 'bg-[#06101B] text-gray-300'
              }`}
            >
              بەقەرە
            </button>
          </div>
        </div>

        {/* Central Memorization Stage */}
        <div className="flex-1 flex flex-col justify-between py-1">
          
          {/* Main Ayah Card */}
          <div className="relative p-4 rounded-3xl bg-gradient-to-b from-[#0B2238] via-[#071727] to-[#040E1A] border-2 border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.2)] text-center">
            
            {/* Ayah Number Badge */}
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-xs text-[#D4AF37] font-bold font-mono">
                ئايەت: {activeAyah.numberInSurah} / {currentAyahs.length}
              </span>

              <button
                onClick={() => setIsBlindMode(!isBlindMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  isBlindMode 
                    ? 'bg-amber-500 text-black shadow-md' 
                    : 'bg-[#06101B] border border-white/10 text-gray-300'
                }`}
              >
                {isBlindMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isBlindMode ? 'يوشۇرۇلدى (يادتىن ئوقۇڭ)' : 'ئايەتنى يوشۇرۇش'}</span>
              </button>
            </div>

            {/* Arabic Text (Hidden if Blind Mode is active) */}
            <div className="min-h-[110px] flex items-center justify-center my-2 px-2">
              {isBlindMode ? (
                <div 
                  onClick={() => setIsBlindMode(false)}
                  className="p-4 rounded-2xl bg-black/40 border border-dashed border-amber-400/50 cursor-pointer hover:border-amber-400 transition-colors text-amber-300 text-xs"
                >
                  🔒 ئايەت يوشۇرۇلدى. يادتىن ئوقۇپ باققاندىن كېيىن، كۆرۈش ئۈچۈن بۇ يەرنى چېكىڭ.
                </div>
              ) : (
                <p className="text-xl sm:text-2xl font-bold font-quran text-[#FFEAA7] leading-loose" dir="rtl">
                  {activeAyah.text}
                </p>
              )}
            </div>

            {/* Uyghur Translation */}
            {!isBlindMode && (
              <p className="text-xs text-gray-300 font-arabic border-t border-white/5 pt-2 mt-2" dir="rtl">
                {activeAyah.translationUg}
              </p>
            )}

            {/* Repeat Progress Counter Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs text-gray-300">
                  تەكرارلاندى: <strong className="text-[#FFEAA7] font-mono text-sm">{currentRepeat}</strong> / {repeatTarget}
                </span>
              </div>

              <button
                onClick={incrementRepeat}
                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                +1 ساناپ تەكرارلاش
              </button>
            </div>

          </div>

          {/* Controls Panel */}
          <div className="space-y-2 mt-2">
            
            {/* Repeat Target Selector */}
            <div className="flex items-center justify-between bg-[#081726] p-2 rounded-2xl border border-white/10 text-xs">
              <span className="text-gray-300">نىشان تەكرار سانى:</span>
              <div className="flex gap-1.5">
                {[3, 5, 10, 20].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setRepeatTarget(cnt)}
                    className={`w-7 h-7 rounded-xl font-bold font-mono text-xs transition-all ${
                      repeatTarget === cnt ? 'bg-[#D4AF37] text-black' : 'bg-[#06101B] text-gray-300'
                    }`}
                  >
                    {cnt}x
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar (Prev, Play, Next, Mark Memorized) */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={handlePrevAyah}
                disabled={activeAyahIndex === 0}
                className="p-2.5 rounded-2xl bg-[#0B1E32] border border-white/10 disabled:opacity-30 text-xs font-bold text-gray-200"
              >
                ئالدىنقىسى
              </button>

              <button
                onClick={handlePlayToggle}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold text-xs flex items-center justify-center gap-1 shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'توختىتىش' : 'ئاڭلاش'}</span>
              </button>

              <button
                onClick={handleNextAyah}
                disabled={activeAyahIndex === currentAyahs.length - 1}
                className="p-2.5 rounded-2xl bg-[#0B1E32] border border-white/10 disabled:opacity-30 text-xs font-bold text-gray-200"
              >
                كېيىنكىسى
              </button>

              <button
                onClick={() => toggleMemorized(activeAyah.numberInSurah)}
                className={`p-2.5 rounded-2xl border flex items-center justify-center gap-1 text-xs font-bold transition-all ${
                  memorizedAyahs.includes(activeAyah.numberInSurah)
                    ? 'bg-emerald-600 border-emerald-400 text-white'
                    : 'bg-[#081726] border-white/10 text-emerald-400'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{memorizedAyahs.includes(activeAyah.numberInSurah) ? 'ياد بولدى ✓' : 'ياد بولدى'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
