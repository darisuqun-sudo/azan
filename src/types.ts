export type Language = 'ug' | 'ar' | 'en' | 'tr';

export type ActiveScreen = 
  | 'home'
  | 'quran-reader'
  | 'azan-alert'
  | 'surahs'
  | 'khatam'
  | 'tajweed'
  | 'hifz'
  | 'ayah-card'
  | 'islamic-ai'
  | 'prophets'
  | 'quiz'
  | 'wudu-salah-guide'
  | 'sunnah-habits'
  | 'mosque-locator'
  | 'qaza'
  | 'ramadan'
  | 'zakat'
  | 'names'
  | 'halal'
  | 'asmaul-husna'
  | 'widgets'
  | 'tasbih'
  | 'qibla'
  | 'calendar'
  | 'hadith'
  | 'duas'
  | 'favorites'
  | 'search'
  | 'melodic-recitations'
  | 'more'
  | 'android-plan';

export interface PrayerTime {
  id: string;
  nameAr: string;
  nameUg: string;
  nameEn: string;
  nameTr: string;
  time: string; // "04:38"
  timestamp: number;
  icon: string;
  isNext?: boolean;
  isActive?: boolean;
}

export interface AzanVoiceItem {
  id: string;
  nameAr: string;
  nameUg: string;
  nameEn: string;
  nameTr: string;
  muezzinAr: string;
  muezzinUg: string;
  muezzinEn: string;
  locationAr: string;
  locationUg: string;
  locationEn: string;
  audioUrls: string[];
  duration?: string;
  descriptionUg?: string;
  isFajr?: boolean;
}

export interface CityLocation {
  id: string;
  nameAr: string;
  nameUg: string;
  nameEn: string;
  nameTr: string;
  countryAr: string;
  countryUg: string;
  countryEn: string;
  countryTr: string;
  lat: number;
  lng: number;
  timezone: string;
}

export interface WordBreakdown {
  arabic: string;
  ug: string;
  en: string;
  tr: string;
  root?: string;
  type?: string;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translationUg: string;
  translationEn: string;
  translationTr?: string;
  tafsirAr: string;
  juz: number;
  page: number;
  words?: WordBreakdown[];
  audioUrl?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  nameUg: string;
  nameTr?: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  page: number;
  juz: number;
  ayahs: Ayah[];
}

export interface DuaItem {
  id: string;
  category: string;
  categoryUg: string;
  categoryTr?: string;
  titleAr: string;
  titleUg: string;
  titleEn: string;
  titleTr?: string;
  arabicText: string;
  transliterationUg?: string;
  translationUg: string;
  translationEn: string;
  translationTr?: string;
  benefitUg?: string;
  audioUrl?: string;
  count: number;
  reference: string;
}

export interface HadithItem {
  id: string;
  number: number;
  titleAr: string;
  titleUg: string;
  titleTr?: string;
  narrator: string;
  arabicText: string;
  translationUg: string;
  translationEn: string;
  translationTr?: string;
  lessonUg?: string;
  categoryUg?: string;
  book: string;
}

export interface Reciter {
  id: string;
  nameAr: string;
  nameEn: string;
  nameUg: string;
  nameTr?: string;
  styleAr?: string;
  styleUg?: string;
  styleEn?: string;
  subfolder: string;
  streamBaseUrl?: string;
}

export interface IslamicNameItem {
  id: string;
  nameAr: string;
  nameUg: string;
  nameEn: string;
  nameTr: string;
  gender: 'boy' | 'girl' | 'unisex';
  meaningUg: string;
  meaningEn: string;
  meaningTr: string;
  meaningAr: string;
  origin: string;
}

export interface HalalEAdditive {
  code: string; // e.g. E120
  name: string;
  status: 'halal' | 'haram' | 'mushbooh';
  category: string;
  sourceUg: string;
  sourceEn: string;
  sourceTr: string;
  detailsUg: string;
  detailsEn: string;
  detailsTr: string;
}

export interface AsmaulHusnaItem {
  number: number;
  nameAr: string;
  transliteration: string;
  nameUg: string;
  nameEn: string;
  nameTr: string;
  meaningUg: string;
  meaningEn: string;
  meaningTr: string;
  meaningAr: string;
  benefitUg: string;
}

export interface TajweedRuleItem {
  id: string;
  nameAr: string;
  nameUg: string;
  nameTr: string;
  nameEn: string;
  color: string;
  descriptionUg: string;
  descriptionEn: string;
  descriptionTr: string;
  exampleAr: string;
  exampleAyah: string;
  letters: string[];
}
