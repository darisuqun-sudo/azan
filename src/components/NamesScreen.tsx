import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  UserCheck, 
  Heart, 
  Sparkles, 
  BookOpen,
  Filter
} from 'lucide-react';
import { ActiveScreen, Language, IslamicNameItem } from '../types';
import { ISLAMIC_NAMES } from '../data/extraIslamicData';

interface NamesScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const NamesScreen: React.FC<NamesScreenProps> = ({ onNavigate, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState<'all' | 'boy' | 'girl'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredNames = ISLAMIC_NAMES.filter(item => {
    const matchesGender = filterGender === 'all' || item.gender === filterGender || item.gender === 'unisex';
    const matchesSearch = 
      (item.nameAr || '').includes(searchQuery) ||
      (item.nameUg || '').includes(searchQuery) ||
      (item.nameEn || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.meaningUg || '').includes(searchQuery);
    return matchesGender && matchesSearch;
  });

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
              {lang === 'ug' ? 'ئىسلامىي ئىسىملار قامۇسى' : lang === 'ar' ? 'دليل الأسماء الإسلامية' : lang === 'tr' ? 'İslami İsimler Sözlüğü' : 'Islamic Names Directory'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'ئوغۇل ۋە قىز بالىلارنىڭ كۆركەم ئىسىملىرى ۋە مەنىسى' : 'Meanings of Boys & Girls Names'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="my-2 relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ug' ? 'ئىسىم ياكى مەنىسىنى ئىزدەڭ...' : 'Search names or meanings...'}
            className="w-full bg-[#081524] border border-[#D4AF37]/35 rounded-2xl py-2 px-9 text-xs text-white placeholder-gray-400 outline-none focus:border-[#D4AF37]"
          />
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-2.5" />
        </div>

        {/* Gender Filter Chips */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setFilterGender('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              filterGender === 'all' 
                ? 'bg-[#D4AF37] text-black shadow-md' 
                : 'bg-[#091A2C] text-gray-300 border border-white/10'
            }`}
          >
            {lang === 'ug' ? 'ھەممىسى' : 'All'}
          </button>
          <button
            onClick={() => setFilterGender('boy')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              filterGender === 'boy' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-[#091A2C] text-gray-300 border border-white/10'
            }`}
          >
            👦 {lang === 'ug' ? 'ئوغۇل بالىلار' : 'Boys'}
          </button>
          <button
            onClick={() => setFilterGender('girl')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              filterGender === 'girl' 
                ? 'bg-pink-600 text-white shadow-md' 
                : 'bg-[#091A2C] text-gray-300 border border-white/10'
            }`}
          >
            👧 {lang === 'ug' ? 'قىز بالىلار' : 'Girls'}
          </button>
        </div>

        {/* Names List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 max-h-[52vh]">
          {filteredNames.map(item => {
            const isFav = favorites.includes(item.id);
            return (
              <div 
                key={item.id}
                className="p-3 rounded-2xl bg-[#09182A]/90 border border-[#D4AF37]/25 shadow-sm relative hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      item.gender === 'boy' ? 'bg-blue-900/60 text-blue-300 border border-blue-500/40' : 'bg-pink-900/60 text-pink-300 border border-pink-500/40'
                    }`}>
                      {item.gender === 'boy' ? '👦' : '👧'}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-[#FFEAA7] font-arabic">
                        {item.nameUg} <span className="font-quran text-lg text-white font-normal ml-2">{item.nameAr}</span>
                      </h4>
                      <span className="text-[10px] text-gray-400">
                        {item.nameEn} • كېلىپ چىقىشى: {item.origin}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className="text-gray-400 hover:text-red-400 p-1"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'text-red-500 fill-red-500' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-gray-200 mt-2 leading-relaxed bg-[#06101B] p-2 rounded-xl border border-white/5" dir="rtl">
                  <strong>مەنىسى:</strong> {lang === 'ug' ? item.meaningUg : lang === 'ar' ? item.meaningAr : lang === 'tr' ? item.meaningTr : item.meaningEn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
