import { Reciter } from '../types';

// Specific known direct MP3 streams for Abdulrahman Mossad's most famous recitations
const ABDULRAHMAN_MOSSAD_SPECIAL_SURAHS: Record<number, string> = {
  1: 'https://archive.org/download/20231010_20231010_1754/001%20%201%20-%20%D8%B3%D9%88%D8%B1%D8%A9%20%D8%A7%D9%84%D9%81%D8%A7%D8%AA%D8%AD%D8%A9%20%D8%A8%D8%B5%D9%88%D8%AA%20%D8%A7%D9%84%D9%82%D8%A7%D8%B1%D8%A6%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86%20%D9%85%D8%B3%D8%B9%D8%AF%20%D8%B5%D9%88%D8%AA%20%D8%B1%D8%A7%D8%A6%D8%B9.mp3',
  3: 'https://archive.org/download/20231010_20231010_1754/003%20s%203%20%20%D8%A3%D9%88%D8%A7%D8%A6%D9%84%20%D8%B3%D9%88%D8%B1%D8%A9%20%D8%A2%D9%84%20%D8%B9%D9%85%D8%B1%D8%A7%D9%86%20%28%D8%AD%D8%B5%D8%B1%D9%8A%D8%A7%D9%8B%29%20%20%D8%AA%D9%84%D8%A7%D9%88%D8%A9%20%D8%AE%D8%A7%D8%B4%D8%B9%D8%A9%20%D8%A8%D8%B5%D9%88%D8%AA%20%D8%A7%D9%84%D9%82%D8%A7%D8%B1%D8%A6%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86%20%D9%85%D8%B3%D8%B9%D8%AF.mp3',
  19: 'https://archive.org/download/20231010_20231010_1754/019%20%2019%20%20%D8%A3%D9%88%D8%A7%D8%AE%D8%B1%20%D8%B3%D9%88%D8%B1%D8%A9%20%D9%85%D8%B1%D9%8A%D9%85%20%20%D8%A7%D9%84%D9%82%D8%A7%D8%B1%D8%A6%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86%20%D9%85%D8%B3%D8%B9%D8%AF%20%20%D8%A3%D8%B1%D8%AD%20%D9%82%D9%84%D8%A8%D9%83.mp3',
  32: 'https://archive.org/download/20210117_20210117_1138/032%20As-Sajda%20-%20%D8%A7%D9%84%D8%B3%D8%AC%D8%AF%D8%A9.mp3',
  49: 'https://archive.org/download/a2025112aaaaa5/049%20-%20%D8%A7%D9%84%D8%AD%D8%AC%D8%B1%D8%A7%D8%AA.mp3',
  67: 'https://archive.org/download/a2025112aaaaa5/067%20-%20%D8%A7%D9%84%D9%85%D9%84%D9%83.mp3',
  73: 'https://archive.org/download/20210117_20210117_1138/073%20Al-Muzzammil%20-%20%D8%A7%D9%84%D9%85%D8%B2%D9%85%D9%84.mp3',
  78: 'https://archive.org/download/20210117_20210117_1138/078%20An-Naba%27%20-%20%D8%A7%D9%84%D9%86%D8%A8%D8%A3.mp3',
  87: 'https://archive.org/download/a2025112aaaaa5/087%20-%20%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89.mp3',
  88: 'https://archive.org/download/20210117_20210117_1138/088%20Al-Ghaashiyah%20-%20%D8%A7%D9%84%D8%BA%D8%A7%D8%B4%D9%8A%D8%A9.mp3',
  100: 'https://archive.org/download/20210117_20210117_1138/100%20%20Al-%27Aadiyaat%20-%20%D8%A7%D9%84%D8%B9%D8%A7%D8%AF%D9%8A%D8%A7%D8%AA.mp3',
  107: 'https://archive.org/download/20210117_20210117_1138/107%20Al-Maa%27oon%20-%20%D8%A7%D9%84%D9%85%D8%A7%D8%B9%D9%88%D9%86.mp3',
};

// Available Surahs for Sherif Mostafa on archive item Sherif-Mostafa
const SHERIF_MOSTAFA_AVAILABLE_SURAHS = new Set([
  13, 15, 19, 20, 31, 32, 53, 55, 56, 57, 60, 61, 62, 63, 64, 65, 66, 67, 71, 75, 76, 77, 89
]);

// Available Surahs for Abdulaziz Suhaim on server16
const ABDULAZIZ_SUHAIM_AVAILABLE_SURAHS = new Set([
  1, 18, 19, 31, 49, 50, 51, 54, 55, 56, 66, 67, 72, 75, 87, 89, 112
]);

/**
 * Returns an ordered array of audio stream URLs to attempt for a given Surah and Reciter.
 * The system tries the primary URL, then automatic fallbacks for maximum resilience without VPN.
 */
export function getSurahAudioCandidates(reciter: Reciter, surahNumber: number): string[] {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const urls: string[] = [];

  switch (reciter.id) {
    case 'raad_kurdi':
      // Sheikh Raad Al-Kurdi
      urls.push(`https://server6.mp3quran.net/kurdi/${surahPadded}.mp3`);
      urls.push(`https://archive.org/download/raad-alkurdi-quran/${surahPadded}.mp3`);
      urls.push(`https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/${surahPadded}.mp3`);
      break;

    case 'islam_sobhi':
      // Sheikh Islam Sobhi
      urls.push(`https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/${surahPadded}.mp3`);
      urls.push(`https://server6.mp3quran.net/kurdi/${surahPadded}.mp3`);
      break;

    case 'abdulrahman_massad':
      // Sheikh Abdulrahman Mossad
      if (ABDULRAHMAN_MOSSAD_SPECIAL_SURAHS[surahNumber]) {
        urls.push(ABDULRAHMAN_MOSSAD_SPECIAL_SURAHS[surahNumber]);
      }
      urls.push(`https://server6.mp3quran.net/kurdi/${surahPadded}.mp3`);
      urls.push(`https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/${surahPadded}.mp3`);
      break;

    case 'muhammad_luhaidan':
      // Sheikh Muhammad Al-Luhaidan
      urls.push(`https://server8.mp3quran.net/lhdan/${surahPadded}.mp3`);
      urls.push(`https://server6.mp3quran.net/kurdi/${surahPadded}.mp3`);
      break;

    case 'abdulaziz_suhaim':
      // Sheikh Abdulaziz Suhaim
      if (ABDULAZIZ_SUHAIM_AVAILABLE_SURAHS.has(surahNumber)) {
        urls.push(`https://server16.mp3quran.net/a_sheim/Rewayat-Warsh-A-n-Nafi/${surahPadded}.mp3`);
      }
      urls.push(`https://server6.mp3quran.net/kurdi/${surahPadded}.mp3`);
      break;

    case 'sherif_mostafa':
      // Sheikh Sherif Mostafa
      if (SHERIF_MOSTAFA_AVAILABLE_SURAHS.has(surahNumber)) {
        urls.push(`https://archive.org/download/Sherif-Mostafa/${surahPadded}.mp3`);
      }
      urls.push(`https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/${surahPadded}.mp3`);
      urls.push(`https://server6.mp3quran.net/kurdi/${surahPadded}.mp3`);
      break;

    default:
      if (reciter.streamBaseUrl) {
        urls.push(`${reciter.streamBaseUrl}${surahPadded}.mp3`);
      }
      urls.push(`https://server6.mp3quran.net/kurdi/${surahPadded}.mp3`);
      urls.push(`https://server8.mp3quran.net/afs/${surahPadded}.mp3`);
      break;
  }

  return urls;
}

/**
 * Returns candidate URLs for individual Ayah playback.
 */
export function getAyahAudioCandidates(reciter: Reciter, surahNumber: number, ayahNumberInSurah: number): string[] {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(ayahNumberInSurah).padStart(3, '0');
  const urls: string[] = [];

  // EveryAyah subfolders for fine-grained Ayah-by-Ayah playback
  const subfolder = reciter.subfolder || 'Alafasy_128kbps';
  urls.push(`https://everyayah.com/data/${subfolder}/${surahPadded}${ayahPadded}.mp3`);
  urls.push(`https://everyayah.com/data/Alafasy_128kbps/${surahPadded}${ayahPadded}.mp3`);
  urls.push(`https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surahPadded}${ayahPadded}.mp3`);

  return urls;
}
