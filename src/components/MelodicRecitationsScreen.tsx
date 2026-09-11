import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  Search, 
  BookOpen, 
  Sparkles, 
  Radio, 
  Share2, 
  Check, 
  Music,
  RotateCcw,
  SkipForward,
  SkipBack
} from 'lucide-react';
import { MELODIC_RECITATIONS, MelodicRecitationItem } from '../data/melodicRecitationsData';
import { ActiveScreen, Language } from '../types';

interface MelodicRecitationsScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onSelectSurah?: (surahNumber: number) => void;
  lang?: Language;
}

export const MelodicRecitationsScreen: React.FC<MelodicRecitationsScreenProps> = ({
  onNavigate,
  onSelectSurah,
  lang = 'ug'
}) => {
  const [filterReciter, setFilterReciter] = useState<'all' | 'abdulaziz_suhaim' | 'sherif_mostafa'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTrack, setCurrentTrack] = useState<MelodicRecitationItem>(MELODIC_RECITATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playTrack = (track: MelodicRecitationItem) => {
    if (currentTrack.id === track.id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    setCurrentTrack(track);
    setIsLoading(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio();
    const candidateUrls = [track.audioUrl, ...(track.fallbackUrls || [])];
    let urlIdx = 0;

    const tryLoad = () => {
      if (urlIdx >= candidateUrls.length) {
        setIsLoading(false);
        setIsPlaying(false);
        return;
      }
      audio.src = candidateUrls[urlIdx];
      audio.load();
    };

    audio.oncanplay = () => {
      setIsLoading(false);
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
      setIsPlaying(false);
      // Auto play next track
      handleNextTrack(track);
    };

    audio.onerror = () => {
      urlIdx++;
      tryLoad();
    };

    audioRef.current = audio;
    tryLoad();
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) {
      playTrack(currentTrack);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleNextTrack = (fromTrack?: MelodicRecitationItem) => {
    const baseTrack = fromTrack || currentTrack;
    const filtered = getFilteredTracks();
    const curIdx = filtered.findIndex(t => t.id === baseTrack.id);
    const nextIdx = (curIdx + 1) % filtered.length;
    playTrack(filtered[nextIdx]);
  };

  const handlePrevTrack = () => {
    const filtered = getFilteredTracks();
    const curIdx = filtered.findIndex(t => t.id === currentTrack.id);
    const prevIdx = (curIdx - 1 + filtered.length) % filtered.length;
    playTrack(filtered[prevIdx]);
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

  const getFilteredTracks = () => {
    return MELODIC_RECITATIONS.filter(item => {
      const matchReciter = filterReciter === 'all' || item.reciterId === filterReciter;
      const matchSearch = 
        !searchTerm || 
        item.surahNameAr.includes(searchTerm) || 
        item.surahNameUg.includes(searchTerm) || 
        item.titleAr.includes(searchTerm) || 
        item.titleUg.includes(searchTerm) || 
        item.reciterNameAr.includes(searchTerm) || 
        item.reciterNameUg.includes(searchTerm);
      return matchReciter && matchSearch;
    });
  };

  const handleOpenInReader = (surahNum: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (onSelectSurah) {
      onSelectSurah(surahNum);
    }
    onNavigate('quran-reader');
  };

  const handleShare = (track: MelodicRecitationItem) => {
    const shareText = `🎙️ ${track.titleUg} (${track.surahNameUg})\nقارىي: ${track.reciterNameUg}\n\nقۇرئان كەرىم ئەڭ مۇڭ تىلاۋەتلەر بۆلىكى`;
    navigator.clipboard?.writeText(shareText);
    setCopiedId(track.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredList = getFilteredTracks();

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-24 font-arabic select-none">
      
      {/* Background Ornaments */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192A] via-[#07111E] to-[#040810] pointer-events-none" />
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col h-full px-3.5 pt-2">
        
        {/* Header */}
        <div className="flex items-center justify-between py-2 border-b border-[#D4AF37]/25">
          <button 
            onClick={() => onNavigate('quran-reader')}
            className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
            title="قۇرئانغا قايتىش"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FFEAA7] text-[10px] font-bold mb-0.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>{lang === 'ug' ? 'نادىر مەخسۇس بۆلەك' : 'قسم مختار ونادر'}</span>
            </div>
            <h2 className="text-lg font-bold font-quran gold-text tracking-wide">
              {lang === 'ug' ? 'ئەڭ مۇڭ ۋە تەسىرلىك تىلاۋەتلەر' : 'أروع التلاوات الخاشعة والمؤثرة'}
            </h2>
            <p className="text-[10px] text-gray-400">
              {lang === 'ug' ? 'الشيخ عبدالعزيز سحيم • القارئ شريف مصطفى' : 'الشيخ عبد العزيز سحيم & شريف مصطفى'}
            </p>
          </div>

          <button 
            onClick={() => onNavigate('surahs')}
            className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
            title="114 سۈرە تىزىملىكى"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills for the Two Featured Sheikhs */}
        <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterReciter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterReciter === 'all'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-[#07111E] shadow-md'
                : 'bg-[#0E2138] border border-white/10 text-gray-300 hover:text-white'
            }`}
          >
            {lang === 'ug' ? 'بارلىق تىلاۋەتلەر' : 'جميع التلاوات'}
          </button>
          
          <button
            onClick={() => setFilterReciter('abdulaziz_suhaim')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              filterReciter === 'abdulaziz_suhaim'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-[#07111E] shadow-md'
                : 'bg-[#0E2138] border border-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <span>🎙️</span>
            <span>الشيخ عبد العزيز سحيم</span>
          </button>

          <button
            onClick={() => setFilterReciter('sherif_mostafa')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              filterReciter === 'sherif_mostafa'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-[#07111E] shadow-md'
                : 'bg-[#0E2138] border border-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <span>🎙️</span>
            <span>القارئ شريف مصطفى</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-2">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder={lang === 'ug' ? 'سۈرە، ئاۋاز ياكى ماۋزۇ ئىزدەش...' : 'ابحث عن سورة أو تلاوة خاشعة...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-9 py-2 rounded-xl bg-[#061220] border border-[#D4AF37]/30 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            dir="rtl"
          />
        </div>

        {/* Recitations List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 pb-20 max-h-[55vh]">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              {lang === 'ug' ? 'ماس كېلىدىغان تىلاۋەت تېپىلمىدى.' : 'لا توجد تلاوات مطابقة للبحث.'}
            </div>
          ) : (
            filteredList.map((track) => {
              const isCurrent = currentTrack.id === track.id;
              const isTrackPlaying = isCurrent && isPlaying;

              return (
                <div 
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent 
                      ? 'bg-gradient-to-r from-[#142B47] to-[#0A1A2E] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.18)]' 
                      : 'bg-[#091728]/80 hover:bg-[#0E2138] border-white/5 hover:border-[#D4AF37]/30'
                  }`}
                  dir="rtl"
                >
                  <div className="flex items-start justify-between gap-2.5">
                    
                    {/* Play Button Icon */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrack(track);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isTrackPlaying
                          ? 'bg-[#D4AF37] text-[#07111E] scale-105 shadow-md shadow-[#D4AF37]/30'
                          : 'bg-[#10243B] text-[#FFEAA7] border border-[#D4AF37]/40 hover:scale-105'
                      }`}
                    >
                      {isTrackPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current mr-0.5" />
                      )}
                    </button>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-bold text-white font-quran">
                          {track.surahNameAr}
                        </span>
                        <span className="text-xs text-[#FFEAA7] font-arabic">
                          ({track.surahNameUg})
                        </span>
                        <span className="px-1.5 py-0.2 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFDF88] text-[9px]">
                          {track.tagAr}
                        </span>
                      </div>

                      <div className="text-[11px] font-bold text-[#38BDF8] mb-0.5 flex items-center gap-1">
                        <span>🎙️ {track.reciterNameAr}</span>
                        <span className="text-gray-400 text-[10px]">({track.reciterNameUg})</span>
                      </div>

                      <p className="text-[10px] text-gray-400 line-clamp-1">
                        {lang === 'ug' ? track.descriptionUg : track.titleAr}
                      </p>
                    </div>

                    {/* Duration & Surah badge */}
                    <div className="flex flex-col items-end shrink-0 text-left">
                      <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                        {track.duration}
                      </span>
                      <span className="text-[9px] text-gray-500 font-mono mt-0.5">
                        #{track.surahNumber}
                      </span>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5 text-[10px] text-gray-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenInReader(track.surahNumber);
                      }}
                      className="flex items-center gap-1 text-[#FFEAA7] hover:underline cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                      <span>{lang === 'ug' ? 'قۇرئاندا كۆرۈپ ئوقۇش' : 'فتح وقراءة السورة في المصحف'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(track);
                        }}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        title="ھەمبەھىرلەش"
                      >
                        {copiedId === track.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3 h-3" />
                        )}
                        <span>{copiedId === track.id ? 'كۆچۈرۈلدى' : 'ھەمبەھىر'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Floating Bottom Sticky Audio Player */}
      {currentTrack && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#09182A]/98 border-t-2 border-[#D4AF37]/50 p-2.5 shadow-2xl backdrop-blur-xl">
          
          {/* Progress Slider */}
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1 px-1">
            <span className="text-[#D4AF37]">{formatTime(currentTime)}</span>
            <input 
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 mx-2.5 h-1 bg-[#06101B] rounded-full accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-gray-400">{formatTime(duration) || currentTrack.duration}</span>
          </div>

          {/* Controls and Track Info */}
          <div className="flex items-center justify-between px-1" dir="rtl">
            
            {/* Info */}
            <div className="flex items-center gap-2 min-w-0 max-w-[55%]">
              <div className="w-8 h-8 rounded-full bg-[#10243B] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFEAA7] shrink-0">
                <Music className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="truncate text-right">
                <div className="text-xs font-bold text-white truncate font-quran">
                  {currentTrack.surahNameAr} ({currentTrack.surahNameUg})
                </div>
                <div className="text-[10px] text-[#D4AF37] truncate">
                  {currentTrack.reciterNameAr}
                </div>
              </div>
            </div>

            {/* Main playback buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevTrack}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
                title="ئالدىنقىسى"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={handleTogglePlay}
                disabled={isLoading}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-[#07111E] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-[#07111E] border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current mr-0.5" />
                )}
              </button>

              <button 
                onClick={() => handleNextTrack()}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
                title="كېيىنكىسى"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleOpenInReader(currentTrack.surahNumber)}
                className="px-2.5 py-1 rounded-xl bg-[#142B47] border border-[#D4AF37]/40 text-[#FFEAA7] text-[10px] font-bold flex items-center gap-1 hover:border-[#D4AF37]"
                title="قۇرئاندا ئېچىش"
              >
                <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden sm:inline">ئوقۇش</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
