import React from 'react';
import { Sparkles, Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  time?: string;
  className?: string;
  title?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  time = '05:28',
  className = '',
  title
}) => {
  return (
    <div className={`relative flex flex-col rounded-[48px] p-3 bg-gradient-to-b from-[#4A3B18] via-[#B8973E] to-[#2B1F0A] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.3)] border-2 border-[#FFEAA7]/40 ${className}`}>
      
      {/* Outer Metallic Bezel Chamfer */}
      <div className="relative w-full h-full rounded-[40px] bg-[#050C16] overflow-hidden flex flex-col border border-[#D4AF37]/40 shadow-inner">
        
        {/* Dynamic Island / Notch + Android Status Bar */}
        <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-1 bg-transparent text-[#E2E8F0] select-none text-xs">
          
          {/* Status Bar Left: Clock */}
          <span className="font-semibold tracking-tight text-[13px] font-mono text-gray-200">
            {time}
          </span>

          {/* Center Notch */}
          <div className="w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center gap-1.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#111A24]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#082F49]" />
          </div>

          {/* Status Bar Right: Signal, Wifi, Battery */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="w-5 h-2.5 rounded-[3px] border border-gray-300 p-0.5 flex items-center">
              <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Screen Content Viewport */}
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          {children}
        </div>

        {/* Android / iOS Home Indicator Pill */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-40 pointer-events-none" />

      </div>

    </div>
  );
};
