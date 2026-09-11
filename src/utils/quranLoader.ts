import quranUthmaniRaw from '../data/quran-uthmani.json';
import { ALL_114_SURAHS_META } from '../data/quranData';
import { Surah, Ayah } from '../types';

interface RawAyah {
  num: number;
  text: string;
}

interface RawSurah {
  number: number;
  name: string;
  ayahs: RawAyah[];
}

const rawSurahsMap = new Map<number, RawSurah>();
(quranUthmaniRaw as unknown as RawSurah[]).forEach(s => {
  rawSurahsMap.set(s.number, s);
});

/**
 * Loads any of the 114 Surahs entirely locally and instantly without VPN or network.
 */
export function getLocalSurah(surahNumber: number): Surah | null {
  const raw = rawSurahsMap.get(surahNumber);
  const meta = ALL_114_SURAHS_META.find(m => m.number === surahNumber);

  if (!raw || !meta) {
    return null;
  }

  const ayahs: Ayah[] = raw.ayahs.map(a => ({
    number: a.num,
    numberInSurah: a.num,
    text: a.text,
    translationUg: '', // Explicitly removed per user request: pure Arabic text
    translationEn: '',
    tafsirAr: '',
    juz: meta.juz || 1,
    page: meta.page || 1,
  }));

  return {
    number: meta.number,
    name: meta.name || raw.name,
    englishName: meta.englishName,
    englishNameTranslation: meta.englishName || '',
    nameUg: meta.nameUg,
    revelationType: meta.type || 'Meccan',
    numberOfAyahs: ayahs.length,
    page: meta.page || 1,
    juz: meta.juz || 1,
    ayahs,
  };
}

/**
 * Gets all 114 Surahs metadata list
 */
export function getAll114SurahsMeta() {
  return ALL_114_SURAHS_META;
}
