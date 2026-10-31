import React, { useState } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  Share2, 
  Download, 
  Palette, 
  Copy, 
  Check,
  Type,
  BookOpen
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { SURAHS_LIST } from '../data/quranData';
import { soundService } from '../utils/audioPlayer';

interface AyahCardScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

type CardTheme = 'emerald-gold' | 'midnight-blue' | 'classic-black' | 'royal-ruby' | 'desert-sand';

export const AyahCardScreen: React.FC<AyahCardScreenProps> = ({ onNavigate, lang }) => {
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [selectedAyahIndex, setSelectedAyahIndex] = useState<number>(0);
  const [cardTheme, setCardTheme] = useState<CardTheme>('emerald-gold');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const surahObj = SURAHS_LIST.find(s => s.number === selectedSurah) || SURAHS_LIST[0];
  const ayahs = surahObj.ayahs || [];
  const activeAyah = ayahs[selectedAyahIndex] || ayahs[0];

  const handleCopyText = () => {
    const textToCopy = `«${activeAyah.text}»\n\nتەرجىمىسى: ${activeAyah.translationUg}\n(قۇرئان كەرىم، ${selectedSurah === 1 ? 'سۈرە فاتىھە' : 'سۈرە بەقەرە'} ${activeAyah.numberInSurah}-ئايەت)`;
    try {
      navigator.clipboard?.writeText(textToCopy)?.catch(() => {});
    } catch {
      // ignore
    }
    setShowCopied(true);
    soundService.playChime();
    setTimeout(() => setShowCopied(false), 2000);
  };

  const getThemeStyles = () => {
    switch (cardTheme) {
      case 'emerald-gold':
        return {
          bg: 'bg-gradient-to-br from-[#06291C] via-[#031810] to-[#010C07]',
          border: 'border-[#D4AF37]',
          textGold: 'text-[#FFEAA7]',
          subtext: 'text-emerald-200',
          ornament: 'text-[#D4AF37]'
        };
      case 'midnight-blue':
        return {
          bg: 'bg-gradient-to-br from-[#0B2138] via-[#061424] to-[#030910]',
          border: 'border-[#60A5FA]',
          textGold: 'text-[#E0F2FE]',
          subtext: 'text-sky-200',
          ornament: 'text-[#60A5FA]'
        };
      case 'classic-black':
        return {
          bg: 'bg-gradient-to-br from-[#1A1A1A] via-[#0D0D0D] to-[#000000]',
          border: 'border-[#D4AF37]',
          textGold: 'text-[#FFEAA7]',
          subtext: 'text-gray-300',
          ornament: 'text-[#D4AF37]'
        };
      case 'royal-ruby':
        return {
          bg: 'bg-gradient-to-br from-[#2D0A14] via-[#1A050B] to-[#0A0204]',
          border: 'border-[#F472B6]',
          textGold: 'text-[#FCE7F3]',
          subtext: 'text-rose-200',
          ornament: 'text-[#F472B6]'
        };
      case 'desert-sand':
        return {
          bg: 'bg-gradient-to-br from-[#2B1D0E] via-[#1A1006] to-[#0A0602]',
          border: 'border-[#F59E0B]',
          textGold: 'text-[#FEF3C7]',
          subtext: 'text-amber-200',
          ornament: 'text-[#F59E0B]'
        };
    }
  };

  const themeStyle = getThemeStyles();

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
              {lang === 'ug' ? 'ئايەت رەسىم كارتىسى ياسىغۇچ' : lang === 'ar' ? 'صانع بطاقات الآيات القرآنية' : lang === 'tr' ? 'Ayet Kartı Tasarımcısı' : 'Quran Ayah Card Studio'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'ئايەتلەرنى نەپىس رەسىمگە ئايلاندۇرۇپ ھەمبەھىرلەش' : 'Export & Share Beautiful Ayah Cards'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Top Controls (Surah & Ayah Selector) */}
        <div className="my-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1 bg-[#081726] p-1.5 rounded-2xl border border-white/10 text-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <select
              value={selectedSurah}
              onChange={(e) => {
                setSelectedSurah(Number(e.target.value));
                setSelectedAyahIndex(0);
              }}
              className="bg-transparent text-white outline-none w-full cursor-pointer text-xs"
            >
              <option value={1} className="bg-[#081726]">1. سۈرە فاتىھە</option>
              <option value={2} className="bg-[#081726]">2. سۈرە بەقەرە</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-[#081726] p-1.5 rounded-2xl border border-white/10 text-xs">
            <span className="text-gray-400">ئايەت:</span>
            <select
              value={selectedAyahIndex}
              onChange={(e) => setSelectedAyahIndex(Number(e.target.value))}
              className="bg-transparent text-white outline-none cursor-pointer text-xs"
            >
              {ayahs.map((a, idx) => (
                <option key={a.number} value={idx} className="bg-[#081726]">
                  {a.numberInSurah}-ئايەت
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Ayah Card Preview Container */}
        <div className="flex-1 flex flex-col justify-center py-2 items-center">
          <div 
            id="exportable-ayah-card"
            className={`w-full max-w-[340px] p-5 rounded-3xl ${themeStyle.bg} border-2 ${themeStyle.border} shadow-[0_0_30px_rgba(0,0,0,0.6)] relative overflow-hidden text-center transition-all duration-300`}
          >
            {/* Ornate Frame Corners */}
            <div className={`absolute inset-2 rounded-2xl border ${themeStyle.border}/40 pointer-events-none`} />
            
            {/* Top Bismillah Emblem */}
            <div className="flex items-center justify-center mb-3">
              <span className={`text-xs ${themeStyle.ornament} tracking-widest font-mono font-bold`}>
                ✦ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ✦
              </span>
            </div>

            {/* Arabic Quranic Ayah Text */}
            <div className="my-3 min-h-[100px] flex items-center justify-center">
              <p className={`font-bold font-quran ${themeStyle.textGold} leading-relaxed drop-shadow-md ${
                fontSize === 'normal' ? 'text-lg' : fontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
              }`} dir="rtl">
                {activeAyah.text}
              </p>
            </div>

            {/* Uyghur Translation */}
            <div className="border-t border-white/10 pt-3 mt-2">
              <p className={`text-xs ${themeStyle.subtext} font-arabic leading-relaxed`} dir="rtl">
                «{activeAyah.translationUg}»
              </p>
            </div>

            {/* Footer Reference */}
            <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
              <span className="font-arabic">
                {selectedSurah === 1 ? 'سۈرە فاتىھە' : 'سۈرە بەقەرە'} • {activeAyah.numberInSurah}-ئايەت
              </span>
              <span className="font-mono text-[#D4AF37]">الآذان والقرآن</span>
            </div>
          </div>
        </div>

        {/* Customization Toolbar */}
        <div className="space-y-2 pt-1">
          
          {/* Theme Palette Buttons */}
          <div className="flex items-center justify-between bg-[#081726] p-2 rounded-2xl border border-white/10 text-xs">
            <span className="flex items-center gap-1 text-gray-300">
              <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>تېما:</span>
            </span>

            <div className="flex gap-2">
              {[
                { id: 'emerald-gold', bg: 'bg-[#06291C] border-[#D4AF37]' },
                { id: 'midnight-blue', bg: 'bg-[#0B2138] border-[#60A5FA]' },
                { id: 'classic-black', bg: 'bg-[#1A1A1A] border-[#D4AF37]' },
                { id: 'royal-ruby', bg: 'bg-[#2D0A14] border-[#F472B6]' },
                { id: 'desert-sand', bg: 'bg-[#2B1D0E] border-[#F59E0B]' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCardTheme(item.id as CardTheme);
                    soundService.playTasbihClick();
                  }}
                  className={`w-6 h-6 rounded-full ${item.bg} border-2 transition-transform ${
                    cardTheme === item.id ? 'scale-125 ring-2 ring-white shadow-lg' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons (Copy Text, Share, Download) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyText}
              className="p-2.5 rounded-2xl bg-[#0C223A] border border-[#D4AF37]/35 text-xs text-[#FFEAA7] font-bold flex items-center justify-center gap-1.5 hover:border-[#D4AF37] transition-all cursor-pointer"
            >
              {showCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{showCopied ? 'كۆچۈرۈلدى ✓' : 'تېكىستنى كۆچۈرۈش'}</span>
            </button>

            <button
              onClick={() => {
                setShowShareModal(true);
                soundService.playChime();
              }}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>ھەمبەھىرلەش / ساقلاش</span>
            </button>
          </div>

        </div>

      </div>

      {/* Share Modal Simulation */}
      {showShareModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A1A2E] border border-[#D4AF37] rounded-3xl p-5 w-full max-w-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600/20 border border-emerald-500 mx-auto flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="text-sm font-bold text-white font-arabic">
              ئايەت كارتىسى تەييارلاندى
            </h3>
            <p className="text-xs text-gray-300">
              رەسىم HD سۈپەتتە ئەپ ئارخىپىغا ساقلاندى ھەمدە كۆچۈرۈلدى.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 rounded-xl bg-[#06101B] border border-white/10 text-xs text-gray-300"
              >
                تاقاش
              </button>
              <button
                onClick={() => {
                  setShowShareModal(false);
                  handleCopyText();
                }}
                className="p-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold"
              >
                تېكىستنى كۆچۈرۈش
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
