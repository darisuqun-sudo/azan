import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Check, Share2, Plus, Trash2, Search, BookOpen, Volume2, HelpCircle } from 'lucide-react';
import { DUAS_LIST } from '../data/duasData';
import { soundService } from '../utils/audioPlayer';
import { ActiveScreen, Language, DuaItem } from '../types';
import { useTranslation } from '../utils/i18n';

interface DuasScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang?: Language;
}

export const DuasScreen: React.FC<DuasScreenProps> = ({ onNavigate, lang = 'ug' }) => {
  const currentLang = (lang as Language) || 'ug';
  const { t } = useTranslation(currentLang);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Custom Duas state loaded from localStorage
  const [customDuas, setCustomDuas] = useState<DuaItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_custom_duas');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal for adding custom dua
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArabic, setNewArabic] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newCount, setNewCount] = useState(1);

  useEffect(() => {
    try {
      localStorage.setItem('user_custom_duas', JSON.stringify(customDuas));
    } catch (e) {
      console.warn("Could not save custom duas to localStorage", e);
    }
  }, [customDuas]);

  const categories = [
    { id: 'all', nameAr: 'جميع الأذكار', nameUg: 'بارلىق دۇئالار', nameTr: 'Tüm Dualar', nameEn: 'All Duas' },
    { id: 'أذكار الصباح', nameAr: 'أذكار الصباح', nameUg: 'ئەتىگەنلىك', nameTr: 'Sabah Zikirleri', nameEn: 'Morning' },
    { id: 'أذكار المساء', nameAr: 'أذكار المساء', nameUg: 'كەچلىك', nameTr: 'Akşam Zikirleri', nameEn: 'Evening' },
    { id: 'أدعية قرآنية', nameAr: 'أدعية قرآنية', nameUg: 'قۇرئانىي دۇئالار', nameTr: 'Kur\'an Duaları', nameEn: 'Quranic' },
    { id: 'أدعية الحماية', nameAr: 'أدعية الحماية', nameUg: 'پاناھلىنىش-غەم', nameTr: 'Korunma', nameEn: 'Protection' },
    { id: 'أدعية الشفاء', nameAr: 'أدعية الشفاء', nameUg: 'شىپالىق دۇئالىرى', nameTr: 'Şifa Duaları', nameEn: 'Healing' },
    { id: 'أذكار النوم', nameAr: 'أذكار النوم', nameUg: 'ئۇيقۇ دۇئالىرى', nameTr: 'Uyku', nameEn: 'Sleep' },
    { id: 'أدعية الحياة اليومية', nameAr: 'الحياة اليومية', nameUg: 'تۇرمۇش ۋە سەپەر', nameTr: 'Günlük Yaşam', nameEn: 'Daily Life' },
    { id: 'custom', nameAr: 'أدعيتي الخاصة ⭐', nameUg: 'ئۆز دۇئالىرىم ⭐', nameTr: 'Özel Dualarım ⭐', nameEn: 'My Custom ⭐' },
  ];

  const allDuas = [...customDuas, ...DUAS_LIST];

  const filteredDuas = allDuas.filter(dua => {
    const matchesCategory = 
      activeCategory === 'all' 
        ? true 
        : activeCategory === 'custom' 
        ? dua.id.startsWith('custom_') 
        : dua.category === activeCategory;

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      dua.arabicText.includes(q) ||
      (dua.titleUg && dua.titleUg.toLowerCase().includes(q)) ||
      (dua.titleAr && dua.titleAr.includes(q)) ||
      (dua.translationUg && dua.translationUg.toLowerCase().includes(q)) ||
      (dua.transliterationUg && dua.transliterationUg.toLowerCase().includes(q))
    );
  });

  const incrementCount = (id: string, max: number) => {
    soundService.playTasbihClick();
    setCounts(prev => {
      const current = prev[id] || 0;
      if (current + 1 >= max) {
        soundService.playChime();
      }
      return { ...prev, [id]: (current + 1) };
    });
  };

  const resetCount = (id: string) => {
    setCounts(prev => ({ ...prev, [id]: 0 }));
  };

  const handleShare = (id: string, dua: DuaItem) => {
    const text = `﴿ ${dua.titleUg || dua.titleAr} ﴾\n\n${dua.arabicText}\n\n[ئوقۇلۇشى]: ${dua.transliterationUg || ''}\n\n[مەنىسى]: ${dua.translationUg}\n\n— مەنبە: ${dua.reference || ''}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddCustomDua = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArabic.trim() && !newTitle.trim()) return;

    const newDua: DuaItem = {
      id: `custom_${Date.now()}`,
      category: 'custom',
      categoryUg: 'ئۆز دۇئالىرىم',
      categoryTr: 'Özel Dualarım',
      titleAr: newTitle.trim() || 'دعاء خاص',
      titleUg: newTitle.trim() || 'ئۆز دۇئايىم',
      titleEn: newTitle.trim() || 'Custom Dua',
      titleTr: newTitle.trim() || 'Özel Dua',
      arabicText: newArabic.trim(),
      translationUg: newTranslation.trim() || 'ئۆز دۇئايىم',
      translationEn: newTranslation.trim() || 'Custom Dua translation',
      count: Number(newCount) || 1,
      reference: 'ئىشلەتكۈچى تەرىپىدىن قوشۇلدى'
    };

    setCustomDuas([newDua, ...customDuas]);
    setNewTitle('');
    setNewArabic('');
    setNewTranslation('');
    setNewCount(1);
    setShowAddModal(false);
    setActiveCategory('custom');
  };

  const handleDeleteCustomDua = (id: string) => {
    setCustomDuas(customDuas.filter(d => d.id !== id));
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
            <h2 className="text-lg font-bold font-quran gold-text">
              {currentLang === 'ug' ? 'دۇئا ۋە كۈندىلىك زىكىرلەر' : 'الأدعية والأذكار المأثورة'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {currentLang === 'ug' ? 'ھىسنۇل مۇسلىم ۋە قۇرئانىي دۇئالار خەزىنىسى' : 'حصن المسلم وأدعية القرآن والسنة'}
            </span>
          </div>

          {/* Add Custom Dua Button */}
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-9 h-9 rounded-full bg-gradient-to-b from-[#183B61] to-[#0D243D] border border-[#D4AF37]/60 flex items-center justify-center text-[#FFDF88] shadow-md hover:scale-105 transition-all cursor-pointer"
            title="ئۆز دۇئايىڭىزنى قوشۇش"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

        {/* Search Bar & Transliteration Toggle */}
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLang === 'ug' ? 'دۇئا ياكى مەزمۇن ئىزدەش...' : 'ابحث في الأدعية والأذكار...'}
              className="w-full bg-[#0E2034] border border-[#D4AF37]/30 rounded-xl px-3 py-1.5 pr-8 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
              dir="rtl"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium border flex items-center gap-1 cursor-pointer transition-all whitespace-nowrap ${
              showTransliteration 
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFDF88]' 
                : 'bg-[#0E2034] border-white/10 text-gray-400'
            }`}
          >
            <span>{showTransliteration ? 'تەلەپپۇز: ئوچۇق' : 'تەلەپپۇز: يېپىق'}</span>
          </button>
        </div>

        {/* Categories Carousel */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar" dir="rtl">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                activeCategory === c.id 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38C26] text-black font-bold shadow-md' 
                  : 'bg-[#0E2034] text-gray-300 border border-white/10 hover:text-white'
              }`}
            >
              {currentLang === 'ug' ? c.nameUg : currentLang === 'ar' ? c.nameAr : currentLang === 'tr' ? c.nameTr : c.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Duas List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[72vh]">
        {filteredDuas.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-[#09182A]/60 border border-white/5">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 opacity-60" />
            <p className="text-sm text-gray-300 font-semibold mb-1">
              {currentLang === 'ug' ? 'ماس كېلىدىغان دۇئا تېپىلمىدى' : 'لم يتم العثور على نتائج'}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              {currentLang === 'ug' ? 'ئىزدەش سۆزىڭىزنى ئۆزگەرتىپ بېقىڭ ياكى ئۆزىڭىز قوشۇڭ.' : 'جرب البحث بكلمات أخرى أو أضف دعاءك الخاص.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold shadow-md cursor-pointer hover:brightness-110"
            >
              {currentLang === 'ug' ? 'بارلىق دۇئالارنى كۆرسىتىش' : 'عرض جميع الأدعية'}
            </button>
          </div>
        ) : (
          filteredDuas.map((dua) => {
            const currentCount = counts[dua.id] || 0;
            const isFinished = currentCount >= dua.count;
            const isCustom = dua.id.startsWith('custom_');

            return (
              <div 
                key={dua.id}
                className={`p-4 rounded-3xl border-2 transition-all relative ${
                  isFinished 
                    ? 'bg-[#0C241B] border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : 'bg-[#09182A] border-[#D4AF37]/35 shadow-md'
                }`}
              >
                {/* Category & Title */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3" dir="rtl">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {isCustom && <span className="text-[10px] bg-[#D4AF37]/20 text-[#FFDF88] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">ئۆز دۇئايىم</span>}
                    <span className="text-xs font-bold text-[#FFDF88]">
                      {currentLang === 'ug' ? (dua.titleUg || dua.titleAr) : dua.titleAr}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#0E2034] text-gray-300 px-2 py-0.5 rounded-full border border-white/10 font-mono">
                      تەكرار: {dua.count}x
                    </span>
                    {isCustom && (
                      <button
                        onClick={() => handleDeleteCustomDua(dua.id)}
                        className="text-gray-400 hover:text-rose-400 p-1 cursor-pointer"
                        title="ئۆچۈرۈش"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Arabic Dua Text */}
                <p className="font-quran text-base sm:text-lg leading-[2.3] text-[#FFEAA7] text-right my-2 select-text" dir="rtl">
                  {dua.arabicText}
                </p>

                {/* Transliteration (ئوقۇلۇشى) */}
                {showTransliteration && dua.transliterationUg && (
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[11px] text-amber-200/90 leading-relaxed font-sans" dir="rtl">
                    <span className="text-[#D4AF37] font-semibold ml-1">📖 ئوقۇلۇشى:</span>
                    {dua.transliterationUg}
                  </div>
                )}

                {/* Uyghur translation */}
                {dua.translationUg && (
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-xs text-[#93C5FD] leading-relaxed font-arabic" dir="rtl">
                    <span className="font-bold text-[#D4AF37] ml-1">[مەنىسى]:</span>
                    {dua.translationUg}
                  </div>
                )}

                {/* Benefit / Virtue (پەزىلىتى) */}
                {dua.benefitUg && (
                  <div className="mt-2.5 p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[11px] text-[#F3E5AB] leading-normal flex items-start gap-1.5" dir="rtl">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#D4AF37] ml-1">پەزىلىتى ۋە ئەھمىيىتى:</span>
                      {dua.benefitUg}
                    </div>
                  </div>
                )}

                {/* Reference */}
                {dua.reference && (
                  <div className="mt-2 text-[10px] text-gray-400 text-left font-mono" dir="ltr">
                    📚 مەنبەسى: {dua.reference}
                  </div>
                )}

                {/* Counter Button & Share */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(dua.id, dua)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#D4AF37] cursor-pointer transition-colors"
                    >
                      {copiedId === dua.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedId === dua.id ? 'كۆچۈرۈلدى' : 'ھەمبەھىرلەش'}</span>
                    </button>

                    {currentCount > 0 && (
                      <button
                        onClick={() => resetCount(dua.id)}
                        className="text-[10px] text-gray-400 hover:text-rose-400 cursor-pointer underline ml-2"
                      >
                        نۆللەش
                      </button>
                    )}
                  </div>

                  {/* Interactive Counter Tap Button */}
                  <button
                    onClick={() => incrementCount(dua.id, dua.count)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                      isFinished 
                        ? 'bg-emerald-500 text-black shadow-md' 
                        : 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black hover:brightness-110 active:scale-95'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isFinished ? 'تاماملاندى ✓' : `ئوقۇلدى (${currentCount}/${dua.count})`}</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Dua Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0A1A2E] border-2 border-[#D4AF37] rounded-3xl p-5 shadow-2xl animate-scaleUp text-right" dir="rtl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-[#FFDF88]">
                {currentLang === 'ug' ? '✨ يېڭى دۇئا ياكى زىكىر قوشۇش' : '✨ إضافة دعاء أو ذكر جديد'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white text-base p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomDua} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1 font-semibold">دۇئانىڭ ماۋزۇسى ياكى ئىسمى:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مەسىلەن: قىيىنچىلىقتا ئوقۇلىدىغان دۇئا"
                  className="w-full bg-[#05101D] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1 font-semibold">ئەرەبچە تېكىستى (دۇئانىڭ ئۆزى):</label>
                <textarea
                  required
                  rows={3}
                  value={newArabic}
                  onChange={(e) => setNewArabic(e.target.value)}
                  placeholder="اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ..."
                  className="w-full bg-[#05101D] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs font-quran text-[#FFEAA7] placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1 font-semibold">ئۇيغۇرچە مەنىسى ياكى تەرجىمىسى (ئىختىيارىي):</label>
                <textarea
                  rows={2}
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  placeholder="ئى ئاللاھ! بۇ كۈننىڭ ياخشىلىقىنى سورايمەن..."
                  className="w-full bg-[#05101D] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1 font-semibold">تەكرار ئوقۇش سانى (قېتىم):</label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={newCount}
                  onChange={(e) => setNewCount(Number(e.target.value))}
                  className="w-24 bg-[#05101D] border border-[#D4AF37]/40 rounded-xl px-3 py-1.5 text-xs text-white font-mono text-center focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38C26] text-black font-bold text-xs shadow-md cursor-pointer hover:brightness-110 transition-all"
                >
                  ساقلاش ۋە قوشۇش ✓
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0F2338] border border-white/10 text-gray-300 text-xs cursor-pointer hover:text-white"
                >
                  بىكار قىلىش
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
