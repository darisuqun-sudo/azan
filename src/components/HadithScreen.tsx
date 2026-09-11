import React, { useState } from 'react';
import { ChevronRight, BookOpen, Share2, Check, Search, Sparkles, Bookmark, Volume2 } from 'lucide-react';
import { HADITH_LIST } from '../data/hadithData';
import { ActiveScreen } from '../types';
import { soundService } from '../utils/audioPlayer';

interface HadithScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const HadithScreen: React.FC<HadithScreenProps> = ({ onNavigate }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', nameUg: 'بارلىق ھەدىسلەر' },
    { id: 'ئىخلاس ۋە نىيەت', nameUg: 'ئىخلاس ۋە نىيەت' },
    { id: 'ئەقىدە ۋە دىن ئاساسلىرى', nameUg: 'ئەقىدە ئاساسلىرى' },
    { id: 'ئىسلامىي ئەخلاق', nameUg: 'گۈزەل ئەخلاق' },
    { id: 'قېرىنداشلىق ۋە سۆيگۈ', nameUg: 'قېرىنداشلىق' },
    { id: 'ئىلىم ۋە مەرىپەت', nameUg: 'ئىلىم تەلەپ قىلىش' },
    { id: 'زىكىر ۋە تەسبىھ', nameUg: 'زىكىر ۋە پاكلىق' },
  ];

  const filteredHadith = HADITH_LIST.filter(hadith => {
    const matchesCategory = selectedCategory === 'all' || hadith.categoryUg === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      hadith.arabicText.includes(q) ||
      hadith.titleUg.toLowerCase().includes(q) ||
      hadith.titleAr.includes(q) ||
      hadith.translationUg.toLowerCase().includes(q) ||
      hadith.narrator.includes(q)
    );
  });

  const handleShare = (hadith: typeof HADITH_LIST[0]) => {
    soundService.playTasbihClick();
    const text = `﴿ ${hadith.titleUg} ﴾\n\nعن ${hadith.narrator}:\n«${hadith.arabicText}»\n\n[ئۇيغۇرچە تەرجىمىسى]:\n${hadith.translationUg}\n\n[ھېكمىتى]:\n${hadith.lessonUg || ''}\n\n— مەنبە: ${hadith.book}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-16 font-arabic select-none">
      
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-[#D4AF37]/20 bg-[#09182A]">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full bg-[#0E2138] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C378] hover:border-[#D4AF37] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold font-quran gold-text">الأحاديث النبوية الشريفة</h2>
            <span className="text-[11px] text-gray-400">ھەدىس خەزىنىسى ۋە نۇرلۇق ھېكمەتلەر</span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0E2138] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ھەدىس ياكى راۋىيلارنى ئىزدەش..."
            className="w-full bg-[#0E2034] border border-[#D4AF37]/30 rounded-xl px-3 py-1.5 pr-8 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
            dir="rtl"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Categories Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar" dir="rtl">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelectedCategory(c.id); soundService.playTasbihClick(); }}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                selectedCategory === c.id 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38C26] text-black font-bold shadow-md' 
                  : 'bg-[#0E2034] text-gray-300 border border-white/10 hover:text-white'
              }`}
            >
              {c.nameUg}
            </button>
          ))}
        </div>
      </div>

      {/* Hadith List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[72vh]">
        {filteredHadith.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-[#09182A]/60 border border-white/5">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 opacity-60" />
            <p className="text-sm text-gray-300 font-semibold mb-1">ماس كېلىدىغان ھەدىس تېپىلمىدى</p>
            <p className="text-xs text-gray-400 mb-4">ئىزدەش ئاتالغۇسىنى ئۆزگەرتىپ بېقىڭ.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold shadow-md cursor-pointer hover:brightness-110"
            >
              بارلىق ھەدىسلەرنى كۆرۈش
            </button>
          </div>
        ) : (
          filteredHadith.map((hadith) => (
            <div 
              key={hadith.id}
              className="p-4 rounded-3xl bg-[#09182A] border-2 border-[#D4AF37]/35 shadow-lg relative text-right"
              dir="rtl"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-[#142C48] border border-[#D4AF37] text-xs font-mono font-bold text-[#FFDF88] flex items-center justify-center">
                    {hadith.number}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-white">{hadith.titleUg}</h3>
                    <span className="text-[10px] text-gray-400 block font-quran">{hadith.titleAr}</span>
                  </div>
                </div>
                
                {hadith.categoryUg && (
                  <span className="text-[10px] bg-[#D4AF37]/20 text-[#FFDF88] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                    {hadith.categoryUg}
                  </span>
                )}
              </div>

              {/* Narrator */}
              <div className="text-xs text-[#D4AF37] mb-2 font-medium">
                ✨ رىۋايەت قىلغۇچى: {hadith.narrator}
              </div>

              {/* Arabic Hadith Text */}
              <p className="font-quran text-base leading-[2.3] text-[#FFEAA7] text-right my-2 select-text" dir="rtl">
                «{hadith.arabicText}»
              </p>

              {/* Uyghur translation */}
              <div className="mt-3 pt-3 border-t border-white/5 text-xs text-[#93C5FD] leading-relaxed font-arabic" dir="rtl">
                <span className="font-bold text-[#D4AF37] ml-1">[ئۇيغۇرچە تەرجىمىسى]:</span>
                {hadith.translationUg}
              </div>

              {/* Lesson / Wisdom */}
              {hadith.lessonUg && (
                <div className="mt-2.5 p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[11px] text-[#F3E5AB] leading-normal flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#D4AF37] ml-1">💡 بۇ ھەدىستىن ئېلىنىدىغان ساۋاق:</span>
                    {hadith.lessonUg}
                  </div>
                </div>
              )}

              {/* Source & Share */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10" dir="ltr">
                <span className="text-[10px] text-gray-400 font-mono">
                  📚 {hadith.book}
                </span>

                <button 
                  onClick={() => handleShare(hadith)}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#D4AF37] cursor-pointer transition-colors px-2.5 py-1 rounded-lg hover:bg-white/5"
                >
                  {copiedId === hadith.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">كۆچۈرۈلدى ✓</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>ھەمبەھىرلەش</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
