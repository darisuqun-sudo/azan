import React, { useState } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  Droplet, 
  Check, 
  Volume2,
  BookOpen,
  Award,
  AlertTriangle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { 
  WUDU_STEPS, 
  SALAH_STEPS, 
  GHUSL_STEPS, 
  WUDU_NULLIFIERS, 
  PRAYER_RAKATS_TABLE, 
  SPECIAL_PRAYERS_GUIDE, 
  WuduStep, 
  SalahStep 
} from '../data/advancedIslamicData';
import { soundService } from '../utils/audioPlayer';

interface WuduSalahGuideScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const WuduSalahGuideScreen: React.FC<WuduSalahGuideScreenProps> = ({ onNavigate, lang }) => {
  const [activeTab, setActiveTab] = useState<'wudu' | 'ghusl' | 'salah' | 'rakats' | 'special'>('wudu');
  const [selectedWuduIndex, setSelectedWuduIndex] = useState<number>(0);
  const [selectedSalahIndex, setSelectedSalahIndex] = useState<number>(0);
  const [selectedSpecialIndex, setSelectedSpecialIndex] = useState<number>(0);

  const currentWudu = WUDU_STEPS[selectedWuduIndex] || WUDU_STEPS[0];
  const currentSalah = SALAH_STEPS[selectedSalahIndex] || SALAH_STEPS[0];
  const currentSpecial = SPECIAL_PRAYERS_GUIDE[selectedSpecialIndex] || SPECIAL_PRAYERS_GUIDE[0];

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-14 select-none font-arabic">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A2E] via-[#07111E] to-[#040810] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full px-3.5 pt-2">
        
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
              {lang === 'ug' ? 'تاھارەت ۋە ناماز مۇكەممەل قوللانمىسى' : 'دليل الوضوء والصلاة الشامل'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'تاھارەت، غۇسۇل، 5 ۋاق ناماز ۋە سەجدە سەھۋ ئەھكاملىرى' : 'الأحكام والأذكار والخطوات المصورة'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Droplet className="w-4 h-4" />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="my-2.5 flex gap-1 overflow-x-auto pb-1 bg-[#081726] p-1 rounded-2xl border border-white/10 no-scrollbar" dir="rtl">
          <button
            onClick={() => { setActiveTab('wudu'); soundService.playTasbihClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'wudu' 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            💧 تاھارەت ئېلىش
          </button>

          <button
            onClick={() => { setActiveTab('ghusl'); soundService.playTasbihClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'ghusl' 
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🚿 غۇسۇل قىلىش
          </button>

          <button
            onClick={() => { setActiveTab('salah'); soundService.playTasbihClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'salah' 
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🕌 ناماز قەدەملىرى
          </button>

          <button
            onClick={() => { setActiveTab('rakats'); soundService.playTasbihClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'rakats' 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📊 رەكئەت جەدۋىلى
          </button>

          <button
            onClick={() => { setActiveTab('special'); soundService.playTasbihClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'special' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ✨ ئالاھىدە نامازلار
          </button>
        </div>

        {/* Dynamic Content View */}
        <div className="flex-1 overflow-y-auto max-h-[70vh] pb-4">
          
          {/* 1. WUDU TAB */}
          {activeTab === 'wudu' && (
            <div className="space-y-4">
              {/* Step Carousel Bar */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {WUDU_STEPS.map((ws, idx) => (
                  <button
                    key={ws.step}
                    onClick={() => {
                      setSelectedWuduIndex(idx);
                      soundService.playTasbihClick();
                    }}
                    className={`w-9 h-9 rounded-xl shrink-0 font-bold font-mono text-xs flex items-center justify-center border transition-all cursor-pointer ${
                      selectedWuduIndex === idx
                        ? 'bg-cyan-600 border-cyan-300 text-white shadow-lg scale-105'
                        : ws.isFard
                        ? 'bg-[#0A2033] border-amber-500/40 text-amber-300'
                        : 'bg-[#06101B] border-white/10 text-gray-400'
                    }`}
                  >
                    {ws.step}
                  </button>
                ))}
              </div>

              {/* Main Wudu Step Card */}
              <div className="p-4 rounded-3xl bg-gradient-to-b from-[#092237] via-[#051524] to-[#020A12] border-2 border-cyan-500/40 shadow-lg text-right" dir="rtl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                  <span className="text-3xl">{currentWudu.icon}</span>
                  <div className="text-right">
                    <span className="text-[10px] text-cyan-400 font-mono">قەدەم {currentWudu.step} / 9</span>
                    <h3 className="text-base font-bold text-white">{currentWudu.titleUg}</h3>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${currentWudu.isFard ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'}`}>
                    {currentWudu.isFard ? '★ پەرز ئەمر' : '✦ سۈننەت'}
                  </span>
                </div>

                <p className="text-xs text-cyan-100/90 leading-relaxed my-2">
                  {currentWudu.descUg}
                </p>

                {currentWudu.duaAr && (
                  <div className="mt-3 p-3 rounded-2xl bg-[#030E18] border border-cyan-500/30">
                    <span className="text-[10px] text-cyan-400 font-bold block mb-1">🤲 بۇ قەدەمدە ئوقۇلىدىغان دۇئا:</span>
                    <p className="font-quran text-sm text-[#FFEAA7] leading-loose mb-1.5" dir="rtl">{currentWudu.duaAr}</p>
                    <p className="text-[11px] text-gray-300 leading-normal">{currentWudu.duaUg}</p>
                  </div>
                )}
              </div>

              {/* Wudu Nullifiers Section */}
              <div className="p-4 rounded-3xl bg-[#09182A] border border-rose-500/30 text-right" dir="rtl">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-rose-300 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>تاھارەتنى بۇزىدىغان ئىشلار (نەۋاقىزۇل ۋۇزۇء):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {WUDU_NULLIFIERS.map(n => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-[#05111F] border border-white/5">
                      <div className="font-bold text-rose-200 mb-0.5">• {n.titleUg}</div>
                      <div className="text-[11px] text-gray-400">{n.descUg}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. GHUSL TAB */}
          {activeTab === 'ghusl' && (
            <div className="space-y-4 text-right" dir="rtl">
              <div className="p-4 rounded-3xl bg-[#0A2421] border-2 border-emerald-500/40 shadow-lg">
                <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>غۇسۇل (پۈتۈن بەدەننى يۇيۇش) قەدەملىرى ۋە سۈننىتى</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
                  غۇسۇل چوڭ تاھارەتسىزلىكتىن، جۈمە كۈنى ۋە ھېيت كۈنلىرىدە پۈتۈن بەدەننى پاكلاش ئۈچۈن قىلىنىدىغان بۈيۈك ئىبادەتتۇر.
                </p>

                <div className="space-y-2.5">
                  {GHUSL_STEPS.map(gs => (
                    <div key={gs.step} className="p-3 rounded-2xl bg-[#041614] border border-emerald-500/20 flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-500 text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {gs.step}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-emerald-200 mb-0.5">{gs.titleUg}</h4>
                        <p className="text-[11px] text-gray-300 leading-normal">{gs.descUg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. SALAH STEPS TAB */}
          {activeTab === 'salah' && (
            <div className="space-y-4">
              {/* Step Carousel Bar */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {SALAH_STEPS.map((ss, idx) => (
                  <button
                    key={ss.step}
                    onClick={() => {
                      setSelectedSalahIndex(idx);
                      soundService.playTasbihClick();
                    }}
                    className={`w-9 h-9 rounded-xl shrink-0 font-bold font-mono text-xs flex items-center justify-center border transition-all cursor-pointer ${
                      selectedSalahIndex === idx
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38C26] border-amber-300 text-black shadow-lg scale-105'
                        : 'bg-[#09182A] border-white/10 text-gray-400'
                    }`}
                  >
                    {ss.step}
                  </button>
                ))}
              </div>

              {/* Main Salah Movement Card */}
              <div className="p-4 rounded-3xl bg-[#0A1A2E] border-2 border-[#D4AF37]/50 shadow-lg text-right" dir="rtl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                  <span className="text-[10px] bg-[#D4AF37]/20 text-[#FFDF88] px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
                    ھالىتى: {currentSalah.position}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-amber-400 font-mono">قەدەم {currentSalah.step} / 9</span>
                    <h3 className="text-base font-bold text-white">{currentSalah.nameUg}</h3>
                  </div>
                </div>

                <p className="text-xs text-[#93C5FD] leading-relaxed my-2">
                  <span className="font-bold text-[#FFDF88]">ھەرىكەت تەپسىلاتى: </span>
                  {currentSalah.actionUg}
                </p>

                {currentSalah.sayingAr && (
                  <div className="mt-3 p-3 rounded-2xl bg-[#05111E] border border-[#D4AF37]/30">
                    <span className="text-[10px] text-[#FFDF88] font-bold block mb-1">
                      🗣️ ئوقۇلىدىغان زىكىر ۋە ئايەت:
                    </span>
                    <p className="font-quran text-sm sm:text-base text-[#FFEAA7] leading-loose mb-2" dir="rtl">
                      {currentSalah.sayingAr}
                    </p>
                    <p className="text-[11px] text-gray-300 leading-normal border-t border-white/5 pt-1.5">
                      <span className="font-semibold text-[#D4AF37]">مەنىسى: </span>
                      {currentSalah.meaningUg}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. RAKATS TABLE TAB */}
          {activeTab === 'rakats' && (
            <div className="space-y-3 text-right" dir="rtl">
              <div className="p-3 rounded-2xl bg-[#09182A] border border-[#D4AF37]/30 text-xs text-[#FFEAA7]">
                📌 بەش ۋاق نامازنىڭ پەرز، سۈننەت ۋە ۋىتىر رەكئەتلىرى جەدۋىلى:
              </div>

              {PRAYER_RAKATS_TABLE.map(p => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-[#0A1A2E] border border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-sm text-[#FFDF88]">{p.nameUg}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-black font-bold text-xs font-mono">
                      جەمئىي: {p.totalRakats} رەكئەت
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-[#05111F] border border-white/5">
                      <span className="text-[10px] text-gray-400 block">پەرزدىن ئىلگىرى</span>
                      <span className="font-bold text-amber-300 font-mono">{p.sunnahBefore} سۈننەت</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#132A42] border border-cyan-500/30">
                      <span className="text-[10px] text-cyan-300 block">پەرز</span>
                      <span className="font-bold text-cyan-200 font-mono">{p.fard} پەرز</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#05111F] border border-white/5">
                      <span className="text-[10px] text-gray-400 block">پەرزدىن كېيىن</span>
                      <span className="font-bold text-amber-300 font-mono">
                        {p.sunnahAfter} سۈننەت {p.witrOrNafl ? `+ ${p.witrOrNafl} ۋىتىر` : ''}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-normal pt-1">
                    💡 {p.notesUg}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 5. SPECIAL PRAYERS TAB */}
          {activeTab === 'special' && (
            <div className="space-y-4 text-right" dir="rtl">
              <div className="grid grid-cols-2 gap-2">
                {SPECIAL_PRAYERS_GUIDE.map((sp, idx) => (
                  <button
                    key={sp.id}
                    onClick={() => {
                      setSelectedSpecialIndex(idx);
                      soundService.playTasbihClick();
                    }}
                    className={`p-2.5 rounded-2xl border text-xs font-bold text-right transition-all cursor-pointer ${
                      selectedSpecialIndex === idx
                        ? 'bg-purple-900/60 border-purple-400 text-purple-200 shadow-md'
                        : 'bg-[#09182A] border-white/10 text-gray-400'
                    }`}
                  >
                    {sp.titleUg}
                  </button>
                ))}
              </div>

              {/* Detailed Card */}
              <div className="p-4 rounded-3xl bg-[#0D1527] border-2 border-purple-500/40 shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-purple-300">{currentSpecial.titleUg}</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded-full border border-purple-500/30 font-mono">
                    {currentSpecial.rakatsUg}
                  </span>
                </div>

                <div className="text-xs text-gray-300 space-y-1.5">
                  <div>
                    <span className="font-bold text-[#FFDF88]">ۋاقتى: </span>
                    <span>{currentSpecial.timeUg}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#FFDF88]">ئوقۇش ئۇسۇلى: </span>
                    <p className="text-purple-100/90 leading-relaxed mt-1">{currentSpecial.methodUg}</p>
                  </div>
                </div>

                {currentSpecial.duaAr && (
                  <div className="p-3 rounded-2xl bg-[#060B14] border border-purple-500/30">
                    <span className="text-[10px] text-purple-300 font-bold block mb-1">🤲 دۇئاسى:</span>
                    <p className="font-quran text-sm text-[#FFEAA7] leading-loose mb-1">{currentSpecial.duaAr}</p>
                    <p className="text-[11px] text-gray-400">{currentSpecial.duaUg}</p>
                  </div>
                )}

                <div className="text-[11px] text-emerald-300/90 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  ✨ <span className="font-bold">پەزىلىتى ۋە ئەھمىيىتى: </span>{currentSpecial.importanceUg}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
