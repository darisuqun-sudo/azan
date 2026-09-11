import React, { useState } from 'react';
import { 
  ChevronRight, 
  Smartphone, 
  Watch, 
  Sparkles, 
  Moon, 
  Sun, 
  RotateCcw,
  Check
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { soundService } from '../utils/audioPlayer';

interface WidgetsScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const WidgetsScreen: React.FC<WidgetsScreenProps> = ({ onNavigate, lang }) => {
  const [watchCount, setWatchCount] = useState(33);

  const incrementWatch = () => {
    setWatchCount(prev => (prev >= 99 ? 0 : prev + 1));
    soundService.playBeep();
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
              {lang === 'ug' ? 'ئاندروئىد ۋىجىت ۋە سائەت' : lang === 'ar' ? 'الويدجت وساعة Wear OS' : lang === 'tr' ? 'Widget ve Akıllı Saat' : 'Android Widgets & Wear OS'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'باش ئېكران ۋە ئەقلىي سائەت قوشۇمچىسى' : 'Home Screen Widget & Smartwatch'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Watch className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-0.5 max-h-[70vh]">
          
          {/* Section 1: Android Home Screen Widget (4x2) */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold mb-2">
              <Smartphone className="w-4 h-4" />
              <span>{lang === 'ug' ? '1. ئاندروئىد باش ئېكران ۋىجىتى (Android 4x2 Widget)' : '1. Android 4x2 Home Widget'}</span>
            </div>

            {/* Widget Glass Container */}
            <div className="p-3.5 rounded-3xl bg-gradient-to-br from-[#0B2138]/95 to-[#061424]/95 border-2 border-[#D4AF37]/60 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs">
                    🕌
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">مەككە مۇكەررەمە</span>
                    <span className="text-[10px] text-gray-400">1447-يىلى شەئبان</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#D4AF37] font-bold block">كېيىنكى ئەزان: شام</span>
                  <span className="text-sm font-extrabold text-white font-mono">18:42</span>
                </div>
              </div>

              {/* Horizontal Prayer Times Bar */}
              <div className="grid grid-cols-5 gap-1.5 mt-2.5 text-center">
                <div className="bg-[#06101B]/80 p-1.5 rounded-xl border border-white/5">
                  <span className="text-[9px] text-gray-400 block">بامدات</span>
                  <span className="text-[11px] font-bold font-mono text-gray-200">04:38</span>
                </div>
                <div className="bg-[#06101B]/80 p-1.5 rounded-xl border border-white/5">
                  <span className="text-[9px] text-gray-400 block">پېشىن</span>
                  <span className="text-[11px] font-bold font-mono text-gray-200">12:37</span>
                </div>
                <div className="bg-[#06101B]/80 p-1.5 rounded-xl border border-white/5">
                  <span className="text-[9px] text-gray-400 block">ئەسر</span>
                  <span className="text-[11px] font-bold font-mono text-gray-200">15:58</span>
                </div>
                <div className="bg-gradient-to-t from-emerald-950 to-emerald-900/80 p-1.5 rounded-xl border border-emerald-400 shadow-md">
                  <span className="text-[9px] text-emerald-300 font-bold block">شام</span>
                  <span className="text-[11px] font-bold font-mono text-white">18:42</span>
                </div>
                <div className="bg-[#06101B]/80 p-1.5 rounded-xl border border-white/5">
                  <span className="text-[9px] text-gray-400 block">خۇپتەن</span>
                  <span className="text-[11px] font-bold font-mono text-gray-200">19:59</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Wear OS Smartwatch Companion */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold mb-2">
              <Watch className="w-4 h-4" />
              <span>{lang === 'ug' ? '2. ئەقلىي سائەت تەسبيھ ۋە ئەزان (Wear OS Watch)' : '2. Wear OS Smartwatch Companion'}</span>
            </div>

            {/* Smartwatch Circular Frame */}
            <div className="flex items-center justify-center py-2">
              <div 
                onClick={incrementWatch}
                className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#040810] via-[#0B1E32] to-[#040810] border-4 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center text-center p-4 cursor-pointer active:scale-95 transition-all select-none relative"
              >
                {/* Watch Crown Indicator */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-6 bg-[#D4AF37] rounded-r-md" />
                
                <span className="text-[10px] text-[#D4AF37] font-bold">سۇبھاناللاھ</span>
                
                <div className="text-4xl font-extrabold text-white font-mono my-1">
                  {watchCount}
                </div>

                <div className="text-[9px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  شام: 18:42 (26 مىنۇت قالدى)
                </div>

                <span className="text-[8px] text-gray-400 mt-1">ساناپ كۆرۈش ئۈچۈن چېكىڭ</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
