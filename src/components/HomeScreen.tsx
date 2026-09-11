import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Settings, 
  Volume2, 
  VolumeX, 
  Search, 
  Heart, 
  Menu,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  MoonStar,
  FileCode2,
  Check,
  BookOpen,
  Sparkles,
  Navigation,
  Loader2,
  Square
} from 'lucide-react';
import { ActiveScreen, CityLocation, PrayerTime, Language } from '../types';
import { CITIES, getCalculatedPrayerTimes } from '../data/prayersData';
import { detectCurrentLocation } from '../utils/prayerCalculator';
import { soundService } from '../utils/audioPlayer';
import { useTranslation } from '../utils/i18n';
import { 
  QuranOnRehalIcon, 
  PrayingHandsIcon, 
  MosqueAzanEmblem, 
  TasbihBeadsIcon, 
  QiblaKaabaIcon, 
  HijriCalendarIcon, 
  HadithRadianceIcon,
  MosqueNightSkyline
} from './IslamicArtwork';

interface HomeScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  selectedCity: CityLocation;
  onSelectCity: (city: CityLocation) => void;
  onOpenSettings: () => void;
  onOpenPlan: () => void;
  activeScreen: ActiveScreen;
  lang?: Language;
  mosqueMode?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  selectedCity,
  onSelectCity,
  onOpenSettings,
  onOpenPlan,
  activeScreen,
  lang = 'ug',
  mosqueMode = false
}) => {
  const currentLang: Language = (lang as Language) || 'ug';
  const { t } = useTranslation(currentLang);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 22, seconds: 45 });
  const [isPlayingAzan, setIsPlayingAzan] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(() => getCalculatedPrayerTimes(selectedCity));
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Initialize prayer times
  useEffect(() => {
    if (selectedCity) {
      setPrayerTimes(getCalculatedPrayerTimes(selectedCity));
    }
  }, [selectedCity]);

  // Handle GPS Auto Location Detection
  const handleAutoGps = async () => {
    setIsDetectingGps(true);
    setGpsError(null);
    try {
      const gpsLocation = await detectCurrentLocation();
      onSelectCity(gpsLocation);
      setShowCityPicker(false);
    } catch {
      setGpsError(
        lang === 'ug' ? 'ئورۇننى بايقاش مەغلۇپ بولدى، تىزىملىكتىن شەھەر تاللاڭ' :
        lang === 'ar' ? 'تعذر تحديد الموقع، يرجى اختيار المدينة يدوياً' :
        lang === 'tr' ? 'Konum belirlenemedi, lütfen şehri seçin' :
        'Location detection failed, please select city manually'
      );
    } finally {
      setIsDetectingGps(false);
    }
  };

  // Next prayer computation
  const nextPrayer = prayerTimes.find(p => p.isNext) || prayerTimes[0];

  // Dynamic live countdown to next prayer
  useEffect(() => {
    const updateCountdown = () => {
      if (!nextPrayer || !nextPrayer.time) return;

      const now = new Date();
      const [pastedHour, pastedMin] = nextPrayer.time.split(':').map(Number);
      
      const targetDate = new Date();
      targetDate.setHours(pastedHour, pastedMin, 0, 0);

      // If target time is earlier than current time today, next prayer is tomorrow
      if (targetDate.getTime() <= now.getTime()) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      const diffMs = Math.max(0, targetDate.getTime() - now.getTime());
      const totalSeconds = Math.floor(diffMs / 1000);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCountdown({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextPrayer]);

  const getPrayerIcon = (iconName: string, isActive: boolean) => {
    const colorClass = isActive ? 'text-white' : 'text-[#E5C378]';
    switch (iconName) {
      case 'Moon': return <Moon className={`w-3.5 h-3.5 ${colorClass}`} />;
      case 'Sunrise': return <Sunrise className={`w-3.5 h-3.5 ${colorClass}`} />;
      case 'Sun': return <Sun className={`w-3.5 h-3.5 ${colorClass}`} />;
      case 'SunMedium': return <Sun className={`w-3.5 h-3.5 ${colorClass}`} />;
      case 'Sunset': return <Sunset className={`w-3.5 h-3.5 ${colorClass}`} />;
      case 'MoonStar': return <MoonStar className={`w-3.5 h-3.5 ${colorClass}`} />;
      default: return <Sun className={`w-3.5 h-3.5 ${colorClass}`} />;
    }
  };

  const getPrayerDisplayName = (p?: PrayerTime | null) => {
    if (!p) return '';
    if (lang === 'ug') return p.nameUg || p.nameAr || '';
    if (lang === 'ar') return p.nameAr || p.nameUg || '';
    if (lang === 'tr') return p.nameTr || p.nameEn || '';
    return p.nameEn || p.nameAr || '';
  };

  const getCityDisplayName = () => {
    if (!selectedCity) return '';
    if (lang === 'ug') return selectedCity.nameUg || selectedCity.nameAr || '';
    if (lang === 'ar') return selectedCity.nameAr || selectedCity.nameUg || '';
    if (lang === 'tr') return selectedCity.nameTr || selectedCity.nameEn || '';
    return selectedCity.nameEn || selectedCity.nameAr || '';
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-14 select-none font-arabic">
      
      {/* Background Night Mosque Illustration with Glowing Crescent */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-80 opacity-90">
          <MosqueNightSkyline className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111E] via-[#07111E]/75 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col px-3.5 pt-1.5 pb-2">
        
        {/* Top App Bar */}
        <div className="flex items-center justify-between py-1.5 px-0.5 border-b border-[#D4AF37]/20">
          {/* Notification Bell */}
          <button 
            id="btn-notifications"
            onClick={() => onNavigate('azan-alert')}
            className="w-8 h-8 rounded-full bg-gradient-to-b from-[#10253D] to-[#091728] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFEAA7] shadow-sm hover:border-[#D4AF37] transition-all cursor-pointer relative"
            title={t('azanAlertsTitle')}
          >
            <Bell className="w-3.5 h-3.5 text-[#FFEAA7]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          </button>

          {/* App Title & Subtitle */}
          <div className="text-center">
            <h1 className="text-lg font-extrabold font-quran gold-text tracking-wide drop-shadow-md">
              {t('appShortName')}
            </h1>
            <p className="text-[9px] text-[#A0AEC0] tracking-wider -mt-0.5 font-arabic">
              {t('appSubtitle')}
            </p>
          </div>

          {/* Settings / Android Plan Button */}
          <div className="flex items-center gap-1">
            <button 
              id="btn-plan"
              onClick={onOpenPlan}
              className="w-7 h-7 rounded-full bg-[#0D1D30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
              title={t('androidPlan')}
            >
              <FileCode2 className="w-3 h-3 text-[#D4AF37]" />
            </button>
            <button 
              id="btn-settings"
              onClick={onOpenSettings}
              className="w-7 h-7 rounded-full bg-[#0D1D30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
              title={t('settings')}
            >
              <Settings className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Mosque Mode Banner if Active */}
        {mosqueMode && (
          <div className="my-1 py-1 px-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-300">
            <span className="flex items-center gap-1.5 font-bold text-[10px]">
              <VolumeX className="w-3.5 h-3.5 animate-pulse" />
              {t('activeMosqueMode')}
            </span>
            <span className="text-[9px] text-emerald-400">🔇</span>
          </div>
        )}

        {/* Location & Date Bar */}
        <div className="flex items-center justify-between py-1.5 px-2 text-xs text-[#E2E8F0]">
          {/* Location Selector (Cairo, Makkah, Istanbul, etc.) */}
          <div className="relative">
            <button 
              id="btn-location-select"
              onClick={() => setShowCityPicker(!showCityPicker)}
              className="flex items-center gap-1 text-[#FFEAA7] hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-xs">📍</span>
              <span className="font-bold">{getCityDisplayName()}</span>
              <span className="text-[9px] text-[#D4AF37]">▼</span>
            </button>

            {/* City Dropdown Menu */}
            {showCityPicker && (
              <div className="absolute top-7 left-0 bg-[#0B1E32] border border-[#D4AF37]/50 rounded-2xl p-2 shadow-2xl z-50 min-w-[200px] backdrop-blur-md">
                {/* Auto GPS Detection Button */}
                <button
                  onClick={handleAutoGps}
                  disabled={isDetectingGps}
                  className="w-full mb-1.5 py-1.5 px-2 rounded-xl bg-gradient-to-r from-emerald-900/80 to-teal-900/80 border border-emerald-500/60 text-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:border-emerald-400 transition-all cursor-pointer shadow-sm"
                >
                  {isDetectingGps ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-300" />
                      <span>{lang === 'ug' ? 'ئورۇن ئېنىقلىنىۋاتىدۇ...' : 'جاري تحديد الموقع...'}</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                      <span>{lang === 'ug' ? '📍 ھازىرقى ئورنۇم (GPS)' : '📍 موقعي الحالي (GPS)'}</span>
                    </>
                  )}
                </button>

                {gpsError && (
                  <p className="text-[10px] text-rose-400 text-center mb-1 leading-tight">{gpsError}</p>
                )}

                <div className="text-[10px] font-bold text-[#D4AF37] px-2 py-1 border-b border-white/10 flex justify-between items-center">
                  <span>{t('city')}:</span>
                  <button onClick={() => setShowCityPicker(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-0.5 mt-1">
                  {CITIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCity(c);
                        setShowCityPicker(false);
                      }}
                      className={`w-full text-right px-2 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                        selectedCity.id === c.id ? 'bg-[#D4AF37]/25 text-[#FFDF88] font-bold border border-[#D4AF37]/30' : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <div className="text-right">
                        <div className="font-semibold">{lang === 'ug' ? c.nameUg : lang === 'ar' ? c.nameAr : lang === 'tr' ? c.nameTr : c.nameEn}</div>
                        <div className="text-[9px] text-gray-400">{lang === 'ug' ? c.countryUg : lang === 'ar' ? c.countryAr : c.countryEn}</div>
                      </div>
                      {selectedCity.id === c.id && <Check className="w-3 h-3 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hijri & Gregorian Date */}
          <div className="text-right">
            <span className="text-gray-300 text-[11px] font-medium">{t('hijriMonthYear')}</span>
            <span className="text-gray-400 text-[9px] mr-1.5 font-sans">(2026/08)</span>
          </div>
        </div>

        {/* Big Ornate Central Mihrab Arch / Next Prayer Card */}
        <div className="relative my-1 w-full flex justify-center">
          <div 
            onClick={() => onNavigate('azan-alert')}
            className="w-full max-w-[340px] rounded-[30px] p-3 text-center bg-gradient-to-b from-[#091D33]/95 via-[#061424]/95 to-[#040C17]/95 border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] relative overflow-hidden backdrop-blur-md cursor-pointer hover:border-[#FFDF88] transition-all group"
          >
            {/* Ornate Golden Inner Border Frame */}
            <div className="absolute inset-1.5 rounded-[24px] border border-[#D4AF37]/35 pointer-events-none" />
            
            {/* Top Corner Jewels */}
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#07111E]" />
            </div>
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#07111E]" />
            </div>

            {/* Inner Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-3">
              {/* Mosque Icon in golden arch */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#1C3A5A] to-[#0A1A2C] border border-[#D4AF37]/60 flex items-center justify-center mb-1 shadow-md group-hover:border-[#D4AF37] transition-all">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#FFDF88]" fill="currentColor">
                  <path d="M12 2L10 5H14L12 2ZM12 6C9.5 6 7.5 8 7.5 10.5C7.5 11.5 8 12.5 8.5 13H15.5C16 12.5 16.5 11.5 16.5 10.5C16.5 8 14.5 6 12 6ZM4 11V22H8V15C8 14 9 13 10 13H14C15 13 16 14 16 15V22H20V11H18V13H17V11H7V13H6V11H4ZM12 15C11.4 15 11 15.4 11 16V22H13V16C13 15.4 12.6 15 12 15Z" />
                </svg>
              </div>

              <span className="text-[11px] text-[#E5C378] font-medium tracking-wide">
                {t('nextPrayer')}
              </span>
              <span className="text-lg font-bold text-white font-arabic drop-shadow-md">
                {getPrayerDisplayName(nextPrayer)} ({nextPrayer?.time})
              </span>
              
              {/* Big Countdown Timer 00:22:45 */}
              <div className="my-1 px-3 py-0.5 rounded-full bg-[#050E18]/85 border border-[#D4AF37]/45 text-[#FFDF88] font-mono text-base font-bold tracking-widest shadow-inner flex items-center gap-0.5">
                <span>{String(countdown.hours).padStart(2, '0')}</span>
                <span className="text-[#D4AF37] animate-pulse">:</span>
                <span>{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="text-[#D4AF37] animate-pulse">:</span>
                <span>{String(countdown.seconds).padStart(2, '0')}</span>
              </div>

              {/* Play / Stop Azan Button */}
              <button 
                id="btn-home-play-azan"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isPlayingAzan) {
                    soundService.stopAll();
                    setIsPlayingAzan(false);
                  } else {
                    setIsPlayingAzan(true);
                    soundService.playAzan(
                      undefined,
                      () => setIsPlayingAzan(false),
                      () => setIsPlayingAzan(false)
                    );
                  }
                }}
                className={`mt-1 px-3 py-1 rounded-full text-xs font-bold font-arabic flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                  isPlayingAzan 
                    ? 'bg-red-500 text-white border border-red-300 animate-pulse' 
                    : 'bg-[#08182B]/95 text-[#FFEAA7] hover:bg-[#122A45] border border-[#D4AF37]/50'
                }`}
                title={isPlayingAzan ? 'ئەزاننى توختىتىش' : 'ئەزان ئاڭلاش'}
              >
                {isPlayingAzan ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>توختىتىش</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>ئەزان ئاڭلاش</span>
                  </>
                )}
              </button>

              {/* Current Selected Muezzin Badge */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('azan-alert');
                }}
                className="text-[10px] text-[#D4AF37]/90 hover:text-[#FFEAA7] transition-colors mt-0.5 flex items-center gap-1 cursor-pointer"
                title="ئەزانچى تاللاش"
              >
                <span>🎙️</span>
                <span className="truncate max-w-[170px]">{soundService.getCurrentAzanVoice().nameUg}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Prayer Times Ribbon */}
        <div className="w-full bg-[#0A1828]/95 border border-[#D4AF37]/35 rounded-2xl p-1.5 shadow-lg mb-2">
          <div className="grid grid-cols-6 gap-1 text-center">
            {prayerTimes.map((prayer) => {
              const isActive = prayer.id === 'maghrib';
              return (
                <div 
                  key={prayer.id}
                  onClick={() => onNavigate('azan-alert')}
                  className={`flex flex-col items-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-b from-[#16A34A] to-[#0D2818] border border-[#22C55E] shadow-[0_0_12px_rgba(22,163,74,0.6)]' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="mb-0.5">{getPrayerIcon(prayer.icon, isActive)}</div>
                  <span className={`text-[10px] font-bold leading-tight ${isActive ? 'text-white font-extrabold' : 'text-gray-300'}`}>
                    {getPrayerDisplayName(prayer)}
                  </span>
                  <span className={`text-[11px] font-mono font-semibold mt-0.5 ${isActive ? 'text-[#FFF2B2] font-bold' : 'text-[#E5C378]'}`}>
                    {prayer.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Three Primary Hub Buttons */}
        <div className="grid grid-cols-3 gap-2 my-1.5">
          
          {/* 1. Al-Quran Al-Kareem */}
          <button 
            id="btn-hub-quran"
            onClick={() => onNavigate('quran-reader')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-[#10243B] to-[#0A1624] border border-[#D4AF37]/35 shadow-md hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#183454] border border-[#D4AF37]/40 flex items-center justify-center mb-1 shadow-sm group-hover:scale-105 transition-transform p-1">
              <QuranOnRehalIcon className="w-full h-full" />
            </div>
            <span className="text-xs font-bold text-white font-arabic">{t('quranKareem')}</span>
            <span className="text-[9px] text-[#A0AEC0]">{t('quranDesc')}</span>
          </button>

          {/* 2. Al-Azan Center Glowing Hub */}
          <button 
            id="btn-hub-azan"
            onClick={() => onNavigate('azan-alert')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-[#1E3E60] to-[#0D2138] border-2 border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.35)] hover:scale-[1.03] transition-all cursor-pointer group relative -top-1"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#A67C1E] flex items-center justify-center mb-1 shadow-lg group-hover:rotate-6 transition-transform p-1">
              <MosqueAzanEmblem className="w-full h-full" />
            </div>
            <span className="text-xs font-extrabold gold-text font-arabic">{t('azan')}</span>
            <span className="text-[9px] text-[#FFDF88]">{t('azanDesc')}</span>
          </button>

          {/* 3. Al-Adhkar / Duas */}
          <button 
            id="btn-hub-duas"
            onClick={() => onNavigate('duas')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-[#10243B] to-[#0A1624] border border-[#D4AF37]/35 shadow-md hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#183454] border border-[#D4AF37]/40 flex items-center justify-center mb-1 shadow-sm group-hover:scale-105 transition-transform p-1">
              <PrayingHandsIcon className="w-full h-full" />
            </div>
            <span className="text-xs font-bold text-white font-arabic">{t('duas')}</span>
            <span className="text-[9px] text-[#A0AEC0]">{t('duasDesc')}</span>
          </button>
        </div>

        {/* Dedicated Melodic Recitations Banner */}
        <div 
          onClick={() => onNavigate('melodic-recitations')}
          className="my-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-[#142B47] via-[#0E2238] to-[#142B47] border border-[#D4AF37]/45 flex items-center justify-between cursor-pointer hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#10243B] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFEAA7] shrink-0 group-hover:scale-105 transition-transform text-lg">
              🎙️
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-[#FFEAA7] flex items-center gap-1.5 font-arabic">
                <span>ئەڭ مۇڭ تىلاۋەتلەر بۆلىكى</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFDF88]">
                  نادىر
                </span>
              </div>
              <div className="text-[10px] text-gray-300">
                الشيخ عبدالعزيز سحيم & شريف مصطفى
              </div>
            </div>
          </div>
          <span className="text-xs text-[#D4AF37] font-bold group-hover:translate-x-[-3px] transition-transform">
            ئاڭلاش ◀
          </span>
        </div>

        {/* Secondary Four Quick Features */}
        <div className="grid grid-cols-4 gap-1.5 my-1.5">
          
          {/* السبحة / Tasbih */}
          <button 
            id="btn-tool-tasbih"
            onClick={() => onNavigate('tasbih')}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-[#091726]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0E2236] transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#142940] border border-[#D4AF37]/30 flex items-center justify-center mb-0.5 group-hover:scale-110 transition-transform p-0.5">
              <TasbihBeadsIcon className="w-full h-full" />
            </div>
            <span className="text-[11px] font-semibold text-gray-200">{t('tasbih')}</span>
            <span className="text-[8px] text-gray-400">{t('tasbihSub')}</span>
          </button>

          {/* اتجاه القبلة / Qibla */}
          <button 
            id="btn-tool-qibla"
            onClick={() => onNavigate('qibla')}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-[#091726]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0E2236] transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#142940] border border-[#D4AF37]/30 flex items-center justify-center mb-0.5 group-hover:scale-110 transition-transform p-0.5">
              <QiblaKaabaIcon className="w-full h-full" />
            </div>
            <span className="text-[11px] font-semibold text-gray-200">{t('qibla')}</span>
            <span className="text-[8px] text-gray-400">{t('qiblaSub')}</span>
          </button>

          {/* التقويم الهجري / Hijri Calendar */}
          <button 
            id="btn-tool-calendar"
            onClick={() => onNavigate('calendar')}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-[#091726]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0E2236] transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#142940] border border-[#D4AF37]/30 flex items-center justify-center mb-0.5 group-hover:scale-110 transition-transform p-0.5">
              <HijriCalendarIcon className="w-full h-full" />
            </div>
            <span className="text-[11px] font-semibold text-gray-200">{t('calendar')}</span>
            <span className="text-[8px] text-gray-400">{t('calendarSub')}</span>
          </button>

          {/* الأحاديث / Hadiths */}
          <button 
            id="btn-tool-hadith"
            onClick={() => onNavigate('hadith')}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-[#091726]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0E2236] transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#142940] border border-[#D4AF37]/30 flex items-center justify-center mb-0.5 group-hover:scale-110 transition-transform p-0.5">
              <HadithRadianceIcon className="w-full h-full" />
            </div>
            <span className="text-[11px] font-semibold text-gray-200">{t('hadith')}</span>
            <span className="text-[8px] text-gray-400">{t('hadithSub')}</span>
          </button>
        </div>

        {/* Highlighted Master Suite Carousel Banner (Categorized Hub) */}
        <div 
          onClick={() => onNavigate('more')}
          className="p-2.5 rounded-2xl bg-gradient-to-r from-[#0E2844] via-[#091D32] to-[#071728] border border-[#D4AF37]/45 flex items-center justify-between shadow-[0_0_15px_rgba(212,175,55,0.15)] mt-1 hover:border-[#D4AF37] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#A67C1E] flex items-center justify-center text-black font-bold shadow group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div className="text-right" dir="rtl">
              <span className="text-xs font-bold text-[#FFEAA7] block group-hover:text-white transition-colors">
                {t('allModulesSuite')}
              </span>
              <span className="text-[9px] text-gray-400">
                {t('allModulesSuiteDesc')}
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('more');
            }}
            className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold text-xs shadow-sm group-hover:from-[#FFEAA7] group-hover:to-[#D4AF37] transition-all shrink-0 cursor-pointer"
          >
            {t('more')} ➔
          </button>
        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-[#071322]/95 border-t border-[#D4AF37]/25 backdrop-blur-md py-1.5 px-3 z-40">
        <div className="flex items-center justify-around">
          
          {/* الرئيسية / Home */}
          <button 
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center cursor-pointer transition-colors ${activeScreen === 'home' ? 'text-[#FFDF88]' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <div className={`p-1 rounded-full ${activeScreen === 'home' ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40' : ''}`}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold mt-0.5">{t('home')}</span>
          </button>

          {/* السور / Quran Surahs */}
          <button 
            onClick={() => onNavigate('surahs')}
            className={`flex flex-col items-center cursor-pointer transition-colors ${activeScreen === 'surahs' ? 'text-[#FFDF88]' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-medium mt-0.5">{t('surahs')}</span>
          </button>

          {/* خاتىمە / Khatam */}
          <button 
            onClick={() => onNavigate('khatam')}
            className={`flex flex-col items-center cursor-pointer transition-colors ${activeScreen === 'khatam' ? 'text-[#FFDF88]' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-medium mt-0.5">{t('khatam')}</span>
          </button>

          {/* المفضلة / Bookmarks */}
          <button 
            onClick={() => onNavigate('favorites')}
            className={`flex flex-col items-center cursor-pointer transition-colors ${activeScreen === 'favorites' ? 'text-[#FFDF88]' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <Heart className="w-4 h-4" />
            <span className="text-[10px] font-medium mt-0.5">{t('favorites')}</span>
          </button>

          {/* المزيد / More */}
          <button 
            onClick={() => onNavigate('more')}
            className={`flex flex-col items-center cursor-pointer transition-colors ${activeScreen === 'more' ? 'text-[#FFDF88]' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <Menu className="w-4 h-4" />
            <span className="text-[10px] font-medium mt-0.5">{t('more')}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
