import React, { useState } from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Compass, 
  Navigation, 
  Utensils, 
  Building, 
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { soundService } from '../utils/audioPlayer';

interface MosqueLocatorScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

interface PlaceItem {
  id: string;
  type: 'mosque' | 'halal';
  nameUg: string;
  nameAr: string;
  distance: string;
  addressUg: string;
  jumaTime?: string;
  cuisineUg?: string;
  rating: number;
}

export const MosqueLocatorScreen: React.FC<MosqueLocatorScreenProps> = ({ onNavigate, lang }) => {
  const [filterType, setFilterType] = useState<'all' | 'mosque' | 'halal'>('all');

  const places: PlaceItem[] = [
    {
      id: '1',
      type: 'mosque',
      nameUg: 'مەركىزىي جامە مەسچىتى',
      nameAr: 'المسجد المركزي الكبير',
      distance: '0.8 كىلومېتىر',
      addressUg: 'مەركىزىي كوچا 12-نومۇر',
      jumaTime: '13:30',
      rating: 4.9
    },
    {
      id: '2',
      type: 'mosque',
      nameUg: 'نۇر ئىسلام مەسچىتى',
      nameAr: 'مسجد النور',
      distance: '1.4 كىلومېتىر',
      addressUg: 'غەربىي رايون، گۈلزار يولى 45',
      jumaTime: '13:15',
      rating: 4.8
    },
    {
      id: '3',
      type: 'halal',
      nameUg: 'ئەل-بەرەكە ھالال رېستورانى',
      nameAr: 'مطعم البركة الحلال',
      distance: '0.5 كىلومېتىر',
      addressUg: 'تىنچلىق باغچىسى يېنى',
      cuisineUg: 'ئۇيغۇر ۋە ئوتتۇرا شەرق تاماقلىرى',
      rating: 5.0
    },
    {
      id: '4',
      type: 'halal',
      nameUg: 'تەكلىماكان پولو-لەغمەنخانىسى',
      nameAr: 'مطعم تاكلاماكان الأصيل',
      distance: '1.1 كىلومېتىر',
      addressUg: 'شەرقىي سودا مەركىزى 8-دۇكان',
      cuisineUg: 'ھالال كاۋاپ، پولو، لەغمەن',
      rating: 4.9
    }
  ];

  const filteredPlaces = places.filter(p => filterType === 'all' || p.type === filterType);

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
              {lang === 'ug' ? 'مەسچىت ۋە ھالال ئاشخانىلار' : lang === 'ar' ? 'المساجد والمطاعم الحلال القريبة' : lang === 'tr' ? 'Yakındaki Cami ve Helal Mekanlar' : 'Mosque & Halal Food Locator'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'GPS ئارقىلىق يېقىن ئەتراپنى تېپىش ۋە يول باشلاش' : 'Locate nearby Mosques & Halal Food'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <MapPin className="w-4 h-4" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="my-2 flex gap-1.5 bg-[#081726] p-1 rounded-2xl border border-white/10">
          {[
            { id: 'all', label: 'ھەممىسى' },
            { id: 'mosque', label: '🕌 مەسچىتلەر' },
            { id: 'halal', label: '🍲 ھالال ئاشخانىلار' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                setFilterType(f.id as any);
                soundService.playTasbihClick();
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === f.id ? 'bg-[#D4AF37] text-black shadow-md' : 'text-gray-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Places List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5 max-h-[62vh]">
          {filteredPlaces.map(place => (
            <div
              key={place.id}
              className="p-3 rounded-2xl bg-gradient-to-r from-[#0C223A] to-[#071626] border border-white/10 hover:border-[#D4AF37]/40 transition-all text-right space-y-2"
              dir="rtl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    place.type === 'mosque' ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400' : 'bg-amber-950 border border-amber-500/40 text-amber-400'
                  }`}>
                    {place.type === 'mosque' ? <Building className="w-4 h-4" /> : <Utensils className="w-4 h-4" />}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {place.nameUg}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {place.nameAr}
                    </span>
                  </div>
                </div>

                <div className="text-left" dir="ltr">
                  <span className="text-xs font-bold font-mono text-[#FFEAA7]">
                    📍 {place.distance}
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-300 flex items-center justify-between border-t border-white/5 pt-1.5">
                <span>{place.addressUg}</span>
                {place.jumaTime && (
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    جۈمە: {place.jumaTime}
                  </span>
                )}
                {place.cuisineUg && (
                  <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full">
                    {place.cuisineUg}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => soundService.playChime()}
                  className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>يول باشلاش (Nav)</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
