import React, { useState } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Clock, 
  Award,
  Search
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { PROPHETS_DATA, ProphetStory } from '../data/advancedIslamicData';
import { soundService } from '../utils/audioPlayer';

interface ProphetsScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const ProphetsScreen: React.FC<ProphetsScreenProps> = ({ onNavigate, lang }) => {
  const [selectedProphet, setSelectedProphet] = useState<ProphetStory>(PROPHETS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProphets = PROPHETS_DATA.filter(p => 
    (p.nameUg || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.nameAr || '').includes(searchQuery) ||
    (p.titleUg || '').includes(searchQuery)
  );

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
              {lang === 'ug' ? 'پەيغەمبەرلەر قىسسىسى ۋە سىيرەت' : lang === 'ar' ? 'قصص الأنبياء والسيرة' : lang === 'tr' ? 'Peygamberler Tarihi ve Siyer' : 'Stories of the 25 Prophets'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'ئادەم (ئە.س) دىن پەيغەمبىرىمىزگىچە بولغان نۇرلۇق تارىخ' : 'From Adam (pbuh) to Muhammad (pbuh)'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>

        {/* Search & Horizontal Prophet Chips */}
        <div className="my-2 space-y-2">
          {/* Search Input */}
          <div className="flex items-center gap-2 bg-[#081726] px-3 py-1.5 rounded-2xl border border-white/10 text-xs">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="پەيغەمبەر ئىسمى بويىچە ئىزدەش..."
              className="bg-transparent text-white placeholder-gray-400 outline-none w-full font-arabic"
              dir="rtl"
            />
          </div>

          {/* Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {filteredProphets.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProphet(p);
                  soundService.playTasbihClick();
                }}
                className={`px-3 py-1.5 rounded-2xl text-xs font-bold shrink-0 transition-all font-arabic ${
                  selectedProphet.id === p.id 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black shadow-md' 
                    : 'bg-[#0A1E32] border border-white/10 text-gray-300'
                }`}
              >
                {p.nameUg.split(' ')[0]} (ئە.س)
              </button>
            ))}
          </div>
        </div>

        {/* Selected Prophet Detail Showcase */}
        <div className="flex-1 overflow-y-auto pr-0.5 space-y-3 max-h-[58vh]">
          
          {/* Main Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-b from-[#0C223A] via-[#071626] to-[#040C16] border border-[#D4AF37]/40 shadow-lg text-right" dir="rtl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
              <div>
                <h3 className="text-lg font-bold text-[#FFEAA7] font-quran">
                  {selectedProphet.nameAr}
                </h3>
                <span className="text-xs text-gray-300 font-arabic">
                  {selectedProphet.titleUg}
                </span>
              </div>

              <div className="text-left">
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  قۇرئاندا {selectedProphet.mentionInQuran} قېتىم بايان قىلىنغان
                </span>
              </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-3">
              <div className="p-2 rounded-xl bg-[#06111C] border border-white/5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>دەۋرى: {selectedProphet.eraUg}</span>
              </div>

              <div className="p-2 rounded-xl bg-[#06111C] border border-white/5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>ماكانى: {selectedProphet.locationUg}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-3">
              <h4 className="text-xs font-bold text-[#D4AF37] mb-1">
                📖 قىسسە مەزمۇنى:
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed">
                {selectedProphet.summaryUg}
              </p>
            </div>

            {/* Miracles */}
            <div className="mb-3">
              <h4 className="text-xs font-bold text-[#D4AF37] mb-1">
                ✨ مۆجىزىلىرى:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProphet.miraclesUg.map((m, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-xl bg-[#0B253D] border border-cyan-500/30 text-[11px] text-cyan-200">
                    • {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Lessons */}
            <div>
              <h4 className="text-xs font-bold text-[#D4AF37] mb-1">
                💡 ئىبرەتلىك دەرسلەر:
              </h4>
              <div className="space-y-1">
                {selectedProphet.lessonsUg.map((l, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/40 p-1.5 rounded-xl border border-emerald-600/20">
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
