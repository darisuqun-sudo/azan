import React, { useState } from 'react';
import { 
  ChevronRight, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Play,
  RotateCcw,
  Check
} from 'lucide-react';
import { ActiveScreen, Language, TajweedRuleItem } from '../types';
import { TAJWEED_RULES } from '../data/extraIslamicData';
import { soundService } from '../utils/audioPlayer';

interface TajweedScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const TajweedScreen: React.FC<TajweedScreenProps> = ({ onNavigate, lang }) => {
  const [selectedRule, setSelectedRule] = useState<TajweedRuleItem>(TAJWEED_RULES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingExample, setIsPlayingExample] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    feedbackUg: string;
    passed: boolean;
  } | null>(null);

  const startVoiceTest = () => {
    setIsRecording(true);
    setAnalysisResult(null);
    soundService.playTasbihClick();

    // Voice analysis simulation
    setTimeout(() => {
      setIsRecording(false);
      soundService.playChime();
      setAnalysisResult({
        score: 96,
        feedbackUg: `مۇبارەك بولسۇن! «${selectedRule.nameUg}» قائىدىسى بويىچە مەخرەج، سوزۇش ۋە غۇننە تەلەپپۇزى ناھايىتى توغرا ئوقۇلدى (%96 مۇكەممەللىك دەرىجىسى).`,
        passed: true
      });
    }, 2500);
  };

  const playExampleAudio = () => {
    setIsPlayingExample(true);
    soundService.playChime();
    setTimeout(() => {
      setIsPlayingExample(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-14 select-none font-arabic">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192A] via-[#07111E] to-[#040810] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full px-3.5 pt-2">
        
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
              {lang === 'ug' ? 'تەجۋىد ۋە تەلەپپۇز كۆرسەتكۈچ' : 'أحكام التجويد والمدرب الصوتي'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'قۇرئان تىلاۋىتىنى توغرا ۋە گۈزەل ئوقۇش دەرسلىكى' : 'Interactive Quran Recitation Practice'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Rule Selector Horizontal Tabs */}
        <div className="flex gap-2 overflow-x-auto py-2 pr-0.5 no-scrollbar" dir="rtl">
          {TAJWEED_RULES.map(rule => (
            <button
              key={rule.id}
              onClick={() => {
                setSelectedRule(rule);
                setAnalysisResult(null);
                soundService.playTasbihClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedRule.id === rule.id 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black font-bold shadow-md' 
                  : 'bg-[#091A2C] text-gray-300 border border-white/10 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: rule.color }} />
              <span>{rule.nameUg.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto max-h-[70vh] space-y-3 pb-4">
          
          {/* Selected Rule Details Card */}
          <div className="p-4 rounded-3xl bg-[#09182A] border-2 border-[#D4AF37]/40 shadow-xl text-right" dir="rtl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: selectedRule.color }} />
                <h3 className="text-base font-bold text-white">{selectedRule.nameUg}</h3>
              </div>
              <span className="text-[11px] font-quran text-[#FFDF88]">{selectedRule.nameAr}</span>
            </div>

            <p className="text-xs text-[#93C5FD] leading-relaxed mb-3 font-arabic">
              {selectedRule.descriptionUg}
            </p>

            {/* Target Letters */}
            <div className="mb-3">
              <span className="text-[10px] text-gray-400 block mb-1 font-semibold">بۇ قائىدىنىڭ خاس ھەرپلىرى:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedRule.letters.map((l, idx) => (
                  <span 
                    key={idx}
                    className="w-8 h-8 rounded-xl bg-[#06111D] border font-quran font-bold text-sm flex items-center justify-center text-white"
                    style={{ borderColor: `${selectedRule.color}80` }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Example Ayah */}
            <div className="p-3 rounded-2xl bg-[#040C16] border border-[#D4AF37]/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-[#FFDF88] font-bold">📖 قۇرئاندىن ئەمەلىي مىسال:</span>
                <span className="text-[10px] text-gray-400 font-mono">{selectedRule.exampleAyah}</span>
              </div>
              <p className="font-quran text-base sm:text-lg text-[#FFEAA7] leading-loose text-center my-1 select-text">
                «{selectedRule.exampleAr}»
              </p>
            </div>
          </div>

          {/* Interactive Voice Recitation Practice Module */}
          <div className="p-4 rounded-3xl bg-[#0A1C30] border border-cyan-500/30 text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 mb-2 text-xs font-bold text-cyan-300">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>تەلەپپۇز ۋە مەخرەجنى ئەمەلىي سىناپ بېقىش</span>
            </div>
            
            <p className="text-[11px] text-gray-300 mb-3 max-w-sm mx-auto">
              يۇقىرىدىكى مىسالنى تەلەپپۇز قائىدىسى بويىچە ئوقۇپ، مىكروفون كۇنۇپكىسىنى بېسىپ سىناپ كۆرۈڭ.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={playExampleAudio}
                disabled={isPlayingExample}
                className="px-3 py-2 rounded-2xl bg-[#122A46] border border-cyan-500/40 text-xs text-cyan-200 flex items-center gap-1.5 cursor-pointer hover:brightness-110 active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>{isPlayingExample ? 'ئاڭلىتىلماقتا...' : 'ئۈلگە تىڭشاش'}</span>
              </button>

              <button
                onClick={startVoiceTest}
                disabled={isRecording}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-all ${
                  isRecording 
                    ? 'bg-rose-600 text-white animate-pulse' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110 active:scale-95'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecording ? 'تىڭشالماقتا...' : '🎙️ ئاۋاز بىلەن سىناش'}</span>
              </button>
            </div>

            {/* Analysis Result Banner */}
            {analysisResult && (
              <div className="mt-3 p-3 rounded-2xl bg-[#061E1A] border border-emerald-500/50 text-right animate-scaleUp" dir="rtl">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 mb-1.5">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>تەلەپپۇز باھالاش نەتىجىسى:</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-black font-bold text-xs font-mono">
                    {analysisResult.score}%
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                  {analysisResult.feedbackUg}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
