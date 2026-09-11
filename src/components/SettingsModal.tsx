import React, { useState } from 'react';
import { Settings, MapPin, Volume2, Globe, Bell, Check, Sparkles, Play, Square, UserCheck } from 'lucide-react';
import { CityLocation, Language } from '../types';
import { CITIES, AZAN_VOICES } from '../data/prayersData';
import { soundService } from '../utils/audioPlayer';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: CityLocation;
  onSelectCity: (city: CityLocation) => void;
  lang?: Language;
  onSelectLanguage?: (lang: Language) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
  lang = 'ug',
  onSelectLanguage
}) => {
  const [activeVoiceId, setActiveVoiceId] = useState<string>(() => soundService.getCurrentAzanVoice().id);
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectVoice = (voiceId: string) => {
    setActiveVoiceId(voiceId);
    soundService.setSelectedAzanVoice(voiceId);
  };

  const handlePreviewVoice = (voiceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewingVoiceId === voiceId) {
      soundService.stopAll();
      setPreviewingVoiceId(null);
    } else {
      setPreviewingVoiceId(voiceId);
      soundService.playAzan(voiceId, () => {
        setPreviewingVoiceId(null);
      }, () => {
        setPreviewingVoiceId(null);
      });
    }
  };

  const handleClose = () => {
    soundService.stopAll();
    setPreviewingVoiceId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm font-arabic" dir="rtl">
      <div className="relative w-full max-w-md bg-[#09182A] border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D4AF37]/30 bg-[#0B1E34]">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base font-bold gold-text">ئەپ تەڭشەكلىرى (الإعدادات)</h2>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* Language Selection */}
          <div className="p-3 rounded-2xl bg-[#0F2238] border border-[#D4AF37]/35 shadow-inner">
            <label className="font-bold text-[#FFDF88] flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>تىل تاللاش (اختيار اللغة / Language):</span>
              </span>
              <span className="text-[10px] text-[#FFEAA7] bg-[#D4AF37]/20 px-2 py-0.5 rounded-full border border-[#D4AF37]/30 font-bold">
                {lang === 'ug' ? 'ئۇيغۇرچە' : lang === 'ar' ? 'العربية' : lang === 'tr' ? 'Türkçe' : 'English'}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { code: 'ug', label: 'ئۇيغۇرچە', sub: 'ئۇيغۇر تىلى' },
                { code: 'ar', label: 'العربية', sub: 'اللغة العربية' },
                { code: 'tr', label: 'Türkçe', sub: 'Türkçe' },
                { code: 'en', label: 'English', sub: 'English' }
              ].map(item => {
                const isSelected = (lang || 'ug') === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => onSelectLanguage && onSelectLanguage(item.code as Language)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black border-[#D4AF37] font-bold shadow-md'
                        : 'bg-[#071322] border-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-right flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{item.label}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-black/80 font-medium' : 'text-gray-400'}`}>
                        {item.sub}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-black shrink-0 mr-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Azan Voice / Muezzin Selection */}
          <div className="p-3 rounded-2xl bg-[#0F2238] border border-[#D4AF37]/30 shadow-inner">
            <label className="font-bold text-[#FFDF88] flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                <span>ئەزان ئاۋازى ۋە ئەزانچىنى تاللاش (اختيار المؤذن):</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                ھەقىقىي ئاۋاز
              </span>
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {AZAN_VOICES.map(voice => {
                const isSelected = activeVoiceId === voice.id;
                const isPreviewing = previewingVoiceId === voice.id;
                return (
                  <div
                    key={voice.id}
                    onClick={() => handleSelectVoice(voice.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37]/25 to-[#162E4A] border-[#D4AF37] text-white shadow-sm'
                        : 'bg-[#071322] border-white/5 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0 pr-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        isSelected ? 'bg-[#D4AF37] text-black font-bold' : 'bg-white/10 text-gray-400'
                      }`}>
                        {isSelected ? '✓' : '🕌'}
                      </div>
                      <div className="truncate text-right">
                        <div className="font-bold text-xs truncate text-[#FFEAA7]">{voice.nameUg}</div>
                        <div className="text-[10px] text-gray-400 truncate">{voice.muezzinUg}</div>
                      </div>
                    </div>

                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={(e) => handlePreviewVoice(voice.id, e)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1 shrink-0 transition-colors cursor-pointer ${
                        isPreviewing
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-[#193556] text-[#FFEAA7] hover:bg-[#224773] border border-[#D4AF37]/30'
                      }`}
                      title={isPreviewing ? 'توختىتىش' : 'سىناپ ئاڭلاش'}
                    >
                      {isPreviewing ? (
                        <>
                          <Square className="w-2.5 h-2.5 fill-current" />
                          <span>توختا</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>ئاڭلاش</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* City Selection */}
          <div className="p-3 rounded-2xl bg-[#0F2238] border border-white/10">
            <label className="font-bold text-[#FFDF88] flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>شەھەر ۋە جۇغراپىيەلىك ئورۇن (المدينة والموقع):</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {CITIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => onSelectCity(c)}
                  className={`p-2 rounded-xl text-right transition-colors cursor-pointer ${
                    selectedCity.id === c.id 
                      ? 'bg-[#D4AF37] text-black font-bold' 
                      : 'bg-[#071322] text-gray-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <div className="font-bold truncate">{c.nameAr}</div>
                  <div className="text-[10px] opacity-80 truncate">{c.nameUg} ({c.nameEn})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Method */}
          <div className="p-3 rounded-2xl bg-[#0F2238] border border-white/10">
            <label className="font-bold text-[#FFDF88] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>ناماز ۋاقتىنى ھېسابلاش ئۇسۇلى (طريقة الحساب):</span>
            </label>
            <div className="space-y-1.5">
              <div className="p-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFEAA7] font-bold flex items-center justify-between">
                <span>الهيئة المصرية العامة للمساحة (مىسىر ھېسابلاش ئۇسۇلى)</span>
                <Check className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="p-2 rounded-xl bg-[#071322] border border-white/5 text-gray-300">
                <span>جامعة أم القرى - مكة المكرمة (ئۇممۇل قۇرا مەككە)</span>
              </div>
              <div className="p-2 rounded-xl bg-[#071322] border border-white/5 text-gray-300">
                <span>رابطة العالم الإسلامي (مۇسلىم بىرلەشمىسى)</span>
              </div>
            </div>
          </div>

          {/* PWA Mobile Installation Section */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#0E2642] to-[#0A1A2E] border border-[#D4AF37]/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#FFEAA7]">📲 تېلېفونغا ئەپ قىلىپ قاچىلاش:</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
                PWA ئەپ
              </span>
            </div>
            <p className="text-[11px] text-gray-300">
              تېلېفونىڭىزنىڭ باش ئېكرانىغا قوشۇپ، ئايرىم تېلېفون پىروگراممىسى شەكلىدە راۋان ئىشلىتەلەيسىز.
            </p>
          </div>

          {/* Notification Alert Toggles */}
          <div className="p-3 rounded-2xl bg-[#0F2238] border border-white/10 space-y-2">
            <label className="font-bold text-[#FFDF88] flex items-center gap-1.5 mb-1">
              <Bell className="w-4 h-4 text-[#D4AF37]" />
              <span>ئەزان ۋە ئۇقتۇرۇش تەڭشىكى (تنبيهات الآذان):</span>
            </label>
            <div className="flex items-center justify-between py-1 text-gray-200">
              <span>ھەر ناماز ۋاقتىدا تولۇق ئەزان توۋلاش</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">ئوچۇق</span>
            </div>
            <div className="flex items-center justify-between py-1 text-gray-200">
              <span>ئەزاندىن 15 مىنۇت ئاۋۋال ئەسكەرتىش (تذكير قبل الأذان)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">ئوچۇق</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-[#0B1E34] text-center">
          <button 
            onClick={handleClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold text-xs cursor-pointer hover:brightness-110"
          >
            ساقلاپ چىقىش / تم
          </button>
        </div>

      </div>
    </div>
  );
};
