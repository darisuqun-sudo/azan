import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { ALL_114_SURAHS_META, SURAHS_LIST } from '../data/quranData';
import { ActiveScreen } from '../types';

interface SurahListScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onSelectSurah: (surahNumber: number) => void;
}

export const SurahListScreen: React.FC<SurahListScreenProps> = ({
  onNavigate,
  onSelectSurah
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [favorites, setFavorites] = useState<number[]>([1, 2, 18, 36, 67]);

  const filteredSurahs = ALL_114_SURAHS_META.filter(surah => {
    const sName = surah.name || '';
    const sEng = surah.englishName || '';
    const sUg = surah.nameUg || '';
    const matchesSearch = 
      sName.includes(searchTerm) || 
      sEng.toLowerCase().includes(searchTerm.toLowerCase()) || 
      sUg.includes(searchTerm) ||
      String(surah.number) === searchTerm;
    
    const matchesType = filterType === 'all' || surah.type === filterType;
    return matchesSearch && matchesType;
  });

  const toggleFavorite = (e: React.MouseEvent, num: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-16 font-arabic select-none">
      
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-[#D4AF37]/20 bg-[#09182A]">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full bg-[#0E2138] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C378]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-lg font-bold font-quran gold-text">فهرس سور القرآن الكريم</h2>
            <span className="text-[11px] text-gray-400">قۇرئان كەرىمدىكى 114 سۈرە تىزىملىكى</span>
          </div>

          <div className="w-9 h-9" />
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="سۈرە ئىسمى ياكى نومۇرىنى ئىزدەش (ابحث عن سورة)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-9 py-2 rounded-xl bg-[#061220] border border-[#D4AF37]/30 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            dir="rtl"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-[11px] transition-colors ${
              filterType === 'all' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#0E2034] text-gray-400 hover:text-white'
            }`}
          >
            بارلىق سۈرىلەر (الكل - 114)
          </button>
          <button
            onClick={() => setFilterType('Meccan')}
            className={`px-3 py-1 rounded-full text-[11px] transition-colors ${
              filterType === 'Meccan' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#0E2034] text-gray-400 hover:text-white'
            }`}
          >
            مەككىي (مكية)
          </button>
          <button
            onClick={() => setFilterType('Medinan')}
            className={`px-3 py-1 rounded-full text-[11px] transition-colors ${
              filterType === 'Medinan' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#0E2034] text-gray-400 hover:text-white'
            }`}
          >
            مەدىنىي (مدنية)
          </button>
        </div>

        {/* Melodic Recitations Banner */}
        <div 
          onClick={() => onNavigate('melodic-recitations')}
          className="mt-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#142B47] via-[#0E2238] to-[#142B47] border border-[#D4AF37]/50 flex items-center justify-between cursor-pointer hover:border-[#D4AF37] transition-all shadow-md group"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🎙️</span>
            <div className="text-right">
              <div className="text-xs font-bold text-[#FFEAA7] flex items-center gap-1.5">
                <span>ئەڭ مۇڭ تىلاۋەتلەر بۆلىكى</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D4AF37]/25 text-[#FFDF88]">نادىر ئاۋازلار</span>
              </div>
              <div className="text-[10px] text-gray-300">
                الشيخ عبدالعزيز سحيم & شريف مصطفى نىڭ مۇڭلۇق تىلاۋەتلىرى
              </div>
            </div>
          </div>
          <span className="text-xs text-[#D4AF37] group-hover:translate-x-[-3px] transition-transform">
            ◀ تىڭشاش
          </span>
        </div>
      </div>

      {/* Surah List Items */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 max-h-[72vh]">
        {filteredSurahs.map((surah) => {
          const isFav = favorites.includes(surah.number);
          return (
            <div
              key={surah.number}
              onClick={() => {
                onSelectSurah(surah.number);
                onNavigate('quran-reader');
              }}
              className="p-3 rounded-2xl bg-[#0A1A2C]/90 border border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-[#10243C] transition-all cursor-pointer flex items-center justify-between shadow-sm group"
            >
              {/* Right: Surah Number badge & Names */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#142940] border border-[#D4AF37]/40 flex items-center justify-center text-xs font-mono font-bold text-[#FFDF88] shadow-inner group-hover:scale-105 transition-transform">
                  {surah.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white font-quran">{surah.name}</h3>
                    <span className="text-xs text-[#93C5FD]">({surah.nameUg})</span>
                  </div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                    <span>{surah.englishName}</span>
                    <span>•</span>
                    <span className={surah.type === 'Meccan' ? 'text-amber-400' : 'text-emerald-400'}>
                      {surah.type === 'Meccan' ? 'مكية' : 'مدنية'}
                    </span>
                    <span>•</span>
                    <span>{surah.ayahs} ئايەت</span>
                  </div>
                </div>
              </div>

              {/* Left: Juz & Bookmark */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#071322] border border-white/10 text-[#D4AF37]">
                  جزء {surah.juz}
                </span>
                <button
                  onClick={(e) => toggleFavorite(e, surah.number)}
                  className={`p-1.5 rounded-full hover:bg-white/10 ${isFav ? 'text-[#EF4444]' : 'text-gray-500'}`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
