import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ActiveScreen, Language, HalalEAdditive } from '../types';
import { HALAL_ADDITIVES } from '../data/extraIslamicData';

interface HalalScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const HalalScreen: React.FC<HalalScreenProps> = ({ onNavigate, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'halal' | 'haram' | 'mushbooh'>('all');

  const filteredList = HALAL_ADDITIVES.filter(item => {
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = 
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceUg.includes(searchQuery) ||
      item.detailsUg.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-12 select-none font-arabic">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09182A] via-[#07111E] to-[#040810] pointer-events-none" />

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
              {lang === 'ug' ? 'E-نومۇر ۋە ھالال تائام' : lang === 'ar' ? 'فاحص الإضافات الغذائية الحلال' : lang === 'tr' ? 'Helal Gıda ve E-Kodlar' : 'Halal Food E-Scanner'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'يېمەكلىك قوشۇلمىلىرىنىڭ ھالاللىقىنى تەكشۈرۈش' : 'Check E-Numbers & Halal Status'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Search Input */}
        <div className="my-2 relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ug' ? 'E-نومۇر ياكى ماددا نامىنى كىرگۈزۈڭ (مەسىلەن E120, E471)...' : 'Type E-Number (e.g. E120, E471)...'}
            className="w-full bg-[#081524] border border-[#D4AF37]/35 rounded-2xl py-2 px-9 text-xs text-white placeholder-gray-400 outline-none focus:border-[#D4AF37]"
          />
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-2.5" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-1.5 mb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterStatus === 'all' ? 'bg-[#D4AF37] text-black' : 'bg-[#091A2C] text-gray-300 border border-white/10'
            }`}
          >
            {lang === 'ug' ? 'ھەممىسى' : 'All'}
          </button>
          <button
            onClick={() => setFilterStatus('halal')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
              filterStatus === 'halal' ? 'bg-emerald-600 text-white' : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {lang === 'ug' ? 'ھالال (Halal)' : 'Halal'}
          </button>
          <button
            onClick={() => setFilterStatus('haram')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
              filterStatus === 'haram' ? 'bg-red-600 text-white' : 'bg-red-950/40 text-red-300 border border-red-500/30'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            {lang === 'ug' ? 'ھارام (Haram)' : 'Haram'}
          </button>
          <button
            onClick={() => setFilterStatus('mushbooh')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
              filterStatus === 'mushbooh' ? 'bg-amber-600 text-white' : 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {lang === 'ug' ? 'گۇمانلىق (Doubtful)' : 'Mushbooh'}
          </button>
        </div>

        {/* List of Additives */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 max-h-[52vh]">
          {filteredList.map(item => (
            <div 
              key={item.code}
              className="p-3 rounded-2xl bg-[#09182A]/90 border border-white/10 shadow-sm"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold font-mono text-[#FFEAA7] bg-[#050E18] px-2 py-0.5 rounded-lg border border-[#D4AF37]/30">
                    {item.code}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">{item.name}</h4>
                    <span className="text-[10px] text-gray-400">{item.category}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  item.status === 'halal' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' :
                  item.status === 'haram' ? 'bg-red-950 text-red-300 border border-red-500/50' :
                  'bg-amber-950 text-amber-300 border border-amber-500/50'
                }`}>
                  {item.status === 'halal' ? '✓ ھالال' : item.status === 'haram' ? '✕ ھارام' : '⚠ گۇمانلىق'}
                </span>
              </div>

              <div className="mt-2 text-xs text-gray-300 bg-[#06101B] p-2 rounded-xl border border-white/5 space-y-1" dir="rtl">
                <div>
                  <strong className="text-[#D4AF37]">مەنبەسى:</strong> {lang === 'ug' ? item.sourceUg : lang === 'tr' ? item.sourceTr : item.sourceEn}
                </div>
                <div className="text-[11px] text-gray-400 leading-relaxed">
                  {lang === 'ug' ? item.detailsUg : lang === 'tr' ? item.detailsTr : item.detailsEn}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
