import React, { useState } from 'react';
import { 
  ChevronRight, 
  Globe, 
  Volume2, 
  VolumeX,
  Sliders,
  Sparkles,
  BookOpen,
  Compass,
  Heart,
  Search
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { useTranslation } from '../utils/i18n';
import { soundService } from '../utils/audioPlayer';

interface MoreScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  mosqueMode: boolean;
  onToggleMosqueMode: () => void;
  onOpenSettings: () => void;
}

interface CategoryGroup {
  id: string;
  categoryNameUg: string;
  categoryNameAr: string;
  categoryIcon: string;
  items: {
    id: string;
    titleUg: string;
    titleAr: string;
    titleTr: string;
    titleEn: string;
    descUg: string;
    icon: string;
    screen: ActiveScreen;
    badge?: string | null;
  }[];
}

export const MoreScreen: React.FC<MoreScreenProps> = ({ 
  onNavigate, 
  lang, 
  onLanguageChange,
  mosqueMode,
  onToggleMosqueMode,
  onOpenSettings
}) => {
  const { t } = useTranslation(lang);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: CategoryGroup[] = [
    {
      id: 'quran',
      categoryNameUg: 'قۇرئان ۋە تەجۋىد',
      categoryNameAr: 'القرآن الكريم والتجويد',
      categoryIcon: '📖',
      items: [
        {
          id: 'quran-reader',
          titleUg: 'قۇرئان كەرىم ئوقۇغۇچ',
          titleAr: 'المصحف الشريف المرتل',
          titleTr: 'Kur\'an-ı Kerim Oku',
          titleEn: 'Holy Quran Reader',
          descUg: '114 سۈرە، ئۇيغۇرچە تەرجىمە ۋە يۇقىرى سۈپەتلىك تىلاۋەتلەر',
          icon: '📖',
          screen: 'quran-reader',
          badge: '114 سۈرە'
        },
        {
          id: 'hifz',
          titleUg: 'قۇرئان يادلاش ياردەمچىسى',
          titleAr: 'مساعد حفظ القرآن الكريم',
          titleTr: 'Kur\'an Ezber Yardımcısı',
          titleEn: 'Quran Memorization Assistant',
          descUg: 'تەكرار تىڭشاش (Loop) ۋە يوشۇرۇپ سىناش ھالىتى',
          icon: '🔁',
          screen: 'hifz',
          badge: 'Hifz'
        },
        {
          id: 'tajweed',
          titleUg: 'سۈنئىي ئەقىللىق تەجۋىد كۆرسەتكۈچ',
          titleAr: 'أحكام التجويد والمدرب الصوتي',
          titleTr: 'Tecvid ve Sesli Telaffuz',
          titleEn: 'AI Tajweed Pronunciation Coach',
          descUg: 'مەخرەج، غۇننە، قەلقەلە ۋە ئاۋاز باھالىغۇچ',
          icon: '🎙️',
          screen: 'tajweed',
          badge: 'AI'
        },
        {
          id: 'khatam',
          titleUg: 'قۇرئان خاتىمە قىلىش پىلانى',
          titleAr: 'متابعة ختمة القرآن الكريم',
          titleTr: 'Hatim Takip Programı',
          titleEn: 'Quran Khatam Tracker',
          descUg: 'كۈندىلىك ئوقۇش مىقدارى ۋە نىشاننى ساناپ ماڭىدۇ',
          icon: '✨',
          screen: 'khatam',
          badge: 'خاتىمە'
        },
        {
          id: 'ayah-card',
          titleUg: 'ئايەت رەسىم كارتىسى سىتۇدىيەسى',
          titleAr: 'صانع بطاقات الآيات القرآنية',
          titleTr: 'Ayet Kartı Tasarımcısı',
          titleEn: 'Quran Ayah Card Studio',
          descUg: 'ئايەتلەرنى 5 خىل ئالتۇن ھەللىك كارتىغا ئايلاندۇرۇپ ھەمبەھىرلەش',
          icon: '🎨',
          screen: 'ayah-card',
          badge: 'HD'
        }
      ]
    },
    {
      id: 'ibadah',
      categoryNameUg: 'ئىبادەت ۋە ناماز',
      categoryNameAr: 'العبادات والصلوات',
      categoryIcon: '🕌',
      items: [
        {
          id: 'wudu-salah-guide',
          titleUg: 'تاھارەت ۋە ناماز ئۆگىنىش قوللانمىسى',
          titleAr: 'دليل الوضوء والصلاة المصور',
          titleTr: 'Resimli Abdest ve Namaz Rehberi',
          titleEn: 'Visual Wudu & Salah Guide',
          descUg: 'قەدەممۇ-قەدەم 9 تاھارەت ۋە ناماز ئەھكاملىرى، دۇئالار',
          icon: '💧',
          screen: 'wudu-salah-guide',
          badge: 'كۆرۈنۈشلۈك'
        },
        {
          id: 'azan-alert',
          titleUg: 'ئەزان، تەقۋىم ۋە مەسچىت ئۈنسىز ھالىتى',
          titleAr: 'مواقيت الصلاة والأذان التلقائي',
          titleTr: 'Ezan ve Namaz Vakitleri',
          titleEn: 'Azan & Prayer Times Hub',
          descUg: 'مەككە، مەدىنە، قاھىرە ئاۋازى بىلەن ئەزان چېلىش',
          icon: '📢',
          screen: 'azan-alert',
          badge: 'ئەزان'
        },
        {
          id: 'sunnah-habits',
          titleUg: 'تەھەججۇد، جۈمە ۋە سالاۋات مەركىزى',
          titleAr: 'مركز التهجد وسنن الجمعة والصلوات',
          titleTr: 'Teheccüd, Cuma Sünnetleri ve Salavat',
          titleEn: 'Tahajjud, Friday Sunnah & Salawat',
          descUg: 'كۈندىلىك سۈننەت، تەھەججۇد ۋاقتى ۋە سالاۋات نىشانى',
          icon: '☀️',
          screen: 'sunnah-habits',
          badge: 'سۈننەت'
        },
        {
          id: 'qaza',
          titleUg: 'قازا ناماز ۋە روزا خاتىرىسى',
          titleAr: 'قضاء الصلوات المفوتة والصيام',
          titleTr: 'Kaza Namazı ve Oruç Takibi',
          titleEn: 'Qaza Prayers & Fasting Debt Log',
          descUg: 'قەرز قالغان ناماز ۋە روزىلارنى ئادا قىلىپ كېمەيتىش',
          icon: '⏳',
          screen: 'qaza',
          badge: 'مۇھىم'
        },
        {
          id: 'ramadan',
          titleUg: 'رامىزان ۋە سەھەرلىك / ئىپتار مەركىزى',
          titleAr: 'مركز رمضان ومواقيت السحور والإفطار',
          titleTr: 'Ramazan & İftar Geri Sayımı',
          titleEn: 'Ramadan & Suhoor/Iftar Hub',
          descUg: 'ئىپتارغىچە تەتۈر ساناش، سۈننەت دۇئالار ۋە نىيەت',
          icon: '🌙',
          screen: 'ramadan',
          badge: 'ئالاھىدە'
        },
        {
          id: 'zakat',
          titleUg: 'ئېلېكترونلۇق زوكات ۋە فىترىيە ھېسابلىغۇچ',
          titleAr: 'حاسبة الزكاة الذكية والذهب',
          titleTr: 'Zekat ve Fitre Hesaplayıcı',
          titleEn: 'Smart Zakat & Fitrah Calculator',
          descUg: 'نەق پۇل، ئالتۇن، تىجارەت ماللىرى ۋە نىساب سېلىشتۇرۇش',
          icon: '💰',
          screen: 'zakat',
          badge: '2.5%'
        }
      ]
    },
    {
      id: 'knowledge',
      categoryNameUg: 'ئىسلامىي ئىلىم ۋە سۈنئىي ئەقىل',
      categoryNameAr: 'العلم الشرعي والذكاء الاصطناعي',
      categoryIcon: '🤖',
      items: [
        {
          id: 'islamic-ai',
          titleUg: 'ئىسلامىي سۈنئىي ئەقىل ياردەمچىسى',
          titleAr: 'المساعد الإسلامي الذكي',
          titleTr: 'İslami AI Asistanı',
          titleEn: 'Islamic AI Knowledge Assistant',
          descUg: 'شەرىئەت، تاھارەت، ناماز، زوكات ۋە ھالال مەسلىھەتچى',
          icon: '🤖',
          screen: 'islamic-ai',
          badge: 'AI'
        },
        {
          id: 'prophets',
          titleUg: '25 پەيغەمبەرلەر قىسسىسى ۋە سىيرەت',
          titleAr: 'قصص 25 من الأنبياء والسيرة',
          titleTr: '25 Peygamberin Hayatı ve Siyer',
          titleEn: 'Stories of the 25 Prophets',
          descUg: 'ئادەم (ئە.س) دىن پەيغەمبىرىمىزگىچە بولغان نۇرلۇق تارىخ',
          icon: '📜',
          screen: 'prophets',
          badge: '25'
        },
        {
          id: 'quiz',
          titleUg: 'ئىسلامىي بىلىم مۇسابىقىسى',
          titleAr: 'مسابقة المعرفة الإسلامية',
          titleTr: 'İslami Bilgi Yarışması',
          titleEn: 'Islamic Knowledge Quiz',
          descUg: 'قۇرئان، ھەدىس ۋە پەيغەمبەرلەر بىلىمىڭىزنى سىناپ كۆرۈڭ',
          icon: '🏆',
          screen: 'quiz',
          badge: 'Quiz'
        },
        {
          id: 'asmaul-husna',
          titleUg: 'ئەسمائۇل ھۈسنا (99 گۈزەل ئىسىم)',
          titleAr: 'أسماء الله الحسنى ومعانيها',
          titleTr: 'Esmaül Hüsna (99 İsim)',
          titleEn: '99 Beautiful Names of Allah',
          descUg: 'ئاللاھنىڭ گۈزەل ئىسىملىرى، مەنىسى ۋە زىكىر پەزىلىتى',
          icon: '✨',
          screen: 'asmaul-husna',
          badge: '99'
        },
        {
          id: 'names',
          titleUg: 'ئىسلامىي ئىسىملار قامۇسى',
          titleAr: 'دليل الأسماء الإسلامية ومعانيها',
          titleTr: 'İslami Bebek İsimleri Sözlüğü',
          titleEn: 'Islamic Names Directory',
          descUg: 'ئوغۇل ۋە قىز بوۋاقلارنىڭ كۆركەم ئىسىملىرى ۋە مەنىسى',
          icon: '👶',
          screen: 'names',
          badge: null
        }
      ]
    },
    {
      id: 'lifestyle',
      categoryNameUg: 'كۈندىلىك تۇرمۇش ۋە ئەتراپ',
      categoryNameAr: 'الحياة اليومية والأماكن',
      categoryIcon: '📍',
      items: [
        {
          id: 'mosque-locator',
          titleUg: 'مەسچىت ۋە ھالال ئاشخانىلار',
          titleAr: 'المساجد والمطاعم الحلال القريبة',
          titleTr: 'Yakındaki Cami ve Helal Mekanlar',
          titleEn: 'Mosque & Halal Food Locator',
          descUg: 'GPS ئارقىلىق يېقىن مەسچىت، جۈمە ۋاقتى ۋە ھالال ئاشخانىلار',
          icon: '📍',
          screen: 'mosque-locator',
          badge: 'GPS'
        },
        {
          id: 'halal',
          titleUg: 'E-نومۇر ۋە ھالال تائام تەكشۈرگۈچ',
          titleAr: 'فاحص الإضافات الغذائية الحلال',
          titleTr: 'Helal Gıda ve E-Kodları',
          titleEn: 'Halal Food E-Number Scanner',
          descUg: 'يېمەكلىك قوشۇلمىلىرىنىڭ ھالال، ھارام ياكى گۇمانلىقىنى ئېنىقلاش',
          icon: '🔍',
          screen: 'halal',
          badge: 'E-Code'
        },
        {
          id: 'tasbih',
          titleUg: 'ئېلېكترونلۇق تەسبيھ ۋە زىكىرلەر',
          titleAr: 'السبحة الإلكترونية والأذكار',
          titleTr: 'Elektronik Zikirmatik',
          titleEn: 'Smart Tasbih Counter',
          descUg: 'تۆشۈكلۈك ساناش، ھۆكۈملۈك دۇئالار ۋە ئاۋاز ئۈنۈمى',
          icon: '📿',
          screen: 'tasbih',
          badge: '33/99'
        },
        {
          id: 'qibla',
          titleUg: 'قىبلىنۇر (كومپاس)',
          titleAr: 'بوصلة اتجاه القبلة الدقيقة',
          titleTr: 'Kıble Pusulası',
          titleEn: 'Qibla Compass Sensor',
          descUg: 'كەبىگە قاراپ دەل دەرىجىسى بىلەن قىبلىنى تېپىش',
          icon: '🧭',
          screen: 'qibla',
          badge: 'GPS'
        },
        {
          id: 'widgets',
          titleUg: 'ئاندروئىد ۋىجىت ۋە Wear OS سائەت',
          titleAr: 'معاينة الويدجت وساعة Wear OS',
          titleTr: 'Android Widget ve Akıllı Saat',
          titleEn: 'Android Home Widgets & Wear OS',
          descUg: 'باش ئېكران ناماز تاختىسى ۋە ئەقلىي سائەت تەسبيھى',
          icon: '⌚',
          screen: 'widgets',
          badge: 'WearOS'
        }
      ]
    }
  ];

  // Filtering
  const allItems = categories.flatMap(c => c.items);
  const displayCategories = activeTab === 'all' 
    ? categories 
    : categories.filter(c => c.id === activeTab);

  const filterItem = (item: CategoryGroup['items'][0]) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.titleUg.toLowerCase().includes(q) ||
      item.titleAr.toLowerCase().includes(q) ||
      item.descUg.toLowerCase().includes(q)
    );
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
              {lang === 'ug' ? 'ئىسلامىي بۆلەكلەر ۋە قوراللار قامۇسى' : lang === 'ar' ? 'موسوعة الخدمات الإسلامية الشاملة' : lang === 'tr' ? 'Tüm İslami Hizmetler Ansiklopedisi' : 'Islamic Suite Directory'}
            </h2>
            <span className="text-[10px] text-[#D4AF37]/80">
              {lang === 'ug' ? 'بارلىق ئىقتىدارلار رەتلىك، گۈزەل ئورۇنلاشتۇرۇلدى' : 'All comprehensive features organized beautifully'}
            </span>
          </div>

          <button 
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Search & Category Selector Bar */}
        <div className="mt-2 space-y-1.5">
          {/* Search Box */}
          <div className="relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ug' ? 'ئىقتىدارلارنى ئىزدەش (مەسىلەن: يادلاش، زوكات، تەجۋىد...)' : 'Search features...'}
              className="w-full py-1.5 pr-8 pl-3 rounded-xl bg-[#091A2D] border border-[#D4AF37]/30 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] text-right font-arabic"
              dir="rtl"
            />
            <Search className="w-3.5 h-3.5 text-[#D4AF37] absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar" dir="rtl">
            <button
              onClick={() => { setActiveTab('all'); soundService.playTasbihClick(); }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black shadow-md' 
                  : 'bg-[#081726] text-gray-300 border border-white/10 hover:text-white'
              }`}
            >
              ✨ ھەممىسى
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => { setActiveTab(c.id); soundService.playTasbihClick(); }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === c.id 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black shadow-md' 
                    : 'bg-[#081726] text-gray-300 border border-white/10 hover:text-white'
                }`}
              >
                <span>{c.categoryIcon}</span>
                <span>{c.categoryNameUg}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Smart Mosque Auto-Silent Quick Banner */}
        <div className="my-1.5 p-2 rounded-2xl bg-gradient-to-r from-[#0C243E] via-[#091B2E] to-[#081728] border border-emerald-500/30 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
              mosqueMode ? 'bg-emerald-600 text-white' : 'bg-[#071322] text-gray-400 border border-white/10'
            }`}>
              {mosqueMode ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block">
                {lang === 'ug' ? 'مەسچىتتە تېلېفوننى ئاپتوماتىك ئۈنسىز قىلىش' : 'Smart Mosque Silent Mode'}
              </span>
              <span className="text-[9px] text-gray-400">
                {mosqueMode ? '✓ قوزغالدى: ئەزان ۋە نامازدا ئۈنسىز' : 'GPS بىلەن مەسچىتكە كىرگەندە ئۈنسىز بولىدۇ'}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleMosqueMode}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
              mosqueMode 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30' 
                : 'bg-[#0F2236] border border-white/20 text-gray-300 hover:text-white'
            }`}
          >
            {mosqueMode ? 'ئېچىلدى ✓' : 'ئېچىش'}
          </button>
        </div>

        {/* Language Quick Switcher Bar */}
        <div className="my-1.5 p-2 rounded-2xl bg-[#0B1E32] border border-[#D4AF37]/25 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#FFEAA7] font-bold">
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'ug' ? 'ئەپ تىلى:' : lang === 'ar' ? 'لغة التطبيق:' : lang === 'tr' ? 'Uygulama Dili:' : 'Language:'}</span>
          </div>
          <div className="flex items-center gap-1">
            {[
              { code: 'ug', label: 'ئۇيغۇرچە' },
              { code: 'ar', label: 'العربية' },
              { code: 'tr', label: 'Türkçe' },
              { code: 'en', label: 'EN' }
            ].map(item => (
              <button
                key={item.code}
                onClick={() => {
                  onLanguageChange(item.code as Language);
                  soundService.playTasbihClick();
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  lang === item.code 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black shadow-sm' 
                    : 'text-gray-400 hover:text-white bg-[#071322] border border-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Grid of Features */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 max-h-[53vh] mt-0.5">
          {displayCategories.map(cat => {
            const itemsInCat = cat.items.filter(filterItem);
            if (itemsInCat.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-1.5" dir="rtl">
                {/* Category Section Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFEAA7]">
                    <span>{cat.categoryIcon}</span>
                    <span>{cat.categoryNameUg}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">
                    ({itemsInCat.length})
                  </span>
                </div>

                {/* Sub-grid of cards */}
                <div className="grid grid-cols-1 gap-1.5">
                  {itemsInCat.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        soundService.playTasbihClick();
                        onNavigate(item.screen);
                      }}
                      className="w-full p-2 rounded-2xl bg-gradient-to-r from-[#0A1A2C]/90 to-[#071424]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:bg-[#0E243A] transition-all flex items-center justify-between text-right cursor-pointer group shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-1.5 rounded-xl bg-[#06101B] border border-white/5 group-hover:scale-105 transition-transform flex items-center justify-center w-9 h-9 shadow-inner">
                          {item.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-[#FFEAA7] group-hover:text-white transition-colors">
                              {lang === 'ug' ? item.titleUg : lang === 'ar' ? item.titleAr : lang === 'tr' ? item.titleTr : item.titleEn}
                            </h4>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FFEAA7] text-[8px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                            {item.descUg}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-400 rotate-180 group-hover:text-[#D4AF37] transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
