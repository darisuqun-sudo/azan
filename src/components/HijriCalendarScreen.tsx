import React, { useState } from 'react';
import { 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Moon, 
  Star, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { ActiveScreen } from '../types';

interface HijriCalendarScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
}

const ISLAMIC_EVENTS = [
  { nameAr: 'رأس السنة الهجرية (1 محرم)', nameUg: 'ھىجرىيە يېڭى يىل (1-مۇھەررەم)', date: '1 Muharram' },
  { nameAr: 'يوم عاشوراء (10 محرم)', nameUg: 'ئاشۇرا كۈنى (10-مۇھەررەم)', date: '10 Muharram' },
  { nameAr: 'المولد النبوي الشريف (12 ربيع الأول)', nameUg: 'مەۋلۇد بايرىمى (12-رەبىئۇل ئەۋۋەل)', date: '12 Rabi al-Awwal' },
  { nameAr: 'الإسراء والمعراج (27 رجب)', nameUg: 'مىراج كېچىسى (27-رەجەب)', date: '27 Rajab' },
  { nameAr: 'ليلة النصف من شعبان (15 شعبان)', nameUg: 'بارات كېچىسى (15-شەئبان)', date: '15 Sha\'ban' },
  { nameAr: 'بداية شهر رمضان المبارك', nameUg: 'مۇبارەك رامىزان ئېيىنىڭ باشلىنىشى', date: '1 Ramadan' },
  { nameAr: 'ليلة القدر المباركة (27 رمضان)', nameUg: 'قەدر كېچىسى (27-رامىزان)', date: '27 Ramadan' },
  { nameAr: 'عيد الفطر المبارك (1 شوال)', nameUg: 'روزا ھېيت بايرىمى (1-شەۋۋال)', date: '1 Shawwal' },
  { nameAr: 'يوم عرفة (9 ذو الحجة)', nameUg: 'ئەرەفات كۈنى (9-زۇلھەججە)', date: '9 Dhu al-Hijjah' },
  { nameAr: 'عيد الأضحى المبارك (10 ذو الحجة)', nameUg: 'قۇربان ھېيت بايرىمى (10-زۇلھەججە)', date: '10 Dhu al-Hijjah' }
];

export const HijriCalendarScreen: React.FC<HijriCalendarScreenProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-16 font-arabic select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#D4AF37]/20 bg-[#09182A]">
        <button 
          onClick={() => onNavigate('home')}
          className="w-9 h-9 rounded-full bg-[#0E2138] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C378]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-bold font-quran gold-text">التقويم الهجري والمناسبات</h2>
          <span className="text-[11px] text-gray-400">ھىجرىيە تەقۋىمى ۋە ئىسلامىي كۈنلەر</span>
        </div>

        <div className="w-9 h-9" />
      </div>

      {/* Hijri Today Card */}
      <div className="p-4">
        <div className="p-5 rounded-3xl bg-gradient-to-b from-[#142C48] to-[#0A1A2C] border-2 border-[#D4AF37]/45 text-center shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#FFDF88] text-xs font-bold mb-2">
            <Moon className="w-3.5 h-3.5" />
            <span>بۈگۈنكى ھىجرىيە چېسلاسى</span>
          </div>
          
          <h1 className="text-2xl font-extrabold font-quran text-white my-1">
            ١٥ صفر ١٤٤٨ هـ
          </h1>
          <p className="text-xs text-gray-300">
            مىلادى: 24 ئاۋغۇست 2026 (24 August 2026)
          </p>

          {/* White Days Fasting indicator */}
          <div className="mt-3 p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>ئاي تولغان كۈنلەر (الأيام البيض 13، 14، 15) نىڭ روزىسىنى تۇتۇش سۈننەتتۇر.</span>
          </div>
        </div>

        {/* Islamic Events List */}
        <div className="mt-4">
          <h3 className="text-sm font-bold text-[#D4AF37] mb-2 px-1">
            مۇھىم ئىسلامىي بايرام ۋە كۈنلەر (المناسبات الإسلامية):
          </h3>
          
          <div className="space-y-2 max-h-[48vh] overflow-y-auto pr-1">
            {ISLAMIC_EVENTS.map((event, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-2xl bg-[#091726] border border-[#D4AF37]/20 flex items-center justify-between hover:border-[#D4AF37]/50 transition-colors"
              >
                <div>
                  <div className="font-bold text-xs text-white">{event.nameAr}</div>
                  <div className="text-[11px] text-[#93C5FD] mt-0.5">{event.nameUg}</div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#10243C] border border-[#D4AF37]/30 text-[#FFEAA7] font-mono whitespace-nowrap">
                  {event.date}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
