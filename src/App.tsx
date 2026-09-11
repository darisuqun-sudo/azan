import React, { useState } from 'react';
import { 
  Smartphone, 
  Layers, 
  FileCode2, 
  Settings, 
  Moon,
  Globe,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Check
} from 'lucide-react';
import { ActiveScreen, CityLocation, Language } from './types';
import { CITIES } from './data/prayersData';
import { PhoneFrame } from './components/PhoneFrame';
import { HomeScreen } from './components/HomeScreen';
import { QuranReaderScreen } from './components/QuranReaderScreen';
import { AzanAlertScreen } from './components/AzanAlertScreen';
import { SurahListScreen } from './components/SurahListScreen';
import { TasbihScreen } from './components/TasbihScreen';
import { QiblaCompassScreen } from './components/QiblaCompassScreen';
import { HijriCalendarScreen } from './components/HijriCalendarScreen';
import { HadithScreen } from './components/HadithScreen';
import { DuasScreen } from './components/DuasScreen';
import { KhatamScreen } from './components/KhatamScreen';
import { QazaScreen } from './components/QazaScreen';
import { ZakatScreen } from './components/ZakatScreen';
import { TajweedScreen } from './components/TajweedScreen';
import { RamadanScreen } from './components/RamadanScreen';
import { NamesScreen } from './components/NamesScreen';
import { HalalScreen } from './components/HalalScreen';
import { AsmaulHusnaScreen } from './components/AsmaulHusnaScreen';
import { WidgetsScreen } from './components/WidgetsScreen';
import { MoreScreen } from './components/MoreScreen';
import { HifzScreen } from './components/HifzScreen';
import { AyahCardScreen } from './components/AyahCardScreen';
import { IslamicAiScreen } from './components/IslamicAiScreen';
import { ProphetsScreen } from './components/ProphetsScreen';
import { QuizScreen } from './components/QuizScreen';
import { WuduSalahGuideScreen } from './components/WuduSalahGuideScreen';
import { SunnahHabitsScreen } from './components/SunnahHabitsScreen';
import { MosqueLocatorScreen } from './components/MosqueLocatorScreen';
import { MelodicRecitationsScreen } from './components/MelodicRecitationsScreen';
import { AndroidPlanModal } from './components/AndroidPlanModal';
import { SettingsModal } from './components/SettingsModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { AppIconBadge, GlowingFanoosLantern } from './components/IslamicArtwork';
import { soundService } from './utils/audioPlayer';
import { useTranslation } from './utils/i18n';
import { Download } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'3-phones' | 'single-interactive'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'single-interactive';
    }
    return '3-phones';
  });
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedCity, setSelectedCity] = useState<CityLocation>(CITIES[0]); // Cairo by default as in image
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(2); // Surah Al-Baqarah
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [lang, setLang] = useState<Language>('ug');
  const [mosqueMode, setMosqueMode] = useState<boolean>(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);

  const { t } = useTranslation(lang);

  const handleNavigate = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    if (viewMode === '3-phones' && screen !== 'home' && screen !== 'quran-reader' && screen !== 'azan-alert') {
      setViewMode('single-interactive');
    }
  };

  const handleSelectSurah = (surahNum: number) => {
    setSelectedSurahNumber(surahNum);
    setActiveScreen('quran-reader');
  };

  const toggleMosqueMode = () => {
    setMosqueMode(prev => {
      const next = !prev;
      if (next) {
        soundService.stopAll();
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#040912] text-[#E2E8F0] flex flex-col font-arabic select-none relative overflow-x-hidden">
      
      {/* Ambient Islamic Mosque & Golden Stars Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Background Mosque Skyline at top */}
        <div className="absolute top-0 inset-x-0 h-[450px] opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80" 
            alt="Mosque background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top filter brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040912]/80 to-[#040912]" />
        </div>

        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#16A34A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[300px] bg-[#3B82F6]/5 rounded-full blur-[100px]" />
      </div>

      {/* Top Universal Control Bar */}
      <header className="relative z-30 border-b border-[#D4AF37]/20 bg-[#071322]/95 backdrop-blur-xl px-4 py-2 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFEAA7] via-[#D4AF37] to-[#8A6305] p-[1.5px] shadow-[0_0_18px_rgba(212,175,55,0.35)] shrink-0">
              <div className="w-full h-full bg-[#07111E] rounded-[14px] flex items-center justify-center text-[#FFDF88]">
                <Moon className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,223,136,0.6)]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-quran gold-text tracking-wide drop-shadow">
                  {t('appName')}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-950/80 to-[#0A261E] border border-emerald-500/40 text-[10px] text-emerald-300 font-sans font-bold shadow-sm">
                  {t('proBadge')}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-arabic">
                {t('appSuiteDesc')}
              </p>
            </div>
          </div>

          {/* Mode Switcher & Language Selector ONLY */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* View Mode Toggle: 3 Phones vs Single Interactive Phone */}
            <div className="flex bg-[#050F1A] p-0.5 rounded-xl border border-[#D4AF37]/25 text-xs shadow-inner">
              <button
                onClick={() => setViewMode('3-phones')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === '3-phones' 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold shadow-md' 
                    : 'text-gray-300 hover:text-white'
                }`}
                title={t('threePhonesMode')}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('threePhonesMode')}</span>
              </button>

              <button
                onClick={() => setViewMode('single-interactive')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'single-interactive' 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold shadow-md' 
                    : 'text-gray-300 hover:text-white'
                }`}
                title={t('interactiveMode')}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('interactiveMode')}</span>
              </button>
            </div>

            {/* Install App Button */}
            <button
              onClick={() => setIsInstallOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-[#D4AF37] to-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
              title="تېلېفونغا قاچىلاش / Install App"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">قاچىلاش (Install)</span>
              <span className="sm:hidden text-[11px]">قاچىلاش</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="btn-header-language"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#091829] border border-[#D4AF37]/35 text-xs text-[#FFEAA7] flex items-center gap-1.5 hover:border-[#D4AF37] transition-all cursor-pointer font-bold shadow-sm shrink-0"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] sm:text-xs font-arabic">{lang === 'ug' ? 'ئۇيغۇرچە' : lang === 'ar' ? 'العربية' : lang === 'tr' ? 'Türkçe' : 'English'}</span>
                <span className="text-[9px] text-[#D4AF37]">▼</span>
              </button>

              {showLanguageDropdown && (
                <>
                  {/* Backdrop to dismiss on tap anywhere */}
                  <div 
                    className="fixed inset-0 z-40 bg-black/20" 
                    onClick={() => setShowLanguageDropdown(false)} 
                  />

                  {/* Dropdown Menu - Perfectly anchored so it never clips on mobile or RTL */}
                  <div 
                    className={`absolute top-full mt-1.5 ${
                      lang === 'ug' || lang === 'ar' 
                        ? 'left-0 sm:left-auto sm:right-0' 
                        : 'right-0 sm:right-auto sm:left-0'
                    } bg-[#0A1A2E] border border-[#D4AF37]/60 rounded-2xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.85)] z-50 min-w-[150px] w-max max-w-[calc(100vw-24px)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 font-arabic`}
                    dir={lang === 'ug' || lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="px-2.5 py-1 text-[10px] font-bold text-[#D4AF37] border-b border-white/10 mb-1 flex items-center justify-between">
                      <span>{lang === 'ug' ? 'تىل تاللاش' : lang === 'ar' ? 'اختيار اللغة' : lang === 'tr' ? 'Dil Seçimi' : 'Select Language'}</span>
                      <span className="text-[8px] text-gray-400">🌐</span>
                    </div>
                    {[
                      { code: 'ug', label: 'ئۇيغۇرچە', sub: 'ئۇيغۇر تىلى' },
                      { code: 'ar', label: 'العربية', sub: 'اللغة العربية' },
                      { code: 'tr', label: 'Türkçe', sub: 'Türkçe' },
                      { code: 'en', label: 'English', sub: 'English' }
                    ].map(item => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code as Language);
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full px-2.5 py-1.5 text-xs rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                          lang === item.code 
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold shadow-sm' 
                            : 'text-gray-200 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex flex-col text-start">
                          <span className="font-bold leading-tight">{item.label}</span>
                          <span className={`text-[9px] ${lang === item.code ? 'text-black/80 font-medium' : 'text-gray-400'}`}>
                            {item.sub}
                          </span>
                        </div>
                        {lang === item.code && <Check className="w-3.5 h-3.5 text-black shrink-0 ms-2" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Main Workspace Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* MODE 1: 3 PHONES SHOWCASE (100% IDENTICAL TO UPLOADED IMAGE) */}
        {viewMode === '3-phones' ? (
          <div className="w-full max-w-7xl flex flex-col items-center relative">
            
            {/* Top Info Header Banner */}
            <div className="mb-3 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081728]/80 border border-[#D4AF37]/35 shadow-sm mb-2 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[11px] text-[#FFEAA7] font-bold tracking-wider font-arabic">
                  {t('topBannerBadge')}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white font-quran drop-shadow">
                {t('topBannerTitle')}
              </h2>
            </div>

            {/* 3 Mockup Phones Side-by-Side with Decorative Scene */}
            <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-5 xl:gap-7 my-2 py-4">
              
              {/* LEFT PHONE: Quran Reader Screen (سورة البقرة) */}
              <div className="w-full max-w-[340px] sm:max-w-[360px] h-[720px] transform lg:-rotate-1 lg:hover:rotate-0 transition-transform duration-300">
                <PhoneFrame time="05:28" className="h-full">
                  <QuranReaderScreen 
                    onNavigate={handleNavigate}
                    initialSurahNumber={selectedSurahNumber}
                    lang={lang}
                  />
                </PhoneFrame>
              </div>

              {/* CENTER PHONE (Main Hub): Home Screen (الرئيسية) */}
              <div className="w-full max-w-[350px] sm:max-w-[380px] h-[740px] z-20 transform lg:scale-105 transition-transform duration-300">
                <PhoneFrame time="05:28" className="h-full">
                  <HomeScreen 
                    onNavigate={handleNavigate}
                    selectedCity={selectedCity}
                    onSelectCity={setSelectedCity}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    onOpenPlan={() => setIsPlanOpen(true)}
                    activeScreen={activeScreen}
                    lang={lang}
                    mosqueMode={mosqueMode}
                  />
                </PhoneFrame>
              </div>

              {/* RIGHT PHONE: Azan Alert Screen (أذان المغرب) */}
              <div className="w-full max-w-[340px] sm:max-w-[360px] h-[720px] transform lg:rotate-1 lg:hover:rotate-0 transition-transform duration-300">
                <PhoneFrame time="05:28" className="h-full">
                  <AzanAlertScreen 
                    onNavigate={handleNavigate}
                    selectedCity={selectedCity}
                    onSelectCity={setSelectedCity}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    lang={lang}
                  />
                </PhoneFrame>
              </div>

              {/* FLOATING APP ICON */}
              <div className="absolute -bottom-4 left-2 lg:left-6 z-30 hidden sm:flex flex-col items-center">
                <AppIconBadge size={105} className="transform -rotate-6 hover:rotate-0 transition-transform cursor-pointer" />
                <span className="text-[11px] text-[#FFDF88] font-bold mt-2 bg-[#06101C]/90 px-3 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-lg">
                  {t('appIconLabel')}
                </span>
              </div>

              {/* FLOATING GLOWING FANOOS LANTERNS */}
              <div className="absolute -bottom-6 right-2 lg:right-6 z-30 hidden sm:flex items-end gap-3 pointer-events-none">
                <GlowingFanoosLantern size={70} className="transform rotate-3" />
                <GlowingFanoosLantern size={90} className="transform -rotate-2" />
              </div>

            </div>

            {/* Clean, Elegant Launcher Access for Desktop Showcase */}
            <div className="mt-8 flex flex-col items-center justify-center max-w-xl text-center px-4">
              <button
                onClick={() => { setActiveScreen('more'); setViewMode('single-interactive'); }}
                className="group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0C243E] via-[#102C4B] to-[#0A1D31] border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:border-[#D4AF37] transition-all cursor-pointer flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#A67C1E] flex items-center justify-center text-black font-bold shadow">
                  ✨
                </div>
                <div className="text-right" dir="rtl">
                  <span className="text-sm font-bold text-[#FFEAA7] block group-hover:text-white transition-colors">
                    {t('openFullDirectory')}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {t('directorySubtext')}
                  </span>
                </div>
              </button>
            </div>

          </div>
        ) : (
          /* MODE 2: SINGLE INTERACTIVE PHONE (Full Screen Dynamic Navigation) */
          <div className="w-full max-w-md h-[760px] my-auto">
            <PhoneFrame time="05:28" className="h-full">
              {activeScreen === 'home' && (
                <HomeScreen 
                  onNavigate={handleNavigate}
                  selectedCity={selectedCity}
                  onSelectCity={setSelectedCity}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                  onOpenPlan={() => setIsPlanOpen(true)}
                  activeScreen={activeScreen}
                  lang={lang}
                  mosqueMode={mosqueMode}
                />
              )}

              {activeScreen === 'quran-reader' && (
                <QuranReaderScreen 
                  onNavigate={handleNavigate}
                  initialSurahNumber={selectedSurahNumber}
                  lang={lang}
                />
              )}

              {activeScreen === 'azan-alert' && (
                <AzanAlertScreen 
                  onNavigate={handleNavigate}
                  selectedCity={selectedCity}
                  onSelectCity={setSelectedCity}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                  lang={lang}
                />
              )}

              {activeScreen === 'surahs' && (
                <SurahListScreen 
                  onNavigate={handleNavigate}
                  onSelectSurah={handleSelectSurah}
                />
              )}

              {activeScreen === 'khatam' && (
                <KhatamScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'qaza' && (
                <QazaScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'zakat' && (
                <ZakatScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'tajweed' && (
                <TajweedScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'ramadan' && (
                <RamadanScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'names' && (
                <NamesScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'halal' && (
                <HalalScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'asmaul-husna' && (
                <AsmaulHusnaScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'widgets' && (
                <WidgetsScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'hifz' && (
                <HifzScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'ayah-card' && (
                <AyahCardScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'islamic-ai' && (
                <IslamicAiScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'prophets' && (
                <ProphetsScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'quiz' && (
                <QuizScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'wudu-salah-guide' && (
                <WuduSalahGuideScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'sunnah-habits' && (
                <SunnahHabitsScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'mosque-locator' && (
                <MosqueLocatorScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'more' && (
                <MoreScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                  onLanguageChange={setLang}
                  mosqueMode={mosqueMode}
                  onToggleMosqueMode={toggleMosqueMode}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                />
              )}

              {activeScreen === 'tasbih' && (
                <TasbihScreen 
                  onNavigate={handleNavigate}
                />
              )}

              {activeScreen === 'qibla' && (
                <QiblaCompassScreen 
                  onNavigate={handleNavigate}
                  selectedCity={selectedCity}
                />
              )}

              {activeScreen === 'calendar' && (
                <HijriCalendarScreen 
                  onNavigate={handleNavigate}
                />
              )}

              {activeScreen === 'hadith' && (
                <HadithScreen 
                  onNavigate={handleNavigate}
                />
              )}

              {activeScreen === 'duas' && (
                <DuasScreen 
                  onNavigate={handleNavigate}
                  lang={lang}
                />
              )}

              {activeScreen === 'melodic-recitations' && (
                <MelodicRecitationsScreen 
                  onNavigate={handleNavigate}
                  onSelectSurah={handleSelectSurah}
                  lang={lang}
                />
              )}

              {(activeScreen === 'favorites' || activeScreen === 'search') && (
                <SurahListScreen 
                  onNavigate={handleNavigate}
                  onSelectSurah={handleSelectSurah}
                />
              )}
            </PhoneFrame>
          </div>
        )}

      </main>

      {/* Android Architecture & Development Plan Modal */}
      <AndroidPlanModal 
        isOpen={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
      />

      {/* App Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        lang={lang}
        onSelectLanguage={setLang}
      />

      {/* Install Guide Modal (PWA / Mobile) */}
      <InstallGuideModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        lang={lang}
      />

    </div>
  );
}
