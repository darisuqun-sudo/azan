import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft,
  Bookmark, 
  BookmarkCheck, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  BookOpen, 
  Share2, 
  Check, 
  Sparkles,
  Search,
  RotateCcw,
  Radio,
  Sliders,
  ListFilter
} from 'lucide-react';
import { Surah, Ayah, Reciter, ActiveScreen, Language } from '../types';
import { RECITERS, ALL_114_SURAHS_META } from '../data/quranData';
import { getLocalSurah } from '../utils/quranLoader';
import { getSurahAudioCandidates, getAyahAudioCandidates } from '../utils/quranAudio';
import { soundService } from '../utils/audioPlayer';

interface QuranReaderScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  initialSurahNumber?: number;
  lang?: Language;
}

export const QuranReaderScreen: React.FC<QuranReaderScreenProps> = ({
  onNavigate,
  initialSurahNumber = 1,
  lang = 'ug'
}) => {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(initialSurahNumber);
  const [currentSurah, setCurrentSurah] = useState<Surah>(() => {
    return getLocalSurah(initialSurahNumber) || getLocalSurah(1)!;
  });

  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(0);
  const [playbackMode, setPlaybackMode] = useState<'surah' | 'ayah'>('surah');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState<boolean>(false);

  // Reciters: Top 4 prioritized as requested
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [showReciterModal, setShowReciterModal] = useState<boolean>(false);
  const [showSurahPickerModal, setShowSurahPickerModal] = useState<boolean>(false);
  const [surahSearchTerm, setSurahSearchTerm] = useState<string>('');
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<number[]>([1]);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('large');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // When initialSurahNumber changes externally
  useEffect(() => {
    if (initialSurahNumber && initialSurahNumber !== selectedSurahNumber) {
      handleSwitchSurah(initialSurahNumber);
    }
  }, [initialSurahNumber]);

  // Load requested Surah 100% locally without VPN
  const handleSwitchSurah = (surahNum: number) => {
    stopPlayback();
    setSelectedSurahNumber(surahNum);
    const surah = getLocalSurah(surahNum);
    if (surah) {
      setCurrentSurah(surah);
      setActiveAyahIndex(0);
      setCurrentTime(0);
      setDuration(0);
    }
    setShowSurahPickerModal(false);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    soundService.stopAll();
    setIsPlaying(false);
  };

  // Play full Surah audio with fallback candidate URLs for VPN-free reliability
  const playSurahAudio = () => {
    if (isPlaying && playbackMode === 'surah') {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    stopPlayback();
    setPlaybackMode('surah');

    const candidates = getSurahAudioCandidates(selectedReciter, currentSurah.number);
    let candidateIdx = 0;

    const audio = new Audio();
    audio.playbackRate = audioSpeed;
    audio.loop = isLooping;

    const tryLoad = () => {
      if (candidateIdx >= candidates.length) {
        setIsPlaying(false);
        return;
      }
      audio.src = candidates[candidateIdx];
      audio.load();
    };

    audio.oncanplay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);

      // Estimate active Ayah highlighting based on progress fraction
      if (audio.duration && currentSurah.ayahs.length > 0) {
        const fraction = audio.currentTime / audio.duration;
        const estIdx = Math.min(
          Math.floor(fraction * currentSurah.ayahs.length),
          currentSurah.ayahs.length - 1
        );
        if (estIdx !== activeAyahIndex) {
          setActiveAyahIndex(estIdx);
        }
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      if (selectedSurahNumber < 114) {
        // Option to continue to next surah
      }
    };

    audio.onerror = () => {
      candidateIdx++;
      tryLoad();
    };

    audioRef.current = audio;
    tryLoad();
  };

  // Play individual Ayah audio with highlighting
  const playAyahAudio = (index: number) => {
    if (isPlaying && activeAyahIndex === index && playbackMode === 'ayah') {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    stopPlayback();
    setActiveAyahIndex(index);
    setPlaybackMode('ayah');

    // Scroll active Ayah into view
    const el = ayahRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const ayah = currentSurah.ayahs[index];
    const candidates = getAyahAudioCandidates(selectedReciter, currentSurah.number, ayah.numberInSurah);
    let candidateIdx = 0;

    const audio = new Audio();
    audio.playbackRate = audioSpeed;

    const tryLoad = () => {
      if (candidateIdx >= candidates.length) {
        setIsPlaying(false);
        return;
      }
      audio.src = candidates[candidateIdx];
      audio.load();
    };

    audio.oncanplay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.onended = () => {
      // Advance to next Ayah automatically
      if (index + 1 < currentSurah.ayahs.length) {
        playAyahAudio(index + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.onerror = () => {
      candidateIdx++;
      tryLoad();
    };

    audioRef.current = audio;
    tryLoad();
  };

  const handleTogglePlay = () => {
    if (playbackMode === 'ayah') {
      playAyahAudio(activeAyahIndex);
    } else {
      playSurahAudio();
    }
  };

  const handleNextSurah = () => {
    if (selectedSurahNumber < 114) {
      handleSwitchSurah(selectedSurahNumber + 1);
    }
  };

  const handlePrevSurah = () => {
    if (selectedSurahNumber > 1) {
      handleSwitchSurah(selectedSurahNumber - 1);
    }
  };

  const handleNextAyah = () => {
    if (activeAyahIndex + 1 < currentSurah.ayahs.length) {
      const nextIdx = activeAyahIndex + 1;
      setActiveAyahIndex(nextIdx);
      if (isPlaying) playAyahAudio(nextIdx);
    }
  };

  const handlePrevAyah = () => {
    if (activeAyahIndex > 0) {
      const prevIdx = activeAyahIndex - 1;
      setActiveAyahIndex(prevIdx);
      if (isPlaying) playAyahAudio(prevIdx);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleBookmark = (ayahNumber: number) => {
    setBookmarkedAyahs(prev => 
      prev.includes(ayahNumber) ? prev.filter(n => n !== ayahNumber) : [...prev, ayahNumber]
    );
  };

  const handleCopyAyah = (ayah: Ayah) => {
    const text = `${ayah.text} ﴿${ayah.numberInSurah}﴾\n— سورة ${currentSurah.name}`;
    navigator.clipboard?.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Top 4 Sheikhs specified by the user
  const topFourSheikhs = RECITERS.slice(0, 4);

  const getFontSizeClass = () => {
    if (fontSizeLevel === 'normal') return 'text-xl leading-[2.3]';
    if (fontSizeLevel === 'xlarge') return 'text-3xl sm:text-4xl leading-[2.5]';
    return 'text-2xl sm:text-3xl leading-[2.4]';
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-10 select-none font-arabic">
      
      {/* Background Ornaments */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192A] via-[#07111E] to-[#040810] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col h-full px-3 pt-1">
        
        {/* Top Header: Navigation & Surah Title */}
        <div className="flex items-center justify-between py-1.5 border-b border-[#D4AF37]/25">
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onNavigate('home')}
              className="w-8 h-8 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
              title="باشبەتكە قايتىش"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Previous Surah button */}
            <button 
              onClick={handlePrevSurah}
              disabled={selectedSurahNumber <= 1}
              className={`w-7 h-7 rounded-full bg-[#0D1E30] border flex items-center justify-center text-xs transition-all ${
                selectedSurahNumber <= 1 
                  ? 'opacity-30 border-white/10 text-gray-500 cursor-not-allowed' 
                  : 'border-[#D4AF37]/30 text-[#FFEAA7] hover:border-[#D4AF37] cursor-pointer'
              }`}
              title="ئالدىنقى سۈرە"
            >
              ◀
            </button>
          </div>

          {/* Surah Title & Picker Trigger */}
          <div 
            onClick={() => setShowSurahPickerModal(true)}
            className="text-center cursor-pointer px-2 py-0.5 rounded-xl hover:bg-white/5 transition-all"
            title="114 سۈرىدىن تاللاش"
          >
            <div className="flex items-center justify-center gap-1">
              <h2 className="text-xl font-bold font-quran gold-text tracking-wide">
                {currentSurah.name}
              </h2>
              <span className="text-[10px] text-[#D4AF37]">▼</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <span className="text-[#E5C378] font-bold">({currentSurah.nameUg})</span>
              <span>•</span>
              <span>{currentSurah.numberOfAyahs} ئايەت</span>
              <span>•</span>
              <span>{currentSurah.revelationType === 'Meccan' ? 'مەككىي' : 'مەدەنىي'}</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1">
            {/* Next Surah button */}
            <button 
              onClick={handleNextSurah}
              disabled={selectedSurahNumber >= 114}
              className={`w-7 h-7 rounded-full bg-[#0D1E30] border flex items-center justify-center text-xs transition-all ${
                selectedSurahNumber >= 114 
                  ? 'opacity-30 border-white/10 text-gray-500 cursor-not-allowed' 
                  : 'border-[#D4AF37]/30 text-[#FFEAA7] hover:border-[#D4AF37] cursor-pointer'
              }`}
              title="كېيىنكى سۈرە"
            >
              ▶
            </button>

            {/* 114 Surahs list button */}
            <button 
              onClick={() => onNavigate('surahs')}
              className="w-8 h-8 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
              title="114 سۈرە تىزىملىكى"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dedicated Banner for "ئەڭ مۇڭ تىلاۋەتلەر" (Abdulaziz Suhaim & Sherif Mostafa) */}
        <div 
          onClick={() => onNavigate('melodic-recitations')}
          className="my-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#142B47] via-[#0E2238] to-[#142B47] border border-[#D4AF37]/40 flex items-center justify-between cursor-pointer hover:border-[#D4AF37] transition-all shadow-sm group"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <div className="text-right">
              <div className="text-xs font-bold text-[#FFEAA7] flex items-center gap-1">
                <span>🎙️</span>
                <span>ئەڭ مۇڭ تىلاۋەتلەر بۆلىكى</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D4AF37]/20 text-[#FFDF88]">نادىر</span>
              </div>
              <div className="text-[10px] text-gray-300">
                الشيخ عبدالعزيز سحيم & شريف مصطفى نىڭ تاللانغان ئاۋازلىرى
              </div>
            </div>
          </div>
          <span className="text-xs text-[#D4AF37] group-hover:translate-x-[-3px] transition-transform">
            ◀ ئېچىش
          </span>
        </div>

        {/* 4 Prioritized Sheikhs Quick-Selector Bar (الشيخ رعد الكردي, اسلام صبحي, عبدالرحمن مسعد, الشيخ محمد اللحيدان) */}
        <div className="mb-1.5">
          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 px-1">
            <span className="text-[#FFEAA7] font-bold flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-[#D4AF37]" />
              <span>قۇرئان تاللانغان 4 شەيخى (ئاۋازلىق تىلاۋەت):</span>
            </span>
            <button 
              onClick={() => setShowReciterModal(true)}
              className="text-[#D4AF37] hover:underline cursor-pointer"
            >
              ھەممىسى (22 قارىي) &gt;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            {topFourSheikhs.map((sheikh) => {
              const isSelected = selectedReciter.id === sheikh.id;
              return (
                <button
                  key={sheikh.id}
                  onClick={() => {
                    setSelectedReciter(sheikh);
                    if (isPlaying) {
                      stopPlayback();
                    }
                  }}
                  className={`px-2 py-1 rounded-xl text-right transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#102947] border border-[#D4AF37] text-[#FFEAA7] font-bold shadow-sm'
                      : 'bg-[#09182A] border border-white/5 hover:border-[#D4AF37]/30 text-gray-300'
                  }`}
                  dir="rtl"
                >
                  <div className="truncate">
                    <div className="text-[11px] truncate">{sheikh.nameAr}</div>
                    <div className="text-[9px] text-gray-400 truncate">{sheikh.nameUg}</div>
                  </div>
                  {isSelected && <Check className="w-3 h-3 text-[#D4AF37] shrink-0 mr-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quran Mushaf Frame: Pure Arabic Text with Golden Ayah Marks (No Uyghur translation) */}
        <div className="relative my-1 p-3.5 rounded-3xl bg-[#091728]/95 border-2 border-[#D4AF37]/55 shadow-[0_0_25px_rgba(212,175,55,0.15)] flex-1 overflow-y-auto max-h-[48vh]">
          
          {/* Inner Golden Border */}
          <div className="absolute inset-1 rounded-[22px] border border-[#D4AF37]/25 pointer-events-none" />
          
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 text-[#D4AF37]/70 text-xs select-none">❖</div>
          <div className="absolute top-2 right-2 text-[#D4AF37]/70 text-xs select-none">❖</div>
          <div className="absolute bottom-2 left-2 text-[#D4AF37]/70 text-xs select-none">❖</div>
          <div className="absolute bottom-2 right-2 text-[#D4AF37]/70 text-xs select-none">❖</div>

          {/* Surah Basmalah */}
          {currentSurah.number !== 9 && (
            <div className="relative my-1 text-center">
              <div className="inline-block px-5 py-1 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent">
                <span className="text-lg sm:text-xl font-quran text-[#FFEAA7] tracking-wider drop-shadow-sm">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
              </div>
            </div>
          )}

          {/* Verses Container: Pure Arabic Uthmani Script */}
          <div className="space-y-3 py-1.5 text-justify" dir="rtl">
            {currentSurah.ayahs.map((ayah, idx) => {
              const isCurrent = idx === activeAyahIndex;
              const isBookmarked = bookmarkedAyahs.includes(ayah.numberInSurah);
              const isAyahPlaying = isCurrent && isPlaying;

              return (
                <div 
                  key={ayah.numberInSurah || idx}
                  ref={(el) => (ayahRefs.current[idx] = el)}
                  className={`p-2.5 rounded-2xl transition-all ${
                    isCurrent 
                      ? 'bg-[#15324D]/75 border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {/* Pure Arabic Text with Golden Ayah Number ﴿١﴾ */}
                  <div className={`text-right font-quran text-[#F8FAFC] tracking-normal ${getFontSizeClass()}`}>
                    <span>{ayah.text}</span>
                    
                    {/* Golden Ayah Symbol */}
                    <span 
                      onClick={() => playAyahAudio(idx)}
                      className="inline-flex items-center justify-center mx-1.5 px-2 py-0.5 rounded-full bg-[#183654] border border-[#D4AF37] text-[#FFDF88] text-xs font-mono font-bold align-middle shadow-sm cursor-pointer hover:scale-110 transition-transform"
                      title="بۇ ئايەتنى ئاڭلاش"
                    >
                      ﴿{ayah.numberInSurah}﴾
                    </span>
                  </div>

                  {/* Individual Ayah Controls (Listen, Bookmark, Copy) */}
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 text-[11px] text-gray-400">
                    
                    {/* Listen to this single Ayah */}
                    <button 
                      onClick={() => playAyahAudio(idx)}
                      className={`flex items-center gap-1 transition-colors cursor-pointer ${
                        isAyahPlaying ? 'text-[#4ADE80] font-bold' : 'hover:text-[#FFEAA7]'
                      }`}
                    >
                      {isAyahPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>ئوقۇلۇۋاتىدۇ...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>ئاڭلاش</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-3">
                      {/* Copy Arabic text */}
                      <button 
                        onClick={() => handleCopyAyah(ayah)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        title="ئايەتنى كۆچۈرۈش"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>كۆچۈرۈش</span>
                      </button>

                      {/* Bookmark Ayah */}
                      <button 
                        onClick={() => toggleBookmark(ayah.numberInSurah)}
                        className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors cursor-pointer"
                        title="خەتكۈش"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-3 h-3 text-[#D4AF37]" />
                        ) : (
                          <Bookmark className="w-3 h-3" />
                        )}
                        <span>{isBookmarked ? 'ساقلاندى' : 'خەتكۈش'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Audio Player Bar */}
        <div className="bg-[#0A1C30]/95 border border-[#D4AF37]/50 rounded-2xl p-2.5 shadow-xl backdrop-blur-md">
          
          {/* Progress Slider and Time */}
          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 px-1">
            <span className="font-mono text-[#D4AF37]">
              {playbackMode === 'ayah' 
                ? `ئايەت ${activeAyahIndex + 1} / ${currentSurah.ayahs.length}`
                : formatTime(currentTime)
              }
            </span>

            <input 
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 mx-2.5 h-1.5 bg-[#06101B] rounded-full accent-[#D4AF37] cursor-pointer"
            />

            <span className="font-mono text-[#FFDF88]">
              {formatTime(duration) || '00:00'}
            </span>
          </div>

          {/* Playback Controls and Active Reciter Info */}
          <div className="flex items-center justify-between px-1" dir="rtl">
            
            {/* Active Reciter Info */}
            <div 
              onClick={() => setShowReciterModal(true)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity max-w-[45%]"
              title="قارىينى ئالماشتۇرۇش"
            >
              <div className="w-7 h-7 rounded-full bg-[#10243B] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFEAA7] shrink-0">
                <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <div className="truncate text-right">
                <div className="text-xs font-bold text-white truncate">
                  {selectedReciter.nameAr}
                </div>
                <div className="text-[9px] text-[#D4AF37] truncate">
                  {playbackMode === 'surah' ? 'سۈرە تىلاۋىتى' : `ئايەت ${activeAyahIndex + 1}`}
                </div>
              </div>
            </div>

            {/* Playback Buttons */}
            <div className="flex items-center gap-1.5">
              
              {/* Previous Ayah button */}
              <button 
                onClick={handlePrevAyah}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300"
                title="ئالدىنقى ئايەت"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              {/* Main Play/Pause Button */}
              <button 
                onClick={handleTogglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-[#07111E] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
                title={isPlaying ? 'توختىتىش' : 'ئوينىتىش'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current mr-0.5" />
                )}
              </button>

              {/* Next Ayah button */}
              <button 
                onClick={handleNextAyah}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300"
                title="كېيىنكى ئايەت"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              {/* Font Size Toggle */}
              <button
                onClick={() => {
                  setFontSizeLevel(prev => prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal');
                }}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#FFEAA7]"
                title="خەت چوڭلۇقى"
              >
                A±
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Copy Notification Toast */}
      {copiedNotification && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#D4AF37] text-[#07111E] font-bold text-xs px-4 py-1.5 rounded-full shadow-lg">
          ئايەت تېكىستى كۆچۈرۈلدى
        </div>
      )}

      {/* Surah Picker Modal (All 114 Surahs Instant Selection) */}
      {showSurahPickerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-[#0A1A2E] border border-[#D4AF37]/50 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col p-4 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm font-bold text-[#FFEAA7] font-quran">
                114 سۈرە تىزىملىكىدىن تاللاش
              </span>
              <button 
                onClick={() => setShowSurahPickerModal(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Surah Search input */}
            <div className="relative my-2.5">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                value={surahSearchTerm}
                onChange={(e) => setSurahSearchTerm(e.target.value)}
                placeholder="سۈرە ئىسمى ياكى نومۇرىنى ئىزدەش (1-114)..."
                className="w-full bg-[#061220] border border-[#D4AF37]/30 rounded-xl px-3 pr-9 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                dir="rtl"
              />
            </div>

            {/* Surah List */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 max-h-96">
              {ALL_114_SURAHS_META.filter(s => 
                !surahSearchTerm ||
                s.name.includes(surahSearchTerm) ||
                s.nameUg.includes(surahSearchTerm) ||
                String(s.number) === surahSearchTerm
              ).map((s) => (
                <button
                  key={s.number}
                  onClick={() => handleSwitchSurah(s.number)}
                  className={`w-full text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    selectedSurahNumber === s.number
                      ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#102947] border border-[#D4AF37] text-[#FFEAA7] font-bold'
                      : 'hover:bg-white/5 text-gray-200 border border-transparent'
                  }`}
                  dir="rtl"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#10243B] border border-[#D4AF37]/30 flex items-center justify-center font-mono text-[10px] text-[#D4AF37]">
                      {s.number}
                    </span>
                    <div>
                      <div className="font-bold text-sm font-quran text-white">{s.name}</div>
                      <div className="text-[10px] text-gray-400">{s.nameUg}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {s.ayahs} ئايەت
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Reciter Picker Modal (Full 22 Reciters) */}
      {showReciterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-[#0A1A2E] border border-[#D4AF37]/50 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col p-4 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm font-bold text-[#FFEAA7] flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                <span>قۇرئان قارىلىرىنى تاللاش (22 قارىي):</span>
              </span>
              <button 
                onClick={() => setShowReciterModal(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Reciter List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 mt-3 max-h-96">
              {RECITERS.map((r, idx) => {
                const isSelected = selectedReciter.id === r.id;
                const isTopFour = idx < 4;

                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedReciter(r);
                      setShowReciterModal(false);
                      if (isPlaying) {
                        stopPlayback();
                      }
                    }}
                    className={`w-full text-right px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#102947] border border-[#D4AF37] text-[#FFEAA7] font-bold'
                        : 'hover:bg-white/5 text-gray-200 border border-white/5'
                    }`}
                    dir="rtl"
                  >
                    <div className="flex-1 text-right">
                      <div className="font-bold text-sm text-white flex items-center gap-1.5">
                        <span>{r.nameAr}</span>
                        {isTopFour && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFDF88]">
                            تاللانغان
                          </span>
                        )}
                        {isSelected && <span className="text-[10px] text-emerald-400 font-mono">● تاللاندى</span>}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {lang === 'ug' ? r.nameUg : r.nameEn}
                      </div>
                      {(r.styleUg || r.styleAr) && (
                        <div className="text-[9px] text-[#D4AF37]/90 mt-0.5">
                          ✨ {lang === 'ug' ? r.styleUg : r.styleAr}
                        </div>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mr-2" />}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
