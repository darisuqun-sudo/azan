import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Compass, 
  MapPin, 
  RotateCw, 
  Info,
  Sparkles
} from 'lucide-react';
import { ActiveScreen, CityLocation, Language } from '../types';

interface QiblaCompassScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  selectedCity: CityLocation;
  lang?: Language;
}

export const QiblaCompassScreen: React.FC<QiblaCompassScreenProps> = ({
  onNavigate,
  selectedCity,
  lang = 'ug'
}) => {
  const [heading, setHeading] = useState(0);
  const [permissionRequested, setPermissionRequested] = useState(false);

  // Fallback lat/lng if selectedCity is somehow undefined
  const lat = selectedCity?.lat ?? 30.0444;
  const lng = selectedCity?.lng ?? 31.2357;

  // Approximate Qibla angle calculation from latitude/longitude to Makkah (21.4225° N, 39.8262° E)
  const calculateQiblaBearing = (cityLat: number, cityLng: number) => {
    const makkahLat = 21.4225 * (Math.PI / 180);
    const makkahLng = 39.8262 * (Math.PI / 180);
    const userLat = cityLat * (Math.PI / 180);
    const userLng = cityLng * (Math.PI / 180);

    const dLng = makkahLng - userLng;
    const y = Math.sin(dLng);
    const x = Math.cos(userLat) * Math.tan(makkahLat) - Math.sin(userLat) * Math.cos(dLng);
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    return Math.round((qibla + 360) % 360);
  };

  const qiblaAngle = calculateQiblaBearing(lat, lng);

  // Request device orientation permission for iOS 13+ devices
  const requestOrientationPermission = async () => {
    try {
      const DeviceOrientationEventAny = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };
      if (typeof DeviceOrientationEventAny?.requestPermission === 'function') {
        const response = await DeviceOrientationEventAny.requestPermission();
        if (response === 'granted') {
          setPermissionRequested(true);
        }
      } else {
        setPermissionRequested(true);
      }
    } catch {
      setPermissionRequested(true);
    }
  };

  // Device orientation event listener
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setHeading(Math.round(e.alpha));
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const cityName = lang === 'ug' ? (selectedCity?.nameUg || selectedCity?.nameAr || 'شەھەر') :
                   lang === 'ar' ? (selectedCity?.nameAr || 'المدينة') :
                   lang === 'tr' ? (selectedCity?.nameTr || selectedCity?.nameEn || 'Şehir') :
                   (selectedCity?.nameEn || 'City');

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-16 font-arabic select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#D4AF37]/20 bg-[#09182A]">
        <button 
          onClick={() => onNavigate('home')}
          className="w-9 h-9 rounded-full bg-[#0E2138] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C378] active:scale-95 transition-transform"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-bold font-quran gold-text">
            {lang === 'ug' ? 'مەككە قىبلىنامىسى' : lang === 'ar' ? 'بوصلة القبلة المشرفة' : lang === 'tr' ? 'Kıble Pusulası' : 'Qibla Compass'}
          </h2>
          <span className="text-[11px] text-gray-400">
            {lang === 'ug' ? 'كەبىگە يۈزلىنىش يۆنىلىشى' : lang === 'ar' ? 'اتجاه الكعبة المشرفة بمكة' : lang === 'tr' ? 'Mekke-i Mükerreme Yönü' : 'Direction to Makkah'}
          </span>
        </div>

        <button
          onClick={requestOrientationPermission}
          className="w-9 h-9 rounded-full bg-[#0E2138] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C378] active:scale-95 transition-transform"
          title="سېنزورنى يېڭىلاش / Calibrate Compass"
        >
          <RotateCw className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>

      {/* Location Bar */}
      <div className="px-4 py-2 bg-[#0A192C] flex items-center justify-between text-xs text-gray-300">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          <span>{cityName}</span>
        </div>
        <div className="text-[#4ADE80] font-mono font-bold">
          {lang === 'ug' ? 'زاۋىيە:' : lang === 'ar' ? 'الزاوية:' : lang === 'tr' ? 'Açı:' : 'Angle:'} {qiblaAngle}°
        </div>
      </div>

      {/* Compass Stage */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-3">
        
        {/* Main Golden 3D Compass */}
        <div className="relative w-72 h-72 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.25)] border-4 border-[#D4AF37]/60">
          
          {/* Compass Dial Face */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-b from-[#142940] via-[#0D1D30] to-[#060F1A] transition-transform duration-300"
            style={{ transform: `rotate(${-heading}deg)` }}
          >
            {/* Degree ticks */}
            <div className="absolute inset-2 rounded-full border border-dashed border-[#D4AF37]/30" />
            
            {/* North, South, East, West Labels */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-red-400 font-mono">N (شىمال)</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 font-mono">S (جەنۇب)</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 font-mono">E (شەرق)</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 font-mono">W (غەرب)</span>

            {/* Kaaba Direction Needle */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
              <div className="relative h-full flex flex-col items-center justify-between py-4">
                {/* Kaaba Icon at top of needle */}
                <div className="w-9 h-9 rounded-lg bg-black border-2 border-[#D4AF37] flex items-center justify-center shadow-lg transform -translate-y-2">
                  <span className="text-xs">🕋</span>
                </div>
                {/* Needle beam */}
                <div className="w-1.5 h-20 bg-gradient-to-t from-transparent via-[#16A34A] to-[#4ADE80] rounded-full shadow-[0_0_10px_#4ADE80]" />
                <div className="w-2 h-2 rounded-full bg-red-500 opacity-60" />
              </div>
            </div>

          </div>

          {/* Center Hub */}
          <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#8C6514] border-2 border-white flex items-center justify-center shadow-lg">
            <Compass className="w-6 h-6 text-black" />
          </div>

        </div>

        {/* Qibla Direction Information Box */}
        <div className="w-full max-w-xs mt-6 p-3 rounded-2xl bg-[#0B1A2C] border border-[#D4AF37]/30 text-center">
          <span className="text-xs text-[#D4AF37] font-bold block mb-1">
            {lang === 'ug' ? 'مەككە كائىبىگە توغرىلىنىش بۇلۇڭى:' :
             lang === 'ar' ? 'زاوية التوجه نحو الكعبة المشرفة:' :
             lang === 'tr' ? 'Kabe-i Muazzama Yön Açısı:' :
             'Bearing to Holy Kaaba:'}
          </span>
          <p className="text-xs sm:text-sm text-gray-200">
            {lang === 'ug' ? 'تېلېفونىڭىزنى گورىزونتال تەكشى تۇتۇپ، كائىبە بەلگىسى 🕋 بويىچە يۈزلەنسىڭىز قىبلە تېپىلىدۇ.' :
             lang === 'ar' ? 'أمسك هاتفك بشكل أفقي مستوٍ، وقم بتدويره حتى تشير علامة الكعبة 🕋 للأعلى.' :
             lang === 'tr' ? 'Telefonunuzu düz tutun ve Kabe simgesi 🕋 yönüne dönün.' :
             'Hold your phone flat and align towards the Kaaba icon 🕋 for the exact Qibla.'}
          </p>
        </div>

      </div>

    </div>
  );
};
