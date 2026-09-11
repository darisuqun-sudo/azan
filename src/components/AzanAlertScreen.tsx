import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  Settings, 
  Volume2, 
  VolumeX, 
  Bell, 
  Sparkles,
  MapPin,
  Play,
  Square,
  Music2,
  CheckCircle2,
  ListMusic,
  BookOpen,
  Volume1,
  Compass,
  Repeat
} from 'lucide-react';
import { CityLocation, ActiveScreen, Language, AzanVoiceItem } from '../types';
import { AFTER_AZAN_DUA, AZAN_VOICES, AZAN_PHRASES } from '../data/prayersData';
import { soundService } from '../utils/audioPlayer';
import { MosqueNightSkyline } from './IslamicArtwork';
import { useTranslation } from '../utils/i18n';

interface AzanAlertScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  selectedCity: CityLocation;
  onSelectCity?: (city: CityLocation) => void;
  onOpenSettings: () => void;
  lang?: Language;
}

export const AzanAlertScreen: React.FC<AzanAlertScreenProps> = ({
  onNavigate,
  selectedCity,
  onOpenSettings,
  lang = 'ug'
}) => {
  const { t } = useTranslation(lang as Language);
  const [isPlayingAzan, setIsPlayingAzan] = useState(false);
  const [isPreAzanReminderOn, setIsPreAzanReminderOn] = useState(true);
  const [showUyghurTranslation, setShowUyghurTranslation] = useState(true);
  const [isPlayingDua, setIsPlayingDua] = useState(false);
  
  // Active view tab
  const [activeTab, setActiveTab] = useState<'player' | 'muezzins' | 'phrases' | 'dua'>('player');
  
  // Current voice
  const [selectedVoice, setSelectedVoice] = useState<AzanVoiceItem>(() => soundService.getCurrentAzanVoice());
  
  // Playback state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => soundService.getVolume());
  const [activePhraseIndex, setActivePhraseIndex] = useState<number>(0);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      soundService.stopAll();
    };
  }, []);

  // Update active phrase based on current playback progress
  useEffect(() => {
    if (!isPlayingAzan || duration <= 0) return;
    const progressRatio = currentTime / duration;
    const phrasesCount = selectedVoice.isFajr ? AZAN_PHRASES.length : AZAN_PHRASES.filter(p => !p.fajrOnly).length;
    const calculatedIndex = Math.min(Math.floor(progressRatio * phrasesCount), phrasesCount - 1);
    setActivePhraseIndex(calculatedIndex);
  }, [currentTime, duration, isPlayingAzan, selectedVoice]);

  const handleToggleAzan = () => {
    if (isPlayingAzan) {
      soundService.stopAll();
      setIsPlayingAzan(false);
      setCurrentTime(0);
    } else {
      setIsPlayingAzan(true);
      soundService.playAzan(
        selectedVoice.id,
        () => {
          setIsPlayingAzan(false);
          setCurrentTime(0);
        },
        (err) => {
          console.warn('Playback finished or error:', err);
          setIsPlayingAzan(false);
        },
        (curr, dur) => {
          setCurrentTime(curr);
          if (dur > 0) setDuration(dur);
        }
      );
    }
  };

  const handleSelectVoice = (voice: AzanVoiceItem) => {
    setSelectedVoice(voice);
    soundService.setSelectedAzanVoice(voice.id);
    if (isPlayingAzan) {
      soundService.stopAll();
      setIsPlayingAzan(true);
      soundService.playAzan(
        voice.id,
        () => {
          setIsPlayingAzan(false);
          setCurrentTime(0);
        },
        () => {
          setIsPlayingAzan(false);
        },
        (curr, dur) => {
          setCurrentTime(curr);
          if (dur > 0) setDuration(dur);
        }
      );
    }
  };

  const handlePlayVoice = (voice: AzanVoiceItem) => {
    if (selectedVoice.id === voice.id && isPlayingAzan) {
      soundService.stopAll();
      setIsPlayingAzan(false);
      setCurrentTime(0);
      return;
    }

    setSelectedVoice(voice);
    soundService.setSelectedAzanVoice(voice.id);
    soundService.stopAll();
    setIsPlayingAzan(true);
    setCurrentTime(0);

    soundService.playAzan(
      voice.id,
      () => {
        setIsPlayingAzan(false);
        setCurrentTime(0);
      },
      (err) => {
        console.warn('Playback error:', err);
        setIsPlayingAzan(false);
      },
      (curr, dur) => {
        setCurrentTime(curr);
        if (dur > 0) setDuration(dur);
      }
    );
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundService.setVolume(newVol);
  };

  const handleStop = () => {
    soundService.stopAll();
    setIsPlayingAzan(false);
    setIsPlayingDua(false);
    setCurrentTime(0);
  };

  const handleToggleDuaAudio = () => {
    if (isPlayingDua) {
      soundService.stopAll();
      setIsPlayingDua(false);
    } else {
      setIsPlayingDua(true);
      soundService.playChime();
      setTimeout(() => setIsPlayingDua(false), 4000);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const phrasesToDisplay = selectedVoice.isFajr 
    ? AZAN_PHRASES 
    : AZAN_PHRASES.filter(p => !p.fajrOnly);

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-12 select-none font-arabic" dir="rtl">
      
      {/* Background Majestic Illuminated Mosque at Dusk */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-80 opacity-90">
          <MosqueNightSkyline className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111E] via-[#07111E]/80 to-transparent" />
      </div>

      {/* Screen Content Container */}
      <div className="relative z-10 flex flex-col h-full px-3.5 pt-1.5">
        
        {/* Top Header */}
        <div className="flex items-center justify-between py-1.5 border-b border-[#D4AF37]/20">
          
          {/* Back to Home Button */}
          <button 
            onClick={() => {
              handleStop();
              onNavigate('home');
            }}
            className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
            title="قايتىش / الرجوع"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>

          {/* Title & Location Subtitle */}
          <div className="text-center">
            <h2 className="text-xl font-bold font-arabic gold-text-bright tracking-wide drop-shadow-md">
              ئەزان ئاڭلاش ۋە تەڭشەك
            </h2>
            <div className="flex items-center justify-center gap-1 text-[11px] text-gray-300 -mt-0.5">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              <span>{selectedCity.nameUg} ({selectedCity.nameAr})</span>
            </div>
          </div>

          {/* Settings Button */}
          <button 
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
            title="الإعدادات"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#0A192A]/90 rounded-2xl border border-white/10 my-2 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('player')}
            className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'player'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>ئەزان قويغۇچ</span>
          </button>

          <button
            onClick={() => setActiveTab('muezzins')}
            className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'muezzins'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>ئەزانچىلار</span>
          </button>

          <button
            onClick={() => setActiveTab('phrases')}
            className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'phrases'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ئەزان سۆزلىرى</span>
          </button>

          <button
            onClick={() => setActiveTab('dua')}
            className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'dua'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ئەزان دۇئاسى</span>
          </button>
        </div>

        {/* TAB 1: MAIN PLAYER */}
        {activeTab === 'player' && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            
            {/* Alert Card: Current Reciter & Status */}
            <div className="my-2 p-4 rounded-3xl bg-[#0B1A2C]/90 border-2 border-[#D4AF37]/55 shadow-[0_0_30px_rgba(212,175,55,0.2)] text-center backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-2 left-3 text-[#D4AF37]/60 text-xs">❖</div>
              <div className="absolute top-2 right-3 text-[#D4AF37]/60 text-xs">❖</div>
              
              <span className="text-xs text-[#E5C378] font-medium tracking-wide">
                {selectedVoice.nameUg}
              </span>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold font-arabic text-white my-1 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {selectedVoice.muezzinUg}
              </h1>

              <p className="text-[11px] text-gray-300 mt-0.5">
                {selectedVoice.locationUg}
              </p>

              {/* Live indicator */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/70 text-emerald-400 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] mt-2">
                <span className={`w-2 h-2 rounded-full bg-emerald-400 ${isPlayingAzan ? 'animate-ping' : ''}`} />
                <span>{isPlayingAzan ? 'ئەزان ياڭرىماقتا (يؤذن الآن)' : 'ئەزان تاللانغان (تەييار)'}</span>
              </div>
            </div>

            {/* Live Synchronized Highlighted Adhan Phrase */}
            {isPlayingAzan && (
              <div className="my-1 p-3 rounded-2xl bg-gradient-to-r from-[#11273E] via-[#0E2034] to-[#11273E] border border-[#D4AF37]/40 text-center shadow-lg animate-fadeIn">
                <div className="text-[10px] text-[#D4AF37] font-semibold mb-0.5">ھازىر ئوقۇلىۋاتقان ئەزان جۈملىسى:</div>
                <div className="font-quran text-lg sm:text-xl text-[#FFEAA7] font-bold my-0.5">
                  {phrasesToDisplay[activePhraseIndex]?.ar}
                </div>
                <div className="text-xs text-[#93C5FD]">
                  {phrasesToDisplay[activePhraseIndex]?.ug}
                </div>
              </div>
            )}

            {/* Audio Timeline & Duration */}
            <div className="bg-[#09182A]/90 p-3 rounded-2xl border border-white/10 my-1">
              <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span className="text-[10px] text-[#D4AF37]">
                  {isPlayingAzan ? 'ئاڭلىتىلماقتا...' : `ئومۇمىي ۋاقتى: ${selectedVoice.duration || '03:45'}`}
                </span>
                <span>{formatTime(duration > 0 ? duration : 222)}</span>
              </div>
              <div className="w-full bg-gray-700/60 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-amber-300 h-full rounded-full transition-all duration-300"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              {/* Volume Slider Control */}
              <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-white/5">
                <button
                  onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.8)}
                  className="text-[#D4AF37] hover:text-white"
                >
                  {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full accent-[#D4AF37] h-1.5 bg-gray-700 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-gray-400 min-w-8 text-left">{Math.round(volume * 100)}%</span>
              </div>
            </div>

            {/* Action Controls Bar */}
            <div className="flex items-center justify-around my-2 px-1">
              
              {/* 1. Stop Button */}
              <button 
                id="btn-stop-azan"
                onClick={handleStop}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#102338] border border-[#D4AF37]/45 flex items-center justify-center text-[#FFEAA7] shadow-md group-hover:border-red-400 group-hover:text-red-400 transition-all">
                  <Square className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xs text-gray-200 font-medium mt-1">توختىتىش</span>
                <span className="text-[9px] text-gray-400">إيقاف</span>
              </button>

              {/* 2. Primary Play/Pause Button */}
              <button 
                id="btn-play-azan"
                onClick={handleToggleAzan}
                className="flex flex-col items-center group cursor-pointer relative"
              >
                <div className={`w-18 h-18 rounded-full flex items-center justify-center transition-all shadow-[0_0_25px_rgba(34,197,94,0.6)] ${
                  isPlayingAzan 
                    ? 'bg-gradient-to-tr from-emerald-600 via-green-400 to-emerald-700 animate-pulse scale-105' 
                    : 'bg-gradient-to-tr from-emerald-700 via-green-500 to-emerald-600 hover:scale-105 active:scale-95'
                }`}>
                  <div className="w-14 h-14 rounded-full bg-emerald-600 border-2 border-white/40 flex items-center justify-center text-white shadow-inner">
                    {isPlayingAzan ? (
                      <Square className="w-7 h-7 fill-current" />
                    ) : (
                      <Play className="w-7 h-7 fill-current mr-0.5" />
                    )}
                  </div>
                </div>
                <span className="text-xs text-[#4ADE80] font-bold mt-1.5 font-arabic">
                  {isPlayingAzan ? 'توختىتىش' : 'ئەزاننى قويۇش'}
                </span>
                <span className="text-[9px] text-gray-300">تشغيل الأذان</span>
              </button>

              {/* 3. Pre-Azan Reminder Bell */}
              <button 
                id="btn-pre-azan-reminder"
                onClick={() => setIsPreAzanReminderOn(!isPreAzanReminderOn)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
                  isPreAzanReminderOn 
                    ? 'bg-[#142A42] border border-[#D4AF37] text-[#FFEAA7]' 
                    : 'bg-[#0E1E30] border border-gray-600 text-gray-400'
                }`}>
                  <Bell className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-200 font-medium mt-1">ئالدىن ئەسكەرتىش</span>
                <span className="text-[9px] text-gray-400">{isPreAzanReminderOn ? '15 مىنۇت (ئوچۇق)' : 'تاقاق'}</span>
              </button>
            </div>

            {/* Quick Switch Reciter Button */}
            <div className="text-center my-1">
              <button
                onClick={() => setActiveTab('muezzins')}
                className="px-4 py-1.5 rounded-full bg-[#12283E] border border-[#D4AF37]/40 text-[#FFEAA7] text-xs font-bold hover:bg-[#1A3858] transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <ListMusic className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>باشقا داڭلىق ئەزانچى ياكى مەسجىدكە ئالماشتۇرۇش (8 ئەزان)</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: MUEZZINS LIST */}
        {activeTab === 'muezzins' && (
          <div className="flex-1 overflow-y-auto space-y-2 py-1 max-h-[62vh] pr-1">
            <div className="p-2.5 rounded-2xl bg-[#0F2238] border border-[#D4AF37]/30 text-xs text-gray-200 mb-2">
              <div className="font-bold text-[#D4AF37] mb-0.5">🕌 دۇنياغا ئەڭ مەشھۇر ھەقىقىي ئەزانچىلار:</div>
              ئۆزىڭىز ياقتۇرىدىغان ئەزان ئاۋازىنى تاللاڭ، چېكىپ دەرھال ھەقىقىي ئاۋازىنى ئاڭلاڭ.
            </div>

            {AZAN_VOICES.map((voice) => {
              const isSelected = selectedVoice.id === voice.id;
              const isCurrentlyPlayingThis = isSelected && isPlayingAzan;

              return (
                <div
                  key={voice.id}
                  onClick={() => handleSelectVoice(voice)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#173352] to-[#0E2034] border-[#D4AF37] shadow-lg scale-[1.01]'
                      : 'bg-[#0A1A2C] border-white/10 hover:bg-[#0F2338]'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-bold text-sm ${
                      isSelected 
                        ? 'bg-[#D4AF37] text-black shadow-md' 
                        : 'bg-[#152B44] text-[#FFEAA7] border border-white/10'
                    }`}>
                      {isSelected ? '✓' : '🕌'}
                    </div>

                    <div className="truncate text-right flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#FFEAA7] truncate">{voice.nameUg}</span>
                        {voice.isFajr && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                            بامدات
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-300 truncate mt-0.5">{voice.muezzinUg}</div>
                      <div className="text-[10px] text-gray-400 truncate">{voice.locationUg} • {voice.duration}</div>
                    </div>
                  </div>

                  {/* Play / Select Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayVoice(voice);
                    }}
                    className={`p-2.5 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                      isCurrentlyPlayingThis
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-[#183656] text-[#FFEAA7] hover:bg-[#204770] border border-[#D4AF37]/40'
                    }`}
                    title={isCurrentlyPlayingThis ? 'توختىتىش' : 'ئاڭلاش'}
                  >
                    {isCurrentlyPlayingThis ? (
                      <Square className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: ADHAN PHRASES & MEANING */}
        {activeTab === 'phrases' && (
          <div className="flex-1 overflow-y-auto space-y-2 py-1 max-h-[62vh] pr-1">
            <div className="p-2.5 rounded-2xl bg-[#0F2238] border border-[#D4AF37]/30 text-xs text-gray-200 mb-2">
              <div className="font-bold text-[#D4AF37] mb-0.5">📖 ئەزان سۆزلىرى ۋە ئۇيغۇرچە مەنىسى:</div>
              ئەزان توۋلانغاندا تەكرارلاش سۈننەتتۇر، ھەر بىر جۈملىنىڭ تەرجىمىسى تۆۋەندىكىچە:
            </div>

            {phrasesToDisplay.map((item, idx) => {
              const isCurrent = isPlayingAzan && activePhraseIndex === idx;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-[#183656] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                      : 'bg-[#09182A] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#142940] text-[#D4AF37] font-bold">
                      {item.count} قېتىم تەكرارلىنىدۇ
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {idx + 1} - بۈلەك
                    </span>
                  </div>

                  <div className="font-quran text-base sm:text-lg text-white font-bold text-center my-1" dir="rtl">
                    {item.ar}
                  </div>

                  <div className="text-xs text-[#93C5FD] text-center mt-1 bg-[#06121E] p-2 rounded-xl border border-white/5 font-arabic">
                    {item.ug}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: DUA AFTER AZAN */}
        {activeTab === 'dua' && (
          <div className="flex-1 overflow-y-auto space-y-3 py-1 max-h-[62vh] pr-1">
            
            {/* Main Dua Card */}
            <div className="p-4 rounded-3xl bg-[#09182A]/95 border-2 border-[#D4AF37]/50 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20 mb-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="text-sm font-bold font-arabic gold-text">
                    ئەزاندىن كېيىن ئوقۇلىدىغان سۈننەت دۇئا
                  </h3>
                </div>
                <button 
                  onClick={handleToggleDuaAudio}
                  className="p-1.5 rounded-full bg-[#183656] text-[#D4AF37] hover:bg-white/10 cursor-pointer"
                  title="ئاڭلاش"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Arabic Text */}
              <p className="font-quran text-base sm:text-lg text-center leading-[2.2] text-[#FFEAA7] p-2 bg-[#06101B] rounded-2xl border border-white/5 shadow-inner" dir="rtl">
                {AFTER_AZAN_DUA.arabic}
              </p>

              {/* Uyghur Translation */}
              <div className="mt-3 text-right space-y-1.5" dir="rtl">
                <div className="text-xs text-[#93C5FD] leading-relaxed font-arabic bg-[#0B1E32] p-2.5 rounded-xl border border-white/5">
                  <span className="font-bold text-[#D4AF37] block mb-1">ئۇيغۇرچە تەرجىمىسى:</span>
                  {AFTER_AZAN_DUA.translationUg}
                </div>
                <div className="text-[10px] text-gray-400 bg-[#071322] p-2 rounded-xl border border-white/5">
                  <span className="text-[#D4AF37] font-bold">ھەدىس مەنبەسى:</span> پەيغەمبەر ئەلەيھىسسالام مۇنداق دېگەن: «كىمكى ئەزاننى ئاڭلاپ مۇشۇ دۇئانى ئوقۇسا، قىيامەت كۈنى مېنىڭ شاپائىتىمگە ئېرىشىدۇ.» (سەھىھۇل بۇخارى، 614-ھەدىس).
                </div>
              </div>
            </div>

            {/* Etiquette & Sunnahs of Azan */}
            <div className="p-3 rounded-2xl bg-[#09182A] border border-white/10 text-xs text-gray-200 space-y-1.5">
              <div className="font-bold text-[#D4AF37] mb-1">✨ ئەزاننىڭ مۇھىم ئەدەپ-سۈننەتلىرى:</div>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>ئەزانچى نېمە دېسە، شۇ سۆزلەرنى كۆڭلىدە ياكى پەس ئاۋازدا تەكرارلاش.</li>
                <li>«حَيَّ عَلَى الصَّلَاةِ» ۋە «حَيَّ عَلَى الْفَلَاحِ» دېگەندە «لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ» دەپ جاۋاب قايتۇرۇش.</li>
                <li>ئەزان تۈگىگەندىن كېيىن پەيغەمبىرىمىزگە سالاۋات ئېيتىش ۋە يۇقىرىقى ۋەسىلە دۇئاسىنى ئوقۇش.</li>
                <li>ئەزان بىلەن تەكبىر (ئىقامەت) ئوتتۇرىسىدا دۇئا قىلىش (بۇ ۋاقىتتا قىلىنغان دۇئا رەت قىلىنمايدۇ).</li>
              </ul>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
