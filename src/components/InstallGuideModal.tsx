import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  Share, 
  PlusSquare, 
  MoreVertical, 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { Language } from '../types';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
  lang = 'ug'
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeDeviceTab, setActiveDeviceTab] = useState<'android' | 'ios' | 'pc'>('android');

  useEffect(() => {
    // Check if running in standalone PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Auto-detect device
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setActiveDeviceTab('ios');
    } else if (/android/i.test(userAgent)) {
      setActiveDeviceTab('android');
    } else {
      setActiveDeviceTab('pc');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // If no native prompt event, give clear guidance
      alert(lang === 'ug' 
        ? 'تېلېفونىڭىزدىكى Chrome تور كۆرگۈچىنىڭ ئوڭ ئۈستىدىكى 3 چېكىتنى بېسىپ «ئەپنى قاچىلاش» (Install app) نى تاللاڭ.' 
        : 'Open browser menu (3 dots) and select "Install app" or "Add to Home screen"');
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div 
        className="bg-[#0A1A2E] border-2 border-[#D4AF37]/60 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.25)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#0D243F] via-[#0A1A2E] to-[#0D243F] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFEAA7] to-[#D4AF37] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#071322] rounded-[14px] flex items-center justify-center text-[#D4AF37]">
                <Download className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-arabic gold-text">
                تېلېفونغا ئەپ شەكلىدە قاچىلاش
              </h2>
              <p className="text-[11px] text-gray-300">
                Install as Mobile App (PWA)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-gray-200 text-xs">
          
          {/* Quick 1-Click Install Button if supported */}
          {deferredPrompt && !isInstalled && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-[#0B251F] border-2 border-emerald-500/70 shadow-lg flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>بىر چېكىپلا قاچىلاش تەييار!</span>
                </div>
                <div className="text-[11px] text-gray-300 mt-0.5">
                  تېلېفونىڭىز ئەپ قاچىلاشنى تولۇق قوللايدۇ
                </div>
              </div>
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>ھازىر قاچىلاش</span>
              </button>
            </div>
          )}

          {isInstalled && (
            <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>بۇ ئەپ تېلېفونىڭىزغا قاچىلانغان ھالەتتە ئىشلىتىلىۋاتىدۇ!</span>
            </div>
          )}

          {/* OS Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#06101D] rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveDeviceTab('android')}
              className={`py-2 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                activeDeviceTab === 'android'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android (ئاندرويىد)</span>
            </button>

            <button
              onClick={() => setActiveDeviceTab('ios')}
              className={`py-2 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                activeDeviceTab === 'ios'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone / iPad</span>
            </button>

            <button
              onClick={() => setActiveDeviceTab('pc')}
              className={`py-2 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                activeDeviceTab === 'pc'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>كومپيۇتېر (PC/Mac)</span>
            </button>
          </div>

          {/* Android Step by Step Guide */}
          {activeDeviceTab === 'android' && (
            <div className="space-y-2.5 bg-[#081525] p-3.5 rounded-2xl border border-white/10">
              <h4 className="font-bold text-[#D4AF37] text-xs flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>ئاندرويىد تېلېفونلاردا قاچىلاش باسقۇچلىرى:</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 p-2 bg-[#0C1F35] rounded-xl border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-white">Chrome ياكى باشقا تور كۆرگۈچتە ئېچىڭ:</span>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      ئەپ ئۇلىنىشىنى ئېچىپ، ئوڭ ئۈستى بۇلۇڭدىكى <strong className="text-[#FFEAA7]">3 تال چېكىت (⋮)</strong> نى بېسىڭ.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 bg-[#0C1F35] rounded-xl border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-white">«ئەپنى قاچىلاش» (Install app) ياكى «باش ئېكرانغا قوشۇش» نى بېسىڭ:</span>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      تىزىملىكتىن «ئەپنى قاچىلاش / Install App» ياكى «باش ئېكرانغا قوشۇش (Add to Home screen)» نى تاللاڭ.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 bg-[#0C1F35] rounded-xl border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-white">تەبرىكلەيمىز! پۈتتى:</span>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      تېلېفونىڭىزنىڭ باش ئېكرانىدا مەخسۇس ئالتۇن گۈمبەز بەلگىلىك مۇستەقىل ئەپ بارلىققا كېلىدۇ. توردىن ئۈزۈلگەن ھالەتتىمۇ ناماز ۋە قۇرئاننى بىۋاسىتە ئىشلەتكىلى بولىدۇ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* iOS (iPhone / iPad) Guide */}
          {activeDeviceTab === 'ios' && (
            <div className="space-y-2.5 bg-[#081525] p-3.5 rounded-2xl border border-white/10">
              <h4 className="font-bold text-[#D4AF37] text-xs flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>iPhone ۋە iPad تېلېفونلاردا قاچىلاش باسقۇچلىرى:</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 p-2 bg-[#0C1F35] rounded-xl border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-white">Safari تور كۆرگۈچتە ئېچىڭ:</span>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      ئاستى تەرەپتىكى <strong className="text-[#FFEAA7]">ھەمبەھىرلەش (Share ⎋)</strong> بەلگىسىنى بېسىڭ.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 bg-[#0C1F35] rounded-xl border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-white">«باش ئېكرانغا قوشۇش» (Add to Home Screen) نى تاللاڭ:</span>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      تىزىملىكنى ئاستىغا سۈرۈپ «باش ئېكرانغا قوشۇش (➕ Add to Home Screen)» كۇنۇپكىسىنى بېسىڭ.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 bg-[#0C1F35] rounded-xl border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-white">«قوشۇش» (Add) نى بېسىپ تاماملاڭ:</span>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      iPhone نىڭ باش بېتىدە ئەپ بەلگىسى ھاسىل بولىدۇ، چەكسىڭىز خۇددى App Store دىن چۈشۈرگەندەك پۈتۈن ئېكراندا ئېچىلىدۇ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PC / Chrome Guide */}
          {activeDeviceTab === 'pc' && (
            <div className="space-y-2.5 bg-[#081525] p-3.5 rounded-2xl border border-white/10">
              <h4 className="font-bold text-[#D4AF37] text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>كومپيۇتېردا ئەپ قىلىپ قاچىلاش:</span>
              </h4>

              <p className="text-xs text-gray-300 leading-relaxed">
                Google Chrome ياكى Microsoft Edge تور كۆرگۈچىنىڭ ئادرېس كىرگۈزۈش ئىستونىنىڭ ئوڭ تەرىپىدىكى <strong className="text-[#FFEAA7]">«قاچىلاش (Install / ⊕)»</strong> بەلگىسىنى بېسىپ، كومپيۇتېرىڭىزدا مۇستەقىل ئەپ قىلىپ ئىشلەتسىڭىز بولىدۇ.
              </p>
            </div>
          )}

          {/* Share / Copy URL Section */}
          <div className="p-3 bg-[#06111E] rounded-2xl border border-[#D4AF37]/25 flex items-center justify-between gap-2">
            <div className="truncate flex-1 text-[11px] text-gray-300 text-left font-mono" dir="ltr">
              {window.location.href}
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#152B44] text-[#FFEAA7] hover:bg-[#1D3B5C] border border-[#D4AF37]/30'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'كۆچۈرۈلدى' : 'ئۇلىنىشنى كۆچۈرۈش'}</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-[#09182A] border border-white/5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>پۈتۈنلەي بىخەتەر ۋە ھەقسىز</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#09182A] border border-white/5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ئېقىم مىقدارى تېجەيدۇ، يېنىك</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#081525] border-t border-white/10 text-center flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold text-xs shadow-md hover:brightness-110 cursor-pointer"
          >
            چۈشەندىم / يېپىش
          </button>
        </div>
      </div>
    </div>
  );
};
