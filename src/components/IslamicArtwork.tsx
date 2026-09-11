import React from 'react';

// 3D Realistic Open Quran on Wooden Rehal
export const QuranOnRehalIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8D5B28" />
        <stop offset="50%" stopColor="#5A3511" />
        <stop offset="100%" stopColor="#2E1703" />
      </linearGradient>
      <linearGradient id="goldEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#997300" />
      </linearGradient>
      <linearGradient id="pageGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF7" />
        <stop offset="85%" stopColor="#F5E8C7" />
        <stop offset="100%" stopColor="#DAC293" />
      </linearGradient>
      <linearGradient id="pageGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF7" />
        <stop offset="85%" stopColor="#F5E8C7" />
        <stop offset="100%" stopColor="#DAC293" />
      </linearGradient>
      <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Rehal Wooden Stand Base */}
    <path d="M22 84 L50 62 L78 84 L72 90 L50 72 L28 90 Z" fill="url(#woodGrad)" stroke="#FFE082" strokeWidth="1" />
    <path d="M50 62 L50 72 L32 86 L22 84 Z" fill="#3D2109" />
    <path d="M50 62 L50 72 L68 86 L78 84 Z" fill="#3D2109" />

    {/* Book Binding Shadow */}
    <ellipse cx="50" cy="58" rx="6" ry="2" fill="#000" opacity="0.5" />

    {/* Quran Left Pages Block */}
    <path d="M12 40 C24 38 42 42 49 56 L49 68 C42 54 24 50 12 52 Z" fill="url(#pageGradLeft)" stroke="#D4AF37" strokeWidth="1" />
    <path d="M14 42 C24 40 40 44 47 57 L47 67 C40 54 24 50 14 52 Z" fill="#FFFDF0" />

    {/* Quran Right Pages Block */}
    <path d="M88 40 C76 38 58 42 51 56 L51 68 C58 54 76 50 88 52 Z" fill="url(#pageGradRight)" stroke="#D4AF37" strokeWidth="1" />
    <path d="M86 42 C76 40 60 44 53 57 L53 67 C60 54 76 50 86 52 Z" fill="#FFFDF0" />

    {/* Golden Page Trim & Decorative Quran Arabic Lines */}
    <path d="M18 45 C28 43 38 46 44 54" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M18 48 C28 46 38 49 44 57" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M20 51 C28 49 36 52 42 59" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" />

    <path d="M82 45 C72 43 62 46 56 54" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M82 48 C72 46 62 49 56 57" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M80 51 C72 49 64 52 58 59" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" />

    {/* Central Spine Golden Bookmark Ribbon */}
    <path d="M50 56 L50 78 L46 75 L42 78 L42 56 Z" fill="#D4AF37" />
    
    {/* Golden Radiance Aura */}
    <circle cx="50" cy="50" r="32" stroke="url(#goldEdgeGrad)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.7" />
  </svg>
);

// 3D Praying Hands Icon (Dua)
export const PrayingHandsIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="handsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#997300" />
      </linearGradient>
    </defs>
    
    {/* Left Hand */}
    <path 
      d="M32 78 C28 66 30 50 36 38 C38 34 42 32 44 35 C46 38 45 44 43 49 L46 32 C48 29 51 28 53 31 C55 34 54 40 52 46 L55 35 C57 32 60 32 61 35 C62 38 61 44 59 49 L62 44 C64 42 67 43 67 46 C67 52 62 62 58 72 C54 80 40 84 32 78 Z" 
      fill="url(#handsGrad)" 
      transform="scale(-1, 1) translate(-75, 0)" 
      opacity="0.95"
    />

    {/* Right Hand */}
    <path 
      d="M57 78 C53 66 55 50 61 38 C63 34 67 32 69 35 C71 38 70 44 68 49 L71 32 C73 29 76 28 78 31 C80 34 79 40 77 46 L80 35 C82 32 85 32 86 35 C87 38 86 44 84 49 L87 44 C89 42 92 43 92 46 C92 52 87 62 83 72 C79 80 65 84 57 78 Z" 
      fill="url(#handsGrad)" 
      transform="translate(-25, 0)" 
      opacity="0.95"
    />

    {/* Golden Light Beams */}
    <circle cx="50" cy="24" r="3" fill="#FFFDF0" />
    <path d="M50 14 L50 18 M40 18 L43 21 M60 18 L57 21" stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3D Mosque Azan Emblem
export const MosqueAzanEmblem: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldDomeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8A6305" />
      </linearGradient>
    </defs>
    
    {/* Main Dome */}
    <path d="M30 65 C30 38 50 28 50 16 C50 28 70 38 70 65 Z" fill="url(#goldDomeGrad)" />
    
    {/* Crescent Finial */}
    <path d="M50 16 L50 8" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
    <path d="M53 8 A4 4 0 1 0 49 4 A3.2 3.2 0 1 1 53 8 Z" fill="#FFE082" />

    {/* Left Flanking Minaret */}
    <rect x="18" y="38" width="6" height="34" fill="url(#goldDomeGrad)" rx="1" />
    <polygon points="16,38 21,24 26,38" fill="#FFE082" />
    <circle cx="21" cy="22" r="1.5" fill="#FFE082" />

    {/* Right Flanking Minaret */}
    <rect x="76" y="38" width="6" height="34" fill="url(#goldDomeGrad)" rx="1" />
    <polygon points="74,38 79,24 84,38" fill="#FFE082" />
    <circle cx="79" cy="22" r="1.5" fill="#FFE082" />

    {/* Mosque Base and Arches */}
    <rect x="15" y="70" width="70" height="8" fill="url(#goldDomeGrad)" rx="1" />
    <path d="M43 78 C43 70 57 70 57 78 Z" fill="#07111E" />
    <path d="M28 78 C28 72 38 72 38 78 Z" fill="#07111E" />
    <path d="M62 78 C62 72 72 72 72 78 Z" fill="#07111E" />
  </svg>
);

// 3D Tasbih Beads Icon
export const TasbihBeadsIcon: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="beadGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#734E02" />
      </radialGradient>
    </defs>
    
    {/* Ellipse of Golden Beads */}
    <circle cx="50" cy="20" r="5" fill="url(#beadGrad)" />
    <circle cx="64" cy="24" r="5" fill="url(#beadGrad)" />
    <circle cx="75" cy="35" r="5" fill="url(#beadGrad)" />
    <circle cx="80" cy="50" r="5" fill="url(#beadGrad)" />
    <circle cx="75" cy="65" r="5" fill="url(#beadGrad)" />
    <circle cx="64" cy="76" r="5" fill="url(#beadGrad)" />
    <circle cx="50" cy="80" r="6" fill="url(#beadGrad)" />
    <circle cx="36" cy="76" r="5" fill="url(#beadGrad)" />
    <circle cx="25" cy="65" r="5" fill="url(#beadGrad)" />
    <circle cx="20" cy="50" r="5" fill="url(#beadGrad)" />
    <circle cx="25" cy="35" r="5" fill="url(#beadGrad)" />
    <circle cx="36" cy="24" r="5" fill="url(#beadGrad)" />

    {/* Tassel */}
    <path d="M50 86 L50 96 L47 98 L53 98 L50 96" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="86" r="3" fill="#D4AF37" />
  </svg>
);

// 3D Qibla Compass Icon
export const QiblaKaabaIcon: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E3A5A" />
        <stop offset="100%" stopColor="#081423" />
      </linearGradient>
    </defs>
    
    {/* Outer Compass Dial */}
    <circle cx="50" cy="50" r="42" fill="url(#dialGrad)" stroke="#D4AF37" strokeWidth="3" />
    <circle cx="50" cy="50" r="36" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3" />
    
    {/* Kaaba Silhouette */}
    <rect x="40" y="38" width="20" height="22" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="1.5" rx="2" />
    <line x1="40" y1="44" x2="60" y2="44" stroke="#FFE082" strokeWidth="1.5" />
    
    {/* Compass Needle */}
    <polygon points="50,14 46,30 54,30" fill="#22C55E" />
    <polygon points="50,86 46,70 54,70" fill="#EF4444" />
  </svg>
);

// 3D Hijri Calendar Icon
export const HijriCalendarIcon: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="calGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1A334E" />
        <stop offset="100%" stopColor="#0A1828" />
      </linearGradient>
    </defs>
    
    <rect x="20" y="24" width="60" height="58" rx="8" fill="url(#calGrad)" stroke="#D4AF37" strokeWidth="2.5" />
    <path d="M20 38 L80 38" stroke="#D4AF37" strokeWidth="2" />
    <circle cx="35" cy="18" r="4" fill="#FFE082" />
    <circle cx="65" cy="18" r="4" fill="#FFE082" />
    
    {/* Crescent inside calendar */}
    <path d="M56 58 A10 10 0 1 0 46 48 A8 8 0 1 1 56 58 Z" fill="#FFE082" />
  </svg>
);

// 3D Hadith Radiance Book Icon
export const HadithRadianceIcon: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 35 C36 30 48 34 50 44 C52 34 64 30 76 35 L76 72 C64 67 52 70 50 78 C48 70 36 67 24 72 Z" fill="#142B44" stroke="#D4AF37" strokeWidth="2.5" />
    <path d="M50 44 L50 78" stroke="#FFE082" strokeWidth="2" />
    
    {/* Radiance Stars */}
    <circle cx="50" cy="20" r="3" fill="#FFE082" />
    <line x1="50" y1="12" x2="50" y2="16" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="16" x2="45" y2="19" stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="58" y1="16" x2="55" y2="19" stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Photorealistic & Vector Hybrid Mosque Skyline Background Artwork (100% matches reference photo)
export const MosqueNightSkyline: React.FC<{ className?: string; opacity?: number }> = ({ className = "w-full h-full", opacity = 1 }) => (
  <div className={`relative w-full h-full overflow-hidden ${className}`} style={{ opacity }}>
    {/* Real High-Resolution Photorealistic Grand Mosque at Night Overlay */}
    <img 
      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85" 
      alt="Illuminated Grand Mosque at Night"
      referrerPolicy="no-referrer"
      className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-[0.75] contrast-[1.15] saturate-[1.25]"
      onError={(e) => {
        // graceful fallback if offline
        (e.target as HTMLElement).style.display = 'none';
      }}
    />

    {/* Secondary High-Def Sunset/Twilight Mosque Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#051120]/75 via-[#08182B]/60 to-[#07111E]" />

    {/* Vector Mosque Glow & Luminous Crescent Moon Overlay for crisp 100% vector precision */}
    <svg viewBox="0 0 400 280" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen" preserveAspectRatio="xMidYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="crescentMoonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#FFE082" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="domeGlowCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldDomeFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#664606" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Luminous Glowing Crescent Moon in Upper Sky (Matches Image Exact Location) */}
      <circle cx="288" cy="46" r="32" fill="url(#crescentMoonGlow)" />
      {/* Precise Curved Crescent Body */}
      <path 
        d="M 292,34 A 15,15 0 1,0 278,16 A 12,12 0 1,1 292,34 Z" 
        fill="#FFFDF0" 
        filter="drop-shadow(0 0 8px rgba(255,242,178,0.9))"
      />
      <circle cx="294" cy="18" r="1.8" fill="#FFFDF0" />

      {/* Gentle Flying Birds in Twilight Sky */}
      <path d="M 215,52 Q 220,47 225,52 Q 230,47 235,52" stroke="#FFEAA7" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <path d="M 195,64 Q 199,60 203,64 Q 207,60 211,64" stroke="#FFEAA7" strokeWidth="1.0" strokeLinecap="round" opacity="0.65" />
      <path d="M 240,68 Q 244,65 248,68 Q 252,65 256,68" stroke="#FFEAA7" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />

      {/* Twinkling Golden Stars */}
      <circle cx="45" cy="32" r="1.2" fill="#FFF2B2" opacity="0.8" />
      <circle cx="110" cy="55" r="1" fill="#FFE082" opacity="0.7" />
      <circle cx="160" cy="22" r="1.5" fill="#FFFDF0" opacity="0.9" />
      <circle cx="345" cy="40" r="1.2" fill="#FFF2B2" opacity="0.75" />
      <circle cx="375" cy="75" r="1" fill="#FFE082" opacity="0.6" />

      {/* Grand Illuminated Central Dome Silhouette & Glow */}
      <circle cx="200" cy="180" r="70" fill="url(#domeGlowCenter)" />
      <path d="M 140,210 C 140,125 260,125 260,210 Z" fill="url(#goldDomeFill)" />
      
      {/* Minaret Spires with Finials */}
      <line x1="200" y1="125" x2="200" y2="98" stroke="#FFEAA7" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="200" cy="96" r="3" fill="#FFFDF0" />

      {/* Left Flanking Dome */}
      <path d="M 90,220 C 90,155 160,155 160,220 Z" fill="url(#goldDomeFill)" opacity="0.75" />
      {/* Right Flanking Dome */}
      <path d="M 240,220 C 240,155 310,155 310,220 Z" fill="url(#goldDomeFill)" opacity="0.75" />

      {/* Left Tall Illuminated Minaret */}
      <rect x="58" y="95" width="14" height="125" fill="url(#goldDomeFill)" rx="2" />
      <polygon points="54,95 65,60 76,95" fill="#FFEAA7" />
      <circle cx="65" cy="58" r="2.5" fill="#FFFDF0" />
      <line x1="56" y1="115" x2="74" y2="115" stroke="#FFF2B2" strokeWidth="1.5" />
      <line x1="56" y1="150" x2="74" y2="150" stroke="#FFF2B2" strokeWidth="1.5" />

      {/* Right Tall Illuminated Minaret */}
      <rect x="328" y="95" width="14" height="125" fill="url(#goldDomeFill)" rx="2" />
      <polygon points="324,95 335,60 346,95" fill="#FFEAA7" />
      <circle cx="335" cy="58" r="2.5" fill="#FFFDF0" />
      <line x1="326" y1="115" x2="344" y2="115" stroke="#FFF2B2" strokeWidth="1.5" />
      <line x1="326" y1="150" x2="344" y2="150" stroke="#FFF2B2" strokeWidth="1.5" />

      {/* Water Reflection Highlights at Lower Base */}
      <line x1="140" y1="250" x2="260" y2="250" stroke="#FFEAA7" strokeWidth="1.5" opacity="0.5" strokeDasharray="8 6" />
      <line x1="160" y1="256" x2="240" y2="256" stroke="#FFEAA7" strokeWidth="1" opacity="0.4" strokeDasharray="5 5" />
    </svg>

    {/* Bottom Vignette Smooth Gradient to blend into the app body */}
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07111E] via-[#07111E]/85 to-transparent" />
  </div>
);

// 3D Glowing Lantern (Fanoos) Decorative Component (Matches bottom right in image)
export const GlowingFanoosLantern: React.FC<{ size?: number; className?: string }> = ({ size = 80, className = "" }) => (
  <div className={`relative inline-block ${className}`} style={{ width: size, height: size * 1.5 }}>
    <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,224,130,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="candleLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFE082" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fanoosGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#6E4C06" />
        </linearGradient>
      </defs>

      {/* Top Ring */}
      <ellipse cx="50" cy="12" rx="10" ry="4" stroke="url(#fanoosGold)" strokeWidth="3" />
      
      {/* Dome Top Cap */}
      <path d="M 32 30 C 32 18 68 18 68 30 Z" fill="url(#fanoosGold)" />
      <polygon points="46,18 50,8 54,18" fill="#FFEAA7" />

      {/* Filigree Arch Panels */}
      <polygon points="30,30 70,30 80,85 20,85" fill="#1C1304" opacity="0.7" />
      
      {/* Inner Glowing Flame */}
      <circle cx="50" cy="60" r="24" fill="url(#candleLight)" />
      <ellipse cx="50" cy="62" rx="4" ry="8" fill="#FFFDF0" />

      {/* Golden Cage Ribs */}
      <line x1="30" y1="30" x2="20" y2="85" stroke="url(#fanoosGold)" strokeWidth="3" />
      <line x1="70" y1="30" x2="80" y2="85" stroke="url(#fanoosGold)" strokeWidth="3" />
      <line x1="45" y1="30" x2="40" y2="85" stroke="url(#fanoosGold)" strokeWidth="2.5" />
      <line x1="55" y1="30" x2="60" y2="85" stroke="url(#fanoosGold)" strokeWidth="2.5" />

      {/* Middle Arabesque Ring */}
      <rect x="20" y="85" width="60" height="8" fill="url(#fanoosGold)" rx="2" />

      {/* Hexagonal Base */}
      <polygon points="20,93 80,93 88,125 12,125" fill="url(#fanoosGold)" />
      <rect x="12" y="125" width="76" height="8" fill="#6E4C06" rx="2" />
      
      {/* Base Little Feet */}
      <rect x="18" y="133" width="8" height="6" fill="url(#fanoosGold)" rx="1" />
      <rect x="74" y="133" width="8" height="6" fill="url(#fanoosGold)" rx="1" />
      <rect x="46" y="133" width="8" height="6" fill="url(#fanoosGold)" rx="1" />
    </svg>
  </div>
);

// Authentic App Icon Badge matching bottom-left in uploaded photo
export const AppIconBadge: React.FC<{ size?: number; className?: string }> = ({ size = 96, className = "" }) => (
  <div 
    className={`relative rounded-3xl p-1 bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#593E03] shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.6)] border-2 border-[#FFEAA7] select-none ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Inner Squircle Body */}
    <div className="relative w-full h-full rounded-[22px] bg-gradient-to-b from-[#0A1A2E] via-[#071322] to-[#040810] overflow-hidden flex flex-col items-center justify-between p-2 text-center border border-[#D4AF37]/50 shadow-inner">
      
      {/* Crescent Moon & Minaret Top */}
      <div className="relative w-full flex items-center justify-between px-1 pt-0.5">
        {/* Minarets silhouette left */}
        <div className="flex items-end gap-0.5 opacity-90">
          <div className="w-1.5 h-6 bg-[#D4AF37] rounded-t-sm" />
          <div className="w-1.5 h-8 bg-[#FFE082] rounded-t-sm" />
        </div>

        {/* Crescent Moon */}
        <div className="relative w-7 h-7 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FFEAA7] to-[#D4AF37] shadow-[0_0_10px_#FFE082]" />
          <div className="absolute top-0 right-1 w-5 h-5 rounded-full bg-[#081524]" />
        </div>

        {/* Lantern right */}
        <div className="opacity-90">
          <div className="w-3 h-5 bg-gradient-to-b from-[#FFE082] to-[#A67C1E] rounded-sm shadow-[0_0_8px_#FFE082]" />
        </div>
      </div>

      {/* Center Calligraphy Text */}
      <div className="relative z-10 my-auto">
        <span className="text-sm font-extrabold font-quran gold-text block leading-tight tracking-wide drop-shadow-md">
          الآذان
        </span>
        <span className="text-[9px] font-bold text-gray-200 block font-arabic leading-tight">
          والقرآن الكريم
        </span>
      </div>

      {/* Open Quran Graphic at bottom */}
      <div className="w-10 h-7 -mb-1">
        <QuranOnRehalIcon className="w-full h-full" />
      </div>

    </div>
  </div>
);
