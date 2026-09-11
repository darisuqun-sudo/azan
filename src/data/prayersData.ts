import { CityLocation, PrayerTime, AzanVoiceItem } from '../types';
import { calculatePrayerTimes } from '../utils/prayerCalculator';

export const CITIES: CityLocation[] = [
  {
    id: 'makkah',
    nameAr: 'مكة المكرمة',
    nameUg: 'مەككە مۇكەررەمە',
    nameEn: 'Makkah',
    nameTr: 'Mekke-i Mükerreme',
    countryAr: 'المملكة العربية السعودية',
    countryUg: 'سەئۇدى ئەرەبىستان',
    countryEn: 'Saudi Arabia',
    countryTr: 'Suudi Arabistan',
    lat: 21.3891,
    lng: 39.8579,
    timezone: 'Asia/Riyadh'
  },
  {
    id: 'madinah',
    nameAr: 'المدينة المنورة',
    nameUg: 'مەدىنە مۇنەۋۋەرە',
    nameEn: 'Madinah',
    nameTr: 'Medine-i Münevvere',
    countryAr: 'المملكة العربية السعودية',
    countryUg: 'سەئۇدى ئەرەبىستان',
    countryEn: 'Saudi Arabia',
    countryTr: 'Suudi Arabistan',
    lat: 24.5247,
    lng: 39.5692,
    timezone: 'Asia/Riyadh'
  },
  {
    id: 'jerusalem',
    nameAr: 'القدس الشريف (المسجد الأقصى)',
    nameUg: 'قۇددۇس شەرىف (ئەقسا)',
    nameEn: 'Jerusalem (Al-Quds)',
    nameTr: 'Kudüs-ü Şerif',
    countryAr: 'فلسطين',
    countryUg: 'پەلەستىن',
    countryEn: 'Palestine',
    countryTr: 'Filistin',
    lat: 31.7683,
    lng: 35.2137,
    timezone: 'Asia/Jerusalem'
  },
  {
    id: 'istanbul',
    nameAr: 'إسطنبول',
    nameUg: 'ئىستانبۇل',
    nameEn: 'Istanbul',
    nameTr: 'İstanbul',
    countryAr: 'تركيا',
    countryUg: 'تۈركىيە',
    countryEn: 'Turkey',
    countryTr: 'Türkiye',
    lat: 41.0082,
    lng: 28.9784,
    timezone: 'Europe/Istanbul'
  },
  {
    id: 'cairo',
    nameAr: 'مدينة القاهرة',
    nameUg: 'قاھىرە شەھىرى',
    nameEn: 'Cairo',
    nameTr: 'Kahire',
    countryAr: 'مصر',
    countryUg: 'مىسىر',
    countryEn: 'Egypt',
    countryTr: 'Mısır',
    lat: 30.0444,
    lng: 31.2357,
    timezone: 'Africa/Cairo'
  },
  {
    id: 'damascus',
    nameAr: 'دمشق',
    nameUg: 'دەشمەشىق (شام)',
    nameEn: 'Damascus',
    nameTr: 'Şam (Dımaşk)',
    countryAr: 'الجمهورية العربية السورية',
    countryUg: 'سۈرىيە',
    countryEn: 'Syria',
    countryTr: 'Suriye',
    lat: 33.5138,
    lng: 36.2765,
    timezone: 'Asia/Damascus'
  },
  {
    id: 'aleppo',
    nameAr: 'حلب',
    nameUg: 'ھەلەب',
    nameEn: 'Aleppo',
    nameTr: 'Halep',
    countryAr: 'الجمهورية العربية السورية',
    countryUg: 'سۈرىيە',
    countryEn: 'Syria',
    countryTr: 'Suriye',
    lat: 36.2021,
    lng: 37.1343,
    timezone: 'Asia/Damascus'
  },
  {
    id: 'homs',
    nameAr: 'حمص',
    nameUg: 'ھىمس',
    nameEn: 'Homs',
    nameTr: 'Humus',
    countryAr: 'الجمهورية العربية السورية',
    countryUg: 'سۈرىيە',
    countryEn: 'Syria',
    countryTr: 'Suriye',
    lat: 34.7324,
    lng: 36.7137,
    timezone: 'Asia/Damascus'
  },
  {
    id: 'latakia',
    nameAr: 'اللاذقية',
    nameUg: 'لازىقىيە',
    nameEn: 'Latakia',
    nameTr: 'Lazkiye',
    countryAr: 'الجمهورية العربية السورية',
    countryUg: 'سۈرىيە',
    countryEn: 'Syria',
    countryTr: 'Suriye',
    lat: 35.5317,
    lng: 35.7901,
    timezone: 'Asia/Damascus'
  },
  {
    id: 'hama',
    nameAr: 'حماة',
    nameUg: 'ھاما',
    nameEn: 'Hama',
    nameTr: 'Hama',
    countryAr: 'الجمهورية العربية السورية',
    countryUg: 'سۈرىيە',
    countryEn: 'Syria',
    countryTr: 'Suriye',
    lat: 35.1318,
    lng: 36.7578,
    timezone: 'Asia/Damascus'
  },
  {
    id: 'almaty',
    nameAr: 'ألماتي',
    nameUg: 'ئالمۇتا',
    nameEn: 'Almaty',
    nameTr: 'Almatı',
    countryAr: 'كازاخستان',
    countryUg: 'قازاقىستان',
    countryEn: 'Kazakhstan',
    countryTr: 'Kazakistan',
    lat: 43.2220,
    lng: 76.8512,
    timezone: 'Asia/Almaty'
  },
  {
    id: 'bishkek',
    nameAr: 'بيشكيك',
    nameUg: 'بىشكەك',
    nameEn: 'Bishkek',
    nameTr: 'Bişkek',
    countryAr: 'قيرغيزستان',
    countryUg: 'قىرغىزىستان',
    countryEn: 'Kyrgyzstan',
    countryTr: 'Kırgızistan',
    lat: 42.8746,
    lng: 74.5698,
    timezone: 'Asia/Bishkek'
  },
  {
    id: 'tashkent',
    nameAr: 'طشقند',
    nameUg: 'تاشكەنت',
    nameEn: 'Tashkent',
    nameTr: 'Taşkent',
    countryAr: 'أوزبكستان',
    countryUg: 'ئۆزبېكىستان',
    countryEn: 'Uzbekistan',
    countryTr: 'Özbekistan',
    lat: 41.2995,
    lng: 69.2401,
    timezone: 'Asia/Tashkent'
  },
  {
    id: 'dubai',
    nameAr: 'دبي',
    nameUg: 'دۇبەي',
    nameEn: 'Dubai',
    nameTr: 'Dubai',
    countryAr: 'الإمارات العربية المتحدة',
    countryUg: 'بىرلەشمە ئەرەب ئەمىرلىكلىرى',
    countryEn: 'UAE',
    countryTr: 'BAE',
    lat: 25.2048,
    lng: 55.2708,
    timezone: 'Asia/Dubai'
  },
  {
    id: 'doha',
    nameAr: 'الدوحة',
    nameUg: 'دوھا',
    nameEn: 'Doha',
    nameTr: 'Doha',
    countryAr: 'قطر',
    countryUg: 'قاتار',
    countryEn: 'Qatar',
    countryTr: 'Katar',
    lat: 25.2854,
    lng: 51.5310,
    timezone: 'Asia/Qatar'
  },
  {
    id: 'london',
    nameAr: 'لندن',
    nameUg: 'لوندون',
    nameEn: 'London',
    nameTr: 'Londra',
    countryAr: 'المملكة المتحدة',
    countryUg: 'ئەنگلىيە',
    countryEn: 'United Kingdom',
    countryTr: 'Birleşik Krallık',
    lat: 51.5074,
    lng: -0.1278,
    timezone: 'Europe/London'
  },
  {
    id: 'paris',
    nameAr: 'باريس',
    nameUg: 'پارىژ',
    nameEn: 'Paris',
    nameTr: 'Paris',
    countryAr: 'فرنسا',
    countryUg: 'فىرانسىيە',
    countryEn: 'France',
    countryTr: 'Fransa',
    lat: 48.8566,
    lng: 2.3522,
    timezone: 'Europe/Paris'
  },
  {
    id: 'berlin',
    nameAr: 'برلين',
    nameUg: 'بېرلىن',
    nameEn: 'Berlin',
    nameTr: 'Berlin',
    countryAr: 'ألمانيا',
    countryUg: 'گېرمانىيە',
    countryEn: 'Germany',
    countryTr: 'Almanya',
    lat: 52.5200,
    lng: 13.4050,
    timezone: 'Europe/Berlin'
  },
  {
    id: 'tokyo',
    nameAr: 'طوكيو',
    nameUg: 'توكيو',
    nameEn: 'Tokyo',
    nameTr: 'Tokyo',
    countryAr: 'اليابان',
    countryUg: 'ياپونىيە',
    countryEn: 'Japan',
    countryTr: 'Japonya',
    lat: 35.6762,
    lng: 139.6503,
    timezone: 'Asia/Tokyo'
  },
  {
    id: 'kuala_lumpur',
    nameAr: 'كوالالمبور',
    nameUg: 'كۇئالالۇمپۇر',
    nameEn: 'Kuala Lumpur',
    nameTr: 'Kuala Lumpur',
    countryAr: 'ماليزيا',
    countryUg: 'مالايشىيا',
    countryEn: 'Malaysia',
    countryTr: 'Malezya',
    lat: 3.1390,
    lng: 101.6869,
    timezone: 'Asia/Kuala_Lumpur'
  }
];

export function getCalculatedPrayerTimes(city: CityLocation, date: Date = new Date()): PrayerTime[] {
  return calculatePrayerTimes(city.lat, city.lng, date);
}

export const AFTER_AZAN_DUA = {
  arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
  transliteration: "Allahumma Rabba hadhihid-da'watit-tammah, was-salatil-qa'imah, ati Muhammadanil-wasilata wal-fadilah, wab'ath-hu maqamam mahmudanilladhi wa'adtah",
  translationUg: "ئى بۇ مۇكەممەل چاقىرىقنىڭ ۋە ئوقۇلغۇسى نامازنىڭ رەببى بولغان ئاللاھ! مۇھەممەد ئەلەيھىسسالامغا ۋەسىلە (جەننەتتىكى ئالىي دەرىجە) ۋە پەزىلەتنى ئاتا قىلغىن، ئۇنى سەن ۋەدە قىلغان ماقامى مەھمۇد (مەدھىيەلەنگەن ئورۇن)غا ئېرىشتۈرگىن.",
  translationEn: "O Allah, Lord of this perfect call and established prayer, grant Muhammad the status of intercession and eminence, and resurrect him to the praised position which You have promised him.",
  translationTr: "Ey bu eksiksiz davetin ve kılınacak namazın Rabbi olan Allah'ım! Muhammed'e (s.a.v.) vesileyi ve fazileti ver. Onu vadettiğin Makam-ı Mahmud'a ulaştır."
};

export const AZAN_VOICES: AzanVoiceItem[] = [
  {
    id: 'alafasy',
    nameAr: 'أذان الشيخ مشاري راشد العفاسي',
    nameUg: 'شەيخ مىشارى راشىد ئەلئەفاسى ئەزانى',
    nameEn: 'Sheikh Mishary Rashid Alafasy',
    nameTr: 'Şeyh Mişari Raşid El-Afasi Ezanı',
    muezzinAr: 'الشيخ مشاري بن راشد العفاسي',
    muezzinUg: 'شەيخ مىشارى راشىد ئەلئەفاسى',
    muezzinEn: 'Mishary Rashid Alafasy',
    locationAr: 'الكويت (جامع الكويت الكبير)',
    locationUg: 'كۇۋەيت دۆلىتى',
    locationEn: 'Kuwait Grand Mosque',
    audioUrls: [
      '/audio/alafasy_adhan.mp3',
      'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Mishary_Al_Afasy_-_HQ_(%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A).mp3'
    ],
    duration: '04:12',
    descriptionUg: 'ھەممە كىشى سۆيۈپ ئاڭلايدىغان، ئىنتايىن يېقىملىق، مۇڭلۇق ۋە قەلبكە يېقىن دۇنياغا داڭلىق ئەزان.'
  },
  {
    id: 'abdulbasit',
    nameAr: 'أذان الشيخ عبد الباسط عبد الصمد',
    nameUg: 'شەيخ ئابدۇلباسىت ئابدۇسسەمەد ئەزانى',
    nameEn: 'Sheikh Abdulbasit Abdussamad',
    nameTr: 'Şeyh Abdülbasit Abdüssamed Ezanı',
    muezzinAr: 'الشيخ عبد الباسط عبد الصمد رحمه الله',
    muezzinUg: 'شەيخ ئابدۇلباسىت ئابدۇسسەمەد (رەھىمەھۇللاھ)',
    muezzinEn: 'Sheikh Abdulbasit Abdussamad',
    locationAr: 'القاهرة - جمهورية مصر العربية',
    locationUg: 'قاھىرە - مىسىر',
    locationEn: 'Cairo, Egypt',
    audioUrls: [
      '/audio/abdulbasit_adhan.mp3',
      'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Abdulbasit_Abdusamad_1_-_Egypt_(%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%B5%D9%85%D8%AF_-_%D9%85%D8%B5%D8%B1).mp3'
    ],
    duration: '03:15',
    descriptionUg: 'قۇرئان ۋە ئەزان تىلاۋىتى پىشىۋاسىنىڭ تارىخىي، ئالتۇن دەۋردىكى تەسىرلىك نادىر مىراس ئەزانى.'
  },
  {
    id: 'qatami',
    nameAr: 'أذان الشيخ ناصر القطامي',
    nameUg: 'شەيخ ناسىر ئەلقەتامى ئەزانى',
    nameEn: 'Sheikh Nasser Al-Qatami',
    nameTr: 'Şeyh Nasır El-Katami Ezanı',
    muezzinAr: 'الشيخ ناصر بن علي القطامي',
    muezzinUg: 'شەيخ ناسىر ئەلقەتامى',
    muezzinEn: 'Sheikh Nasser Al-Qatami',
    locationAr: 'الرياض - المملكة العربية السعودية',
    locationUg: 'رىياد - سەئۇدى ئەرەبىستان',
    locationEn: 'Riyadh, Saudi Arabia',
    audioUrls: [
      '/audio/qatami_adhan.mp3',
      'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Nasser_Al_Qatami_-_HQ_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A).mp3'
    ],
    duration: '02:18',
    descriptionUg: 'ناھايىتى خاشىئ، يېقىملىق، مۇڭلۇق ۋە روھنى لەرزىگە سالىدىغان داڭلىق ئاۋاز.'
  },
  {
    id: 'islam_sobhi',
    nameAr: 'أذان القارئ إسلام صبحي',
    nameUg: 'شەيخ ئىسلام سۇبھى ئەزانى',
    nameEn: 'Sheikh Islam Sobhi',
    nameTr: 'Şeyh İslam Subhi Ezanı',
    muezzinAr: 'القارئ إسلام صبحي',
    muezzinUg: 'شەيخ ئىسلام سۇبھى',
    muezzinEn: 'Islam Sobhi',
    locationAr: 'جمهورية مصر العربية',
    locationUg: 'مىسىر',
    locationEn: 'Egypt',
    audioUrls: [
      '/audio/islam_sobhi_adhan.mp3',
      'https://archive.org/download/a.s.i.s.1/Adhan_Sheikh-Islam-Sobhi.mp3'
    ],
    duration: '02:53',
    descriptionUg: 'قەلبكە ئارام، چەكسىز خاتىرجەملىك ۋە ھۇزۇر بېغىشلايدىغان ئاجايىپ مۇڭلۇق ئەزان.'
  },
  {
    id: 'zaylai',
    nameAr: 'أذان المؤذن عبدالله الزيلعي',
    nameUg: 'شەيخ ئابدۇللاھ ئەلزەيلەئى ئەزانى',
    nameEn: 'Sheikh Abdullah Al-Zaylai',
    nameTr: 'Müezzin Abdullah ez-Zeylai Ezanı',
    muezzinAr: 'المؤذن عبدالله بن محمد الزيلعي',
    muezzinUg: 'شەيخ ئابدۇللاھ ئەلزەيلەئى',
    muezzinEn: 'Sheikh Abdullah Al-Zaylai',
    locationAr: 'المملكة العربية السعودية',
    locationUg: 'سەئۇدى ئەرەبىستان',
    locationEn: 'Saudi Arabia',
    audioUrls: [
      '/audio/zaylai_adhan.mp3',
      'https://archive.org/download/alf2013-12-12/mp3'
    ],
    duration: '04:29',
    descriptionUg: 'چوڭقۇر خاشىئلىق ۋە تەسىرلىك ھىجاز ماقامىدىكى ئەڭ مۇڭلۇق نادىر خۇپتەن ئەزانى (سۈزۈك ئاۋاز سۈپىتىدە).'
  },
  {
    id: 'ali_mulla',
    nameAr: 'أذان الحرم المكي - الشيخ علي أحمد ملا',
    nameUg: 'شەيخ ئەلى ئەھمەد مۇللا ئەزانى (مەككە ھەرەم)',
    nameEn: 'Sheikh Ali Ahmad Mulla (Makkah Al-Haram)',
    nameTr: 'Şeyh Ali Ahmed Mulla (Mekke-i Mükerreme Harem)',
    muezzinAr: 'الشيخ علي بن أحمد ملا (شيخ مؤذني الحرم المكي)',
    muezzinUg: 'شەيخ ئەلى ئەھمەد مۇللا (مەككە ھەرەم شەيخۇلمۇئەززىنى)',
    muezzinEn: 'Sheikh Ali Ahmad Mulla',
    locationAr: 'مكة المكرمة - المسجد الحرام',
    locationUg: 'مەككە مۇكەررەمە - مەسجىدۇل ھەرەم',
    locationEn: 'Makkah, Grand Mosque',
    audioUrls: [
      '/audio/ali_mulla_adhan.mp3',
      '/audio/makkah_adhan.mp3',
      'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Ali_Ibn_Ahmad_Mala_-_HQ_(%D8%B9%D9%84%D9%8A_%D8%A8%D9%86_%D8%A3%D8%AD%D9%85%D8%AF_%D9%85%D9%84%D8%A7).mp3'
    ],
    duration: '04:04',
    descriptionUg: '«كەبىنىڭ بۇلبۇلى» دەپ نام ئالغان مەككە ھەرەم مەسجىدىنىڭ ھەيۋەتلىك ۋە تەسىرلىك ئەزانى.'
  },
  {
    id: 'luhaidan',
    nameAr: 'أذان الشيخ محمد اللحيدان',
    nameUg: 'شەيخ مۇھەممەد ئەللىھەيدان ئەزانى',
    nameEn: 'Sheikh Muhammad Al-Luhaidan',
    nameTr: 'Şeyh Muhammed el-Lüheydan Ezanı',
    muezzinAr: 'الشيخ محمد بن إبراهيم اللحيدان',
    muezzinUg: 'شەيخ مۇھەممەد ئەللىھەيدان',
    muezzinEn: 'Sheikh Muhammad Al-Luhaidan',
    locationAr: 'الرياض - المملكة العربية السعودية',
    locationUg: 'رىياد - سەئۇدى ئەرەبىستان',
    locationEn: 'Riyadh, Saudi Arabia',
    audioUrls: [
      '/audio/luhaidan_adhan.mp3'
    ],
    duration: '03:01',
    descriptionUg: 'ئىنتايىن سۈزۈك، خاشىئ، يۈرەكلەرنى لەرزىگە سالغۇچى تەسىرلىك ۋە ئەڭ يۇقىرى سۈپەتلىك ئەزان.'
  },
  {
    id: 'surayhi',
    nameAr: 'أذان الشيخ عبدالمجيد سلامة السريحي',
    nameUg: 'شەيخ ئابدۇلمەجىد سالامە ئەسسۇسەيھى ئەزانى',
    nameEn: 'Sheikh Abdulmajid Al-Surayhi',
    nameTr: 'Şeyh Abdülmecid es-Süreyhi Ezanı',
    muezzinAr: 'الشيخ عبدالمجيد بن سلامة السريحي (مؤذن المسجد النبوي الشريف)',
    muezzinUg: 'شەيخ ئابدۇلمەجىد سالامە ئەسسۇسەيھى (مەسجىدۇن نەبەۋى)',
    muezzinEn: 'Sheikh Abdulmajid Al-Surayhi',
    locationAr: 'المدينة المنورة - المملكة العربية السعودية',
    locationUg: 'مەدىنە مۇنەۋۋەرە - سەئۇدى ئەرەبىستان',
    locationEn: 'Madinah, Saudi Arabia',
    audioUrls: [
      '/audio/surayhi_adhan.mp3',
      'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Abdul_Majid_Al_Surehi_1_(%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%85%D8%AC%D9%8A%D8%AF_%D8%A7%D9%84%D8%B3%D8%B1%D9%8A%D8%AD%D9%8A).mp3'
    ],
    duration: '03:26',
    descriptionUg: 'مەدىنە مۇنەۋۋەرە پەيغەمبەر مەسجىدىنىڭ سۈزۈك، مۇڭلۇق ۋە يۈرەكلەرگە شىپا بېغىشلىغۇچى ئەزانى.'
  }
];

export const AZAN_PHRASES = [
  { ar: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ", ug: "ئاللاھ ئەڭ ئۇلۇغدۇر، ئاللاھ ئەڭ ئۇلۇغدۇر", count: 2 },
  { ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ", ug: "گۇۋاھلىق بېرىمەنكى، ئاللاھتىن باشقا ھېچبىر ھەق ئىلاھ يوقتۇر", count: 2 },
  { ar: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ", ug: "گۇۋاھلىق بېرىمەنكى، مۇھەممەد ئەلەيھىسسالام ئاللاھنىڭ ئەلچىسىدۇر", count: 2 },
  { ar: "حَيَّ عَلَى الصَّلَاةِ", ug: "نامازغا كېلىڭلار (نامازغا ئالدىراڭلار)", count: 2 },
  { ar: "حَيَّ عَلَى الْفَلَاحِ", ug: "مەڭگۈلۈك نىجاتلىق ۋە مۇرادقا كېلىڭلار", count: 2 },
  { ar: "الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ", ug: "ناماز ئۇيقۇدىن ئەۋزەلدۇر (پەقەت بامدات ئەزانىدا)", count: 2, fajrOnly: true },
  { ar: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ", ug: "ئاللاھ ئەڭ ئۇلۇغدۇر، ئاللاھ ئەڭ ئۇلۇغدۇر", count: 1 },
  { ar: "لَا إِلَهَ إِلَّا اللَّهُ", ug: "ئاللاھتىن باشقا ھېچبىر ئىلاھ يوقتۇر", count: 1 }
];

