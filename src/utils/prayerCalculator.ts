// Astronomical Solar Prayer Time Calculation & GPS Geolocation Helper
import { CityLocation, PrayerTime } from '../types';

export interface Coordinates {
  latitude: number;
  longitude: number;
  cityName?: string;
  countryName?: string;
}

// Convert degrees to radians and vice-versa
const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

// Normalize hours to 0..24
const fixHour = (hour: number) => {
  let h = hour - 24 * Math.floor(hour / 24);
  return h < 0 ? h + 24 : h;
};

// Calculate Julian Day
function getJulianDay(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

// Sun coordinates: returns [declination, equation of time in hours]
function sunPosition(jd: number): [number, number] {
  const D = jd - 2451545.0;
  const g = 357.529 + 0.98560028 * D;
  const q = 280.459 + 0.98564736 * D;
  const L = q + 1.915 * Math.sin(toRad(g)) + 0.020 * Math.sin(toRad(2 * g));
  
  const e = 23.439 - 0.00000036 * D;
  const RA = toDeg(Math.atan2(Math.cos(toRad(e)) * Math.sin(toRad(L)), Math.cos(toRad(L)))) / 15;
  const EqT = (q / 15) - fixHour(RA);
  const sinDecl = Math.sin(toRad(e)) * Math.sin(toRad(L));
  const decl = toDeg(Math.asin(sinDecl));
  return [decl, EqT];
}

// Compute sun altitude hour angle for a given angle (e.g. -0.833 for sunrise/sunset, -18 for Fajr/Isha)
function computeHourAngle(angle: number, lat: number, decl: number): number {
  const cosH = (Math.sin(toRad(angle)) - Math.sin(toRad(lat)) * Math.sin(toRad(decl))) /
               (Math.cos(toRad(lat)) * Math.cos(toRad(decl)));
  if (cosH > 1) return 0; // Sun never rises
  if (cosH < -1) return Math.PI; // Sun never sets
  return toDeg(Math.acos(cosH)) / 15;
}

// Asr shadow multiplier (Shafi/Hanafi: factor 1 or 2)
function computeAsrAngle(factor: number, lat: number, decl: number): number {
  const shadow = factor + Math.tan(toRad(Math.abs(lat - decl)));
  const angle = 90 - toDeg(Math.atan(shadow));
  return computeHourAngle(angle, lat, decl);
}

// Format fractional hours (e.g. 18.7) to "18:42"
function formatTime(hour: number): string {
  const h = Math.floor(fixHour(hour));
  const m = Math.floor((hour - Math.floor(hour)) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function calculatePrayerTimes(lat: number, lng: number, date: Date = new Date(), timezoneOffsetHours?: number): PrayerTime[] {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // If timezoneOffset is not provided, use browser local timezone
  const tz = timezoneOffsetHours !== undefined ? timezoneOffsetHours : -date.getTimezoneOffset() / 60;

  const jd = getJulianDay(year, month, day);
  const [decl, EqT] = sunPosition(jd);

  // Solar noon
  const dhuhrTime = fixHour(12 + tz - (lng / 15) - EqT);

  // Fajr angle (-18.0°)
  const fajrDiff = computeHourAngle(-18.0, lat, decl);
  const fajrTime = dhuhrTime - fajrDiff;

  // Sunrise (-0.833°)
  const sunriseDiff = computeHourAngle(-0.833, lat, decl);
  const sunriseTime = dhuhrTime - sunriseDiff;

  // Asr (Standard Shafi/Maliki/Hanbali factor 1)
  const asrDiff = computeAsrAngle(1, lat, decl);
  const asrTime = dhuhrTime + asrDiff;

  // Maghrib Sunset (-0.833°)
  const maghribTime = dhuhrTime + sunriseDiff;

  // Isha angle (-17.5°)
  const ishaDiff = computeHourAngle(-17.5, lat, decl);
  const ishaTime = dhuhrTime + ishaDiff;

  // Convert current time to compare
  const now = date.getHours() + date.getMinutes() / 60;

  const timesRaw = [
    { id: 'fajr', raw: fajrTime, nameAr: 'الفجر', nameUg: 'بامدات', nameEn: 'Fajr', nameTr: 'İmsak', icon: 'Moon' },
    { id: 'sunrise', raw: sunriseTime, nameAr: 'الشروق', nameUg: 'كۈن چىقىش', nameEn: 'Sunrise', nameTr: 'Güneş', icon: 'Sunrise' },
    { id: 'dhuhr', raw: dhuhrTime, nameAr: 'الظهر', nameUg: 'پېشىن', nameEn: 'Dhuhr', nameTr: 'Öğle', icon: 'Sun' },
    { id: 'asr', raw: asrTime, nameAr: 'العصر', nameUg: 'ئەسەر', nameEn: 'Asr', nameTr: 'İkindi', icon: 'SunMedium' },
    { id: 'maghrib', raw: maghribTime, nameAr: 'المغرب', nameUg: 'شام', nameEn: 'Maghrib', nameTr: 'Akşam', icon: 'Sunset' },
    { id: 'isha', raw: ishaTime, nameAr: 'العشاء', nameUg: 'خۇپتەن', nameEn: 'Isha', nameTr: 'Yatsı', icon: 'MoonStar' },
  ];

  // Determine which is next prayer
  let nextFound = false;
  const prayerList: PrayerTime[] = timesRaw.map((p) => {
    const formatted = formatTime(p.raw);
    const isNext = !nextFound && p.raw > now;
    if (isNext) nextFound = true;

    return {
      id: p.id,
      nameAr: p.nameAr,
      nameUg: p.nameUg,
      nameEn: p.nameEn,
      nameTr: p.nameTr,
      time: formatted,
      timestamp: 0,
      icon: p.icon,
      isActive: isNext,
      isNext: isNext
    };
  });

  // If all prayers passed today, Fajr tomorrow is next
  if (!nextFound && prayerList.length > 0) {
    prayerList[0].isNext = true;
    prayerList[0].isActive = true;
  }

  return prayerList;
}

// Request browser GPS position and create CityLocation with IP and fallback safety
export async function detectCurrentLocation(): Promise<CityLocation> {
  return new Promise((resolve) => {
    const fallbackWithTimezone = () => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Istanbul';
      // Known timezones defaults
      let defaultLat = 41.0082;
      let defaultLng = 28.9784;
      let nameUg = 'ھازىرقى ئورنىڭىز (ئىستانبۇل ۋاقتى)';
      let nameAr = 'موقعي الحالي (توقيت إسطنبول)';
      let nameEn = 'Current Location (Istanbul)';

      if (tz.includes('Urumqi') || tz.includes('Shanghai') || tz.includes('Kashgar')) {
        defaultLat = 43.8256;
        defaultLng = 87.6168;
        nameUg = 'ھازىرقى ئورنىڭىز (ئۈرۈمچى ۋاقتى)';
        nameAr = 'موقعي الحالي (أورومتشي)';
        nameEn = 'Current Location (Urumqi)';
      } else if (tz.includes('Riyadh') || tz.includes('Makkah') || tz.includes('Saudi')) {
        defaultLat = 21.4225;
        defaultLng = 39.8262;
        nameUg = 'ھازىرقى ئورنىڭىز (مەككە ۋاقتى)';
        nameAr = 'موقعي الحالي (مكة المكرمة)';
        nameEn = 'Current Location (Makkah)';
      } else if (tz.includes('London') || tz.includes('Europe/London')) {
        defaultLat = 51.5074;
        defaultLng = -0.1278;
        nameUg = 'ھازىرقى ئورنىڭىز (لوندون ۋاقتى)';
        nameAr = 'موقعي الحالي (لندن)';
        nameEn = 'Current Location (London)';
      }

      resolve({
        id: 'auto-tz',
        nameAr,
        nameUg,
        nameEn,
        nameTr: nameEn,
        countryAr: 'محدد بالمنطقة الزمنية',
        countryUg: 'ۋاقىت رايونى بويىچە',
        countryEn: 'Timezone based',
        countryTr: 'Zaman dilimi',
        lat: defaultLat,
        lng: defaultLng,
        timezone: tz
      });
    };

    if (!navigator.geolocation) {
      fallbackWithTimezone();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          // Attempt reverse geocoding via OpenStreetMap Nominatim
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`, {
            headers: { 'Accept-Language': 'ug,ar,en' }
          });
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.state || "ھازىرقى ئورنىڭىز";
          const country = data.address?.country || "ئورنىڭىز";

          resolve({
            id: 'auto-gps',
            nameAr: `موقعي الحالي (${city})`,
            nameUg: `ھازىرقى ئورنۇم (${city})`,
            nameEn: `Current GPS (${city})`,
            nameTr: `Mevcut Konumum (${city})`,
            countryAr: country,
            countryUg: country,
            countryEn: country,
            countryTr: country,
            lat,
            lng,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          });
        } catch {
          // Fallback with coordinates
          resolve({
            id: 'auto-gps',
            nameAr: `موقعي الحالي (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
            nameUg: `ھازىرقى ئورنۇم (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
            nameEn: `Current GPS (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
            nameTr: `Mevcut Konum (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
            countryAr: 'محدد تلقائياً',
            countryUg: 'ئاپتوماتىك بېكىتىلگەن',
            countryEn: 'Auto GPS',
            countryTr: 'Otomatik Konum',
            lat,
            lng,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          });
        }
      },
      () => {
        fallbackWithTimezone();
      },
      { timeout: 7000, enableHighAccuracy: false }
    );
  });
}
