import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  Sparkles, 
  Volume2, 
  Heart,
  Star
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { ASMAUL_HUSNA } from '../data/extraIslamicData';
import { soundService } from '../utils/audioPlayer';

interface AsmaulHusnaScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const AsmaulHusnaScreen: React.FC<AsmaulHusnaScreenProps> = ({ onNavigate, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeName, setActiveName] = useState<number | null>(null);

  const filteredNames = ASMAUL_HUSNA.filter(item => {
    return (
      (item.nameAr || '').includes(searchQuery) ||
      (item.nameUg || '').includes(searchQuery) ||
      (item.transliteration || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.meaningUg || '').includes(searchQuery)
    );
  });

  const playNameAudio = (number: number) => {
    setActiveName(number);
    soundService.playChime();
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
              {lang === 'ug' ? 'ئەسمائۇل ھۈسنا (99 گۈزەل ئىسىم)' : lang === 'ar' ? 'أسماء الله الحسنى' : lang === 'tr' ? 'Esmaül Hüsna' : '99 Beautiful Names of Allah'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'ئاللاھ تائالانىڭ كاتتا ئىسىم ۋە سۈپەتلىرى' : 'Attributes & Virtues of Allah'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Search */}
        <div className="my-2 relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ug' ? 'گۈزەل ئىسىملارنى ئىزدەڭ...' : 'Search Asmaul Husna...'}
            className="w-full bg-[#081524] border border-[#D4AF37]/35 rounded-2xl py-2 px-9 text-xs text-white placeholder-gray-400 outline-none focus:border-[#D4AF37]"
          />
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-2.5" />
        </div>

        {/* Grid of 99 Names */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 max-h-[58vh]">
          {filteredNames.map(item => {
            const isSelected = activeName === item.number;
            return (
              <div 
                key={item.number}
                onClick={() => playNameAudio(item.number)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#0E243A] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                    : 'bg-[#09182A]/90 border-white/10 hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#06101B] border border-[#D4AF37]/40 flex items-center justify-center text-xs font-bold text-[#D4AF37] font-mono">
                      {item.number}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-quran text-[#FFEAA7]">
                        {item.nameAr}
                      </h4>
                      <span className="text-xs text-gray-300 font-arabic">
                        {item.nameUg} • <span className="text-[11px] text-gray-400">{item.transliteration}</span>
                      </span>
                    </div>
                  </div>

                  <button 
                    className="w-8 h-8 rounded-full bg-[#081726] border border-white/10 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37]"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-2 text-xs text-gray-300 bg-[#06101B] p-2.5 rounded-xl border border-white/5 space-y-1" dir="rtl">
                  <div>
                    <strong className="text-[#D4AF37]">مەنىسى:</strong> {lang === 'ug' ? item.meaningUg : lang === 'ar' ? item.meaningAr : lang === 'tr' ? item.meaningTr : item.meaningEn}
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    <strong>پەزىلىتى:</strong> {item.benefitUg}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
