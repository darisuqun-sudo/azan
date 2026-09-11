import React, { useState } from 'react';
import { 
  ChevronRight, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  HelpCircle, 
  BookOpen,
  Lightbulb,
  Check
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';
import { ISLAMIC_AI_KNOWLEDGE_BASE } from '../data/advancedIslamicData';
import { soundService } from '../utils/audioPlayer';

interface IslamicAiScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const IslamicAiScreen: React.FC<IslamicAiScreenProps> = ({ onNavigate, lang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: lang === 'ug'
        ? 'ئەسسالامۇ ئەلەيكۇم ۋە رەھمەتۇللاھى ۋە بەرەكاتۇھۇ! مەن سىزنىڭ ئىسلامىي ئەقىللىق ياردەمچىڭىز. تاھارەت، ناماز، روزا، زوكات، ھالال-ھارام ۋە كۈندىلىك فىقھىي سوئاللىرىڭىز بولسا ئىختىيارىي سوراڭ.'
        : 'Assalamu Alaikum! I am your Islamic AI Assistant. Feel free to ask about Salah, Wudu, Fasting, Zakat, Halal food or everyday Islamic guidelines.',
      time: '12:00'
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const quickQuestions = [
    'سەپەردە نامازنى قانداق قەسىر ئوقۇيمىز؟',
    'تەھەججۇد نامىزىنىڭ ۋاقتى ۋە ئوقۇلۇشى قانداق؟',
    'زوكاتنىڭ پەرز بولۇش نىساب مىقدارى قانچىلىك؟',
    'نامازدا سەجدە سەھۋ قانداق قىلىنىدۇ؟',
    'ئۇنتۇپ يەپ-ئىچىپ سالسا روزا بۇزۇلامدۇ؟'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);
    soundService.playTasbihClick();

    // Match query against Islamic knowledge base or generate authoritative response
    setTimeout(() => {
      let matchedAnswer = '';
      const lowerQuery = query.toLowerCase();

      for (const item of ISLAMIC_AI_KNOWLEDGE_BASE) {
        if (item.keywords.some(k => lowerQuery.includes(k.toLowerCase())) || query.includes(item.titleUg.slice(0, 4))) {
          matchedAnswer = `### ${item.titleUg}\n\n${item.answerUg}`;
          break;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = `سوئالىڭىز ئۈچۈن تەشەككۈر! «${query}» ھەققىدە قۇرئان كەرىم، سەھىھ ھەدىسلەر ۋە ئەھلى سۈننەت ۋەلجامائە فىقھى مەنبەلىرى ئاساسىدا تۆۋەندىكىدەك جاۋاب بېرىلىدۇ:\n\nئىسلام شەرىئىتىدە ھەر بىر مۇسۇلمان ئەھكام ۋە ئىبادەتلەردە پەيغەمبىرىمىز مۇھەممەد (س.ئە.ۋ) نىڭ سۈننىتىگە ئېنىق ئەگىشىشى، تاھارەت، ناماز، روزا ۋە ھالال تائامدا پاكلىق ۋە ئىخلاسنى بىرىنچى ئورۇنغا قويۇشى تەۋسىيە قىلىنىدۇ.\n\nتەپسىلىي مەسلىھەت ئۈچۈن قۇرئان، ھەدىس ياكى ئىشەنچلىك ئالىملاردىن يېتەكچىلىك ئېلىش ئەۋزەلدۇر.`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: matchedAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      soundService.playChime();
    }, 900);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-3 select-none font-arabic">
      
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
              {lang === 'ug' ? 'ئىسلامىي سۈنئىي ئەقىل ياردەمچىسى' : lang === 'ar' ? 'المساعد الإسلامي الذكي' : lang === 'tr' ? 'İslami AI Asistanı' : 'Islamic AI Knowledge Assistant'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'شەرىئەت، تاھارەت، ناماز ۋە فىقھىي مەسلىھەتچى' : 'Instant Islamic Guidance & Fatwa Q&A'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <Bot className="w-4 h-4" />
          </div>
        </div>

        {/* Quick Question Chips */}
        <div className="my-2 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-xl bg-[#091C30] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[11px] text-[#FFEAA7] shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 max-h-[56vh] my-1">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div 
                key={m.id}
                className={`flex gap-2 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}
                dir="rtl"
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isAi ? 'bg-gradient-to-br from-[#D4AF37] to-[#A67C1E] text-black shadow-md' : 'bg-[#102A45] border border-white/20 text-white'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Content Bubble */}
                <div className={`p-3 rounded-2xl max-w-[82%] text-xs leading-relaxed ${
                  isAi 
                    ? 'bg-[#0A1D30] border border-[#D4AF37]/35 text-gray-200 shadow-md' 
                    : 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md'
                }`}>
                  <p className="whitespace-pre-line font-arabic">
                    {m.text}
                  </p>
                  <span className="text-[9px] text-gray-400 block mt-1 text-left font-mono">
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] animate-pulse" dir="rtl">
              <Bot className="w-4 h-4" />
              <span>ئىسلامىي ياردەمچى جاۋاب تەييارلاۋاتىدۇ...</span>
            </div>
          )}
        </div>

        {/* Chat Input Field */}
        <div className="mt-2 flex items-center gap-2 bg-[#081726] p-1.5 rounded-2xl border border-[#D4AF37]/35">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'ug' ? 'ئىسلامىي سوئالىڭىزنى بۇ يەرگە يېزىڭ...' : 'Ask your Islamic question...'}
            className="flex-1 bg-transparent px-2.5 text-xs text-white placeholder-gray-400 outline-none font-arabic"
            dir="rtl"
          />

          <button
            onClick={() => handleSend()}
            className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A67C1E] text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
